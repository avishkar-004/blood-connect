import {
  User,
  Donor,
  BloodRequest,
  BloodInventory,
  DonationCamp,
  Notification,
  CampBooking,
  mockUsers,
  mockDonors,
  mockBloodRequests,
  mockBloodInventory,
  mockDonationCamps,
  mockNotifications,
  mockCampBookings,
} from "./mockData";

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: "blood_connect_auth_token",
  CURRENT_USER: "blood_connect_current_user",
  USERS: "blood_connect_users",
  DONORS: "blood_connect_donors",
  BLOOD_REQUESTS: "blood_connect_blood_requests",
  BLOOD_INVENTORY: "blood_connect_blood_inventory",
  DONATION_CAMPS: "blood_connect_donation_camps",
  NOTIFICATIONS: "blood_connect_notifications",
  CAMP_BOOKINGS: "blood_connect_camp_bookings",
};

// Initialize storage with mock data if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONORS)) {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(mockDonors));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOOD_REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.BLOOD_REQUESTS, JSON.stringify(mockBloodRequests));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOOD_INVENTORY)) {
    localStorage.setItem(STORAGE_KEYS.BLOOD_INVENTORY, JSON.stringify(mockBloodInventory));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONATION_CAMPS)) {
    localStorage.setItem(STORAGE_KEYS.DONATION_CAMPS, JSON.stringify(mockDonationCamps));
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CAMP_BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.CAMP_BOOKINGS, JSON.stringify(mockCampBookings));
  }
};

// Auth Storage
export const storage = {
  // Auth
  getAuthToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  setAuthToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  removeAuthToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  setCurrentUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  removeCurrentUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Users
  getUsers: (): User[] => {
    const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
    return usersStr ? JSON.parse(usersStr) : [];
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  addUser: (user: User): void => {
    const users = storage.getUsers();
    users.push(user);
    storage.saveUsers(users);
  },

  updateUser: (userId: string, updates: Partial<User>): void => {
    const users = storage.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storage.saveUsers(users);

      // Update current user if it's the same user
      const currentUser = storage.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        storage.setCurrentUser(users[index]);
      }
    }
  },

  // Donors
  getDonors: (): Donor[] => {
    const donorsStr = localStorage.getItem(STORAGE_KEYS.DONORS);
    return donorsStr ? JSON.parse(donorsStr) : [];
  },

  saveDonors: (donors: Donor[]): void => {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  },

  // Blood Requests
  getBloodRequests: (): BloodRequest[] => {
    const requestsStr = localStorage.getItem(STORAGE_KEYS.BLOOD_REQUESTS);
    return requestsStr ? JSON.parse(requestsStr) : [];
  },

  saveBloodRequests: (requests: BloodRequest[]): void => {
    localStorage.setItem(STORAGE_KEYS.BLOOD_REQUESTS, JSON.stringify(requests));
  },

  addBloodRequest: (request: BloodRequest): void => {
    const requests = storage.getBloodRequests();
    requests.push(request);
    storage.saveBloodRequests(requests);
  },

  updateBloodRequest: (requestId: string, updates: Partial<BloodRequest>): void => {
    const requests = storage.getBloodRequests();
    const index = requests.findIndex((r) => r.id === requestId);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates };
      storage.saveBloodRequests(requests);
    }
  },

  // Blood Inventory
  getBloodInventory: (): BloodInventory[] => {
    const inventoryStr = localStorage.getItem(STORAGE_KEYS.BLOOD_INVENTORY);
    return inventoryStr ? JSON.parse(inventoryStr) : [];
  },

  saveBloodInventory: (inventory: BloodInventory[]): void => {
    localStorage.setItem(STORAGE_KEYS.BLOOD_INVENTORY, JSON.stringify(inventory));
  },

  updateInventoryItem: (itemId: string, updates: Partial<BloodInventory>): void => {
    const inventory = storage.getBloodInventory();
    const index = inventory.findIndex((i) => i.id === itemId);
    if (index !== -1) {
      inventory[index] = { ...inventory[index], ...updates };
      storage.saveBloodInventory(inventory);
    }
  },

  // Donation Camps
  getDonationCamps: (): DonationCamp[] => {
    const campsStr = localStorage.getItem(STORAGE_KEYS.DONATION_CAMPS);
    return campsStr ? JSON.parse(campsStr) : [];
  },

  saveDonationCamps: (camps: DonationCamp[]): void => {
    localStorage.setItem(STORAGE_KEYS.DONATION_CAMPS, JSON.stringify(camps));
  },

  updateDonationCamp: (campId: string, updates: Partial<DonationCamp>): void => {
    const camps = storage.getDonationCamps();
    const index = camps.findIndex((c) => c.id === campId);
    if (index !== -1) {
      camps[index] = { ...camps[index], ...updates };
      storage.saveDonationCamps(camps);
    }
  },

  // Notifications
  getNotifications: (): Notification[] => {
    const notificationsStr = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return notificationsStr ? JSON.parse(notificationsStr) : [];
  },

  saveNotifications: (notifications: Notification[]): void => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },

  addNotification: (notification: Notification): void => {
    const notifications = storage.getNotifications();
    notifications.unshift(notification); // Add to beginning
    storage.saveNotifications(notifications);
  },

  markNotificationAsRead: (notificationId: string): void => {
    const notifications = storage.getNotifications();
    const index = notifications.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      storage.saveNotifications(notifications);
    }
  },

  markAllNotificationsAsRead: (userId: string): void => {
    const notifications = storage.getNotifications();
    const updated = notifications.map((n) =>
      n.userId === userId ? { ...n, read: true } : n
    );
    storage.saveNotifications(updated);
  },

  // Camp Bookings
  getCampBookings: (): CampBooking[] => {
    const bookingsStr = localStorage.getItem(STORAGE_KEYS.CAMP_BOOKINGS);
    return bookingsStr ? JSON.parse(bookingsStr) : [];
  },

  saveCampBookings: (bookings: CampBooking[]): void => {
    localStorage.setItem(STORAGE_KEYS.CAMP_BOOKINGS, JSON.stringify(bookings));
  },

  addCampBooking: (booking: CampBooking): void => {
    const bookings = storage.getCampBookings();
    bookings.push(booking);
    storage.saveCampBookings(bookings);
  },

  updateCampBooking: (bookingId: string, updates: Partial<CampBooking>): void => {
    const bookings = storage.getCampBookings();
    const index = bookings.findIndex((b) => b.id === bookingId);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates };
      storage.saveCampBookings(bookings);
    }
  },

  // Clear all data (for logout or reset)
  clearAuth: (): void => {
    storage.removeAuthToken();
    storage.removeCurrentUser();
  },

  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};
