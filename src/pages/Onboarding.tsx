import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Upload, BookOpen, Clock } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Welcome to StudyPilot! 🎓</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your AI-powered study companion. Let's set up your account in just a few steps.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Connect Canvas</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Import your courses automatically from Canvas LMS
            </p>
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <Input placeholder="Canvas URL (e.g., university.instructure.com)" />
              <Input type="password" placeholder="API Token" />
              <Button className="w-full">Connect Canvas</Button>
              <Button variant="ghost" className="w-full">Skip for now</Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Syllabi</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Drop your course syllabi to extract assignments and deadlines
            </p>
            <div className="glass-card p-12 rounded-2xl border-2 border-dashed border-border text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here or click to browse
              </p>
              <Button>Choose Files</Button>
            </div>
            <Button variant="ghost" className="w-full mt-4">Skip for now</Button>
          </div>
        );

      case 4:
        return (
          <div className="animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-success/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">Study Preferences</h2>
            <p className="text-muted-foreground mb-6 text-center">
              Help us personalize your study schedule
            </p>
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Study Time</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Morning</Button>
                  <Button variant="outline">Afternoon</Button>
                  <Button variant="outline">Evening</Button>
                  <Button variant="outline">Night</Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Study Session Length</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">25 min</Button>
                  <Button variant="outline">50 min</Button>
                  <Button variant="outline">90 min</Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Weekly Study Goal</label>
                <Input type="number" placeholder="Hours per week" defaultValue="25" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <Progress value={(step / totalSteps) * 100} className="h-2" />
        </div>

        {/* Content */}
        <div className="glass-card p-8 rounded-3xl mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            onClick={nextStep}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
          >
            {step === totalSteps ? "Get Started" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
