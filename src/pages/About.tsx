
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* SEO Components */}
      <SeoKeywords page="home" />
      <SeoStructuredData type="home" />
      
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-primary mb-6">About SXO Resume</h1>
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-4">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="text-gray-600">
              At SXO Resume, we're dedicated to helping job seekers create professional, ATS-optimized
              resumes that stand out in today's competitive job market. Our platform combines advanced
              technology with expert insights to ensure your resume gets noticed by both automated
              systems and human recruiters.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">What We Offer</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Professional resume builder with ATS-optimized templates</li>
              <li>Advanced ATS compatibility checker</li>
              <li>Expert interview preparation guides</li>
              <li>Comprehensive career resources and tips</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Why Choose Us</h2>
            <p className="text-gray-600">
              Our platform is trusted by thousands of professionals worldwide. We continuously update
              our algorithms and templates based on the latest industry standards and recruitment
              practices to ensure your success in the job market.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="text-gray-600">
              Have questions or feedback? We'd love to hear from you. Reach out to our support team
              at sxoresumebulider@f5.si for assistance.
            </p>
          </section>
          
          {/* SEO-focused hidden content */}
          <div className="sr-only" aria-hidden="true">
            <h2>Professional Resume Building Services</h2>
            <p>
              SXO Resume provides the most comprehensive set of tools for creating professional resumes that pass through Applicant Tracking Systems (ATS). Our resume builder helps job seekers at all career levels create optimized resumes that highlight their skills and experience in the best possible way.
            </p>
            <h3>Resume Building Resources</h3>
            <ul>
              <li>ATS optimization strategies for modern job applications</li>
              <li>Professional resume templates for different industries</li>
              <li>Resume formatting best practices for 2023</li>
              <li>Keyword optimization for job description matching</li>
              <li>Job application tips from HR professionals</li>
              <li>Career advancement strategies through optimized resumes</li>
              <li>Resume builder tools for professional career development</li>
              <li>Entry-level resume templates with professional formatting</li>
              <li>Executive resume samples with ATS optimization</li>
              <li>Remote job application resume formatting tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
