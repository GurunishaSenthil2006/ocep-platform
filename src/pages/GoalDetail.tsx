import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Target, Calendar, Clock } from "lucide-react";
import Loader from "@/components/Loader";
import { goalsApi } from "@/services/api";
import type { Goal } from "@/data/sampleData";

const GoalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) goalsApi.getById(id).then(g => { setGoal(g || null); setLoading(false); });
  }, [id]);

  if (loading) return <Loader />;
  if (!goal) return <div className="text-center py-12 text-muted-foreground">Goal not found</div>;

  const statusStyles = { active: "bg-primary/10 text-primary", completed: "bg-success/10 text-success", paused: "bg-warning/10 text-warning" };

  return (
    <div className="space-y-6 max-w-2xl">
      <button onClick={() => navigate("/goals")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Goals
      </button>

      <div className="rounded-xl border border-border bg-card p-8 card-shadow-lg space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3"><Target className="h-6 w-6 text-primary" /></div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{goal.title}</h1>
              <span className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[goal.status]}`}>{goal.status}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{goal.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-medium text-card-foreground">{goal.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="text-sm font-medium text-card-foreground">{goal.startDate}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold text-card-foreground">{goal.progress}%</span>
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${goal.progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
