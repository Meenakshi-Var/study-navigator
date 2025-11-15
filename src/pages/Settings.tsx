import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Bell, Link as LinkIcon, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 ring-4 ring-primary/20">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">Alex Johnson</h2>
            <p className="text-muted-foreground">alex.johnson@university.edu</p>
            <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
              Pro Plan
            </Badge>
          </div>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>

      {/* Study Preferences */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Study Preferences</h3>
            <p className="text-sm text-muted-foreground">Customize your study experience</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <p className="font-medium">Study Session Length</p>
              <p className="text-sm text-muted-foreground">Default duration for study blocks</p>
            </div>
            <Button variant="outline" size="sm">50 min</Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <p className="font-medium">Break Duration</p>
              <p className="text-sm text-muted-foreground">Time between study sessions</p>
            </div>
            <Button variant="outline" size="sm">10 min</Button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <p className="font-medium">Weekly Study Goal</p>
              <p className="text-sm text-muted-foreground">Target hours per week</p>
            </div>
            <Button variant="outline" size="sm">25 hours</Button>
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Integrations</h3>
            <p className="text-sm text-muted-foreground">Connect your accounts</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <p className="font-medium">Canvas LMS</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success">
              Active
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <p className="font-medium">Google Calendar</p>
                <p className="text-sm text-muted-foreground">Sync your schedule</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Connect</Button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
            <Bell className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Notifications</h3>
            <p className="text-sm text-muted-foreground">Manage how you receive alerts</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Task Reminders", desc: "Get notified about upcoming deadlines", enabled: true },
            { label: "Study Session Alerts", desc: "Reminders to start scheduled sessions", enabled: true },
            { label: "Wellness Check-ins", desc: "Daily mood tracking reminders", enabled: false },
            { label: "Achievement Updates", desc: "Celebrate your milestones", enabled: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.enabled} />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Palette className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Appearance</h3>
            <p className="text-sm text-muted-foreground">Customize the look and feel</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle dark theme</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <p className="font-medium">Compact View</p>
              <p className="text-sm text-muted-foreground">Show more content on screen</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}
