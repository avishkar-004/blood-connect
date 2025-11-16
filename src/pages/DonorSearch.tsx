import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Phone, Mail, Users } from "lucide-react";
import { mockDonors, bloodTypes, BloodType, Donor } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function DonorSearch() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodType | "all">("all");
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>(mockDonors);
  const { toast } = useToast();

  const handleSearch = () => {
    let results = mockDonors;

    if (selectedBloodGroup !== "all") {
      results = results.filter((donor) => donor.bloodGroup === selectedBloodGroup);
    }

    if (searchLocation) {
      results = results.filter((donor) =>
        donor.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    setFilteredDonors(results);
    toast({
      title: "Search Complete",
      description: `Found ${results.length} matching donors`,
    });
  };

  const handleContactDonor = (donor: Donor) => {
    toast({
      title: "Contact Request Sent",
      description: `A notification has been sent to ${donor.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="recipient" userName="Current User" notificationCount={3} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Blood Donors</h1>
          <p className="text-muted-foreground">Search for compatible blood donors in your area</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="Enter city or area"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Blood Group</label>
                <Select value={selectedBloodGroup} onValueChange={(value) => setSelectedBloodGroup(value as BloodType | "all")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blood Groups</SelectItem>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Search Donors
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span>{filteredDonors.length} donors found</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <Card key={donor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{donor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {donor.age} years, {donor.gender}
                    </p>
                  </div>
                  <Badge variant={donor.available ? "default" : "secondary"} className="text-lg px-3 py-1">
                    {donor.bloodGroup}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{donor.location}</span>
                  {donor.distance && (
                    <span className="text-muted-foreground">({donor.distance} km)</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{donor.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{donor.email}</span>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Total Donations:</span>
                    <span className="font-semibold">{donor.totalDonations}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={donor.available ? "default" : "secondary"}>
                      {donor.available ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={() => handleContactDonor(donor)}
                  disabled={!donor.available}
                  className="w-full mt-2"
                >
                  Contact Donor
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Donors Found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </Card>
        )}
      </main>
    </div>
  );
}
