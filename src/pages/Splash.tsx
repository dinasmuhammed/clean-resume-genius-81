import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Target } from "lucide-react";

const Splash = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8 md:py-12">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
            Welcome to SXO-Resume
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-xl mx-auto">
            Create an ATS-optimized resume that helps you stand out from the crowd. Our intelligent system ensures your resume gets noticed by recruiters.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 w-full max-w-md mx-auto">
          <Link to="/builder" className="w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              <FileText className="w-5 h-5" />
              Create Resume
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
          <Link to="/ats-checker" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-14 text-lg font-medium flex items-center justify-center gap-2 shadow hover:shadow-lg transition-all"
            >
              <Target className="w-5 h-5" />
              Check ATS Score
            </Button>
          </Link>
        </div>

        <div className="pt-8 text-sm text-gray-500">
          <p>Built with modern technologies to ensure the best results</p>
        </div>
      </div>
    </div>
  );
};

export default Splash;