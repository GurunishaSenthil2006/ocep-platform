import { useEffect, useState } from "react";
import { Target, CheckCircle2, TrendingUp, AlertTriangle, Flame, BookOpen } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import GoalCard from "@/components/GoalCard";
import TaskList from "@/components/TaskList";
import Loader from "@/components/Loader";
import { goalsApi, studyPlanApi } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import type { Goal, StudyTask } from "@/data/sampleData";

const Dashboard = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([goalsApi.getAll(), studyPlanApi.getTasks()]).then(([g, t]) => {
      setGoals(g);
      setTasks(t);
      setLoading(false);
    });
  }, []);

  const todayTasks = tasks.filter(t => t.date === "2026-02-22");
  const completedToday = todayTasks.filter(t => t.completed).length;
  const activeGoals = goals.filter(g => g.status === "active");

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's your learning overview for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Active Goals" value={activeGoals.length} icon={Target} variant="default" subtitle={`${goals.filter(g => g.status === "completed").length} completed`} />
        <StatsCard title="Today's Tasks" value={`${completedToday}/${todayTasks.length}`} icon={CheckCircle2} variant="success" subtitle="tasks completed" />
        <StatsCard title="Consistency Score" value="82%" icon={TrendingUp} variant="info" subtitle="+5% from last week" />
        <StatsCard title="Burnout Risk" value="Low" icon={Flame} variant="warning" subtitle="45% risk level" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Today's Study Plan
            </h2>
            <span className="text-xs text-muted-foreground">Feb 22, 2026</span>
          </div>
          <TaskList tasks={todayTasks} onToggle={toggleTask} />
        </div>

        {/* Active Goals Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" /> Active Goals
          </h2>
          <div className="space-y-3">
            {activeGoals.slice(0, 3).map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
