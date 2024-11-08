import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Splash = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Welcome to SXO-Resume
        </h1>
        <p className="text-lg text-gray-600 md:text-xl">
          Create an ATS-optimized resume that helps you stand out from the crowd
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
          <Link to="/builder">
            <Button size="lg" className="w-full sm:w-auto">
              Create Resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/ats-checker">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Check ATS Score
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Splash;