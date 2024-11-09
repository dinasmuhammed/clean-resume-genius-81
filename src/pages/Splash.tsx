import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, CheckCircle2, Laptop, Shield, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <div className="max-w-3xl mx-auto mt-16 text-left bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What makes a resume ATS-friendly?</AccordionTrigger>
                <AccordionContent>
                  An ATS-friendly resume uses a clean, straightforward format without images or complex graphics. It includes standard section headings, uses common fonts, and avoids tables or columns that might confuse ATS systems.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Why can't I include a profile image in an ATS-friendly resume?</AccordionTrigger>
                <AccordionContent>
                  ATS systems cannot properly read or process images, and they may even interfere with the system's ability to parse your text content. Additionally, many companies prefer resumes without photos to ensure unbiased recruitment and comply with anti-discrimination laws. It's best to focus on your qualifications and experience rather than including a profile picture.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How should I format my resume for ATS?</AccordionTrigger>
                <AccordionContent>
                  Use clear section headings like "Experience," "Education," and "Skills." Stick to standard fonts like Arial or Calibri. Use bullet points for easy reading. Avoid headers, footers, and text boxes. Save your resume as a simple .docx or .pdf file.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Should I tailor my resume for each job application?</AccordionTrigger>
                <AccordionContent>
                  Yes, absolutely! Customize your resume for each position by matching your skills and experiences to the job requirements. Use relevant keywords from the job posting, but ensure they accurately reflect your experience. This increases your chances of passing ATS screening.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What are common ATS resume mistakes to avoid?</AccordionTrigger>
                <AccordionContent>
                  Avoid using images, logos, or graphics. Don't use creative layouts with multiple columns. Skip special characters or fancy bullets. Never stuff keywords artificially. Don't submit your resume as an image file or non-standard format.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How long should my resume be?</AccordionTrigger>
                <AccordionContent>
                  For most professionals, a one-page resume is ideal. However, if you have extensive relevant experience (10+ years) or are in academia, a two-page resume might be appropriate. Focus on including your most relevant and recent experiences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>What file format should I use when submitting my resume?</AccordionTrigger>
                <AccordionContent>
                  Unless specifically requested otherwise, submit your resume as a PDF file. PDFs maintain formatting across different devices and operating systems, ensuring your resume looks exactly as intended. Our builder allows you to export in PDF format with just one click.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>How do I highlight my achievements in my resume?</AccordionTrigger>
                <AccordionContent>
                  Use specific numbers and metrics when possible (e.g., "Increased sales by 25%"). Start bullet points with strong action verbs. Focus on results and impact rather than just listing responsibilities. Our builder provides suggestions for powerful achievement statements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>What if I have employment gaps in my resume?</AccordionTrigger>
                <AccordionContent>
                  Be honest about gaps while focusing on any productive activities during that time (e.g., freelancing, volunteering, learning new skills). Consider using a functional or combination resume format to emphasize skills over chronological work history.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>How often should I update my resume?</AccordionTrigger>
                <AccordionContent>
                  Review and update your resume at least every 6-12 months, even if you're not actively job hunting. Add new skills, accomplishments, and responsibilities as you gain them. This ensures you're always prepared for unexpected opportunities.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>

          <div className="pt-6 sm:pt-8 text-xs sm:text-sm text-gray-500">
            <p className="max-w-md mx-auto">Join thousands of job seekers who have successfully landed their dream jobs using SXO-Resume</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
