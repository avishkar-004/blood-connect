// Mock data for the Blood Bank Portal

export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as const;
export type BloodType = typeof bloodTypes[number];

export interface Donor {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: BloodType;
  location: string;
  phone: string;
  email: string;
  lastDonation: string;
  nextEligibleDate: string;
  totalDonations: number;
  available: boolean;
  distance?: number;
}

export interface Recipient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  bloodGroup: BloodType;
  location: string;
  phone: string;
  email: string;
}

export interface BloodRequest {
  id: string;
  recipientId: string;
  recipientName: string;
  bloodGroup: BloodType;
  quantity: number;
  urgency: "Normal" | "Urgent" | "Emergency";
  hospital: string;
  status: "Pending" | "Matched" | "In Process" | "Completed" | "Cancelled";
  requestDate: string;
  matchedDonors?: string[];
  doctorNote?: string;
}

export interface BloodInventory {
  id: string;
  bloodGroup: BloodType;
  units: number;
  location: string;
  expiryDate: string;
  status: "Available" | "Low Stock" | "Critical";
}

export interface DonationCamp {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  slotsAvailable: number;
  totalSlots: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: "request" | "match" | "reminder" | "alert" | "info";
  title: string;
  message: string;
  date: string;
  read: boolean;
}
