import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Droplet, Calendar, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.k@email.com",
    phone: "+91 98765 43210",
    age: "28",
    gender: "Male",
    bloodGroup: "O+",
    location: "Delhi",
    address: "123 Main Street, Connaught Place",
    emergencyContact: "+91 98765 43211",
  });

  const donationHistory = [
    { date: "2024-08-15", location: "Apollo Hospital", units: 1 },
    { date: "2024-02-10", location: "Max Hospital", units: 1 },
    { date: "2023-08-20", location: "Fortis Hospital", units: 1 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="donor" userName={profile.name} notificationCount={2} />

      <main className="container py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and donation history</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <div className="flex items-center gap-2">
                      <Droplet className="h-4 w-4 text-primary" />
                      <Input
                        id="bloodGroup"
                        value={profile.bloodGroup}
                        disabled
                        className="font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={profile.gender}
                      onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">City</Label>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <Input
                      id="emergency"
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Donation Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <p className="text-3xl font-bold text-primary">{donationHistory.length}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Donations</p>
                  </div>
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <p className="text-3xl font-bold text-primary">{donationHistory.length}</p>
                    <p className="text-sm text-muted-foreground mt-1">Lives Saved</p>
                  </div>
                  <div className="text-center p-4 bg-accent rounded-lg">
                    <p className="text-3xl font-bold text-success">Eligible</p>
                    <p className="text-sm text-muted-foreground mt-1">Current Status</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Droplet className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{donation.location}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(donation.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">{donation.units} Unit(s)</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
