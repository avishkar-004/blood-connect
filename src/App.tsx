import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BloodRequest from "./pages/BloodRequest";
import DonorSearch from "./pages/DonorSearch";
import DonationCamps from "./pages/DonationCamps";
import Emergency from "./pages/Emergency";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/help" element={<Help />} />

            {/* Protected routes - Donor only */}
            <Route
              path="/donor-dashboard"
              element={
                <ProtectedRoute allowedRoles={["donor"]}>
                  <DonorDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected routes - Recipient only */}
            <Route
              path="/recipient-dashboard"
              element={
                <ProtectedRoute allowedRoles={["recipient"]}>
                  <RecipientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blood-request"
              element={
                <ProtectedRoute allowedRoles={["recipient"]}>
                  <BloodRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/emergency"
              element={
                <ProtectedRoute allowedRoles={["recipient"]}>
                  <Emergency />
                </ProtectedRoute>
              }
            />

            {/* Protected routes - Admin only */}
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected routes - All authenticated users */}
            <Route
              path="/donor-search"
              element={
                <ProtectedRoute>
                  <DonorSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donation-camps"
              element={
                <ProtectedRoute>
                  <DonationCamps />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* 404 - ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
