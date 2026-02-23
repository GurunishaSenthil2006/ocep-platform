import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
}

const variantStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info/10 text-info",
};

const StatsCard = ({ title, value, subtitle, icon: Icon, variant = "default" }: StatsCardProps) => (
  <div className="rounded-xl border border-border bg-card p-5 card-shadow transition-all hover:card-shadow-hover">
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className={`rounded-lg p-2.5 ${variantStyles[variant]}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </div>
);

export default StatsCard;
