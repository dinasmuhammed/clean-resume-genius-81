import { Link } from "react-router-dom";
import { Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
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
                Cookies and Tracking Policy
              </Link>
              <Link to="/embed" className="hover:text-primary transition-colors">
                Embed Widget
              </Link>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <a href="mailto:sxoresumebulider@f5.si" className="hover:text-primary transition-colors">
                sxoresumebulider@f5.si
              </a>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">SXO Support Schedule (IST)</span>
            </div>
            <div className="text-center md:text-right space-y-1">
              <p>Mon – Fri: 6:30 PM – 6:30 AM</p>
              <p>Sat: 6:30 PM – 3:30 AM</p>
              <p>Sun: 8:30 PM – 4:30 AM</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} SXO Resume. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;