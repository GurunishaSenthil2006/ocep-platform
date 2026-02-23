import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import ReflectionForm from "@/components/ReflectionForm";
import Loader from "@/components/Loader";
import { reflectionsApi } from "@/services/api";
import type { Reflection } from "@/data/sampleData";

const sentimentColors = { positive: "bg-success/10 text-success", neutral: "bg-warning/10 text-warning", negative: "bg-destructive/10 text-destructive" };

const Reflections = () => {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reflectionsApi.getAll().then(r => { setReflections(r); setLoading(false); });
  }, []);

  const handleSubmit = async (text: string) => {
    const res = await reflectionsApi.submit(text);
    setReflections(prev => [res, ...prev]);
    return res;
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <MessageSquareText className="h-6 w-6 text-primary" /> Reflections
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Submit daily reflections and get AI-powered analysis</p>
      </div>

      <ReflectionForm onSubmit={handleSubmit} />

      {/* Past Reflections */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Past Reflections</h2>
        {reflections.map(r => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{r.date}</span>
              {r.analysis && (
                <div className="flex gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{r.analysis.topic}</span>
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{r.analysis.difficulty}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${sentimentColors[r.analysis.sentiment]}`}>{r.analysis.sentiment}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-card-foreground">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reflections;
