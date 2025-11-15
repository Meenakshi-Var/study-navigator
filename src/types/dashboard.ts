// ============================
// Dashboard Data Type Definitions
// ============================

export interface TimeBlock {
  time: string;
  title: string;
  course_code: string;
  type: "class" | "study" | "meeting" | "exam" | "assignment";
  priority: "high" | "medium" | "low";
  duration_hours: number;
}

export interface Task {
  title: string;
  course_code: string;
  type: "assignment" | "exam" | "event" | "reading" | string;
  due_at_or_start: string;
  urgency_score: number;
}

export interface RankedDeadline {
  title: string;
  course_code: string;
  type: "assignment" | "exam" | "event";
  due_at_or_start: string;
  urgency_score: number;
}

export interface DailyTodoItem {
  title: string;
  course_code: string;
  recommended_action: string;
  estimated_time_hours: number;
}

export interface DailyTodo {
  today: DailyTodoItem[];
  next_7_days: {
    date: string;
    tasks: DailyTodoItem[];
  }[];
}

export interface WeeklyStudySession {
  start_time: string;
  end_time: string;
  course: string;
  topic: string;
  priority: "high" | "medium" | "low";
  session_type: "study" | "review" | "assignment" | "exam prep";
}

export interface WeeklyStudyPlan {
  Monday: WeeklyStudySession[];
  Tuesday: WeeklyStudySession[];
  Wednesday: WeeklyStudySession[];
  Thursday: WeeklyStudySession[];
  Friday: WeeklyStudySession[];
  Saturday: WeeklyStudySession[];
  Sunday: WeeklyStudySession[];
}

export interface QuickStats {
  study_hours_today: number;
  study_hours_this_week: number;
  total_tasks_due: number;
  total_exams: number;
  tasks_due_this_week: number;
  recommended_study_hours_today: number;
  recommended_study_hours_this_week: number;
  task_completion_rate: number;
  current_streak_days: number;
}

export interface WeeklyCalendar {
  Sunday: TimeBlock[];
  Monday: TimeBlock[];
  Tuesday: TimeBlock[];
  Wednesday: TimeBlock[];
  Thursday: TimeBlock[];
  Friday: TimeBlock[];
  Saturday: TimeBlock[];
}

export interface GroupedCourseTasks {
  [course_code: string]: Task[];
}

export interface DashboardData {
  enhanced_calendar: WeeklyCalendar;

  high_priority_tasks: Task[];
  medium_priority_tasks: Task[];
  low_priority_tasks: Task[];

  upcoming_exams: Task[];

  quick_stats: QuickStats;

  today_schedule: TimeBlock[];

  tasks_today: {
    high: Task[];
    medium: Task[];
    low: Task[];
  };

  weekly_calendar: WeeklyCalendar;

  grouped_by_course: GroupedCourseTasks;

  weekly_study_plan: WeeklyStudyPlan;

  ranked_deadlines: RankedDeadline[];

  daily_todo: DailyTodo;

  workload_balance_score: number;
}