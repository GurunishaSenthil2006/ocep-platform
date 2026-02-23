import { useEffect, useState } from "react";
import { Plus, Target } from "lucide-react";
import GoalCard from "@/components/GoalCard";
import Loader from "@/components/Loader";
import { goalsApi } from "@/services/api";
import type { Goal } from "@/data/sampleData";

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", duration: "", startDate: "" });

  useEffect(() => {
    goalsApi.getAll().then(g => { setGoals(g); setLoading(false); });
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.duration || !form.startDate) return;
    const newGoal = await goalsApi.create(form);
    setGoals(prev => [newGoal, ...prev]);
    setForm({ title: "", description: "", duration: "", startDate: "" });
    setShowForm(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" /> Goal Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Create and track your learning goals</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> New Goal
        </button>
      </div>

      {/* Create Goal Form */}
      {showForm && (
        <form onSubmit={handleCreate} className="rounded-xl border border-border bg-card p-6 card-shadow space-y-4">
          <h3 className="text-sm font-semibold text-card-foreground">Create New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Goal Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. Master Data Structures" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Duration</label>
              <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="e.g. 3 months" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Start Date</label>
              <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })}
                className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Brief description of your goal" />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Create Goal
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(goal => <GoalCard key={goal.id} goal={goal} />)}
      </div>
    </div>
  );
};

export default Goals;
