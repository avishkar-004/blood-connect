import { Notification } from "@/lib/mockData";
import { storage } from "@/lib/storage";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique ID
const generateId = (prefix: string) => `${prefix}${Date.now()}`;

export interface CreateNotificationData {
  userId: string;
  type: "request" | "match" | "reminder" | "alert" | "info";
  title: string;
  message: string;
}

export const notificationService = {
  // Get all notifications for a user
  getUserNotifications: async (userId: string): Promise<Notification[]> => {
    await delay(300);
    const notifications = storage.getNotifications();
    return notifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Get unread notifications count
  getUnreadCount: async (userId: string): Promise<number> => {
    await delay(100);
    const notifications = storage.getNotifications();
    return notifications.filter((n) => n.userId === userId && !n.read).length;
  },

  // Get unread notifications
  getUnreadNotifications: async (userId: string): Promise<Notification[]> => {
    await delay(200);
    const notifications = storage.getNotifications();
    return notifications
      .filter((n) => n.userId === userId && !n.read)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Mark notification as read
  markAsRead: async (notificationId: string): Promise<{ success: boolean }> => {
    await delay(200);
    storage.markNotificationAsRead(notificationId);
    return { success: true };
  },

  // Mark all notifications as read
  markAllAsRead: async (userId: string): Promise<{ success: boolean }> => {
    await delay(300);
    storage.markAllNotificationsAsRead(userId);
    return { success: true };
  },

  // Create notification
  createNotification: async (
    data: CreateNotificationData
  ): Promise<{ success: boolean; notification?: Notification }> => {
    await delay(200);

    const notification: Notification = {
      id: generateId("N"),
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      date: new Date().toISOString(),
      read: false,
    };

    storage.addNotification(notification);

    return { success: true, notification };
  },

  // Delete notification
  deleteNotification: async (notificationId: string): Promise<{ success: boolean }> => {
    await delay(200);

    const notifications = storage.getNotifications();
    const filtered = notifications.filter((n) => n.id !== notificationId);
    storage.saveNotifications(filtered);

    return { success: true };
  },

  // Delete all notifications for a user
  deleteAllNotifications: async (userId: string): Promise<{ success: boolean }> => {
    await delay(300);

    const notifications = storage.getNotifications();
    const filtered = notifications.filter((n) => n.userId !== userId);
    storage.saveNotifications(filtered);

    return { success: true };
  },

  // Send blood request notification to compatible donors
  notifyCompatibleDonors: async (
    bloodGroup: string,
    hospital: string,
    urgency: string,
    units: number
  ): Promise<{ success: boolean; notifiedCount: number }> => {
    await delay(400);

    const users = storage.getUsers();
    const donors = users.filter(
      (u) => u.role === "donor" && u.bloodGroup === bloodGroup && u.available
    );

    let notifiedCount = 0;

    donors.forEach((donor) => {
      const notification: Notification = {
        id: generateId("N"),
        userId: donor.id,
        type: "request",
        title: `${urgency} Blood Request`,
        message: `${units} unit(s) of ${bloodGroup} blood needed at ${hospital}. Can you help?`,
        date: new Date().toISOString(),
        read: false,
      };

      storage.addNotification(notification);
      notifiedCount++;
    });

    return { success: true, notifiedCount };
  },

  // Send donation reminder
  sendDonationReminder: async (userId: string): Promise<{ success: boolean }> => {
    await delay(300);

    const notification: Notification = {
      id: generateId("N"),
      userId,
      type: "reminder",
      title: "Time to Donate Again",
      message: "You're now eligible to donate blood. Help save lives today!",
      date: new Date().toISOString(),
      read: false,
    };

    storage.addNotification(notification);

    return { success: true };
  },

  // Send camp reminder
  sendCampReminder: async (
    userId: string,
    campName: string,
    campDate: string
  ): Promise<{ success: boolean }> => {
    await delay(300);

    const notification: Notification = {
      id: generateId("N"),
      userId,
      type: "reminder",
      title: "Upcoming Donation Camp",
      message: `Reminder: ${campName} is scheduled for ${new Date(campDate).toLocaleDateString()}. Don't forget!`,
      date: new Date().toISOString(),
      read: false,
    };

    storage.addNotification(notification);

    return { success: true };
  },

  // Send low stock alert to admins
  sendLowStockAlert: async (
    bloodGroup: string,
    currentUnits: number
  ): Promise<{ success: boolean }> => {
    await delay(300);

    const users = storage.getUsers();
    const admins = users.filter((u) => u.role === "admin");

    admins.forEach((admin) => {
      const notification: Notification = {
        id: generateId("N"),
        userId: admin.id,
        type: "alert",
        title: "Low Blood Stock Alert",
        message: `${bloodGroup} blood stock is low (${currentUnits} units remaining). Immediate action required.`,
        date: new Date().toISOString(),
        read: false,
      };

      storage.addNotification(notification);
    });

    return { success: true };
  },

  // Send match notification to recipient
  sendMatchNotification: async (
    recipientId: string,
    donorCount: number,
    bloodGroup: string
  ): Promise<{ success: boolean }> => {
    await delay(300);

    const notification: Notification = {
      id: generateId("N"),
      userId: recipientId,
      type: "match",
      title: "Donors Found!",
      message: `Good news! We found ${donorCount} compatible donor(s) for ${bloodGroup} blood. Check your dashboard for details.`,
      date: new Date().toISOString(),
      read: false,
    };

    storage.addNotification(notification);

    return { success: true };
  },
};
