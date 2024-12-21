import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Laptop, Shield, Clock } from "lucide-react";
import FAQSection from "@/components/FAQ/FAQSection";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { PricingPlans } from "@/components/Pricing/PricingPlans";
import { FindBuilder } from "@/components/ResumeBuilder/FindBuilder";
import { TutorialSection } from "@/components/ResumeBuilder/TutorialSection";

const Splash = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="w-full px-4 py-4 bg-white border-b z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
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
          {/* Product Hunt Badge */}
          <div className="flex justify-center mb-6">
            <a 
              href="https://www.producthunt.com/posts/sxo-resume?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sxo&#0045;resume" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=594173&theme=light" 
                alt="SXO Resume - Professional resume builder | Product Hunt" 
                style={{ width: '250px', height: '54px' }} 
                width="250" 
                height="54" 
              />
            </a>
          </div>

          {/* Hero Section */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">
              Create Your Professional Resume in Minutes
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Build an ATS-optimized resume that helps you stand out. Our intelligent system ensures your resume gets noticed by recruiters.
            </p>
            <p>
            Make sure you pay the amount quickly; otherwise, the payment will fail, and you'll have to wait 7 days to get the amount credited back to your account.
            </p>
            <div className="pt-4">
              <SocialLinks />
            </div>
          </div>

          {/* Add Pricing Plans */}
          <PricingPlans />

          {/* Tutorial Section */}
          <TutorialSection />

          {/* Find Resume Builder Section */}
          <FindBuilder />

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

          {/* Review Section */}
          <div className="py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  What Our Users Say
                </h2>
                <div className="flex flex-col items-center">
                  <a 
                    href="https://www.producthunt.com/products/sxo-resume/reviews/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-[#EA532A] hover:bg-[#D84315] text-white">
                      Leave a Review on Product Hunt
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Program Section */}
          <div className="py-12 bg-white rounded-xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-8">
                  Save with Referral Codes
                </h2>
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-4">Get 10% Off Your Purchase</h3>
                  <ul className="text-gray-600 text-left space-y-2 mb-4">
                    <li>• Use referral codes during checkout</li>
                    <li>• Save 10% on resume builder</li>
                    <li>• Save 10% on ATS checker</li>
                  </ul>
                  <p className="text-sm text-gray-500">
                    Enter your referral code at checkout to claim your discount
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQSection />

          <div className="pt-6 sm:pt-8 text-xs sm:text-sm text-gray-500">
            <p className="max-w-md mx-auto">Join thousands of job seekers who have successfully landed their dream jobs using our Resume Builder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
