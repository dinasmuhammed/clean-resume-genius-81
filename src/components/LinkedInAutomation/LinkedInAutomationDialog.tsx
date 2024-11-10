import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const LinkedInAutomationDialog = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    jobTitle: "",
    location: "",
    preferences: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://formspree.io/f/manyjnvv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your form is submitted, our team will contact you",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Linkedin className="h-4 w-4" />
          Auto Apply Jobs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Bot className="h-5 w-5" />
            DevRecruitHub AI Job Automation
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Preferred Location
            </label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="preferences" className="text-sm font-medium">
              Additional Preferences
            </label>
            <Textarea
              id="preferences"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              placeholder="Enter any specific requirements or preferences..."
              className="h-24"
            />
          </div>
          <div className="space-y-4">
            <Button type="submit" className="w-full">
              <Bot className="h-4 w-4 mr-2" />
              Start Automation
            </Button>
            <a 
              href="https://www.whatsapp.com/channel/0029VaaOBgJ3gvWcP6qLkD3y" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button type="button" variant="outline" className="w-full">
                Join Our WhatsApp Channel
              </Button>
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInAutomationDialog;