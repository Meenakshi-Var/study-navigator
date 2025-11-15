import { useState } from "react";
import TaskCard, { Task } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete Chapter 5 Problems",
    course: "CS 101 - Data Structures",
    dueDate: "Dec 15, 2025",
    priority: "high",
    completed: false,
    type: "assignment",
  },
  {
    id: "2",
    title: "Midterm Preparation",
    course: "MATH 240 - Calculus II",
    dueDate: "Dec 18, 2025",
    priority: "high",
    completed: false,
    type: "exam",
  },
  {
    id: "3",
    title: "Read Chapters 8-10",
    course: "HIST 150 - World History",
    dueDate: "Dec 16, 2025",
    priority: "medium",
    completed: true,
    type: "reading",
  },
  {
    id: "4",
    title: "Research Paper Draft",
    course: "ENG 200 - Composition",
    dueDate: "Dec 20, 2025",
    priority: "medium",
    completed: false,
    type: "project",
  },
  {
    id: "5",
    title: "Lab Report Submission",
    course: "CHEM 150 - General Chemistry",
    dueDate: "Dec 17, 2025",
    priority: "low",
    completed: false,
    type: "assignment",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const stats = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground">
            {stats.active} active tasks, {stats.completed} completed
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass-card"
          />
        </div>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All ({stats.all})</TabsTrigger>
            <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
            <TabsTrigger value="completed">Done ({stats.completed})</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Task Groups */}
      <div className="space-y-6">
        {/* High Priority */}
        {filteredTasks.some(t => t.priority === "high") && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              High Priority
            </h2>
            <div className="grid gap-3">
              {filteredTasks
                .filter(t => t.priority === "high")
                .map(task => (
                  <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                ))}
            </div>
          </div>
        )}

        {/* Medium Priority */}
        {filteredTasks.some(t => t.priority === "medium") && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-warning" />
              Medium Priority
            </h2>
            <div className="grid gap-3">
              {filteredTasks
                .filter(t => t.priority === "medium")
                .map(task => (
                  <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                ))}
            </div>
          </div>
        )}

        {/* Low Priority */}
        {filteredTasks.some(t => t.priority === "low") && (
          <div>
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              Low Priority
            </h2>
            <div className="grid gap-3">
              {filteredTasks
                .filter(t => t.priority === "low")
                .map(task => (
                  <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                ))}
            </div>
          </div>
        )}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
