import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export default function CalendarView() {
  const [currentDate] = useState(new Date(2025, 11, 15)); // Dec 15, 2025
  const [view, setView] = useState<"week" | "month">("week");

  const events = [
    { id: 1, title: "CS 101 Lecture", date: 15, time: "9:00 AM", color: "primary" },
    { id: 2, title: "Math Midterm", date: 18, time: "2:00 PM", color: "accent" },
    { id: 3, title: "Study Group", date: 16, time: "4:00 PM", color: "success" },
    { id: 4, title: "Lab Session", date: 17, time: "11:00 AM", color: "warning" },
  ];

  const renderWeekView = () => {
    const weekDays = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, i) => {
          const dayEvents = events.filter(e => e.date === day.getDate());
          const isToday = day.getDate() === currentDate.getDate();

          return (
            <div
              key={i}
              className={cn(
                "glass-card p-4 rounded-2xl min-h-[200px]",
                isToday && "ring-2 ring-primary"
              )}
            >
              <div className="text-center mb-3">
                <p className="text-xs text-muted-foreground">{daysOfWeek[i]}</p>
                <p className={cn(
                  "text-2xl font-bold",
                  isToday && "text-primary"
                )}>
                  {day.getDate()}
                </p>
              </div>

              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "p-2 rounded-lg text-xs font-medium cursor-pointer hover-lift",
                      `bg-${event.color}/10 text-${event.color}`
                    )}
                  >
                    <p className="font-semibold truncate">{event.title}</p>
                    <p className="text-xs opacity-75">{event.time}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(e => e.date === day);
      const isToday = day === currentDate.getDate();

      days.push(
        <div
          key={day}
          className={cn(
            "glass-card p-3 rounded-xl min-h-[100px] hover-lift cursor-pointer",
            isToday && "ring-2 ring-primary"
          )}
        >
          <p className={cn(
            "text-sm font-bold mb-2",
            isToday && "text-primary"
          )}>
            {day}
          </p>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <Badge
                key={event.id}
                variant="outline"
                className={cn(
                  "text-xs w-full justify-start",
                  `bg-${event.color}/10 border-${event.color}/20`
                )}
              >
                {event.title}
              </Badge>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
            {day}
          </div>
        ))}
        {days}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === "week" ? "default" : "outline"}
            onClick={() => setView("week")}
          >
            Week
          </Button>
          <Button
            variant={view === "month" ? "default" : "outline"}
            onClick={() => setView("month")}
          >
            Month
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar */}
      {view === "week" ? renderWeekView() : renderMonthView()}
    </div>
  );
}
