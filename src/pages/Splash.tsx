import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Laptop, Shield, Clock } from "lucide-react";
import FAQSection from "@/components/FAQ/FAQSection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";

const Splash = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="w-full px-4 py-4 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            Resume Builder
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/builder">
              <Button variant="ghost">Create Resume</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-6 sm:py-12">
        <div className="text-center max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Create Your Professional Resume in Minutes
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Build an ATS-optimized resume that helps you stand out. Our intelligent system ensures your resume gets noticed by recruiters.
            </p>
            <div className="pt-4">
              <SocialLinks />
            </div>
          </div>

          {/* Why Use Our Online SXO Resume Builder Section */}
          <div className="py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  Why use our online SXO Resume Builder?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Laptop className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                    <p className="text-gray-600 text-center">
                      Intuitive interface that guides you through every step of creating your professional resume
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">ATS-Optimized</h3>
                    <p className="text-gray-600 text-center">
                      Built to pass Applicant Tracking Systems with optimized formatting and keywords
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Time-Saving</h3>
                    <p className="text-gray-600 text-center">
                      Create a professional resume in minutes with our pre-built templates and expert guidance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Referral Program Section */}
          <div className="py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  Join Our Referral Program
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-4">For Users</h3>
                    <ul className="text-gray-600 text-left space-y-2">
                      <li>• Use referral codes for 10% off</li>
                      <li>• Share with friends to save money</li>
                      <li>• Valid on all our services</li>
                    </ul>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-4">For Affiliates</h3>
                    <ul className="text-gray-600 text-left space-y-2">
                      <li>• Earn for each referral</li>
                      <li>• Get unique referral codes</li>
                      <li>• Track your earnings</li>
                    </ul>
                    <Link to="/affiliate-signup" className="mt-4">
                      <Button>Become an Affiliate</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection />

          <div className="pt-6 sm:pt-8 text-xs sm:text-sm text-gray-500">
            <p className="max-w-md mx-auto">Join thousands of job seekers who have successfully landed their dream jobs using SXO-Resume</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;