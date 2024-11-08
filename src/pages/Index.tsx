import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "@/components/ResumeForm/PersonalInfoForm";
import { ExperienceForm } from "@/components/ResumeForm/ExperienceForm";
import { EducationForm } from "@/components/ResumeForm/EducationForm";
import { SkillsForm } from "@/components/ResumeForm/SkillsForm";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { SocialLinks } from "@/components/SocialLinks/SocialLinks";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { exportToPDF } from "@/utils/pdfExport";
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
  const [hasDonated, setHasDonated] = useState(false);
  const [isSelfLearner, setIsSelfLearner] = useState(false);
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

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

  const handleEducationTypeChange = (selfLearner: boolean) => {
    setIsSelfLearner(selfLearner);
  };

  const handleDonation = () => {
    const paymentLink = isSelfLearner 
      ? "https://razorpay.com/payment-link/plink_PIk1FtrEwGejaW"
      : "https://razorpay.me/@comicforgeai?amount=CVDUr6Uxp2FOGZGwAHntNg%3D%3D";
    window.open(paymentLink, "_blank");
    setHasDonated(true);
    setShowDonationDialog(false);
    toast({
      title: "Thank you for your donation!",
      description: "You can now download your resume in PDF format."
    });
  };

  const handleExport = async () => {
    if (!hasDonated) {
      setShowDonationDialog(true);
      return;
    }
    await exportToPDF();
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
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-rose-500 hover:text-rose-600"
                onClick={handleDonation}
              >
                <Heart className="w-4 h-4" />
                Donate
              </Button>
            </div>
            <SocialLinks />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              onTypeChange={handleEducationTypeChange}
            />
            <SkillsForm
              isActive={activeSection === "skills"}
              onComplete={(data) => handleSectionComplete("skills", data)}
            />
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Preview
                </h2>
                <Button 
                  onClick={handleExport} 
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export PDF
                </Button>
              </div>
              <ResumePreviewer data={resumeData} />
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Support Our Work</AlertDialogTitle>
            <AlertDialogDescription>
              To download your resume in PDF format, we kindly ask for a small donation. This helps us maintain and improve our services. After donating, you'll be able to download your resume immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDonation} className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Donate & Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;