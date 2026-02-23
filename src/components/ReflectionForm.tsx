import { useState } from "react";
import { Send, Brain, BookOpen, Smile } from "lucide-react";
import type { Reflection } from "@/data/sampleData";

const sentimentIcons = { positive: "🟢", neutral: "🟡", negative: "🔴" };

interface ReflectionFormProps {
  onSubmit: (text: string) => Promise<Reflection>;
}

const ReflectionForm = ({ onSubmit }: ReflectionFormProps) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Reflection | null>(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await onSubmit(text);
      setResult(res);
      setText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Write your reflection about today's study session..."
          className="w-full min-h-[140px] rounded-xl border border-border bg-card p-4 pr-14 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="absolute bottom-3 right-3 rounded-lg bg-primary p-2.5 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      {result?.analysis && (
        <div className="rounded-xl border border-border bg-accent/30 p-4 space-y-3">
          <h4 className="text-sm font-semibold text-card-foreground">NLP Analysis Results</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 card-shadow">
              <Brain className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Difficulty</p>
                <p className="text-sm font-medium text-card-foreground">{result.analysis.difficulty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 card-shadow">
              <BookOpen className="h-4 w-4 text-info" />
              <div>
                <p className="text-xs text-muted-foreground">Topic</p>
                <p className="text-sm font-medium text-card-foreground">{result.analysis.topic}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card p-3 card-shadow">
              <Smile className="h-4 w-4 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Sentiment</p>
                <p className="text-sm font-medium text-card-foreground">
                  {sentimentIcons[result.analysis.sentiment]} {result.analysis.sentiment}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReflectionForm;
