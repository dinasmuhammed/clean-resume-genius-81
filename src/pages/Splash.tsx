import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Target, CheckCircle2 } from "lucide-react";
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
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Create Your Professional Resume in Minutes
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Build an ATS-optimized resume that helps you stand out. Our intelligent system ensures your resume gets noticed by recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle2 className="w-8 sm:w-12 h-8 sm:h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">ATS-Optimized</h3>
              <p className="text-sm sm:text-base text-gray-600">Built to pass Applicant Tracking Systems and reach human recruiters</p>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FileText className="w-8 sm:w-12 h-8 sm:h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-sm sm:text-base text-gray-600">Clean, modern designs that highlight your experience</p>
            </div>
            <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Target className="w-8 sm:w-12 h-8 sm:h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-sm sm:text-base text-gray-600">Step-by-step guidance to create the perfect resume</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 sm:mt-8">
            <Link to="/builder" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all bg-accent hover:bg-accent/90"
              >
                <FileText className="w-5 h-5" />
                Create Your Resume Now
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/ats-checker" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-medium flex items-center justify-center gap-2 shadow hover:shadow-lg transition-all"
              >
                <Target className="w-5 h-5" />
                Check ATS Score
              </Button>
            </Link>
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