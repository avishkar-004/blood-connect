import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/lib/mockData";
import { authService, LoginCredentials, RegisterData } from "@/services/auth.service";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      if (currentUser && authService.isAuthenticated()) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.user) {
        setUser(response.user);
        toast.success("Login successful!", {
          description: `Welcome back, ${response.user.name}!`,
        });
        return true;
      } else {
        toast.error("Login failed", {
          description: response.error || "Invalid credentials",
        });
        return false;
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await authService.register(data);

      if (response.success && response.user) {
        setUser(response.user);
        toast.success("Registration successful!", {
          description: `Welcome, ${response.user.name}!`,
        });
        return true;
      } else {
        toast.error("Registration failed", {
          description: response.error || "Unable to create account",
        });
        return false;
      }
    } catch (error) {
      toast.error("Registration failed", {
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed", {
        description: "An unexpected error occurred",
      });
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await authService.updateProfile(user.id, updates);

      if (response.success && response.user) {
        setUser(response.user);
        toast.success("Profile updated successfully");
        return true;
      } else {
        toast.error("Failed to update profile", {
          description: response.error,
        });
        return false;
      }
    } catch (error) {
      toast.error("Failed to update profile", {
        description: "An unexpected error occurred",
      });
      return false;
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
