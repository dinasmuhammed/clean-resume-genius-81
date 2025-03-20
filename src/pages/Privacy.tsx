
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Collection</h2>
            <p className="text-gray-600">
              We collect information necessary to provide our resume building services, including
              personal and professional information you provide. This includes your name, contact
              information, work history, education, and skills.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Usage</h2>
            <p className="text-gray-600">
              Your information is used solely for providing our resume building and ATS optimization
              services. We do not share your personal information with third parties without your
              explicit consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Data Protection</h2>
            <p className="text-gray-600">
              We implement industry-standard security measures to protect your personal information
              from unauthorized access, disclosure, or misuse. Your data is encrypted and stored
              securely.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p className="text-gray-600">
              You have the right to access, correct, or delete your personal information. Contact
              us if you wish to exercise these rights or have questions about your data privacy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
