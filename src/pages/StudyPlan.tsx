import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, Settings, TrendingUp } from "lucide-react";

export default function StudyPlan() {
  const studyPlan = [
    {
      day: "Monday",
      date: "Dec 15",
      sessions: [
        { time: "9:00 AM - 11:00 AM", subject: "Calculus II", topic: "Integration Techniques", priority: "high" },
        { time: "2:00 PM - 3:30 PM", subject: "Data Structures", topic: "Binary Trees", priority: "high" },
        { time: "7:00 PM - 8:00 PM", subject: "World History", topic: "Chapter Review", priority: "medium" },
      ],
    },
    {
      day: "Tuesday",
      date: "Dec 16",
      sessions: [
        { time: "10:00 AM - 12:00 PM", subject: "Chemistry", topic: "Lab Report Writing", priority: "medium" },
        { time: "3:00 PM - 5:00 PM", subject: "Calculus II", topic: "Practice Problems", priority: "high" },
      ],
    },
    {
      day: "Wednesday",
      date: "Dec 17",
      sessions: [
        { time: "9:00 AM - 11:00 AM", subject: "Data Structures", topic: "Graph Algorithms", priority: "high" },
        { time: "1:00 PM - 2:30 PM", subject: "English Composition", topic: "Essay Drafting", priority: "medium" },
        { time: "6:00 PM - 7:30 PM", subject: "Midterm Review", topic: "All Subjects", priority: "high" },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
      {/* Header */}
      <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">AI Study Plan</h1>
              <p className="text-muted-foreground">
                Personalized study schedule optimized for your exams and deadlines
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Adjust
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </Button>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Weekly Focus</span>
            </div>
            <p className="text-2xl font-bold">18 hours</p>
            <p className="text-xs text-muted-foreground">Distributed across 5 courses</p>
          </div>
          
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Priority Exams</span>
            </div>
            <p className="text-2xl font-bold">2 upcoming</p>
            <p className="text-xs text-muted-foreground">Calculus & Data Structures</p>
          </div>
          
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Optimization</span>
            </div>
            <p className="text-2xl font-bold">85%</p>
            <p className="text-xs text-muted-foreground">Schedule efficiency score</p>
          </div>
        </div>
      </div>

      {/* Study Plan Timeline */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">This Week's Schedule</h2>
        
        {studyPlan.map((day, dayIndex) => (
          <div key={dayIndex} className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{day.day}</h3>
                <p className="text-sm text-muted-foreground">{day.date}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {day.sessions.length} sessions
              </Badge>
            </div>

            <div className="space-y-3">
              {day.sessions.map((session, sessionIndex) => (
                <div
                  key={sessionIndex}
                  className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="text-sm font-medium text-muted-foreground min-w-[140px]">
                    {session.time}
                  </div>
                  
                  <div className={`w-1 rounded-full ${
                    session.priority === "high" ? "bg-destructive" : 
                    session.priority === "medium" ? "bg-warning" : "bg-success"
                  }`} />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{session.subject}</p>
                      <Badge
                        variant="outline"
                        className={
                          session.priority === "high"
                            ? "bg-destructive/10 text-destructive border-destructive/20"
                            : session.priority === "medium"
                            ? "bg-warning/10 text-warning border-warning/20"
                            : "bg-success/10 text-success border-success/20"
                        }
                      >
                        {session.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{session.topic}</p>
                  </div>

                  <Button variant="ghost" size="sm">
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          AI Recommendations
        </h3>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <span className="text-accent">•</span>
            <p className="text-sm">
              <strong>Calculus Midterm</strong> is in 3 days (30% of final grade). 
              Increase study time to 3 hours daily for optimal preparation.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-accent">•</span>
            <p className="text-sm">
              Consider studying <strong>Data Structures</strong> in the morning when your focus is highest.
            </p>
          </li>
          <li className="flex gap-3">
            <span className="text-accent">•</span>
            <p className="text-sm">
              Take a <strong>15-minute break</strong> between sessions to improve retention by 25%.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
