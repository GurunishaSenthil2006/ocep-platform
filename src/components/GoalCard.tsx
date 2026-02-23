import { Target, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Goal } from "@/data/sampleData";

const statusStyles = {
  active: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  paused: "bg-warning/10 text-warning",
};

const GoalCard = ({ goal }: { goal: Goal }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/goals/${goal.id}`)}
      className="group cursor-pointer rounded-xl border border-border bg-card p-5 card-shadow transition-all hover:card-shadow-hover"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{goal.title}</h3>
            <p className="text-xs text-muted-foreground">{goal.duration} · Started {goal.startDate}</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[goal.status]}`}>
          {goal.status}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{goal.description}</p>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-card-foreground">{goal.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
      </div>
      <div className="mt-3 flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        View details <ChevronRight className="h-3 w-3 ml-1" />
      </div>
    </div>
  );
};

export default GoalCard;
