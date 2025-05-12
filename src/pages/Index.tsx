import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, CheckCircle, ArrowLeft, Eye, User, Briefcase, GraduationCap, Code, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { exportToFormat } from "@/utils/pdfExport";
import { PaymentDialog } from "@/components/ResumeBuilder/PaymentDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import PageSEO from "@/components/SEO/PageSEO";
import LinkedInOptimizationDialog from "@/components/LinkedInOptimization/LinkedInOptimizationDialog";
import ResponsiveContainer from "@/components/Layout/ResponsiveContainer";
import { useDeviceDetect } from "@/utils/responsiveUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { checkPreviousPayment } from "@/utils/paymentUtils";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { toast } = useToast();
  const { isMobile, isTablet } = useDeviceDetect();
  const [activeSection, setActiveSection] = useState("personal");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

  // Check if user has previously paid
  useEffect(() => {
    const hasPaid = checkPreviousPayment();
    if (hasPaid) {
      setIsPaid(true);
    }
  }, []);

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
  ];

  const handleSectionComplete = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: section === "education" ? data.education : data
    }));
    toast({
      title: "Section saved",
      description: "Your changes have been saved successfully."
    });
  };

  const sendThankYouEmail = async (email: string, name: string, format: string) => {
    try {
      const { error } = await supabase.functions.invoke('send-thank-you', {
        body: { email, name, format }
      });
      
      if (error) {
        console.error("Error sending thank you email:", error);
      } else {
        console.log("Thank you email sent successfully");
      }
    } catch (error) {
      console.error("Error invoking send-thank-you function:", error);
    }
  };

  const handlePaymentSuccess = (format: string) => {
    setShowPaymentDialog(false);
    setIsPaid(true);
    
    // Get user email and name from localStorage or form
    const userEmail = localStorage.getItem('user_email');
    const userName = localStorage.getItem('user_name');
    
    // Send thank you email if we have the user's email
    if (userEmail) {
      sendThankYouEmail(userEmail, userName || '', format);
    }
    
    // Explicitly start the export process with the specified format
    setTimeout(() => {
      exportToFormat(format).then(() => {
        console.log(`Resume download started in ${format} format`);
      }).catch(error => {
        console.error("Error during export:", error);
        toast({
          title: "Export Error",
          description: "There was an error downloading your resume. Please try again.",
          variant: "destructive"
        });
      });
    }, 500); // Short delay to ensure UI updates first
    
    toast({
      title: "Success",
      description: "Your resume is downloading automatically!",
      variant: "default"
    });
  };

  const handleExport = async () => {
    // If user has already paid, skip the payment info dialog
    if (isPaid) {
      setShowPaymentDialog(true);
    } else {
      setShowPaymentInfo(true);
    }
  };

  const handlePaymentInfoConfirm = () => {
    setShowPaymentInfo(false);
    setShowPaymentDialog(true);
  };

  const ResumePreview = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-primary flex items-center gap-2">
          <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
          Live Preview
        </h2>
        <Button 
          onClick={handleExport} 
          className="flex items-center gap-2"
          size={isMobile ? "sm" : "default"}
        >
          <Download className="w-4 h-4" />
          {isPaid ? "Download Again" : "Download"}
        </Button>
      </div>
      <ResumePreviewer data={resumeData} isPaid={isPaid} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <PageSEO 
        title="Resume Builder - Create Your Professional Resume Online"
        description="Use our interactive resume builder to create a professional, ATS-friendly resume tailored to your specific job applications with built-in optimization tools."
        type="builder"
      />
      
      <ResponsiveContainer maxWidth="2xl">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Link to="/">
              <Button variant="ghost" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {isMobile ? "Back" : "Back to Home"}
              </Button>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">Create Your Professional Resume</h1>
          <p className="text-sm sm:text-base text-secondary mb-4">Fill in your details below and see your resume update in real-time</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/ats-checker">
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4" />
                  ATS Score Checker
                </Button>
              </Link>
              <Link to="/interview-guide">
                <Button 
                  variant="outline" 
                  size={isMobile ? "sm" : "default"} 
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4" />
                  Interview Tips
                </Button>
              </Link>
              <LinkedInOptimizationDialog />
            </div>
            <SocialLinks />
          </div>
        </header>

        <div className="sr-only" aria-hidden="true">
          <h2>Professional Resume Builder with ATS Optimization</h2>
          <p>
            Our resume builder helps you create professional resumes that are optimized for Applicant Tracking Systems (ATS).
            Focus on your job search while we handle the formatting and optimization to ensure your resume gets noticed by recruiters.
          </p>
          <h3>Key Resume Builder Features</h3>
          <ul>
            <li>ATS-friendly resume templates</li>
            <li>Keyword optimization for specific job descriptions</li>
            <li>Professional formatting that passes ATS scans</li>
            <li>Expert tips for each resume section</li>
            <li>Real-time resume preview as you type</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "outline"}
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center gap-1 sm:gap-2"
                      size={isMobile ? "sm" : "default"}
                    >
                      <Icon className="w-4 h-4" />
                      <span className={isMobile ? "text-xs" : ""}>{section.label}</span>
                    </Button>
                  );
                })}
              </div>

              <div className="space-y-6">
                {activeSection === "personal" && (
                  <PersonalInfoForm
                    isActive={true}
                    onComplete={(data) => handleSectionComplete("personal", data)}
                  />
                )}
                {activeSection === "experience" && (
                  <ExperienceForm
                    isActive={true}
                    onComplete={(data) => handleSectionComplete("experience", data)}
                  />
                )}
                {activeSection === "education" && (
                  <EducationForm
                    isActive={true}
                    onComplete={(data) => handleSectionComplete("education", data)}
                  />
                )}
                {activeSection === "skills" && (
                  <SkillsForm
                    isActive={true}
                    onComplete={(data) => handleSectionComplete("skills", data)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-8 h-fit">
            <ResumePreview />
          </div>

          <div className="fixed bottom-4 right-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" className="rounded-full shadow-lg flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
                <div className="overflow-auto h-full pb-safe">
                  <ResumePreview />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </ResponsiveContainer>
      
      <AlertDialog open={showPaymentInfo} onOpenChange={setShowPaymentInfo}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Information</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-left">
              <p>
                You're about to download a premium resume with professional formatting and ATS optimization.
              </p>
              <p>
                The payment process is secure and your details are encrypted. After payment, your resume will download automatically.
              </p>
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md">
                <p className="font-medium">Payment Tips:</p>
                <ul className="list-disc pl-5 text-sm mt-1">
                  <li>Complete your payment promptly to avoid transaction timeouts</li>
                  <li>Use any payment method supported by Razorpay</li>
                  <li>Your purchase gives you unlimited access to download your resume</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePaymentInfoConfirm}>
              Continue to Payment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Index;
