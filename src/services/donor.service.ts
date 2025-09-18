import { Donor, DonationCamp, CampBooking, Notification } from "@/lib/mockData";
import { storage } from "@/lib/storage";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique ID
const generateId = (prefix: string) => `${prefix}${Date.now()}`;

export const donorService = {
  // Get all donors
  getDonors: async (): Promise<Donor[]> => {
    await delay(300);
    return storage.getDonors();
  },

  // Get donor by ID
  getDonorById: async (donorId: string): Promise<Donor | null> => {
    await delay(200);
    const donors = storage.getDonors();
    return donors.find((d) => d.id === donorId) || null;
  },

  // Search donors
  searchDonors: async (filters: {
    bloodGroup?: string;
    location?: string;
    available?: boolean;
  }): Promise<Donor[]> => {
    await delay(400);

    let donors = storage.getDonors();

    if (filters.bloodGroup) {
      donors = donors.filter((d) => d.bloodGroup === filters.bloodGroup);
    }

    if (filters.location) {
      donors = donors.filter((d) =>
        d.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.available !== undefined) {
      donors = donors.filter((d) => d.available === filters.available);
    }

    return donors;
  },

  // Update donor availability
  updateDonorAvailability: async (
    donorId: string,
    available: boolean
  ): Promise<{ success: boolean }> => {
    await delay(300);

    const donors = storage.getDonors();
    const index = donors.findIndex((d) => d.id === donorId);

    if (index !== -1) {
      donors[index].available = available;
      storage.saveDonors(donors);
      return { success: true };
    }

    return { success: false };
  },

  // Record donation
  recordDonation: async (
    donorId: string,
    units: number = 1
  ): Promise<{ success: boolean; error?: string }> => {
    await delay(500);

    const users = storage.getUsers();
    const user = users.find((u) => u.id === donorId && u.role === "donor");

    if (!user) {
      return { success: false, error: "Donor not found" };
    }

    const today = new Date();
    const nextEligibleDate = new Date(today);
    nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3); // 3 months after donation

    storage.updateUser(donorId, {
      lastDonation: today.toISOString().split("T")[0],
      nextEligibleDate: nextEligibleDate.toISOString().split("T")[0],
      totalDonations: (user.totalDonations || 0) + 1,
      available: false, // Not available immediately after donation
    });

    // Also update in donors list
    const donors = storage.getDonors();
    const donorIndex = donors.findIndex((d) => d.id === donorId);
    if (donorIndex !== -1) {
      donors[donorIndex].lastDonation = today.toISOString().split("T")[0];
      donors[donorIndex].nextEligibleDate = nextEligibleDate.toISOString().split("T")[0];
      donors[donorIndex].totalDonations += 1;
      donors[donorIndex].available = false;
      storage.saveDonors(donors);
    }

    // Add notification
    const notification: Notification = {
      id: generateId("N"),
      userId: donorId,
      type: "info",
      title: "Donation Recorded",
      message: `Thank you for your donation! You'll be eligible to donate again after ${nextEligibleDate.toLocaleDateString()}.`,
      date: new Date().toISOString(),
      read: false,
    };
    storage.addNotification(notification);

    return { success: true };
  },

  // Get donation camps
  getDonationCamps: async (): Promise<DonationCamp[]> => {
    await delay(300);
    return storage.getDonationCamps();
  },

  // Get upcoming donation camps
  getUpcomingCamps: async (): Promise<DonationCamp[]> => {
    await delay(300);
    const camps = storage.getDonationCamps();
    const today = new Date().toISOString().split("T")[0];
    return camps.filter((c) => c.date >= today && c.slotsAvailable > 0);
  },

  // Get camp by ID
  getCampById: async (campId: string): Promise<DonationCamp | null> => {
    await delay(200);
    const camps = storage.getDonationCamps();
    return camps.find((c) => c.id === campId) || null;
  },

  // Book camp slot
  bookCampSlot: async (
    userId: string,
    campId: string,
    slotTime?: string
  ): Promise<{ success: boolean; booking?: CampBooking; error?: string }> => {
    await delay(500);

    const camp = await donorService.getCampById(campId);
    if (!camp) {
      return { success: false, error: "Camp not found" };
    }

    if (camp.slotsAvailable <= 0) {
      return { success: false, error: "No slots available" };
    }

    // Check if user already booked this camp
    const bookings = storage.getCampBookings();
    const existingBooking = bookings.find(
      (b) => b.userId === userId && b.campId === campId && b.status === "Confirmed"
    );

    if (existingBooking) {
      return { success: false, error: "You have already booked this camp" };
    }

    // Create booking
    const booking: CampBooking = {
      id: generateId("B"),
      userId,
      campId,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
      slotTime,
    };

    storage.addCampBooking(booking);

    // Update camp slots
    storage.updateDonationCamp(campId, {
      slotsAvailable: camp.slotsAvailable - 1,
    });

    // Create notification
    const notification: Notification = {
      id: generateId("N"),
      userId,
      type: "info",
      title: "Camp Booking Confirmed",
      message: `Your slot at ${camp.name} on ${new Date(camp.date).toLocaleDateString()} is confirmed!`,
      date: new Date().toISOString(),
      read: false,
    };
    storage.addNotification(notification);

    return { success: true, booking };
  },

  // Cancel camp booking
  cancelCampBooking: async (
    bookingId: string
  ): Promise<{ success: boolean; error?: string }> => {
    await delay(300);

    const bookings = storage.getCampBookings();
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) {
      return { success: false, error: "Booking not found" };
    }

    // Update booking status
    storage.updateCampBooking(bookingId, { status: "Cancelled" });

    // Return slot to camp
    const camp = await donorService.getCampById(booking.campId);
    if (camp) {
      storage.updateDonationCamp(booking.campId, {
        slotsAvailable: camp.slotsAvailable + 1,
      });
    }

    return { success: true };
  },

  // Get user's camp bookings
  getUserBookings: async (userId: string): Promise<CampBooking[]> => {
    await delay(300);
    const bookings = storage.getCampBookings();
    return bookings.filter((b) => b.userId === userId);
  },

  // Get donor statistics
  getDonorStats: async (donorId: string): Promise<{
    totalDonations: number;
    lastDonation: string | null;
    nextEligibleDate: string | null;
    liveSaved: number;
    upcomingCamps: number;
  }> => {
    await delay(300);

    const user = storage.getUsers().find((u) => u.id === donorId && u.role === "donor");
    const bookings = await donorService.getUserBookings(donorId);
    const upcomingCamps = storage.getDonationCamps().filter((c) => {
      const booking = bookings.find(
        (b) => b.campId === c.id && b.status === "Confirmed"
      );
      return booking && c.date >= new Date().toISOString().split("T")[0];
    });

    return {
      totalDonations: user?.totalDonations || 0,
      lastDonation: user?.lastDonation || null,
      nextEligibleDate: user?.nextEligibleDate || null,
      liveSaved: (user?.totalDonations || 0) * 3, // Assume 1 donation saves 3 lives
      upcomingCamps: upcomingCamps.length,
    };
  },

  // Calculate distance between two locations (mock implementation)
  calculateDistance: async (
    location1: string,
    location2: string
  ): Promise<number> => {
    await delay(200);
    // Mock implementation - return random distance between 1-10 km
    return Math.random() * 9 + 1;
  },

  // Get nearby donors (with mock geolocation)
  getNearbyDonors: async (
    location: string,
    bloodGroup?: string,
    maxDistance: number = 10
  ): Promise<Donor[]> => {
    await delay(500);

    let donors = storage.getDonors();

    // Filter by blood group if provided
    if (bloodGroup) {
      donors = donors.filter((d) => d.bloodGroup === bloodGroup);
    }

    // Filter by availability
    donors = donors.filter((d) => d.available);

    // Calculate mock distances and filter
    const donorsWithDistance = donors.map((donor) => ({
      ...donor,
      distance: Math.random() * 15, // Mock distance
    }));

    const nearbyDonors = donorsWithDistance.filter(
      (d) => d.distance && d.distance <= maxDistance
    );

    // Sort by distance
    nearbyDonors.sort((a, b) => (a.distance || 0) - (b.distance || 0));

    return nearbyDonors;
  },
};
