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
// SAFE CANVAS GET (NO HANGS)
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
  return d.getFullYear() === 2025 && d.getMonth() === 10;
}

async function getAllCourseIds() {
  const enrollments = await canvasGET("/users/self/enrollments?per_page=100");
  return enrollments.map((e) => e.course_id);
}

function generatePrompt(events) {
  const str = JSON.stringify(events, null, 2);

  return `
Return ONLY valid JSON. No markdown.

Analyze this student's Canvas events:

${str}

Return a JSON object matching this structure exactly:

{
  "enhanced_calendar": [],
  "high_priority_tasks": [],
  "medium_priority_tasks": [],
  "low_priority_tasks": [],
  "upcoming_exams": [],
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
  "today_schedule": [],
  "tasks_today": { "high": [], "medium": [], "low": [] },
  "weekly_calendar": {},
  "grouped_by_course": {},
  "weekly_study_plan": {},
  "ranked_deadlines": [],
  "daily_todo": { "today": [], "next_7_days": [] },
  "workload_balance_score": 0
}
`;
}


// ----------------------
// GPT FUNCTION
// ----------------------
async function analyzeWithGPT(events) {
  const prompt = generatePrompt(events);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",   // FAST + SAFE
    messages: [{ role: "user", content: prompt }]
  });

  const raw = completion.choices[0].message.content;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("❌ AI returned invalid JSON:\n", raw);
    return { error: "Invalid JSON from AI", raw };
  }
}


// ----------------------
// MAIN ROUTE: /api/full
// ----------------------
app.get("/api/full", async (req, res) => {
  try {
    console.log("\n===== /api/full START =====");

    // 1. Load Courses
    const courseIds = await getAllCourseIds();
    console.log("Courses:", courseIds.length);

    // 2. To-Do
    const todo = await canvasGET("/users/self/todo?per_page=100");
    console.log("TODO items:", todo.length);

    // 3. Calendar events
    const calendarArrays = await Promise.all(
      courseIds.map((id) =>
        canvasGET(`/calendar_events?all_events=true&per_page=100&context_codes[]=course_${id}`)
      )
    );
    const calendar = calendarArrays.flat();
    console.log("Calendar events:", calendar.length);

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
    console.log("Assignments:", allAssignments.length);

    // November filter
    const novemberAssignments = allAssignments.filter((a) =>
      isDueInNovember(a.due_at)
    );

    // Normalize November assignments
    const novemberEvents = novemberAssignments.map((a) => ({
      source: "assignment",
      type: "assignment",
      course_id: a.course_id,
      course_code: metaMap[a.course_id]?.course_code || null,
      course_name: metaMap[a.course_id]?.course_name || null,
      title: a.name || "",
      description: a.description || "",
      html_url: a.html_url || "",
      due_at: a.due_at,
      start_at: a.due_at,
      end_at: a.due_at,
      location: null,
      created_at: a.created_at
    }));

    // Normalize TODO
    const todoEvents = todo.map((t) => ({
      source: "todo",
      type: t.type || "assignment",
      course_id: t.course_id,
      course_code: metaMap[t.course_id]?.course_code || null,
      course_name: metaMap[t.course_id]?.course_name || null,
      title: t.assignment?.name || t.title || "",
      description: t.assignment?.description || "",
      html_url: t.assignment?.html_url || "",
      due_at: t.assignment?.due_at || null,
      start_at: null,
      end_at: null,
      location: null,
      created_at: t.assignment?.created_at || null
    }));

    // Normalize calendar
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

    // Combine everything
    const combined = [...todoEvents, ...calendarEvents, ...novemberEvents];

    console.log("Total combined:", combined.length);

    // Ask GPT
    const ai = await analyzeWithGPT(combined);

    return res.json({
      canvas_events: combined,
      ai_analysis: ai
    });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return res.status(500).json({ error: "Server failed in /api/full" });
  }
});


// ----------------------
app.listen(7777, () =>
  console.log("✅ Backend running http://localhost:7777")
);
