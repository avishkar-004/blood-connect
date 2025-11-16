import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Droplet, Calendar, MapPin, Bell, Award, Heart, CheckCircle, Clock, User, LogOut } from "lucide-react";

const DonorDashboard = () => {
  const donationHistory = [
    { date: "2024-01-15", location: "City Hospital", status: "Completed", units: 1 },
    { date: "2023-10-22", location: "Community Blood Drive", status: "Completed", units: 1 },
    { date: "2023-07-18", location: "Mobile Blood Bank", status: "Completed", units: 1 },
  ];

  const upcomingCamps = [
    { name: "Community Health Fair", date: "2024-02-20", location: "Central Park", distance: "2.3 km" },
    { name: "Corporate Blood Drive", date: "2024-02-25", location: "Tech Plaza", distance: "5.1 km" },
  ];

  const notifications = [
    { message: "Urgent O- blood needed at City Hospital", time: "2 hours ago", urgent: true },
    { message: "Your next donation eligibility: Feb 15, 2024", time: "1 day ago", urgent: false },
    { message: "Thank you! Your last donation saved 3 lives", time: "2 days ago", urgent: false },
  ];

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
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
                    <CardDescription>Blood Type: O+ | Member since Jan 2023</CardDescription>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Eligible
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Droplet className="h-6 w-6 text-primary" fill="currentColor" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">3</div>
                      <div className="text-sm text-muted-foreground">Donations</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-success/10 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">9</div>
                      <div className="text-sm text-muted-foreground">Lives Saved</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-warning/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">Gold</div>
                      <div className="text-sm text-muted-foreground">Status</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Next Eligible Donation</span>
                    <span className="text-sm text-muted-foreground">30 days</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    You'll be eligible to donate again on <strong>February 15, 2024</strong>
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button className="flex-1 bg-gradient-primary">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Available
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Your contribution to saving lives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Droplet className="h-5 w-5 text-primary" fill="currentColor" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{donation.location}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            {new Date(donation.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {donation.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{donation.units} unit</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nearby Camps */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Upcoming Blood Drives</CardTitle>
                <CardDescription>Donation camps near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCamps.map((camp, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-accent/50">
                      <div className="flex items-center gap-4">
                        <div className="bg-secondary/10 p-2 rounded-full">
                          <Calendar className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{camp.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(camp.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {camp.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-secondary mb-1">{camp.distance}</div>
                        <Button size="sm" variant="outline">Book Slot</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${notification.urgent ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'}`}
                    >
                      <p className={`text-sm ${notification.urgent ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" size="sm">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/donor-search">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Nearby Camps
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Donation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Impact Card */}
            <Card className="border-primary/50 bg-gradient-primary text-primary-foreground shadow-medium">
              <CardHeader>
                <CardTitle className="text-primary-foreground">Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">9</div>
                  <p className="text-sm opacity-90 mb-4">lives potentially saved</p>
                  <p className="text-xs opacity-75">
                    Every donation can save up to 3 lives. Keep making a difference!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
