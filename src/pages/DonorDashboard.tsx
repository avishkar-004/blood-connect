import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Droplet,
  Calendar,
  MapPin,
  Award,
  Heart,
  CheckCircle,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { donorService } from "@/services/donor.service";
import { notificationService } from "@/services/notification.service";
import { DonationCamp, Notification } from "@/lib/mockData";
import Header from "@/components/Header";
import { toast } from "sonner";

export default function DonorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonations: 0,
    lastDonation: null as string | null,
    nextEligibleDate: null as string | null,
    liveSaved: 0,
    upcomingCamps: 0,
  });
  const [upcomingCamps, setUpcomingCamps] = useState<DonationCamp[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Load donor stats
      const donorStats = await donorService.getDonorStats(user.id);
      setStats(donorStats);

      // Load upcoming camps
      const camps = await donorService.getUpcomingCamps();
      setUpcomingCamps(camps.slice(0, 3));

      // Load notifications
      const userNotifications = await notificationService.getUserNotifications(
        user.id
      );
      setNotifications(userNotifications.slice(0, 3));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDaysUntilEligible = () => {
    if (!stats.nextEligibleDate) return 0;
    const nextDate = new Date(stats.nextEligibleDate);
    const today = new Date();
    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateEligibilityProgress = () => {
    const totalDays = 90; // 3 months
    const daysRemaining = calculateDaysUntilEligible();
    const daysPassed = totalDays - daysRemaining;
    return (daysPassed / totalDays) * 100;
  };

  const isEligible = calculateDaysUntilEligible() === 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">Thank you for being a life-saver</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">Donor Profile</CardTitle>
                    <CardDescription>
                      Blood Type: {user?.bloodGroup} | Member since{" "}
                      {new Date(user?.createdAt || "").toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </CardDescription>
                  </div>
                  <Badge
                    className={
                      isEligible
                        ? "bg-success text-success-foreground"
                        : "bg-warning text-warning-foreground"
                    }
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {isEligible ? "Eligible" : "Not Eligible"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Droplet
                        className="h-6 w-6 text-primary"
                        fill="currentColor"
                      />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {stats.totalDonations}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Donations
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-success/10 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {stats.liveSaved}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Lives Saved
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-warning/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {stats.totalDonations >= 10
                          ? "Gold"
                          : stats.totalDonations >= 5
                            ? "Silver"
                            : "Bronze"}
                      </div>
                      <div className="text-sm text-muted-foreground">Rank</div>
                    </div>
                  </div>
                </div>

                {/* Eligibility Countdown */}
                <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-accent">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {isEligible
                        ? "You are eligible to donate!"
                        : "Next Donation Eligibility"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {isEligible
                        ? "Ready now"
                        : `${calculateDaysUntilEligible()} days`}
                    </span>
                  </div>
                  <Progress
                    value={calculateEligibilityProgress()}
                    className="h-2"
                  />
                  {!isEligible && stats.nextEligibleDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Next eligible date:{" "}
                      {new Date(stats.nextEligibleDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>
                  Your contribution to saving lives
                </CardDescription>
              </CardHeader>
              <CardContent>
                {stats.lastDonation ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-accent/20 rounded-lg border border-accent">
                      <div className="bg-success/20 p-2 rounded-full mt-1">
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">
                            Last Donation
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Completed
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>
                            Date:{" "}
                            {new Date(stats.lastDonation).toLocaleDateString()}
                          </p>
                          <p>Blood Type: {user?.bloodGroup}</p>
                          <p>Units: 1</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <Button variant="link" asChild>
                        <Link to="/profile">View Complete History</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Droplet
                      className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50"
                      fill="currentColor"
                    />
                    <p className="text-muted-foreground mb-4">
                      No donation history yet
                    </p>
                    <Button asChild>
                      <Link to="/donation-camps">Find Donation Camps</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Camps */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Donation Camps</CardTitle>
                    <CardDescription>
                      Blood donation drives near you
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/donation-camps">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingCamps.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingCamps.map((camp) => (
                      <div
                        key={camp.id}
                        className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg border border-accent/50 hover:bg-accent/20 transition-colors"
                      >
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">
                            {camp.name}
                          </h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {new Date(camp.date).toLocaleDateString()} at{" "}
                              {camp.time}
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {camp.location}
                            </p>
                            <p>
                              <Badge variant="secondary" className="text-xs">
                                {camp.slotsAvailable}/{camp.totalSlots} slots
                                available
                              </Badge>
                            </p>
                          </div>
                          <Button
                            size="sm"
                            className="mt-3"
                            asChild
                          >
                            <Link to="/donation-camps">Register</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground mb-4">
                      No upcoming camps available
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/donation-camps">Browse All Camps</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/donation-camps">Find Donation Camps</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/donor-search">Find Other Donors</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/profile">Update Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Notifications</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/notifications">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          !notification.read
                            ? "bg-primary/5 border-primary/20"
                            : "bg-accent/10 border-accent/20"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={`mt-0.5 ${
                              notification.type === "request"
                                ? "text-primary"
                                : notification.type === "alert"
                                  ? "text-warning"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {notification.type === "request" && (
                              <AlertCircle className="h-4 w-4" />
                            )}
                            {notification.type === "reminder" && (
                              <Clock className="h-4 w-4" />
                            )}
                            {notification.type === "info" && (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(
                                notification.date
                              ).toLocaleDateString()}{" "}
                              at{" "}
                              {new Date(
                                notification.date
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground">
                      No new notifications
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Donation Impact */}
            <Card className="border-border shadow-medium bg-gradient-primary text-primary-foreground">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-12 w-12 mx-auto mb-3" fill="currentColor" />
                  <h3 className="text-2xl font-bold mb-1">{stats.liveSaved}</h3>
                  <p className="text-sm opacity-90 mb-2">Lives Saved</p>
                  <p className="text-xs opacity-75">
                    Each donation can save up to 3 lives. Keep making a
                    difference!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
