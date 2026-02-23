import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProgressChartProps {
  data: { date: string; score: number }[];
  title: string;
  color?: string;
  dataKey?: string;
}

const ProgressChart = ({ data, title, color = "hsl(220, 72%, 50%)", dataKey = "score" }: ProgressChartProps) => (
  <div className="rounded-xl border border-border bg-card p-5 card-shadow">
    <h3 className="text-sm font-semibold text-card-foreground mb-4">{title}</h3>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" />
        <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
        <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(220, 14%, 90%)",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={{ r: 4, fill: color }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ProgressChart;
