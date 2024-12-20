import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  console.log('Error page rendered');

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Our server is currently down. Please wait.</h1>
      <p className="text-gray-600 mb-6">We're working to resolve this issue.</p>
      <Button 
        onClick={() => {
          console.log('Navigating back from error page');
          navigate(-1);
        }} 
        variant="outline"
      >
        Go Back
      </Button>
    </div>
  );
};

export default Error;