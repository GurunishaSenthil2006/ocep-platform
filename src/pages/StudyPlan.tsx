import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import TaskList from "@/components/TaskList";
import Loader from "@/components/Loader";
import { studyPlanApi } from "@/services/api";
import type { StudyTask } from "@/data/sampleData";

const StudyPlan = () => {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studyPlanApi.getTasks().then(t => { setTasks(t); setLoading(false); });
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Group by date
  const grouped = tasks.reduce<Record<string, StudyTask[]>>((acc, t) => {
    (acc[t.date] = acc[t.date] || []).push(t);
    return acc;
  }, {});

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" /> Study Plan
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Your daily study tasks organized by date</p>
      </div>

      {/* Stats bar */}
      <div className="flex gap-4">
        <div className="rounded-lg bg-success/10 px-4 py-2 text-sm">
          <span className="font-semibold text-success">{tasks.filter(t => t.completed).length}</span>
          <span className="text-muted-foreground ml-1">completed</span>
        </div>
        <div className="rounded-lg bg-warning/10 px-4 py-2 text-sm">
          <span className="font-semibold text-warning">{tasks.filter(t => !t.completed).length}</span>
          <span className="text-muted-foreground ml-1">pending</span>
        </div>
      </div>

      {/* Grouped by date */}
      <div className="space-y-6">
        {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([date, dateTasks]) => (
          <div key={date} className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2">
              {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </h3>
            <TaskList tasks={dateTasks} onToggle={toggleTask} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlan;
