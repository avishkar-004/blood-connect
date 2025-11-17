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

// Mock Donors
export const mockDonors: Donor[] = [
  {
    id: "D001",
    name: "Rajesh Kumar",
    age: 28,
    gender: "Male",
    bloodGroup: "O+",
    location: "Delhi",
    phone: "+91 98765 43210",
    email: "rajesh.k@email.com",
    lastDonation: "2024-08-15",
    nextEligibleDate: "2025-02-15",
    totalDonations: 8,
    available: true,
    distance: 2.5
  },
  {
    id: "D002",
    name: "Priya Sharma",
    age: 32,
    gender: "Female",
    bloodGroup: "A+",
    location: "Mumbai",
    phone: "+91 98765 43211",
    email: "priya.s@email.com",
    lastDonation: "2024-09-20",
    nextEligibleDate: "2025-03-20",
    totalDonations: 12,
    available: true,
    distance: 1.8
  },
  {
    id: "D003",
    name: "Amit Patel",
    age: 35,
    gender: "Male",
    bloodGroup: "B+",
    location: "Bangalore",
    phone: "+91 98765 43212",
    email: "amit.p@email.com",
    lastDonation: "2024-07-10",
    nextEligibleDate: "2025-01-10",
    totalDonations: 15,
    available: true,
    distance: 3.2
  },
  {
    id: "D004",
    name: "Sneha Reddy",
    age: 26,
    gender: "Female",
    bloodGroup: "AB+",
    location: "Hyderabad",
    phone: "+91 98765 43213",
    email: "sneha.r@email.com",
    lastDonation: "2024-10-05",
    nextEligibleDate: "2025-04-05",
    totalDonations: 5,
    available: false,
    distance: 5.0
  },
  {
    id: "D005",
    name: "Vikram Singh",
    age: 40,
    gender: "Male",
    bloodGroup: "O-",
    location: "Chennai",
    phone: "+91 98765 43214",
    email: "vikram.s@email.com",
    lastDonation: "2024-06-25",
    nextEligibleDate: "2024-12-25",
    totalDonations: 20,
    available: true,
    distance: 4.1
  }
];

// Mock Blood Requests
export const mockBloodRequests: BloodRequest[] = [
  {
    id: "R001",
    recipientId: "REC001",
    recipientName: "Anita Verma",
    bloodGroup: "O+",
    quantity: 2,
    urgency: "Urgent",
    hospital: "Apollo Hospital",
    status: "Matched",
    requestDate: "2024-11-14",
    matchedDonors: ["D001"],
    doctorNote: "Surgery scheduled"
  },
  {
    id: "R002",
    recipientId: "REC002",
    recipientName: "Suresh Nair",
    bloodGroup: "A+",
    quantity: 3,
    urgency: "Emergency",
    hospital: "Max Hospital",
    status: "In Process",
    requestDate: "2024-11-15",
    matchedDonors: ["D002"],
    doctorNote: "Accident case"
  },
  {
    id: "R003",
    recipientId: "REC003",
    recipientName: "Kavita Joshi",
    bloodGroup: "B+",
    quantity: 1,
    urgency: "Normal",
    hospital: "Fortis Hospital",
    status: "Pending",
    requestDate: "2024-11-16",
    doctorNote: "Routine surgery"
  }
];

// Mock Blood Inventory
export const mockBloodInventory: BloodInventory[] = [
  { id: "INV001", bloodGroup: "O+", units: 45, location: "Central Blood Bank", expiryDate: "2024-12-30", status: "Available" },
  { id: "INV002", bloodGroup: "O-", units: 8, location: "Central Blood Bank", expiryDate: "2024-12-25", status: "Low Stock" },
  { id: "INV003", bloodGroup: "A+", units: 38, location: "Central Blood Bank", expiryDate: "2024-12-28", status: "Available" },
  { id: "INV004", bloodGroup: "A-", units: 12, location: "Central Blood Bank", expiryDate: "2024-12-20", status: "Low Stock" },
  { id: "INV005", bloodGroup: "B+", units: 28, location: "Central Blood Bank", expiryDate: "2024-12-31", status: "Available" },
  { id: "INV006", bloodGroup: "B-", units: 3, location: "Central Blood Bank", expiryDate: "2024-12-15", status: "Critical" },
  { id: "INV007", bloodGroup: "AB+", units: 15, location: "Central Blood Bank", expiryDate: "2024-12-27", status: "Low Stock" },
  { id: "INV008", bloodGroup: "AB-", units: 2, location: "Central Blood Bank", expiryDate: "2024-12-18", status: "Critical" }
];

// Mock Donation Camps
export const mockDonationCamps: DonationCamp[] = [
  {
    id: "C001",
    name: "Community Blood Drive",
    location: "City Center Mall, Delhi",
    date: "2024-11-20",
    time: "10:00 AM - 4:00 PM",
    organizer: "Red Cross Society",
    slotsAvailable: 25,
    totalSlots: 50
  },
  {
    id: "C002",
    name: "Corporate Donation Camp",
    location: "Tech Park, Bangalore",
    date: "2024-11-22",
    time: "9:00 AM - 3:00 PM",
    organizer: "Rotary Club",
    slotsAvailable: 10,
    totalSlots: 30
  },
  {
    id: "C003",
    name: "University Health Initiative",
    location: "Delhi University Campus",
    date: "2024-11-25",
    time: "11:00 AM - 5:00 PM",
    organizer: "NSS Delhi University",
    slotsAvailable: 40,
    totalSlots: 60
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: "N001",
    userId: "D001",
    type: "request",
    title: "New Blood Request Match",
    message: "Your blood type O+ matches a new urgent request at Apollo Hospital",
    date: "2024-11-16T10:30:00",
    read: false
  },
  {
    id: "N002",
    userId: "D001",
    type: "reminder",
    title: "Eligible for Donation",
    message: "You are now eligible to donate blood again. Consider saving a life!",
    date: "2024-11-15T09:00:00",
    read: false
  },
  {
    id: "N003",
    userId: "D001",
    type: "info",
    title: "New Donation Camp Near You",
    message: "Blood donation camp at City Center Mall on Nov 20. Register now!",
    date: "2024-11-14T14:20:00",
    read: true
  }
];

// Utility functions
export const getCompatibleBloodTypes = (bloodGroup: BloodType): BloodType[] => {
  const compatibility: Record<BloodType, BloodType[]> = {
    "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    "O+": ["O+", "A+", "B+", "AB+"],
    "A-": ["A-", "A+", "AB-", "AB+"],
    "A+": ["A+", "AB+"],
    "B-": ["B-", "B+", "AB-", "AB+"],
    "B+": ["B+", "AB+"],
    "AB-": ["AB-", "AB+"],
    "AB+": ["AB+"]
  };
  return compatibility[bloodGroup] || [];
};

export const canReceiveFrom = (recipient: BloodType, donor: BloodType): boolean => {
  const compatibility = getCompatibleBloodTypes(donor);
  return compatibility.includes(recipient);
};

// User and Authentication types
export type UserRole = "donor" | "recipient" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: UserRole;
  phone: string;
  bloodGroup?: BloodType;
  location: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  avatar?: string;
  createdAt: string;
  // Donor-specific fields
  lastDonation?: string;
  nextEligibleDate?: string;
  totalDonations?: number;
  available?: boolean;
  // Additional fields
  isActive: boolean;
  emailVerified: boolean;
}

export interface CampBooking {
  id: string;
  userId: string;
  campId: string;
  bookingDate: string;
  status: "Confirmed" | "Cancelled" | "Completed";
  slotTime?: string;
}

// Mock Users (for authentication)
export const mockUsers: User[] = [
  {
    id: "U001",
    name: "Rajesh Kumar",
    email: "donor@test.com",
    password: "password123",
    role: "donor",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    location: "Delhi",
    age: 28,
    gender: "Male",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    createdAt: "2024-01-15T10:00:00Z",
    lastDonation: "2024-08-15",
    nextEligibleDate: "2025-02-15",
    totalDonations: 8,
    available: true,
    isActive: true,
    emailVerified: true,
  },
  {
    id: "U002",
    name: "Anita Verma",
    email: "recipient@test.com",
    password: "password123",
    role: "recipient",
    phone: "+91 98765 43220",
    bloodGroup: "A+",
    location: "Mumbai",
    age: 35,
    gender: "Female",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita",
    createdAt: "2024-02-20T10:00:00Z",
    isActive: true,
    emailVerified: true,
  },
  {
    id: "U003",
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
    phone: "+91 98765 43230",
    location: "Delhi",
    age: 40,
    gender: "Male",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    createdAt: "2024-01-01T10:00:00Z",
    isActive: true,
    emailVerified: true,
  },
  {
    id: "U004",
    name: "Priya Sharma",
    email: "priya@test.com",
    password: "password123",
    role: "donor",
    phone: "+91 98765 43211",
    bloodGroup: "A+",
    location: "Mumbai",
    age: 32,
    gender: "Female",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    createdAt: "2024-03-10T10:00:00Z",
    lastDonation: "2024-09-20",
    nextEligibleDate: "2025-03-20",
    totalDonations: 12,
    available: true,
    isActive: true,
    emailVerified: true,
  },
  {
    id: "U005",
    name: "Amit Patel",
    email: "amit@test.com",
    password: "password123",
    role: "donor",
    phone: "+91 98765 43212",
    bloodGroup: "B+",
    location: "Bangalore",
    age: 35,
    gender: "Male",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    createdAt: "2024-04-15T10:00:00Z",
    lastDonation: "2024-07-10",
    nextEligibleDate: "2025-01-10",
    totalDonations: 15,
    available: true,
    isActive: true,
    emailVerified: true,
  },
];

// Mock Camp Bookings
export const mockCampBookings: CampBooking[] = [
  {
    id: "B001",
    userId: "U001",
    campId: "C001",
    bookingDate: "2024-11-15T14:30:00Z",
    status: "Confirmed",
    slotTime: "10:00 AM",
  },
  {
    id: "B002",
    userId: "U004",
    campId: "C002",
    bookingDate: "2024-11-14T09:20:00Z",
    status: "Confirmed",
    slotTime: "11:00 AM",
  },
];
