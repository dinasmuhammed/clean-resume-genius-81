import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Bot } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const LinkedInAutomationDialog = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [preferences, setPreferences] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Automation Started",
      description: "DevRecruitHub AI is now searching and applying to LinkedIn jobs matching your criteria.",
    });
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
            <label htmlFor="jobTitle" className="text-sm font-medium">
              Job Title
            </label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Enter any specific requirements or preferences..."
              className="h-24"
            />
          </div>
          <Button type="submit" className="w-full">
            <Bot className="h-4 w-4 mr-2" />
            Start Automation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInAutomationDialog;