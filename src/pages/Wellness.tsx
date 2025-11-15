import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Wind, TrendingUp } from "lucide-react";

export default function Wellness() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { emoji: "😊", label: "Great", color: "success" },
    { emoji: "😌", label: "Good", color: "primary" },
    { emoji: "😐", label: "Okay", color: "warning" },
    { emoji: "😔", label: "Low", color: "destructive" },
    { emoji: "😰", label: "Stressed", color: "destructive" },
  ];

  const moodData = [
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 5 },
    { day: "Wed", mood: 3 },
    { day: "Thu", mood: 4 },
    { day: "Fri", mood: 5 },
    { day: "Sat", mood: 4 },
    { day: "Sun", mood: 3 },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Wellness Center 🧘</h1>
        <p className="text-muted-foreground">
          Take care of your mental health and track your well-being
        </p>
      </div>

      {/* Daily Mood Check-in */}
      <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">How are you feeling today?</h2>
          <p className="text-sm text-muted-foreground">
            Check in with yourself and track your mood
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {moods.map((mood, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(mood.label)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-2xl transition-all hover-lift
                ${selectedMood === mood.label 
                  ? 'glass-card ring-2 ring-primary shadow-glow' 
                  : 'glass-card opacity-70 hover:opacity-100'
                }
              `}
            >
              <span className="text-4xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div className="text-center animate-fade-in">
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              Save Check-in
            </Button>
          </div>
        )}
      </div>

      {/* Breathing Exercise */}
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Breathing Exercise</h2>
            <p className="text-sm text-muted-foreground">
              Take a moment to calm your mind
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
            <Wind className="w-8 h-8 text-accent" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 animate-pulse-glow" />
          <p className="text-lg font-medium mb-2">Breathe in... Hold... Breathe out...</p>
          <p className="text-sm text-muted-foreground">Follow the circle</p>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">Start Exercise</Button>
          <Button variant="outline" className="flex-1">Customize</Button>
        </div>
      </div>

      {/* Mood Tracker */}
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mood Trends</h2>
            <p className="text-sm text-muted-foreground">
              Your emotional patterns this week
            </p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end justify-between h-48 gap-2 px-4">
          {moodData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-40">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-primary to-accent transition-all hover:opacity-80"
                  style={{ height: `${data.mood * 20}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{data.day}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-muted/30 text-center">
          <p className="text-sm">
            <strong>Insight:</strong> Your mood has been mostly positive this week! 
            Keep up the good work maintaining balance. 💪
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-success/10 to-primary/10 border-success/20">
        <h3 className="font-bold mb-3">💡 Wellness Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span>🌅</span>
            <span>Take 5-minute breaks every hour during study sessions</span>
          </li>
          <li className="flex gap-2">
            <span>💧</span>
            <span>Stay hydrated - aim for 8 glasses of water daily</span>
          </li>
          <li className="flex gap-2">
            <span>😴</span>
            <span>Get 7-9 hours of sleep for optimal cognitive function</span>
          </li>
          <li className="flex gap-2">
            <span>🚶</span>
            <span>Move your body - even a short walk can boost your mood</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
