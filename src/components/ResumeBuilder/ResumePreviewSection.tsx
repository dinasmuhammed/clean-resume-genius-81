import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { ResumePreviewer } from "@/components/ResumePreviewer/ResumePreviewer";
import { ResumeData } from "@/types/resume";

interface ResumePreviewSectionProps {
  resumeData: ResumeData;
  isPaid: boolean;
  onExport: () => void;
}

export const ResumePreviewSection = ({ resumeData, isPaid, onExport }: ResumePreviewSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Live Preview
        </h2>
        <Button onClick={onExport} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Now
        </Button>
      </div>
      <ResumePreviewer data={resumeData} isPaid={isPaid} />
    </div>
  );
};