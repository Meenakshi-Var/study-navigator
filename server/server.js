import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const CANVAS = "https://osu.instructure.com/api/v1";
const TOKEN = process.env.CANVAS_TOKEN;

// Native fetch works in Node 18+
async function canvasGET(path) {
  const res = await fetch(`${CANVAS}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  return await res.json();
}

async function getAllCourseIds() {
  const enrollments = await canvasGET("/users/self/enrollments?per_page=100");
  return enrollments.map((e) => e.course_id);
}

app.get("/api/canvas", async (req, res) => {
  try {
    const courseIds = await getAllCourseIds();

    const todo = await canvasGET("/users/self/todo?per_page=100");

    const calendarPromises = courseIds.map((id) =>
      canvasGET(
        `/calendar_events?all_events=true&per_page=100&context_codes[]=course_${id}`
      )
    );
    const calendarArrays = await Promise.all(calendarPromises);
    const calendar = calendarArrays.flat();

    const courseMetaPromises = courseIds.map((id) =>
      canvasGET(`/courses/${id}`)
    );
    const courseMeta = await Promise.all(courseMetaPromises);

    const metaMap = {};
    courseMeta.forEach((m) => {
      metaMap[m.id] = {
        course_code: m.course_code || m.course_id,
        course_name: m.name || "",
      };
    });

    const todoEvents = todo.map((item) => ({
      source: "todo",
      type: item.type || "assignment",
      course_id: item.course_id || null,
      course_code: metaMap[item.course_id]?.course_code || null,
      course_name: metaMap[item.course_id]?.course_name || null,
      title: item.assignment?.name || item.title || "",
      description: item.assignment?.description || "",
      html_url: item.assignment?.html_url || "",
      due_at: item.assignment?.due_at || null,
      start_at: null,
      end_at: null,
      location: null,
      created_at: item.assignment?.created_at || null,
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
        title: ev.title || "",
        description: ev.description || "",
        html_url: ev.html_url || "",
        due_at: null,
        start_at: ev.start_at || null,
        end_at: ev.end_at || null,
        location: ev.location_name || null,
        created_at: ev.created_at || null,
      };
    });

    const finalCombined = [...todoEvents, ...calendarEvents];

    res.json({ events: finalCombined });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server failed" });
  }
});

app.listen(7777, () =>
  console.log("Backend running on http://localhost:7777")
);
