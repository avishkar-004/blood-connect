import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Droplet, User, LogOut, Bell, Search, AlertTriangle, TrendingUp, Users, Package, Calendar, Plus, Filter } from "lucide-react";

const AdminDashboard = () => {
  const inventoryData = [
    { bloodType: "A+", units: 45, status: "Good", expiryNear: 5, lastUpdated: "2 hours ago" },
    { bloodType: "A-", units: 12, status: "Low", expiryNear: 2, lastUpdated: "4 hours ago" },
    { bloodType: "B+", units: 38, status: "Good", expiryNear: 3, lastUpdated: "1 hour ago" },
    { bloodType: "B-", units: 8, status: "Critical", expiryNear: 1, lastUpdated: "5 hours ago" },
    { bloodType: "AB+", units: 22, status: "Medium", expiryNear: 4, lastUpdated: "3 hours ago" },
    { bloodType: "AB-", units: 6, status: "Critical", expiryNear: 1, lastUpdated: "6 hours ago" },
    { bloodType: "O+", units: 52, status: "Good", expiryNear: 6, lastUpdated: "1 hour ago" },
    { bloodType: "O-", units: 15, status: "Low", expiryNear: 2, lastUpdated: "2 hours ago" },
  ];

  const pendingRequests = [
    { id: "REQ-001", patient: "Sarah Johnson", bloodType: "O+", units: 2, urgency: "High", hospital: "City Hospital" },
    { id: "REQ-002", patient: "Michael Brown", bloodType: "A-", units: 1, urgency: "Medium", hospital: "General Hospital" },
    { id: "REQ-003", patient: "Emily Davis", bloodType: "B+", units: 3, urgency: "High", hospital: "Metro Clinic" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-warning text-warning-foreground";
      case "Critical": return "bg-primary text-primary-foreground";
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
            <span className="text-2xl font-bold text-foreground">LifeLink Admin</span>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Blood Bank Management</h1>
          <p className="text-muted-foreground">Monitor inventory, manage requests, and oversee operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Units</p>
                  <p className="text-3xl font-bold text-foreground">198</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% this week
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Donors</p>
                  <p className="text-3xl font-bold text-foreground">1,245</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +8% this month
                  </p>
                </div>
                <div className="bg-secondary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                  <p className="text-3xl font-bold text-foreground">23</p>
                  <p className="text-xs text-warning flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    5 urgent
                  </p>
                </div>
                <div className="bg-warning/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Low Stock Alert</p>
                  <p className="text-3xl font-bold text-foreground">4</p>
                  <p className="text-xs text-primary flex items-center gap-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    Needs attention
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Blood Inventory */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blood Inventory</CardTitle>
                    <CardDescription>Current stock levels by blood type</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm" className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Units
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Units Available</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiring Soon</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.map((item) => (
                      <TableRow key={item.bloodType}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Droplet className="h-4 w-4 text-primary" fill="currentColor" />
                            {item.bloodType}
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{item.units}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)} variant="outline">
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{item.expiryNear}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.lastUpdated}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pending Requests */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending Blood Requests</CardTitle>
                    <CardDescription>Requests awaiting assignment</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{request.patient}</h4>
                            <Badge className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Request #{request.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground mb-1">
                            <Droplet className="inline h-4 w-4 text-primary mr-1" fill="currentColor" />
                            {request.bloodType}
                          </div>
                          <p className="text-xs text-muted-foreground">{request.units} units</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{request.hospital}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Assign Donor</Button>
                          <Button size="sm" className="bg-gradient-primary">Process</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Quick Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search donors..." className="pl-10" />
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search requests..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Low Stock Alerts */}
            <Card className="border-primary/50 bg-primary/5 shadow-medium">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Low Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventoryData.filter(item => item.status === "Critical" || item.status === "Low").map((item) => (
                    <div key={item.bloodType} className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-primary" fill="currentColor" />
                        <span className="font-medium text-foreground">{item.bloodType}</span>
                      </div>
                      <Badge className={getStatusColor(item.status)} variant="outline">
                        {item.units} units
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Request Donations
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Donors
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Update Inventory
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
