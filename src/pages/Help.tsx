import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle, Mail, Phone, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Help() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Our support team will get back to you soon",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="donor" userName="Current User" notificationCount={2} />

      <main className="container py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Find answers to common questions or contact us</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Phone className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="font-semibold mb-2">Emergency Hotline</h3>
              <p className="text-2xl font-bold text-primary">1800-BLOOD</p>
              <p className="text-sm text-muted-foreground mt-2">24/7 Available</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-primary">support@lifelink.com</p>
              <p className="text-sm text-muted-foreground mt-2">Response in 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <Button className="mt-2">Start Chat</Button>
              <p className="text-sm text-muted-foreground mt-2">Online 9 AM - 6 PM</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Who can donate blood?</AccordionTrigger>
                <AccordionContent>
                  Anyone between 18-65 years, weighing at least 50kg, and in good health can donate blood. 
                  You should not have donated blood in the last 3 months and must be free from infections.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How often can I donate blood?</AccordionTrigger>
                <AccordionContent>
                  You can donate whole blood every 3 months (90 days). For platelet donations, you can donate 
                  every 2 weeks up to 24 times a year.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Is blood donation safe?</AccordionTrigger>
                <AccordionContent>
                  Yes, blood donation is completely safe. We use sterile, single-use needles and equipment. 
                  The process is performed by trained medical professionals following strict safety protocols.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How long does the donation process take?</AccordionTrigger>
                <AccordionContent>
                  The actual blood donation takes about 10-15 minutes. However, the entire process including 
                  registration, medical check-up, and refreshments takes approximately 45 minutes to 1 hour.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What should I do before donating blood?</AccordionTrigger>
                <AccordionContent>
                  Drink plenty of water, eat a healthy meal, avoid fatty foods, get adequate sleep, and bring 
                  a valid ID. Avoid alcohol 24 hours before donation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How do I request blood in an emergency?</AccordionTrigger>
                <AccordionContent>
                  Click the "Emergency Request" button on the homepage or call our 24/7 hotline. Provide patient 
                  details, blood type needed, and hospital information. We'll immediately notify matching donors.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} required />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
