import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Droplet, AlertCircle, Phone, MapPin, Calendar, Award } from "lucide-react";
import heroImage from "@/assets/hero-blood-donation.jpg";

const Index = () => {
  const stats = [
    { label: "Active Donors", value: "12,450", icon: Users, color: "text-secondary" },
    { label: "Blood Units Available", value: "3,240", icon: Droplet, color: "text-primary" },
    { label: "Lives Saved", value: "8,920", icon: Heart, color: "text-success" },
    { label: "Urgent Requests", value: "23", icon: AlertCircle, color: "text-warning" },
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header Navigation */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-primary" fill="currentColor" />
            <span className="text-2xl font-bold text-foreground">LifeLink</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#stats" className="text-muted-foreground hover:text-foreground transition-colors">Statistics</a>
            <Button variant="ghost" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button className="bg-gradient-primary" asChild>
              <Link to="/auth">Register</Link>
            </Button>
          </nav>

          {/* Mobile Emergency Button */}
          <Button className="md:hidden bg-gradient-primary" size="sm" asChild>
            <Link to="/emergency">
              <AlertCircle className="h-4 w-4 mr-2" />
              Emergency
            </Link>
          </Button>
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-4 flex-wrap">
          <Phone className="h-5 w-5" />
          <span className="font-semibold">24/7 Emergency Hotline:</span>
          <a href="tel:1800-BLOOD-HELP" className="underline hover:text-primary-glow transition-colors">
            1-800-BLOOD-HELP
          </a>
          <Button variant="secondary" size="sm" className="ml-4" asChild>
            <Link to="/emergency">Request Blood Now</Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-accent/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Save Lives,
                <span className="text-primary block">Donate Blood</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect donors with recipients in real-time. Every donation can save up to three lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-primary text-lg" asChild>
                  <Link to="/auth?type=donor">
                    <Heart className="mr-2 h-5 w-5" />
                    Become a Donor
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <Link to="/auth?type=recipient">
                    <Droplet className="mr-2 h-5 w-5" />
                    Request Blood
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Blood donation community" 
                className="rounded-2xl shadow-strong w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-medium border border-border">
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">98%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border hover:shadow-medium transition-all">
                <CardContent className="pt-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Type Availability */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Current Blood Availability</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {bloodTypes.map((type) => (
              <Card key={type} className="text-center hover:border-primary hover:shadow-medium transition-all cursor-pointer">
                <CardContent className="pt-6 pb-6">
                  <Droplet className="h-8 w-8 mx-auto mb-2 text-primary" fill="currentColor" />
                  <div className="text-2xl font-bold text-foreground mb-1">{type}</div>
                  <div className="text-xs text-success font-medium">Available</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How LifeLink Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-medium transition-all">
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Register</CardTitle>
                <CardDescription>Sign up as a donor or recipient with your medical details</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-medium transition-all">
              <CardHeader>
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <CardTitle>Get Matched</CardTitle>
                <CardDescription>Our system finds compatible donors based on blood type and location</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-medium transition-all">
              <CardHeader>
                <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-success">3</span>
                </div>
                <CardTitle>Save Lives</CardTitle>
                <CardDescription>Connect, donate, and help save lives in your community</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground shadow-strong">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8 opacity-90">Join thousands of donors and recipients using LifeLink</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth?type=donor">
                  Register as Donor
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-card text-foreground hover:bg-card/90" asChild>
                <Link to="/donor-search">
                  Find a Donor
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-card text-foreground hover:bg-card/90" asChild>
                <Link to="/auth?type=admin">
                  Blood Bank Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplet className="h-6 w-6 text-primary" fill="currentColor" />
                <span className="text-xl font-bold text-foreground">LifeLink</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting donors with recipients to save lives, one donation at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
                <li><Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">Register</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Donor Guidelines</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Emergency Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>1-800-BLOOD-HELP</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Available 24/7 Nationwide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 LifeLink Blood Bank. All rights reserved. | Saving lives through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
