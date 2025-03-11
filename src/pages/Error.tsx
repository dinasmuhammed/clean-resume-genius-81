
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Log the error page render once
    console.log('Error page rendered');
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">The page you are looking for doesn't exist or has been moved.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          onClick={() => {
            navigate(-1);
          }} 
          variant="outline"
        >
          Go Back
        </Button>
        <Link to="/">
          <Button>
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
