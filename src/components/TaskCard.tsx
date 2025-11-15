import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  type: "assignment" | "exam" | "reading" | "project";
}

interface TaskCardProps {
  task: Task;
  onToggle?: (id: string) => void;
  onClick?: (task: Task) => void;
}

const priorityColors = {
  low: "bg-success/10 text-success border-success/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const typeColors = {
  assignment: "bg-primary/10 text-primary",
  exam: "bg-accent/10 text-accent",
  reading: "bg-muted text-muted-foreground",
  project: "bg-success/10 text-success",
};

export default function TaskCard({ task, onToggle, onClick }: TaskCardProps) {
  return (
    <div 
      className={cn(
        "glass-card p-4 rounded-xl hover-lift cursor-pointer transition-all",
        task.completed && "opacity-60"
      )}
      onClick={() => onClick?.(task)}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle?.(task.id)}
          onClick={(e) => e.stopPropagation()}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={typeColors[task.type]}>
              {task.type}
            </Badge>
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
          </div>
          
          <h3 className={cn(
            "font-semibold mb-1",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3">{task.course}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{task.dueDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Due in 2 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
