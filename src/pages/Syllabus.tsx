import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Syllabus() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock file upload
    setUploadedFiles([...uploadedFiles, "CS 101 Syllabus.pdf"]);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Syllabus Upload</h1>
        <p className="text-muted-foreground">
          Upload course syllabi for AI-powered task extraction and scheduling
        </p>
      </div>

      {/* Upload Zone */}
      <div
        className={cn(
          "glass-card rounded-2xl border-2 border-dashed transition-all",
          isDragging ? "border-primary bg-primary/5" : "border-border"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Upload className="w-10 h-10 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Drop your syllabus here</h3>
          <p className="text-muted-foreground mb-6">
            or click to browse files (PDF, DOCX, or image)
          </p>
          
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Upload className="w-4 h-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Processing</h2>
          
          {uploadedFiles.map((file, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl animate-scale-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{file}</p>
                  <p className="text-sm text-muted-foreground">Analyzing with AI...</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-success animate-pulse" />
              </div>

              {/* Preview Table */}
              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Extracted Assignments
                </h4>
                
                <div className="space-y-2">
                  {[
                    { title: "Homework 1: Arrays & Linked Lists", due: "Dec 15, 2025", weight: "10%" },
                    { title: "Midterm Exam", due: "Dec 18, 2025", weight: "30%" },
                    { title: "Final Project", due: "Jan 15, 2026", weight: "40%" },
                  ].map((item, j) => (
                    <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Due: {item.due}</p>
                      </div>
                      <span className="text-sm font-semibold text-primary">{item.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1">Add to Calendar</Button>
                <Button variant="outline" className="flex-1">Edit Details</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h3 className="font-bold mb-3">How it works</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">1.</span>
            <span>Upload your course syllabus (PDF, Word, or image)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">2.</span>
            <span>AI extracts all assignments, exams, and deadlines</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">3.</span>
            <span>Review and edit the extracted information</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">4.</span>
            <span>Tasks are automatically added to your calendar and study plan</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
