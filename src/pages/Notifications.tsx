import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, Info, Calendar, CheckCircle } from "lucide-react";
import { mockNotifications, Notification } from "@/lib/mockData";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

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

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="donor" userName="Current User" notificationCount={unreadCount} />

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
          {notifications.map((notification) => (
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

        {notifications.length === 0 && (
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
