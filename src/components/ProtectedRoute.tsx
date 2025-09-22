import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/mockData";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated && !hasShownToast) {
      toast.error("Authentication required", {
        description: "Please log in to access this page",
      });
      setHasShownToast(true);
    }
  }, [isLoading, requireAuth, isAuthenticated, hasShownToast]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to auth page if not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    toast.error("Access denied", {
      description: "You don't have permission to access this page",
    });

    // Redirect to appropriate dashboard based on user role
    const dashboardRoute =
      user.role === "donor"
        ? "/donor-dashboard"
        : user.role === "recipient"
          ? "/recipient-dashboard"
          : "/admin-dashboard";

    return <Navigate to={dashboardRoute} replace />;
  }

  return <>{children}</>;
};
