import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Loader from "@/components/Loader";
import { analyticsApi } from "@/services/api";

const COLORS = ["hsl(220, 72%, 50%)", "hsl(142, 72%, 42%)", "hsl(38, 92%, 50%)", "hsl(280, 60%, 55%)"];

const Analytics = () => {
  const [data, setData] = useState<{ consistency: any[]; completion: any[]; difficulty: any[]; burnout: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsApi.getConsistency(),
      analyticsApi.getCompletion(),
      analyticsApi.getDifficulty(),
      analyticsApi.getBurnout(),
    ]).then(([consistency, completion, difficulty, burnout]) => {
      setData({ consistency, completion, difficulty, burnout });
      setLoading(false);
    });
  }, []);

  if (loading || !data) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" /> Analytics Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Visualize your learning consistency and performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consistency Score */}
        <div className="rounded-xl border border-border bg-card p-5 card-shadow">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Consistency Score Over Time</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.consistency}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 14%, 90%)", fontSize: "12px" }} />
              <Line type="monotone" dataKey="score" stroke="hsl(220, 72%, 50%)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Completion Rate */}
        <div className="rounded-xl border border-border bg-card p-5 card-shadow">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Task Completion Rate</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data.completion}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 14%, 90%)", fontSize: "12px" }} />
              <Legend />
              <Bar dataKey="completed" fill="hsl(142, 72%, 42%)" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="total" fill="hsl(220, 14%, 85%)" radius={[4, 4, 0, 0]} name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Topic Difficulty Distribution */}
        <div className="rounded-xl border border-border bg-card p-5 card-shadow">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Topic Difficulty Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={data.difficulty} cx="50%" cy="50%" labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90} dataKey="value" stroke="none">
                {data.difficulty.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 14%, 90%)", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Burnout Trend */}
        <div className="rounded-xl border border-border bg-card p-5 card-shadow">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Burnout Risk Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data.burnout}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 46%)" }} domain={[0, 100]} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(220, 14%, 90%)", fontSize: "12px" }} />
              <Line type="monotone" dataKey="risk" stroke="hsl(0, 72%, 51%)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
