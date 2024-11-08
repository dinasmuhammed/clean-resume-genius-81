import { Link } from "react-router-dom";
import { Mail, Clock, Keyboard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto print:hidden">
      <div className="responsive-container py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/cookies", label: "Cookies Policy" },
                { to: "/embed", label: "Embed Widget" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 py-1"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <a
                href="mailto:sxoresumebulider@f5.si"
                className="text-gray-600 hover:text-primary transition-colors duration-200 break-all"
              >
                sxoresumebulider@f5.si
              </a>
            </div>
          </div>

          {/* Support Hours Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Support Hours</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block mb-2">IST Time Zone</span>
                  <div className="space-y-1 text-sm sm:text-base">
                    <p className="text-gray-600">Mon – Fri: 6:30 PM – 6:30 AM</p>
                    <p className="text-gray-600">Sat: 6:30 PM – 3:30 AM</p>
                    <p className="text-gray-600">Sun: 8:30 PM – 4:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Platform Support</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Keyboard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block mb-2">Supported Systems</span>
                  <div className="space-y-1 text-sm sm:text-base">
                    <p className="text-gray-600">Windows: Full Support</p>
                    <p className="text-gray-600">macOS: Full Support</p>
                    <p className="text-gray-600">Linux: Full Support</p>
                    <p className="text-gray-600">Mobile: Basic Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SXO Resume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;