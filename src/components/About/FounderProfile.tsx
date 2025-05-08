
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const FounderProfile = () => {
  return (
    <Card className="bg-white border border-gray-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-blue-50 pb-0">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-white shadow-md">
            <AvatarImage 
              src="/lovable-uploads/eb087383-595d-44f4-aa0e-02416efe8dec.png" 
              alt="Muhammed Adnan" 
              className="object-cover" 
            />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold mt-3">Muhammed Adnan</h3>
          <p className="text-gray-600 text-sm">Founder & CEO</p>
          
          <div className="flex gap-2 mt-3">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              asChild
            >
              <a 
                href="https://x.com/MuhammadAd93421" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              asChild
            >
              <a 
                href="https://www.linkedin.com/in/muhammedadnanvv/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600">
          Muhammed Adnan is the visionary founder of SXO Resume. With a passion for helping job seekers succeed, Muhammed created this platform to revolutionize how professionals present themselves in today's competitive job market. His expertise in ATS optimization and digital career tools has helped thousands of job seekers land interviews with top companies.
        </p>
        <p className="text-gray-600 mt-3">
          Under his leadership, SXO Resume continues to innovate with cutting-edge tools that bridge the gap between qualified candidates and recruiters by ensuring resumes are both human-readable and ATS-optimized.
        </p>
      </CardContent>
    </Card>
  );
};
