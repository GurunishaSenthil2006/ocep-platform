import { useEffect, useState } from "react";
import { TrendingUp, Plus } from "lucide-react";
import Loader from "@/components/Loader";
import { progressApi } from "@/services/api";
import type { ProgressEntry } from "@/data/sampleData";

const ProgressTracking = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ problemsCompleted: 0, timeSpent: 0, completed: false, goalId: "1" });

  useEffect(() => {
    progressApi.getAll().then(e => { setEntries(e); setLoading(false); });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = await progressApi.create({ ...form, date: new Date().toISOString().split("T")[0] });
    setEntries(prev => [newEntry, ...prev]);
    setShowForm(false);
    setForm({ problemsCompleted: 0, timeSpent: 0, completed: false, goalId: "1" });
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" /> Progress Tracking
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Log your daily study progress</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Log Progress
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 card-shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Problems Completed</label>
              <input type="number" min={0} value={form.problemsCompleted}
                onChange={e => setForm({ ...form, problemsCompleted: +e.target.value })}
                className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Time Spent (minutes)</label>
              <input type="number" min={0} value={form.timeSpent}
                onChange={e => setForm({ ...form, timeSpent: +e.target.value })}
                className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Completed All Tasks?</label>
              <div className="flex items-center gap-2 pt-1.5">
                <button type="button" onClick={() => setForm({ ...form, completed: !form.completed })}
                  className={`rounded-lg border px-4 py-2 text-sm transition-colors ${form.completed ? "bg-success/10 border-success text-success" : "border-border text-muted-foreground"}`}>
                  {form.completed ? "✓ Yes" : "No"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Save Entry</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
          </div>
        </form>
      )}

      {/* History Table */}
      <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Date</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Problems</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Time (min)</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map(entry => (
              <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3 text-sm text-card-foreground">{entry.date}</td>
                <td className="px-5 py-3 text-sm text-card-foreground font-medium">{entry.problemsCompleted}</td>
                <td className="px-5 py-3 text-sm text-card-foreground">{entry.timeSpent}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${entry.completed ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                    {entry.completed ? "Completed" : "Partial"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressTracking;
