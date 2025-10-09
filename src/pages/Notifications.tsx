import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { notificationService } from "@/services/notification.service";
import { Notification } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, Info, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadNotifications();
  }, [user]);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const result = await notificationService.getUserNotifications(user.id);
      setNotifications(result);
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "request":
        return <AlertCircle className="h-5 w-5 text-primary" />;
      case "reminder":
        return <Calendar className="h-5 w-5 text-warning" />;
      case "alert":
        return <Bell className="h-5 w-5 text-destructive" />;
      case "info":
        return <Info className="h-5 w-5 text-secondary" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      loadNotifications(); // Reload to update UI
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      await notificationService.markAllAsRead(user.id);
      toast.success("All notifications marked as read");
      loadNotifications();
    } catch (error) {
      toast.error("Failed to update notifications");
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container py-8 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all ${!notification.read ? "border-primary bg-accent/20" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="default" className="flex-shrink-0">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {new Date(notification.date).toLocaleString()}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card className="p-12 text-center">
            <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </Card>
        )}
      </main>
    </div>
  );
}
