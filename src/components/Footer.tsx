import { Link } from "react-router-dom";
import { Mail, Clock, Keyboard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/privacy" 
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Cookies Policy
              </Link>
              <Link 
                to="/embed" 
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Embed Widget
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <Mail className="w-5 h-5 text-primary" />
              <a 
                href="mailto:sxoresumebulider@f5.si" 
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                sxoresumebulider@f5.si
              </a>
            </div>
          </div>

          {/* Support Hours Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Support Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium text-gray-700">IST Time Zone</span>
              </div>
              <div className="space-y-2 pl-7">
                <p className="text-gray-600">Mon – Fri: 6:30 PM – 6:30 AM</p>
                <p className="text-gray-600">Sat: 6:30 PM – 3:30 AM</p>
                <p className="text-gray-600">Sun: 8:30 PM – 4:30 AM</p>
              </div>
            </div>
          </div>

          {/* Platform Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Platform Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium text-gray-700">Supported Systems</span>
              </div>
              <div className="space-y-2 pl-7">
                <p className="text-gray-600">Windows: Full Support</p>
                <p className="text-gray-600">macOS: Full Support</p>
                <p className="text-gray-600">Linux: Full Support</p>
                <p className="text-gray-600">Mobile: Basic Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SXO Resume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;