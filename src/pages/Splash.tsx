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
      <nav className="w-full px-4 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm fixed top-0 z-50 border-b">
        <div className="text-xl font-bold text-primary">SXO-Resume</div>
        <div className="flex gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm">
              Sign up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content with adjusted padding for fixed nav */}
      <div className="pt-20 flex flex-col items-center justify-center px-4 py-6 sm:py-12">
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

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <Target className="h-6 w-6 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customization Options</h3>
              <p className="text-gray-600 text-center">Easily customize each section to fit your unique experience</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
              <CheckCircle2 className="h-6 w-6 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Tips</h3>
              <p className="text-gray-600 text-center">Get expert advice on how to craft your resume</p>
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
                <AccordionTrigger>How should I format my resume for ATS?</AccordionTrigger>
                <AccordionContent>
                  Use clear section headings like "Experience," "Education," and "Skills." Stick to standard fonts like Arial or Calibri. Use bullet points for easy reading. Avoid headers, footers, and text boxes. Save your resume as a simple .docx or .pdf file.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I use keywords effectively in my resume?</AccordionTrigger>
                <AccordionContent>
                  Carefully read the job description and identify key skills and requirements. Naturally incorporate these keywords into your experience and skills sections. Use both abbreviated and full versions of terms (e.g., "UI/UX" and "User Interface Design") to ensure ATS recognition.
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