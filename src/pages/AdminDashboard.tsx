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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  TrendingUp,
  Users,
  Package,
  Loader2,
  Plus,
  Minus,
  CheckCircle,
} from "lucide-react";
import { bloodService } from "@/services/blood.service";
import { BloodInventory, BloodRequest } from "@/lib/mockData";
import Header from "@/components/Header";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [inventory, setInventory] = useState<BloodInventory[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [stats, setStats] = useState({
    totalUnits: 0,
    totalRequests: 0,
    pendingRequests: 0,
    criticalTypes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [updatingInventory, setUpdatingInventory] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load inventory and requests
      const [inventoryData, requestsData, statsData] = await Promise.all([
        bloodService.getBloodInventory(),
        bloodService.getBloodRequests(),
        bloodService.getStatistics(),
      ]);

      setInventory(inventoryData);
      setRequests(requestsData);

      // Calculate stats
      const totalUnits = inventoryData.reduce((sum, item) => sum + item.units, 0);
      const criticalTypes = inventoryData.filter(
        (i) => i.status === "Critical"
      ).length;

      setStats({
        totalUnits,
        totalRequests: statsData.totalRequests,
        pendingRequests: statsData.pendingRequests,
        criticalTypes,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInventory = async (
    itemId: string,
    currentUnits: number,
    change: number
  ) => {
    const newUnits = Math.max(0, currentUnits + change);

    try {
      setUpdatingInventory(itemId);

      let newStatus: BloodInventory["status"] = "Available";
      if (newUnits < 10) newStatus = "Critical";
      else if (newUnits < 20) newStatus = "Low Stock";

      await bloodService.updateInventory(itemId, {
        units: newUnits,
        status: newStatus,
      });

      toast.success("Inventory updated successfully");
      loadDashboardData(); // Reload to show updated data
    } catch (error) {
      toast.error("Failed to update inventory");
    } finally {
      setUpdatingInventory(null);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    try {
      await bloodService.updateBloodRequestStatus(requestId, "In Process");
      toast.success("Request approved and in process");
      loadDashboardData();
    } catch (error) {
      toast.error("Failed to approve request");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-success-foreground";
      case "Low Stock":
        return "bg-warning text-warning-foreground";
      case "Critical":
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

  const pendingRequests = requests.filter((r) => r.status === "Pending");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
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
            Blood Bank Management
          </h1>
          <p className="text-muted-foreground">
            Monitor inventory, manage requests, and oversee operations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Units</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalUnits}
                  </p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    All blood types
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
                  <p className="text-sm text-muted-foreground mb-1">
                    Pending Requests
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.pendingRequests}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Awaiting approval
                  </p>
                </div>
                <div className="bg-warning/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Requests
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalRequests}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">All time</p>
                </div>
                <div className="bg-success/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-medium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Critical Stock
                  </p>
                  <p className="text-3xl font-bold text-destructive">
                    {stats.criticalTypes}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Blood types</p>
                </div>
                <div className="bg-destructive/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Blood Inventory */}
          <Card className="border-border shadow-medium">
            <CardHeader>
              <CardTitle>Blood Inventory</CardTitle>
              <CardDescription>Current stock levels by blood type</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.bloodGroup}
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold">
                          {item.units}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateInventory(item.id, item.units, 5)
                            }
                            disabled={updatingInventory === item.id}
                          >
                            {updatingInventory === item.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleUpdateInventory(item.id, item.units, -5)
                            }
                            disabled={
                              updatingInventory === item.id || item.units < 5
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
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
              <CardTitle>Pending Blood Requests</CardTitle>
              <CardDescription>
                Requests awaiting approval ({pendingRequests.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">
                              {request.recipientName}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                            >
                              {request.bloodGroup}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {request.hospital}
                          </p>
                        </div>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        <p>Units needed: {request.quantity}</p>
                        <p>Date: {new Date(request.requestDate).toLocaleDateString()}</p>
                        {request.doctorNote && (
                          <p className="mt-1 italic">Note: {request.doctorNote}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          Approve & Process
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to="/donor-search">Find Donors</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    No pending requests
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alerts */}
        {inventory.filter((i) => i.status !== "Available").length > 0 && (
          <Card className="mt-6 border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {inventory
                  .filter((i) => i.status !== "Available")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-background rounded-lg border border-warning/20"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-foreground">
                            {item.bloodGroup}
                          </span>
                          <p className="text-sm text-muted-foreground">
                            Only {item.units} units remaining
                          </p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
