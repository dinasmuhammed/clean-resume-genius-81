import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FileText, CheckCircle2, BookOpen, Info } from "lucide-react";
import FeedbackDialog from "./FeedbackDialog";
import LinkedInAutomationDialog from "./LinkedInAutomation/LinkedInAutomationDialog";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-3 bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-medium text-primary">
          SXO-Resume
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 w-[300px]">
                  <Link to="/builder" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Resume Builder</div>
                      <p className="text-xs text-gray-500">Create your professional resume</p>
                    </div>
                  </Link>
                  <Link to="/ats-checker" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">ATS Checker</div>
                      <p className="text-xs text-gray-500">Verify ATS compatibility</p>
                    </div>
                  </Link>
                  <Link to="/interview-guide" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Interview Guide</div>
                      <p className="text-xs text-gray-500">Prepare for interviews</p>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm">Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-2 p-4 w-[300px]">
                  <Link to="/about" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">About Us</div>
                      <p className="text-xs text-gray-500">Learn about our mission</p>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <LinkedInAutomationDialog />
          <FeedbackDialog />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;