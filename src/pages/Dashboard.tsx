import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import TaskCard, { Task } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, CheckCircle2, BookOpen, Plus, Sparkles } from "lucide-react";
import { DashboardData } from "@/types/dashboard";
import { dashboardMock } from "@/mock/dashboardMock";

function mapDashboardTask(task: DashboardData['high_priority_tasks'][number], priority: 'high' | 'medium' | 'low'): TaskCard.Task {
  return {
    id: task.course_code + '-' + task.title, // unique ID
    title: task.title,
    course: task.course_code,
    dueDate: task.due_at_or_start,
    priority,
    completed: false,
    type: task.type
  };
}


export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Simulating AI response loading
    setTimeout(() => {
      setData(dashboardMock);
    }, 300);
  }, []);


  const [tasks, setTasks] = useState<Task[]>([]);

  // Add this right here:
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  useEffect(() => {
  if (data) {
    const mappedTasks = [
      ...data.high_priority_tasks.map(task => mapDashboardTask(task, 'high')),
      ...data.medium_priority_tasks.map(task => mapDashboardTask(task, 'medium')),
      ...data.low_priority_tasks.map(task => mapDashboardTask(task, 'low'))
    ];
    setTasks(mappedTasks);
  }
}, [data]);



  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Good morning, Meenakshi! ☀️</h1>
          <p className="text-muted-foreground">
            You have 3 tasks due this week. Let's make today productive!
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Study Hours Today"
          value="4.5h"
          icon={Clock}
          trend={{ value: "+15%", positive: true }}
        />
        <StatCard
          title="Tasks Completed"
          value="12/15"
          icon={CheckCircle2}
          trend={{ value: "80%", positive: true }}
        />
        <StatCard
          title="Current Streak"
          value="7 days"
          icon={TrendingUp}
          trend={{ value: "+2 days", positive: true }}
        />
        <StatCard
          title="Active Courses"
          value="5"
          icon={BookOpen}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Today's Schedule</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>

          {/* Timeline */}
          <div className="glass-card p-6 rounded-2xl space-y-4">
            {[
              { time: "9:00 AM", title: "CS 101 Lecture", type: "class", color: "primary" },
              { time: "11:00 AM", title: "Study: Calculus", type: "study", color: "accent" },
              { time: "2:00 PM", title: "Group Project Meeting", type: "meeting", color: "success" },
              { time: "4:00 PM", title: "Math Lab Session", type: "class", color: "warning" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-sm font-medium text-muted-foreground min-w-20">
                  {item.time}
                </div>
                <div className={`w-1 h-14 rounded-full bg-${item.color}`} />
                <div className="flex-1 glass-card p-3 rounded-xl">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* High Priority Tasks */}
          <div>
            <h2 className="text-2xl font-bold mb-4">High Priority</h2>
            <div className="space-y-3">
              {tasks.filter(t => t.priority === "high").map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask}
                />
              ))}
            </div>
          </div>

          {/* AI Suggestion Card */}
          <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Study Suggestion</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your schedule, we recommend studying Calculus for 2 hours today to stay on track for your midterm.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Study Plan
            </Button>
          </div>

          {/* Wellness Check */}
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-semibold mb-3">Daily Wellness</h3>
            <p className="text-sm text-muted-foreground mb-4">How are you feeling today?</p>
            <div className="flex gap-2">
              {["😊", "😐", "😔", "😰", "🥱"].map((emoji, i) => (
                <button
                  key={i}
                  className="w-12 h-12 rounded-xl glass-card hover:bg-muted transition-all text-2xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
