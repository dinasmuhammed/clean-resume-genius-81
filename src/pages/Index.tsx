
import { useState } from "react";
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
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";
import LinkedInOptimizationDialog from "@/components/LinkedInOptimization/LinkedInOptimizationDialog";
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

const Index = () => {
  const { toast } = useToast();
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

  const handlePaymentSuccess = (format: string) => {
    setShowPaymentDialog(false);
    setIsPaid(true);
    toast({
      title: "Success",
      description: "Your resume is ready to download!",
      variant: "default"
    });
    exportToFormat(format);
  };

  const handleExport = async () => {
    setShowPaymentInfo(true);
  };

  const handlePaymentInfoConfirm = () => {
    setShowPaymentInfo(false);
    setShowPaymentDialog(true);
  };

  const ResumePreview = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Live Preview
        </h2>
        <Button 
          onClick={handleExport} 
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Now
        </Button>
      </div>
      <ResumePreviewer data={resumeData} isPaid={isPaid} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <SeoKeywords page="builder" />
      <SeoStructuredData type="builder" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Create Your Professional Resume</h1>
          <p className="text-secondary mb-4">Fill in your details below and see your resume update in real-time</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <Link to="/ats-checker">
                <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4" />
                  ATS Score Checker
                </Button>
              </Link>
              <Link to="/interview-guide">
                <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4" />
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
              <div className="flex flex-wrap gap-2 mb-6">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "default" : "outline"}
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
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
                <Button size="lg" className="rounded-full shadow-lg">
                  <Eye className="w-5 h-5 mr-2" />
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
      </div>
      
      <AlertDialog open={showPaymentInfo} onOpenChange={setShowPaymentInfo}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Important Payment Information</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-left">
              <p>
                Please ensure that you complete your payment promptly. Otherwise, the payment may fail, and you'll need to wait 7 days to have the amount refunded to your account.
              </p>
              <p>
                Ensure you make the payment using your UPI ID or number. Do not scan the QR code.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePaymentInfoConfirm}>
              I Understand, Proceed to Payment
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
