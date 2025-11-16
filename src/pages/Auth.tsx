import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplet, ArrowLeft, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userType = searchParams.get("type") || "donor";
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: isLogin ? "Login Successful!" : "Registration Successful!",
      description: isLogin 
        ? "Welcome back to LifeLink" 
        : "Your account has been created successfully",
    });

    // Navigate to appropriate dashboard based on user type
    setTimeout(() => {
      if (userType === "donor") navigate("/donor-dashboard");
      else if (userType === "recipient") navigate("/recipient-dashboard");
      else if (userType === "admin") navigate("/admin-dashboard");
      else navigate("/donor-dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplet className="h-10 w-10 text-primary" fill="currentColor" />
            <span className="text-3xl font-bold text-foreground">LifeLink</span>
          </div>
          <p className="text-muted-foreground">Join our community of life-savers</p>
        </div>

        <Card className="border-border shadow-strong">
          <CardHeader>
            <Tabs value={isLogin ? "login" : "register"} onValueChange={(v) => setIsLogin(v === "login")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleAuth} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="userType">I am a</Label>
                  <Select defaultValue={userType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="donor">Blood Donor</SelectItem>
                      <SelectItem value="recipient">Blood Recipient</SelectItem>
                      <SelectItem value="admin">Blood Bank Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {!isLogin && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="firstName" placeholder="John" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>

              {!isLogin && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="dob" type="date" className="pl-10" required />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Select required>
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
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="location" placeholder="City, State" className="pl-10" required />
                    </div>
                  </div>

                  {userType === "donor" && (
                    <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                      <h4 className="font-semibold text-accent-foreground mb-2">Donor Eligibility Criteria:</h4>
                      <ul className="text-sm text-accent-foreground/80 space-y-1">
                        <li>• Must be 18-65 years old</li>
                        <li>• Weight at least 110 lbs (50 kg)</li>
                        <li>• In good health</li>
                        <li>• No recent tattoos or piercings (within 3 months)</li>
                      </ul>
                    </div>
                  )}
                </>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">Forgot password?</a>
                </div>
              )}

              <Button type="submit" className="w-full bg-gradient-primary" size="lg">
                {isLogin ? "Login" : "Create Account"}
              </Button>

              {!isLogin && (
                <p className="text-xs text-center text-muted-foreground">
                  By registering, you agree to our Terms of Service and Privacy Policy
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Emergency Access */}
        <Card className="mt-4 border-primary/50 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Droplet className="h-5 w-5 text-primary" />
              Need Blood Urgently?
            </CardTitle>
            <CardDescription>
              Skip registration and make an emergency request now
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link to="/emergency">Emergency Blood Request</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
