
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">Cookies and Tracking Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Cookie Usage</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to enhance your experience on our
              platform. Cookies help us remember your preferences, analyze site usage, and improve
              our services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Types of Cookies</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Essential cookies: Required for basic site functionality</li>
              <li>Analytics cookies: Help us understand how users interact with our platform</li>
              <li>Preference cookies: Remember your settings and choices</li>
              <li>Marketing cookies: Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Managing Cookies</h2>
            <p className="text-gray-600">
              You can control cookie preferences through your browser settings. Note that disabling
              certain cookies may affect site functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Affiliate Tracking</h2>
            <p className="text-gray-600">
              We use cookies to track affiliate referrals. When you visit our site through an
              affiliate link, a cookie helps us attribute the referral correctly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
