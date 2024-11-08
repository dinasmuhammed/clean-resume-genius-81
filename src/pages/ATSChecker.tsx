import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ATSChecker = () => {
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [showDonationDialog, setShowDonationDialog] = useState(false);

  const handleCheck = () => {
    if (!resumeText || !jobDescription) {
      toast({
        title: "Error",
        description: "Please fill in both the resume and job description fields.",
        variant: "destructive",
      });
      return;
    }
    setShowDonationDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-2">ATS Resume Checker</h1>
        <p className="text-center text-gray-600 mb-8">
          Check how well your resume matches the job description
        </p>

        <div className="grid gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">
              Paste your resume text
            </label>
            <Textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="min-h-[200px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Paste the job description
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[200px]"
            />
          </div>

          <Button onClick={handleCheck} className="w-full">
            Check ATS Score
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">ATS Resume FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How can I make my resume ATS-friendly?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use a clean, simple format without images or graphics</li>
                  <li>Stick to standard section headings (Experience, Education, Skills)</li>
                  <li>Use common fonts like Arial, Calibri, or Times New Roman</li>
                  <li>Avoid tables, columns, and text boxes</li>
                  <li>Save your resume in a standard format (.docx or .pdf)</li>
                  <li>Include keywords from the job description naturally in your content</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What are common ATS mistakes to avoid?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Using creative or non-standard section headers</li>
                  <li>Including images, logos, or graphics</li>
                  <li>Using fancy formatting or design elements</li>
                  <li>Submitting resumes in non-standard file formats</li>
                  <li>Keyword stuffing or using white text</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How should I use keywords in my resume?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Identify key terms from the job description</li>
                  <li>Include both acronyms and full terms (e.g., "AI" and "Artificial Intelligence")</li>
                  <li>Use keywords naturally in context</li>
                  <li>Match the exact phrasing used in the job posting</li>
                  <li>Include relevant industry-specific terms</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What format should I use for my resume?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use a reverse-chronological format for work experience</li>
                  <li>Keep formatting consistent throughout</li>
                  <li>Use clear section headings</li>
                  <li>Maintain standard margins (0.5" to 1")</li>
                  <li>Use bullet points for easy scanning</li>
                  <li>Save as a .docx or .pdf file</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I tailor my resume for each application?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Read the job description carefully</li>
                  <li>Match your skills to the requirements</li>
                  <li>Use similar language and terminology</li>
                  <li>Prioritize relevant experience</li>
                  <li>Customize your summary/objective statement</li>
                  <li>Update your skills section to match the role</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;