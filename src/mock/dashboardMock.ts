import { DashboardData } from "@/types/dashboard";

export const dashboardMock: DashboardData = {
  enhanced_calendar: {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
  },

  high_priority_tasks: [
    {
      title: "English Midterm Exam",
      course_code: "ENG 2100",
      type: "exam",
      due_at_or_start: "2025-11-15T09:00:00",
      urgency_score: 97
    }
  ],

  medium_priority_tasks: [
    {
      title: "Java Project Milestone",
      course_code: "CSE 1223",
      type: "assignment",
      due_at_or_start: "2025-11-16T23:59:00",
      urgency_score: 60
    }
  ],

  low_priority_tasks: [
    {
      title: "History Reading",
      course_code: "HIST 2220",
      type: "reading",
      due_at_or_start: "2025-11-20T23:59:00",
      urgency_score: 20
    }
  ],

  upcoming_exams: [
    {
      title: "Calculus II Midterm",
      course_code: "MATH 241",
      type: "exam",
      due_at_or_start: "2025-11-18T14:00:00",
      urgency_score: 88
    }
  ],

  quick_stats: {
    study_hours_today: 3,
    study_hours_this_week: 9,
    total_tasks_due: 5,
    total_exams: 2,
    tasks_due_this_week: 4,
    recommended_study_hours_today: 4,
    recommended_study_hours_this_week: 12,
    task_completion_rate: 0.65,
    current_streak_days: 4
  },

  today_schedule: [
    {
      time: "9:00 AM",
      title: "English Midterm Exam",
      course_code: "ENG 2100",
      type: "exam",
      priority: "high",
      duration_hours: 2
    },
    {
      time: "1:00 PM",
      title: "Java Study Session",
      course_code: "CSE 1223",
      type: "study",
      priority: "medium",
      duration_hours: 1.5
    }
  ],

  tasks_today: {
    high: [
      {
        title: "Study for English Exam",
        course_code: "ENG 2100",
        type: "exam",
        due_at_or_start: "2025-11-15T09:00:00",
        urgency_score: 97
      }
    ],
    medium: [],
    low: []
  },

  weekly_calendar: {
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: []
  },

  grouped_by_course: {
    "ENG 2100": [
      {
        title: "Essay Draft",
        course_code: "ENG 2100",
        type: "assignment",
        due_at_or_start: "2025-11-21T23:59:00",
        urgency_score: 40
      }
    ]
  },

  weekly_study_plan: {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  },

  ranked_deadlines: [
    {
      title: "English Midterm Exam",
      course_code: "ENG 2100",
      type: "exam",
      due_at_or_start: "2025-11-15T09:00:00",
      urgency_score: 97
    }
  ],

  daily_todo: {
    today: [
      {
        title: "Review Java Collections",
        course_code: "CSE 1223",
        recommended_action: "Study key methods + complete 2 example problems",
        estimated_time_hours: 1
      }
    ],
    next_7_days: []
  },

  workload_balance_score: 72
};
