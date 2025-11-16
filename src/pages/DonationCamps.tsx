import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Building } from "lucide-react";
import { mockDonationCamps } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function DonationCamps() {
  const [camps] = useState(mockDonationCamps);
  const { toast } = useToast();

  const handleRegister = (campName: string) => {
    toast({
      title: "Registration Successful",
      description: `You have been registered for ${campName}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="donor" userName="Current User" notificationCount={2} />

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Blood Donation Camps</h1>
          <p className="text-muted-foreground">Find and register for upcoming blood donation camps near you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => {
            const availabilityPercentage = (camp.slotsAvailable / camp.totalSlots) * 100;
            const isLowAvailability = availabilityPercentage < 30;

            return (
              <Card key={camp.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{camp.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={isLowAvailability ? "destructive" : "default"}>
                      {camp.slotsAvailable} / {camp.totalSlots} slots available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{camp.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">
                        {new Date(camp.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{camp.time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{camp.organizer}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => handleRegister(camp.name)}
                      className="w-full"
                      disabled={camp.slotsAvailable === 0}
                    >
                      {camp.slotsAvailable === 0 ? "Fully Booked" : "Register Now"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {camps.length === 0 && (
          <Card className="p-12 text-center">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Upcoming Camps</h3>
            <p className="text-muted-foreground">Check back later for new donation camps</p>
          </Card>
        )}
      </main>
    </div>
  );
}
