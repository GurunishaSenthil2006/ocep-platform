import { useEffect, useState } from "react";
import { Bell, AlertTriangle, Clock, Flame, Trophy, Check } from "lucide-react";
import Loader from "@/components/Loader";
import { notificationsApi } from "@/services/api";
import type { Notification } from "@/data/sampleData";

const typeConfig = {
  missed: { icon: AlertTriangle, style: "bg-destructive/10 text-destructive" },
  reminder: { icon: Clock, style: "bg-primary/10 text-primary" },
  burnout: { icon: Flame, style: "bg-warning/10 text-warning" },
  achievement: { icon: Trophy, style: "bg-success/10 text-success" },
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notificationsApi.getAll().then(n => { setNotifications(n); setLoading(false); });
  }, []);

  const markRead = (id: string) => {
    notificationsApi.markRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (loading) return <Loader />;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" /> Notifications
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="space-y-2">
        {notifications.map(n => {
          const config = typeConfig[n.type];
          const Icon = config.icon;
          return (
            <div key={n.id}
              className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
                n.read ? "border-border bg-card" : "border-primary/20 bg-accent/30"
              }`}
            >
              <div className={`rounded-lg p-2 ${config.style}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${n.read ? "text-muted-foreground" : "text-card-foreground font-medium"}`}>{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
              </div>
              {!n.read && (
                <button onClick={() => markRead(n.id)} className="rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
