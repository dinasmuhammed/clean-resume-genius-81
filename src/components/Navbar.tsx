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
import { FileText, CheckCircle2, BookOpen, Info, Menu, Home, DollarSign } from "lucide-react";
import FeedbackDialog from "./FeedbackDialog";
import LinkedInAutomationDialog from "./LinkedInAutomation/LinkedInAutomationDialog";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      icon: Home,
      path: "/",
      description: "Return to homepage"
    },
    {
      title: "Resume Builder",
      icon: FileText,
      path: "/builder",
      description: "Create your professional resume"
    },
    {
      title: "ATS Checker",
      icon: CheckCircle2,
      path: "/ats-checker",
      description: "Verify ATS compatibility"
    },
    {
      title: "Interview Guide",
      icon: BookOpen,
      path: "/interview-guide",
      description: "Prepare for interviews"
    },
    {
      title: "Pricing",
      icon: DollarSign,
      path: "/pricing",
      description: "View our pricing plans"
    },
    {
      title: "About Us",
      icon: Info,
      path: "/about",
      description: "Learn about our mission"
    },
  ];

  return (
    <nav className="w-full px-4 py-3 bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-medium text-primary">
          SXO-Resume
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm">Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-4 w-[300px]">
                    {navLinks.slice(0, 3).map((link) => (
                      <Link 
                        key={link.path}
                        to={link.path} 
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                      >
                        <link.icon className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{link.title}</div>
                          <p className="text-xs text-gray-500">{link.description}</p>
                        </div>
                      </Link>
                    ))}
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
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <LinkedInAutomationDialog />
          <FeedbackDialog />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex-1 py-6 px-4 overflow-y-auto mobile-scroll-view">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.path}
                        to={link.path} 
                        className="flex items-center p-3 rounded-md hover:bg-gray-100"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <link.icon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{link.title}</div>
                          <p className="text-sm text-gray-500 truncate">{link.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 pb-6 px-4 space-y-3">
                  <LinkedInAutomationDialog />
                  <FeedbackDialog />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
