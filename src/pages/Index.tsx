import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { useToast } from "@/components/ui/use-toast";
import { Download, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

  const handleSectionComplete = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
    toast({
      title: "Section saved",
      description: "Your changes have been saved successfully."
    });
  };

  const handleExport = () => {
    const fileName = "profile-sxo.pdf";
    toast({
      title: "Exporting PDF",
      description: `Your resume is being prepared for download as ${fileName}`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">SXO-Resume</h1>
          <p className="text-secondary mb-4">Create a professional, ATS-friendly resume that stands out</p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-4">
              <Link to="/ats-checker">
                <Button variant="outline" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  ATS Score Checker
                </Button>
              </Link>
            </div>
            <SocialLinks />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="resume-section">
              <PersonalInfoForm
                isActive={activeSection === "personal"}
                onComplete={(data) => handleSectionComplete("personal", data)}
              />
            </div>
            <div className="resume-section">
              <ExperienceForm
                isActive={activeSection === "experience"}
                onComplete={(data) => handleSectionComplete("experience", data)}
              />
            </div>
            <div className="resume-section">
              <EducationForm
                isActive={activeSection === "education"}
                onComplete={(data) => handleSectionComplete("education", data)}
              />
            </div>
            <div className="resume-section">
              <SkillsForm
                isActive={activeSection === "skills"}
                onComplete={(data) => handleSectionComplete("skills", data)}
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Preview
                </h2>
                <Button onClick={handleExport} className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export PDF
                </Button>
              </div>
              <ResumePreviewer data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;