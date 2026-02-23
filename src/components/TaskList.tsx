import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { StudyTask } from "@/data/sampleData";

const priorityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

interface TaskListProps {
  tasks: StudyTask[];
  onToggle?: (id: string) => void;
}

const TaskList = ({ tasks, onToggle }: TaskListProps) => (
  <div className="space-y-2">
    {tasks.map(task => (
      <div
        key={task.id}
        onClick={() => onToggle?.(task.id)}
        className={`flex items-center gap-3 rounded-lg border border-border p-3.5 cursor-pointer transition-all hover:card-shadow ${
          task.completed ? "bg-muted/50" : "bg-card"
        }`}
      >
        {task.completed ? (
          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-card-foreground"}`}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{task.duration}</span>
          </div>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    ))}
  </div>
);

export default TaskList;
