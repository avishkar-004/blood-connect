import { User, UserRole } from "@/lib/mockData";
import { storage, initializeStorage } from "@/lib/storage";

// Initialize storage on module load
initializeStorage();

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  bloodGroup?: string;
  location: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate a mock JWT token
const generateToken = (userId: string): string => {
  return `mock-jwt-token-${userId}-${Date.now()}`;
};

export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800); // Simulate network delay

    const users = storage.getUsers();
    const user = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    if (!user.isActive) {
      return {
        success: false,
        error: "Account is deactivated. Please contact support.",
      };
    }

    const token = generateToken(user.id);

    // Save auth data
    storage.setAuthToken(token);
    storage.setCurrentUser(user);

    return {
      success: true,
      user,
      token,
    };
  },

  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(1000);

    const users = storage.getUsers();

    // Check if email already exists
    if (users.some((u) => u.email === data.email)) {
      return {
        success: false,
        error: "Email already registered",
      };
    }

    // Create new user
    const newUser: User = {
      id: `U${Date.now()}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
      bloodGroup: data.bloodGroup as any,
      location: data.location,
      age: data.age,
      gender: data.gender,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      createdAt: new Date().toISOString(),
      isActive: true,
      emailVerified: false,
      // Donor-specific fields
      ...(data.role === "donor" && {
        lastDonation: undefined,
        nextEligibleDate: new Date().toISOString().split("T")[0],
        totalDonations: 0,
        available: true,
      }),
    };

    // Save user
    storage.addUser(newUser);

    // Auto-login after registration
    const token = generateToken(newUser.id);
    storage.setAuthToken(token);
    storage.setCurrentUser(newUser);

    return {
      success: true,
      user: newUser,
      token,
    };
  },

  // Logout
  logout: async (): Promise<void> => {
    await delay(300);
    storage.clearAuth();
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return storage.getCurrentUser();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!storage.getAuthToken() && !!storage.getCurrentUser();
  },

  // Update user profile
  updateProfile: async (
    userId: string,
    updates: Partial<User>
  ): Promise<AuthResponse> => {
    await delay(500);

    try {
      storage.updateUser(userId, updates);
      const updatedUser = storage.getCurrentUser();

      return {
        success: true,
        user: updatedUser || undefined,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to update profile",
      };
    }
  },

  // Change password
  changePassword: async (
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    await delay(500);

    const users = storage.getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (user.password !== currentPassword) {
      return { success: false, error: "Current password is incorrect" };
    }

    storage.updateUser(userId, { password: newPassword });

    return { success: true };
  },

  // Verify email (mock)
  verifyEmail: async (userId: string): Promise<{ success: boolean }> => {
    await delay(500);
    storage.updateUser(userId, { emailVerified: true });
    return { success: true };
  },

  // Request password reset (mock)
  requestPasswordReset: async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    await delay(800);

    const users = storage.getUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      // Don't reveal if email exists
      return { success: true };
    }

    // In real app, would send email
    return { success: true };
  },
};
