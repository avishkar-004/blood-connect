import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplet, ArrowLeft, Upload, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BloodRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Request Submitted Successfully!",
      description: "We're matching you with compatible donors now.",
    });

    setTimeout(() => {
      navigate("/recipient-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold text-foreground">LifeLink</span>
          </div>
          
          <Button variant="ghost" asChild>
            <Link to="/recipient-dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Request Blood</h1>
            <p className="text-muted-foreground">Fill out the form below to request blood units</p>
          </div>

          {/* Emergency Banner */}
          <Card className="border-primary bg-primary/5 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">For Emergency Requests</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you need blood immediately, please call our 24/7 hotline at{" "}
                    <a href="tel:1800-BLOOD-HELP" className="text-primary font-medium hover:underline">
                      1-800-BLOOD-HELP
                    </a>{" "}
                    or use the emergency request button below.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                    <Link to="/emergency">Emergency Request</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Form */}
          <Card className="border-border shadow-medium">
            <CardHeader>
              <CardTitle>Blood Request Form</CardTitle>
              <CardDescription>Please provide accurate information for faster matching</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Patient Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Patient Name</Label>
                      <Input id="patientName" placeholder="Full name" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Age</Label>
                      <Input id="patientAge" type="number" placeholder="Age" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" type="tel" placeholder="+1 (555) 000-0000" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="email@example.com" required />
                    </div>
                  </div>
                </div>

                {/* Blood Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Blood Requirements</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type Required</Label>
                      <Select required>
                        <SelectTrigger id="bloodType">
                          <SelectValue placeholder="Select blood type" />
                        </SelectTrigger>
                        <SelectContent>
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
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="units">Units Required</Label>
                      <Input id="units" type="number" min="1" placeholder="Number of units" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select required>
                        <SelectTrigger id="urgency">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Scheduled)</SelectItem>
                          <SelectItem value="medium">Medium (Within 48 hours)</SelectItem>
                          <SelectItem value="high">High (Within 24 hours)</SelectItem>
                          <SelectItem value="critical">Critical (Immediate)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Hospital Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Hospital/Medical Facility</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital Name</Label>
                    <Select required>
                      <SelectTrigger id="hospital">
                        <SelectValue placeholder="Select hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="city-hospital">City Hospital</SelectItem>
                        <SelectItem value="general-hospital">General Hospital</SelectItem>
                        <SelectItem value="metro-clinic">Metro Medical Clinic</SelectItem>
                        <SelectItem value="central-hospital">Central Hospital</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Hospital Address</Label>
                    <Input id="address" placeholder="Full address with city and state" required />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor's Name</Label>
                      <Input id="doctor" placeholder="Attending physician" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="doctorContact">Doctor's Contact</Label>
                      <Input id="doctorContact" type="tel" placeholder="Contact number" required />
                    </div>
                  </div>
                </div>

                {/* Medical Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Medical Details</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Blood Requirement</Label>
                    <Textarea 
                      id="reason" 
                      placeholder="Describe the medical condition requiring blood transfusion"
                      className="min-h-24"
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prescription">Upload Doctor's Prescription</Label>
                    <div className="flex items-center gap-4">
                      <Input id="prescription" type="file" accept=".pdf,.jpg,.jpeg,.png" className="flex-1" />
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, JPG, PNG (Max 5MB)
                    </p>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                  <Textarea 
                    id="additionalNotes" 
                    placeholder="Any additional information that might help with your request"
                    className="min-h-20"
                  />
                </div>

                {/* Terms & Submit */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 rounded" required />
                    <span className="text-sm text-muted-foreground">
                      I confirm that all information provided is accurate and I understand that providing false information may delay the blood matching process. I consent to LifeLink contacting me regarding this request.
                    </span>
                  </label>

                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate("/recipient-dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-primary"
                    >
                      <Droplet className="h-4 w-4 mr-2" fill="currentColor" />
                      Submit Request
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BloodRequest;
