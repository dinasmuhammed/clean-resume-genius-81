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
import { FileText, CheckCircle2, BookOpen, Info, Heart } from "lucide-react";
import FeedbackDialog from "./FeedbackDialog";

const Navbar = () => {
  return (
    <nav className="w-full px-4 py-4 bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          SXO-Resume
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link to="/builder" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                    <FileText className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Resume Builder</div>
                      <p className="text-sm text-muted-foreground">Create your professional resume</p>
                    </div>
                  </Link>
                  <Link to="/ats-checker" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                    <CheckCircle2 className="w-4 h-4" />
                    <div>
                      <div className="font-medium">ATS Checker</div>
                      <p className="text-sm text-muted-foreground">Verify ATS compatibility</p>
                    </div>
                  </Link>
                  <Link to="/interview-guide" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                    <BookOpen className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Interview Guide</div>
                      <p className="text-sm text-muted-foreground">Prepare for interviews</p>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Company</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <Link to="/about" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                    <Info className="w-4 h-4" />
                    <div>
                      <div className="font-medium">About Us</div>
                      <p className="text-sm text-muted-foreground">Learn about our mission</p>
                    </div>
                  </Link>
                  <Link to="/affiliate-signup" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                    <Heart className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Affiliate Program</div>
                      <p className="text-sm text-muted-foreground">Join our affiliate network</p>
                    </div>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <FeedbackDialog />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;