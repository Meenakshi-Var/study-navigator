import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// CONFIG
// ----------------------
const CANVAS = "https://osu.instructure.com/api/v1";
const TOKEN = process.env.CANVAS_TOKEN;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ----------------------
// SAFE CANVAS GET
// ----------------------
async function canvasGET(path) {
  const url = `${CANVAS}${path}`;
  console.log("Canvas GET:", url);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("\n❌ CANVAS ERROR", res.status, text);
    throw new Error(`Canvas failed (${res.status})`);
  }

  return res.json();
}

// ----------------------
// HELPERS
// ----------------------
function isDueInNovember(dueAt) {
  if (!dueAt) return false;
  const d = new Date(dueAt);
  return d.getUTCFullYear() === 2025 && d.getUTCMonth() === 10;
}

async function getAllCourseIds() {
  const enrollments = await canvasGET("/users/self/enrollments?per_page=100");
  return enrollments.map((e) => e.course_id);
}

// ----------------------
// FIXED GPT PROMPT
// ----------------------
function generatePrompt(calendarJson) {
  return `
You are an academic workload assistant.

TODAY: ${new Date().toISOString().split("T")[0]}

You will receive raw Canvas events and MUST output a JSON object that matches the EXACT required structure shown below.  
You MUST use THESE EXACT FIELD NAMES — NO variations, NO missing fields, NO extra fields.

REQUIRED STRUCTURE (DO NOT COPY VALUES, ONLY THE SHAPE IS REQUIRED):

{
  "enhanced_calendar": {
    "Sunday": [],
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": []
  },

  "high_priority_tasks": [
    {
      "title": "",
      "course_code": "",
      "type": "",
      "due_at_or_start": "",
      "urgency_score": 0
    }
  ],

  "medium_priority_tasks": [],
  "low_priority_tasks": [],

  "upcoming_exams": [
    {
      "title": "",
      "course_code": "",
      "type": "exam",
      "due_at_or_start": "",
      "urgency_score": 0
    }
  ],

  "quick_stats": {
    "study_hours_today": 0,
    "study_hours_this_week": 0,
    "total_tasks_due": 0,
    "total_exams": 0,
    "tasks_due_this_week": 0,
    "recommended_study_hours_today": 0,
    "recommended_study_hours_this_week": 0,
    "task_completion_rate": 0,
    "current_streak_days": 0
  },

  "today_schedule": [
    {
      "time": "",
      "title": "",
      "course_code": "",
      "type": "",
      "priority": "",
      "duration_hours": 0
    }
  ],

  "tasks_today": {
    "high": [],
    "medium": [],
    "low": []
  },

  "weekly_calendar": {
    "Sunday": [],
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": []
  },

  "grouped_by_course": {},

  "weekly_study_plan": {
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  },

  "ranked_deadlines": [],

  "daily_todo": {
    "today": [],
    "next_7_days": []
  },

  "workload_balance_score": 0
}

MANDATORY INFERENCE RULES:
- TODAY MUST NEVER BE EMPTY.
- You MUST generate AT LEAST:
  • 3 entries in today_schedule  
  • 3 entries in tasks_today (any priority)  
  • 2 entries in daily_todo.today  
- You MUST infer tasks for today using upcoming deadlines.
- Use due_at as due_at_or_start.
- type MUST be only: "assignment", "exam", "event", or "study".
- priority MUST be: "high", "medium", or "low".
- urgency_score MUST be a number 1–100.
- ranked_deadlines MUST be sorted by urgency_score descending.
- grouped_by_course MUST include ALL course_codes from the input.
- weekly_calendar and enhanced_calendar MUST include all 7 days.
- All arrays MUST exist, even if empty.
- ABSOLUTELY NO extra fields.

STRICT OUTPUT RULES:
- Output ONLY valid JSON.
- No markdown.
- No explanations.
- Final result MUST pass JSON.parse() cleanly.

RAW CANVAS INPUT:
${JSON.stringify(calendarJson, null, 2)}
`;
}


// ----------------------
// GPT CALL
// ----------------------
async function analyzeWithGPT(events) {
  const prompt = generatePrompt(events);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }]
  });

  const raw = completion.choices[0].message.content;

  try {
    return JSON.parse(raw);
  } catch {
    const repaired = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    try {
      return JSON.parse(repaired);
    } catch {
      return { error: "Invalid JSON from AI", raw };
    }
  }
}

// ----------------------
// MAIN ROUTE
// ----------------------
app.get("/api/full", async (req, res) => {
  try {
    console.log("\n===== /api/full START =====");

    // 1. Courses
    const courseIds = await getAllCourseIds();

    // 2. To-Do
    const todo = await canvasGET("/users/self/todo?per_page=100");

    // 3. Calendar events
    const calendarArrays = await Promise.all(
      courseIds.map((id) =>
        canvasGET(`/calendar_events?all_events=true&per_page=100&context_codes[]=course_${id}`)
      )
    );
    const calendar = calendarArrays.flat();

    // 4. Course metadata
    const courseMeta = await Promise.all(
      courseIds.map((id) => canvasGET(`/courses/${id}`))
    );

    const metaMap = {};
    courseMeta.forEach((c) => {
      metaMap[c.id] = {
        course_code: c.course_code || c.course_id,
        course_name: c.name || ""
      };
    });

    // 5. Assignments
    const assignmentArrays = await Promise.all(
      courseIds.map((id) => canvasGET(`/courses/${id}/assignments?per_page=100`))
    );
    const allAssignments = assignmentArrays.flat();

    // 6. November ONLY (performance fix)
    const novemberAssignments = allAssignments.filter((a) =>
      isDueInNovember(a.due_at)
    );

    const novemberEvents = novemberAssignments.map((a) => ({
      source: "assignment",
      type: "assignment",
      course_id: a.course_id,
      course_code: metaMap[a.course_id]?.course_code || null,
      course_name: metaMap[a.course_id]?.course_name || null,
      title: a.name,
      description: a.description,
      html_url: a.html_url,
      due_at: a.due_at,
      start_at: a.due_at,
      end_at: a.due_at,
      location: null,
      created_at: a.created_at
    }));

    const todoEvents = todo.map((t) => ({
      source: "todo",
      type: t.type || "assignment",
      course_id: t.course_id,
      course_code: metaMap[t.course_id]?.course_code || null,
      course_name: metaMap[t.course_id]?.course_name || null,
      title: t.assignment?.name || t.title,
      description: t.assignment?.description || "",
      html_url: t.assignment?.html_url || "",
      due_at: t.assignment?.due_at || null,
      start_at: null,
      end_at: null,
      location: null,
      created_at: t.assignment?.created_at || null
    }));

    const calendarEvents = calendar.map((ev) => {
      const cid = ev.context_code?.startsWith("course_")
        ? Number(ev.context_code.replace("course_", ""))
        : null;

      return {
        source: "calendar",
        type: "event",
        course_id: cid,
        course_code: metaMap[cid]?.course_code || null,
        course_name: metaMap[cid]?.course_name || null,
        title: ev.title,
        description: ev.description,
        html_url: ev.html_url,
        start_at: ev.start_at,
        end_at: ev.end_at,
        location: ev.location_name || null,
        created_at: ev.created_at,
        due_at: null
      };
    });

    // COMBINED EVENTS
    const combined = [...todoEvents, ...calendarEvents, ...novemberEvents];

    // **FILTER BEFORE GPT — FIX #2**
    const novemberOnly = combined.filter((e) => {
      const d = e.due_at || e.start_at;
      if (!d) return false;
      const dt = new Date(d);
      return dt.getUTCFullYear() === 2025 && dt.getUTCMonth() === 10;
    });

    // GPT
    const ai = await analyzeWithGPT(novemberOnly);

    return res.json({
      canvas_events: combined,
      ai_analysis: ai
    });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return res.status(500).json({ error: "Server failed in /api/full" });
  }
});

app.listen(7777, () =>
  console.log("✅ Backend running http://localhost:7777")
);
