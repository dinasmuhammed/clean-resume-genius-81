import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, CheckCircle, ArrowLeft, Eye, User, Briefcase, GraduationCap, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { exportToFormat } from "@/utils/pdfExport";
import { PaymentDialog } from "@/components/ResumeBuilder/PaymentDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface PersonalInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  website?: string;
  summary?: string;
}

interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

type SectionType = "personal" | "experience" | "education" | "skills";

interface Section {
  id: SectionType;
  label: string;
  icon: typeof User | typeof Briefcase | typeof GraduationCap | typeof Code;
}

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<SectionType>("personal");
  const [showPaymentDialog, setShowPaymentDialog] = useState<boolean>(false);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

  const sections: Section[] = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code },
  ];

  const handleSectionComplete = (section: SectionType, data: any) => {
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
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <CheckCircle className="w-4 h-4" />
                  Interview Tips
                </Button>
              </Link>
            </div>
            <SocialLinks />
          </div>
        </header>

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
                <PersonalInfoForm
                  isActive={activeSection === "personal"}
                  onComplete={(data) => handleSectionComplete("personal", data)}
                />
                <ExperienceForm
                  isActive={activeSection === "experience"}
                  onComplete={(data) => handleSectionComplete("experience", data)}
                />
                <EducationForm
                  isActive={activeSection === "education"}
                  onComplete={(data) => handleSectionComplete("education", data)}
                />
                <SkillsForm
                  isActive={activeSection === "skills"}
                  onComplete={(data) => handleSectionComplete("skills", data)}
                />
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
      
      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Index;