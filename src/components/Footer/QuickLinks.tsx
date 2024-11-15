import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const QuickLinks = () => (
  <Card className="border-0 shadow-none">
    <CardContent className="p-0">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Links</h3>
      <div className="space-y-3">
        {[
          { to: "/about", label: "About Us" },
          { to: "/terms", label: "Terms & Conditions" },
          { to: "/privacy", label: "Privacy Policy" },
          { to: "/cookies", label: "Cookies Policy" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="block text-sm text-gray-600 hover:text-primary transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-6 pt-6 border-t">
        <Mail className="w-4 h-4 text-gray-400" />
        <a
          href="mailto:sxoresumebulider@f5.si"
          className="text-sm text-gray-600 hover:text-primary transition-colors break-all"
        >
          sxoresumebulider@f5.si
        </a>
      </div>
    </CardContent>
  </Card>
);