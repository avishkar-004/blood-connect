import {
  BloodRequest,
  BloodInventory,
  BloodType,
  Donor,
  Notification,
  getCompatibleBloodTypes,
} from "@/lib/mockData";
import { storage } from "@/lib/storage";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique ID
const generateId = (prefix: string) => `${prefix}${Date.now()}`;

export interface CreateBloodRequestData {
  recipientId: string;
  recipientName: string;
  bloodGroup: BloodType;
  quantity: number;
  urgency: "Normal" | "Urgent" | "Emergency";
  hospital: string;
  doctorNote?: string;
  contactNumber?: string;
  requiredBy?: string;
}

export const bloodService = {
  // Get all blood requests
  getBloodRequests: async (): Promise<BloodRequest[]> => {
    await delay(300);
    return storage.getBloodRequests();
  },

  // Get blood requests by recipient
  getBloodRequestsByRecipient: async (recipientId: string): Promise<BloodRequest[]> => {
    await delay(300);
    const requests = storage.getBloodRequests();
    return requests.filter((r) => r.recipientId === recipientId);
  },

  // Get blood request by ID
  getBloodRequestById: async (requestId: string): Promise<BloodRequest | null> => {
    await delay(200);
    const requests = storage.getBloodRequests();
    return requests.find((r) => r.id === requestId) || null;
  },

  // Create blood request
  createBloodRequest: async (
    data: CreateBloodRequestData
  ): Promise<{ success: boolean; request?: BloodRequest; error?: string }> => {
    await delay(800);

    try {
      const newRequest: BloodRequest = {
        id: generateId("R"),
        recipientId: data.recipientId,
        recipientName: data.recipientName,
        bloodGroup: data.bloodGroup,
        quantity: data.quantity,
        urgency: data.urgency,
        hospital: data.hospital,
        status: "Pending",
        requestDate: new Date().toISOString().split("T")[0],
        doctorNote: data.doctorNote,
      };

      storage.addBloodRequest(newRequest);

      // Auto-match donors if urgent or emergency
      if (data.urgency === "Urgent" || data.urgency === "Emergency") {
        await bloodService.matchDonorsForRequest(newRequest.id);
      }

      // Create notification for matching donors
      await bloodService.notifyMatchingDonors(newRequest);

      return {
        success: true,
        request: newRequest,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to create blood request",
      };
    }
  },

  // Match donors for a blood request
  matchDonorsForRequest: async (
    requestId: string
  ): Promise<{ success: boolean; matchedDonors?: Donor[] }> => {
    await delay(500);

    const request = await bloodService.getBloodRequestById(requestId);
    if (!request) {
      return { success: false };
    }

    // Get compatible blood types
    const compatibleTypes = getCompatibleBloodTypes(request.bloodGroup);

    // Get all donors
    const allDonors = storage.getDonors();

    // Find matching donors
    const matchedDonors = allDonors.filter(
      (donor) =>
        compatibleTypes.includes(donor.bloodGroup) &&
        donor.available &&
        new Date(donor.nextEligibleDate) <= new Date()
    );

    // Update request with matched donors
    if (matchedDonors.length > 0) {
      storage.updateBloodRequest(requestId, {
        status: "Matched",
        matchedDonors: matchedDonors.map((d) => d.id),
      });
    }

    return {
      success: true,
      matchedDonors,
    };
  },

  // Notify matching donors about new request
  notifyMatchingDonors: async (request: BloodRequest): Promise<void> => {
    const compatibleTypes = getCompatibleBloodTypes(request.bloodGroup);
    const users = storage.getUsers();
    const donors = users.filter(
      (u) =>
        u.role === "donor" &&
        u.bloodGroup &&
        compatibleTypes.includes(u.bloodGroup) &&
        u.available
    );

    donors.forEach((donor) => {
      const notification: Notification = {
        id: generateId("N"),
        userId: donor.id,
        type: "request",
        title: "New Blood Request Match",
        message: `Urgent ${request.bloodGroup} blood needed at ${request.hospital}. ${request.quantity} units required.`,
        date: new Date().toISOString(),
        read: false,
      };
      storage.addNotification(notification);
    });
  },

  // Update blood request status
  updateBloodRequestStatus: async (
    requestId: string,
    status: BloodRequest["status"]
  ): Promise<{ success: boolean }> => {
    await delay(300);
    storage.updateBloodRequest(requestId, { status });
    return { success: true };
  },

  // Cancel blood request
  cancelBloodRequest: async (requestId: string): Promise<{ success: boolean }> => {
    await delay(300);
    storage.updateBloodRequest(requestId, { status: "Cancelled" });
    return { success: true };
  },

  // Get blood inventory
  getBloodInventory: async (): Promise<BloodInventory[]> => {
    await delay(300);
    return storage.getBloodInventory();
  },

  // Get inventory by blood type
  getInventoryByBloodType: async (bloodGroup: BloodType): Promise<BloodInventory | null> => {
    await delay(200);
    const inventory = storage.getBloodInventory();
    return inventory.find((i) => i.bloodGroup === bloodGroup) || null;
  },

  // Update blood inventory
  updateInventory: async (
    itemId: string,
    updates: Partial<BloodInventory>
  ): Promise<{ success: boolean }> => {
    await delay(300);
    storage.updateInventoryItem(itemId, updates);
    return { success: true };
  },

  // Add blood units to inventory (after donation)
  addBloodUnits: async (
    bloodGroup: BloodType,
    units: number
  ): Promise<{ success: boolean }> => {
    await delay(300);

    const inventory = storage.getBloodInventory();
    const item = inventory.find((i) => i.bloodGroup === bloodGroup);

    if (item) {
      const newUnits = item.units + units;
      let status: BloodInventory["status"] = "Available";

      if (newUnits < 10) status = "Critical";
      else if (newUnits < 20) status = "Low Stock";

      storage.updateInventoryItem(item.id, { units: newUnits, status });
    }

    return { success: true };
  },

  // Remove blood units from inventory (after transfusion)
  removeBloodUnits: async (
    bloodGroup: BloodType,
    units: number
  ): Promise<{ success: boolean; error?: string }> => {
    await delay(300);

    const inventory = storage.getBloodInventory();
    const item = inventory.find((i) => i.bloodGroup === bloodGroup);

    if (!item) {
      return { success: false, error: "Blood type not found in inventory" };
    }

    if (item.units < units) {
      return { success: false, error: "Insufficient blood units available" };
    }

    const newUnits = item.units - units;
    let status: BloodInventory["status"] = "Available";

    if (newUnits < 10) status = "Critical";
    else if (newUnits < 20) status = "Low Stock";

    storage.updateInventoryItem(item.id, { units: newUnits, status });

    return { success: true };
  },

  // Get statistics
  getStatistics: async (): Promise<{
    totalRequests: number;
    pendingRequests: number;
    completedRequests: number;
    totalDonors: number;
    availableDonors: number;
    lowStockTypes: string[];
    criticalStockTypes: string[];
  }> => {
    await delay(300);

    const requests = storage.getBloodRequests();
    const users = storage.getUsers();
    const inventory = storage.getBloodInventory();

    const donors = users.filter((u) => u.role === "donor");

    return {
      totalRequests: requests.length,
      pendingRequests: requests.filter((r) => r.status === "Pending").length,
      completedRequests: requests.filter((r) => r.status === "Completed").length,
      totalDonors: donors.length,
      availableDonors: donors.filter((d) => d.available).length,
      lowStockTypes: inventory
        .filter((i) => i.status === "Low Stock")
        .map((i) => i.bloodGroup),
      criticalStockTypes: inventory
        .filter((i) => i.status === "Critical")
        .map((i) => i.bloodGroup),
    };
  },

  // Search compatible donors
  searchCompatibleDonors: async (
    bloodGroup: BloodType,
    location?: string
  ): Promise<Donor[]> => {
    await delay(400);

    const compatibleTypes = getCompatibleBloodTypes(bloodGroup);
    const allDonors = storage.getDonors();

    let donors = allDonors.filter(
      (donor) =>
        compatibleTypes.includes(donor.bloodGroup) &&
        donor.available &&
        new Date(donor.nextEligibleDate) <= new Date()
    );

    // Filter by location if provided
    if (location) {
      donors = donors.filter((d) =>
        d.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Sort by distance (if available) and last donation date
    donors.sort((a, b) => {
      if (a.distance && b.distance) {
        return a.distance - b.distance;
      }
      return new Date(a.lastDonation).getTime() - new Date(b.lastDonation).getTime();
    });

    return donors;
  },
};
