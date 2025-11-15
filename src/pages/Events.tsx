import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Calendar as CalendarIcon } from "lucide-react";

export default function Events() {
  const events = [
    {
      id: 1,
      title: "Chess Club Meeting",
      type: "club",
      date: "Dec 16, 2025",
      time: "6:00 PM",
      location: "Student Center, Room 201",
      recurring: "Weekly",
    },
    {
      id: 2,
      title: "Basketball Practice",
      type: "personal",
      date: "Dec 15, 2025",
      time: "4:00 PM",
      location: "Sports Complex",
      recurring: "Mon, Wed, Fri",
    },
    {
      id: 3,
      title: "Hackathon 2025",
      type: "club",
      date: "Dec 20-22, 2025",
      time: "All Day",
      location: "Engineering Building",
      recurring: "One-time",
    },
    {
      id: 4,
      title: "Study Group",
      type: "personal",
      date: "Dec 17, 2025",
      time: "2:00 PM",
      location: "Library, Room 305",
      recurring: "Weekly",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Custom Events</h1>
          <p className="text-muted-foreground">
            Manage club activities, personal events, and reminders
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-24 glass-card hover-lift justify-start p-6">
          <div className="text-left">
            <Users className="w-8 h-8 mb-2 text-primary" />
            <p className="font-semibold">Club Event</p>
            <p className="text-xs text-muted-foreground">Add organization activity</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-24 glass-card hover-lift justify-start p-6">
          <div className="text-left">
            <CalendarIcon className="w-8 h-8 mb-2 text-accent" />
            <p className="font-semibold">Personal Event</p>
            <p className="text-xs text-muted-foreground">Add personal activity</p>
          </div>
        </Button>
        
        <Button variant="outline" className="h-24 glass-card hover-lift justify-start p-6">
          <div className="text-left">
            <span className="text-3xl mb-2 block">⏰</span>
            <p className="font-semibold">Reminder</p>
            <p className="text-xs text-muted-foreground">Set a notification</p>
          </div>
        </Button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event.id} className="glass-card p-6 rounded-2xl hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <Badge
                      variant="outline"
                      className={
                        event.type === "club"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-accent/10 text-accent border-accent/20"
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {event.date} at {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-4 h-4 flex items-center justify-center">📍</span>
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-4 h-4 flex items-center justify-center">🔁</span>
                      {event.recurring}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
