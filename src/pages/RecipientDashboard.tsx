import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, User, LogOut, Bell, AlertCircle, Clock, CheckCircle, Loader2, Phone, MapPin } from "lucide-react";

const RecipientDashboard = () => {
  const activeRequests = [
    { 
      id: "REQ-001", 
      bloodType: "O+", 
      units: 2, 
      urgency: "High", 
      status: "Matching", 
      hospital: "City Hospital",
      date: "2024-01-16",
      matchedDonors: 3
    },
  ];

  const requestHistory = [
    { id: "REQ-005", bloodType: "O+", date: "2023-12-10", status: "Completed", hospital: "General Hospital" },
    { id: "REQ-003", bloodType: "O+", date: "2023-10-15", status: "Completed", hospital: "City Hospital" },
  ];

  const matchedDonors = [
    { name: "John D.", bloodType: "O+", distance: "2.5 km", available: true, donations: 5 },
    { name: "Sarah M.", bloodType: "O+", distance: "3.8 km", available: true, donations: 8 },
    { name: "Mike R.", bloodType: "O+", distance: "5.2 km", available: true, donations: 3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Matching": return "bg-warning text-warning-foreground";
      case "Completed": return "bg-success text-success-foreground";
      case "In Process": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold text-foreground">LifeLink</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Recipient Dashboard</h1>
          <p className="text-muted-foreground">Manage your blood requests and track status</p>
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
                      <h3 className="font-semibold text-foreground">Need Blood Urgently?</h3>
                      <p className="text-sm text-muted-foreground">Create an emergency request for faster matching</p>
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
                      <div key={request.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-foreground">Request #{request.id}</h3>
                              <Badge className={getStatusColor(request.status)}>
                                {request.status === "Matching" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                                {request.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div className="flex items-center gap-4">
                                <span>Blood Type: <strong className="text-primary">{request.bloodType}</strong></span>
                                <span>Units: <strong>{request.units}</strong></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {request.hospital}
                              </div>
                            </div>
                          </div>
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {request.urgency} Priority
                          </Badge>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Request Status</span>
                            <span>{request.matchedDonors} donors matched</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-warning w-1/2"></div>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-success flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Submitted
                            </span>
                            <span className="text-warning flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Matching
                            </span>
                            <span className="text-muted-foreground">In Process</span>
                            <span className="text-muted-foreground">Completed</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Matched Donors
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Support
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Droplet className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground mb-4">No active requests</p>
                    <Button asChild>
                      <Link to="/blood-request">Create Blood Request</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Matched Donors */}
            {activeRequests.length > 0 && (
              <Card className="border-border shadow-medium">
                <CardHeader>
                  <CardTitle>Matched Donors</CardTitle>
                  <CardDescription>Compatible donors found for your request</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {matchedDonors.map((donor, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-accent/50">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{donor.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Droplet className="h-3 w-3 text-primary" fill="currentColor" />
                                {donor.bloodType}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {donor.distance}
                              </span>
                              <span>{donor.donations} donations</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {donor.available && (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                              Available
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Request History */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Request History</CardTitle>
                <CardDescription>Your previous blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requestHistory.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-success/10 p-2 rounded-full">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Request #{request.id}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.bloodType} • {new Date(request.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Blood Type</span>
                  <span className="font-semibold text-primary">O+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Requests</span>
                  <span className="font-semibold text-foreground">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="font-semibold text-foreground">Oct 2023</span>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-primary/50 bg-primary/5 shadow-medium">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Emergency Hotline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  For urgent blood requirements, call our 24/7 helpline
                </p>
                <a href="tel:1800-BLOOD-HELP" className="block">
                  <Button className="w-full bg-gradient-primary">
                    <Phone className="h-4 w-4 mr-2" />
                    1-800-BLOOD-HELP
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  Request Guidelines
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  FAQ
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
