import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, RefreshCcw } from "lucide-react";

const BackupPage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Page Failed to Load</h1>
        <p className="text-gray-600">We apologize for the inconvenience. Please try again or return home.</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={handleRetry} className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Retry
          </Button>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackupPage;