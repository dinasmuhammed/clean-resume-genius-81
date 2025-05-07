
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export const FounderSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Founder</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="w-full md:w-1/3 flex justify-center">
            <Avatar className="h-48 w-48 border-4 border-primary/10">
              <AvatarImage src="/founder-image.jpg" alt="Muhammed Adnan" />
              <AvatarFallback className="text-4xl bg-primary/5">MA</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="w-full md:w-2/3 space-y-4">
            <h3 className="text-2xl font-bold">Muhammed Adnan</h3>
            <p className="text-lg text-primary/80 font-medium">Founder & CEO</p>
            
            <p className="text-gray-600">
              As the founder of SXO Resume, Muhammed Adnan has dedicated himself to revolutionizing 
              the job application process through technology. With a passion for helping job seekers 
              succeed in today's competitive market, he created this platform to ensure resumes are not 
              only visually appealing but also optimized for applicant tracking systems.
            </p>
            
            <p className="text-gray-600">
              "My vision is to empower job seekers with tools that give them the best possible chance 
              at landing their dream jobs. By combining ATS optimization with professional design, 
              we help candidates get past algorithmic screening and into the interview room."
            </p>
            
            <div className="flex gap-3 pt-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                <a 
                  href="https://x.com/MuhammadAd93421" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                  <span>Twitter</span>
                </a>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
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
        </div>
      </div>
    </section>
  );
};
