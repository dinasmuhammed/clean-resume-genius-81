import { useState } from "react";
import { User, Briefcase, GraduationCap, Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { PaymentDialog } from "@/components/ResumeBuilder/PaymentDialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/ResumeBuilder/Header";
import { ResumePreviewSection } from "@/components/ResumeBuilder/ResumePreviewSection";
import { ResumeData, Section, SectionType } from "@/types/resume";

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

  const handleExport = async () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    setIsPaid(true);
    toast({
      title: "Success",
      description: "Your resume is ready to download!",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <Header />

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
            <ResumePreviewSection 
              resumeData={resumeData}
              isPaid={isPaid}
              onExport={handleExport}
            />
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
                  <ResumePreviewSection 
                    resumeData={resumeData}
                    isPaid={isPaid}
                    onExport={handleExport}
                  />
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