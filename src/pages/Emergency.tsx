import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { BloodType } from "@/lib/mockData";

export default function Emergency() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "" as BloodType | "",
    hospital: "",
    location: "",
    contactNumber: "",
    urgencyLevel: "critical",
    unitsRequired: "",
    additionalInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      "Emergency request submitted! We're finding donors near you...",
      {
        description: "You'll receive a call within 5-10 minutes.",
        duration: 5000,
      }
    );

    setIsSubmitting(false);
    navigate("/recipient-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Emergency Banner */}
      <div className="bg-gradient-danger text-white py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <AlertCircle className="h-6 w-6 animate-pulse" />
          <h1 className="text-2xl font-bold">EMERGENCY BLOOD REQUEST</h1>
          <AlertCircle className="h-6 w-6 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Emergency Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100">
                    Fast Response
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    5-10 min callback
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Nearby Donors
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Auto location match
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    24/7 Support
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Always available
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Emergency Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-red-600">
                  Emergency Blood Request Form
                </h2>
                <p className="text-sm text-muted-foreground">
                  Fill in the details below. Our team will contact you
                  immediately.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="required">
                    Patient Name
                  </Label>
                  <Input
                    id="patientName"
                    placeholder="Enter patient name"
                    required
                    value={formData.patientName}
                    onChange={(e) =>
                      setFormData({ ...formData, patientName: e.target.value })
                    }
                  />
                </div>

                {/* Blood Type */}
                <div className="space-y-2">
                  <Label htmlFor="bloodType" className="required">
                    Blood Type Required
                  </Label>
                  <Select
                    required
                    value={formData.bloodType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, bloodType: value as BloodType })
                    }
                  >
                    <SelectTrigger>
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

                {/* Hospital */}
                <div className="space-y-2">
                  <Label htmlFor="hospital" className="required">
                    Hospital Name
                  </Label>
                  <Input
                    id="hospital"
                    placeholder="Enter hospital name"
                    required
                    value={formData.hospital}
                    onChange={(e) =>
                      setFormData({ ...formData, hospital: e.target.value })
                    }
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="required">
                    Location/City
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter city or area"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="contactNumber" className="required">
                    Contact Number
                  </Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Units Required */}
                <div className="space-y-2">
                  <Label htmlFor="unitsRequired" className="required">
                    Units Required
                  </Label>
                  <Input
                    id="unitsRequired"
                    type="number"
                    min="1"
                    placeholder="Number of units"
                    required
                    value={formData.unitsRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unitsRequired: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Urgency Level */}
              <div className="space-y-2">
                <Label htmlFor="urgencyLevel" className="required">
                  Urgency Level
                </Label>
                <Select
                  required
                  value={formData.urgencyLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, urgencyLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">
                      🔴 Critical - Immediate (within 1 hour)
                    </SelectItem>
                    <SelectItem value="urgent">
                      🟠 Urgent - Within 6 hours
                    </SelectItem>
                    <SelectItem value="moderate">
                      🟡 Moderate - Within 24 hours
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Info */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any additional details about the emergency..."
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalInfo: e.target.value,
                    })
                  }
                />
              </div>

              {/* Emergency Notice */}
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-semibold mb-1">
                      Emergency Protocol Active
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        Our team will call you within 5-10 minutes to verify
                        details
                      </li>
                      <li>
                        We'll simultaneously alert all compatible donors nearby
                      </li>
                      <li>
                        You'll receive SMS updates on donor availability
                      </li>
                      <li>For immediate help, call our 24/7 hotline: 1800-BLOOD</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-danger hover:opacity-90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Emergency Request...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="mr-2 h-5 w-5" />
                      Submit Emergency Request
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>

          {/* Emergency Hotline */}
          <Card className="mt-6 p-6 bg-gradient-danger text-white">
            <div className="text-center">
              <Phone className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-xl font-bold mb-1">
                24/7 Emergency Hotline
              </h3>
              <p className="text-2xl font-bold tracking-wider mb-2">
                1800-BLOOD-NOW
              </p>
              <p className="text-sm opacity-90">
                Call if you need immediate assistance or can't submit online
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
