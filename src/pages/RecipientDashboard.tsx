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
import {
  AlertCircle,
  Clock,
  CheckCircle,
  Loader2,
  Phone,
  MapPin,
  Droplet,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { bloodService } from "@/services/blood.service";
import { donorService } from "@/services/donor.service";
import { notificationService } from "@/services/notification.service";
import { BloodRequest, Donor, Notification } from "@/lib/mockData";
import Header from "@/components/Header";
import { toast } from "sonner";

export default function RecipientDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [matchedDonors, setMatchedDonors] = useState<Record<string, Donor[]>>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Load user's blood requests
      const userRequests = await bloodService.getBloodRequestsByRecipient(user.id);
      setRequests(userRequests);

      // Load matched donors for each request
      const donorsMap: Record<string, Donor[]> = {};
      for (const request of userRequests) {
        if (request.matchedDonors && request.matchedDonors.length > 0) {
          const donors = await Promise.all(
            request.matchedDonors.map((donorId) => donorService.getDonorById(donorId))
          );
          donorsMap[request.id] = donors.filter((d) => d !== null) as Donor[];
        }
      }
      setMatchedDonors(donorsMap);

      // Load notifications
      const userNotifications = await notificationService.getUserNotifications(user.id);
      setNotifications(userNotifications.slice(0, 5));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Matched":
        return "bg-blue-500 text-white";
      case "In Process":
        return "bg-secondary text-secondary-foreground";
      case "Completed":
        return "bg-success text-success-foreground";
      case "Cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency":
        return "bg-red-600 text-white";
      case "Urgent":
        return "bg-orange-500 text-white";
      case "Normal":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleCancelRequest = async (requestId: string) => {
    try {
      await bloodService.cancelBloodRequest(requestId);
      toast.success("Request cancelled successfully");
      loadDashboardData();
    } catch (error) {
      toast.error("Failed to cancel request");
    }
  };

  const activeRequests = requests.filter(
    (r) => r.status === "Pending" || r.status === "Matched" || r.status === "In Process"
  );
  const completedRequests = requests.filter(
    (r) => r.status === "Completed" || r.status === "Cancelled"
  );

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
            Welcome, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Manage your blood requests and track status
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergency Request Banner */}
            <Card className="border-primary bg-primary/5 shadow-medium">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                      <AlertCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Need Blood Urgently?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Create an emergency request for faster matching
                      </p>
                    </div>
                  </div>
                  <Button className="bg-gradient-primary" asChild>
                    <Link to="/emergency">Emergency Request</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Requests */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Blood Requests</CardTitle>
                    <CardDescription>Track your ongoing requests</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/blood-request">
                      <Droplet className="h-4 w-4 mr-2" />
                      New Request
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {activeRequests.length > 0 ? (
                  <div className="space-y-4">
                    {activeRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 bg-muted/50 rounded-lg border border-border"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">
                                Request #{request.id}
                              </h3>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status === "Pending" && (
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                )}
                                {request.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center gap-4">
                                <span>
                                  Blood Type:{" "}
                                  <strong className="text-primary">
                                    {request.bloodGroup}
                                  </strong>
                                </span>
                                <span>
                                  Units: <strong>{request.quantity}</strong>
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {request.hospital}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3" />
                                {new Date(request.requestDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency} Priority
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2 text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground font-medium">
                              {request.status}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                request.status === "Completed"
                                  ? "bg-success w-full"
                                  : request.status === "In Process"
                                    ? "bg-secondary w-3/4"
                                    : request.status === "Matched"
                                      ? "bg-blue-500 w-1/2"
                                      : "bg-warning w-1/4"
                              }`}
                            ></div>
                          </div>
                        </div>

                        {/* Matched Donors */}
                        {matchedDonors[request.id] &&
                          matchedDonors[request.id].length > 0 && (
                            <div className="mt-3 pt-3 border-t border-border">
                              <p className="text-sm font-medium text-foreground mb-2">
                                Matched Donors: {matchedDonors[request.id].length}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {matchedDonors[request.id].slice(0, 3).map((donor) => (
                                  <Badge
                                    key={donor.id}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {donor.name} • {donor.bloodGroup}
                                  </Badge>
                                ))}
                                {matchedDonors[request.id].length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{matchedDonors[request.id].length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                        {/* Actions */}
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/donor-search">View Donors</Link>
                          </Button>
                          {request.status === "Pending" && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleCancelRequest(request.id)}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Droplet
                      className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50"
                      fill="currentColor"
                    />
                    <p className="text-muted-foreground mb-4">
                      No active requests
                    </p>
                    <Button asChild>
                      <Link to="/blood-request">Create Blood Request</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Request History */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Request History</CardTitle>
                <CardDescription>Your past blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                {completedRequests.length > 0 ? (
                  <div className="space-y-3">
                    {completedRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              #{request.id}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {request.bloodGroup}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {request.hospital} •{" "}
                            {new Date(request.requestDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status === "Completed" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {request.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No request history
                  </p>
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
                <Button className="w-full bg-gradient-danger" asChild>
                  <Link to="/emergency">Emergency Request</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/blood-request">New Blood Request</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/donor-search">Search Donors</Link>
                </Button>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/profile">My Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Request Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-2xl font-bold text-foreground">
                        {requests.length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Active</span>
                      <span className="text-2xl font-bold text-warning">
                        {activeRequests.length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        Completed
                      </span>
                      <span className="text-2xl font-bold text-success">
                        {
                          requests.filter((r) => r.status === "Completed")
                            .length
                        }
                      </span>
                    </div>
                  </div>
                </div>
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
                        <p className="text-sm font-medium text-foreground">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    No notifications
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Emergency Hotline */}
            <Card className="border-border shadow-medium bg-gradient-danger text-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="text-lg font-bold mb-1">24/7 Emergency</h3>
                  <p className="text-2xl font-bold tracking-wider">
                    1800-BLOOD
                  </p>
                  <p className="text-sm opacity-90 mt-2">
                    Call for immediate assistance
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
