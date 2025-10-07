import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { donorService } from "@/services/donor.service";
import { DonationCamp } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Building, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DonationCamps() {
  const { user } = useAuth();
  const [camps, setCamps] = useState<DonationCamp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);

  useEffect(() => {
    loadCamps();
  }, []);

  const loadCamps = async () => {
    try {
      setIsLoading(true);
      const result = await donorService.getUpcomingCamps();
      setCamps(result);
    } catch (error) {
      toast.error("Failed to load camps");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (campId: string, campName: string) => {
    if (!user) {
      toast.error("Please login to book a camp");
      return;
    }

    try {
      setBookingInProgress(campId);
      const result = await donorService.bookCampSlot(user.id, campId);

      if (result.success) {
        toast.success("Registration Successful", {
          description: `You have been registered for ${campName}`,
        });
        loadCamps(); // Reload to show updated slots
      } else {
        toast.error(result.error || "Booking failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setBookingInProgress(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading camps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

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
                      onClick={() => handleRegister(camp.id, camp.name)}
                      className="w-full"
                      disabled={bookingInProgress === camp.id || camp.slotsAvailable === 0}
                    >
                      {bookingInProgress === camp.id ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Booking...
                        </>
                      ) : camp.slotsAvailable === 0 ? (
                        "Fully Booked"
                      ) : (
                        "Register Now"
                      )}
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
