import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";

export const Header = () => {
  return (
    <header className="text-center mb-6 sm:mb-8">
      <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Create Your Professional Resume</h1>
      <p className="text-secondary mb-4">Fill in your details below and see your resume update in real-time</p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Link to="/ats-checker">
            <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4" />
              ATS Score Checker
            </Button>
          </Link>
          <Link to="/interview-guide">
            <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base">
              <CheckCircle className="w-4 h-4" />
              Interview Tips
            </Button>
          </Link>
        </div>
        <SocialLinks />
      </div>
    </header>
  );
};