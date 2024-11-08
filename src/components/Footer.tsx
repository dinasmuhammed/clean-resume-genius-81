import { Link } from "react-router-dom";
import { Mail, Clock, Keyboard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-primary mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookies Policy
              </Link>
              <Link to="/embed" className="hover:text-primary transition-colors">
                Embed Widget
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 pt-2">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:sxoresumebulider@f5.si" 
                className="hover:text-primary transition-colors"
              >
                sxoresumebulider@f5.si
              </a>
            </div>
          </div>

          {/* Support Schedule Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-primary mb-3">Support Hours</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span>IST Time Zone</span>
              </div>
              <div className="space-y-1 pl-6">
                <p>Mon – Fri: 6:30 PM – 6:30 AM</p>
                <p>Sat: 6:30 PM – 3:30 AM</p>
                <p>Sun: 8:30 PM – 4:30 AM</p>
              </div>
            </div>
          </div>

          {/* Platform Support Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-primary mb-3">Platform Support</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Keyboard className="w-4 h-4" />
                <span>Supported Systems</span>
              </div>
              <div className="space-y-1 pl-6">
                <p>Windows: Full Support</p>
                <p>macOS: Full Support</p>
                <p>Linux: Full Support</p>
                <p>Mobile: Basic Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-8 pt-4 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} SXO Resume. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;