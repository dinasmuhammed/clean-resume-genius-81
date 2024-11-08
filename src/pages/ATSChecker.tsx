import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";
import { PaymentDialog } from "@/components/ResumeBuilder/PaymentDialog";

const ATSChecker = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    analyzeResumeContent();
  };

  const analyzeResumeContent = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysis("47% ATS-friendly");
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeResumeFile = async (file: File) => {
    setIsUploading(true);
    try {
      // Basic file validation
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        toast({
          title: "Invalid File",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a PDF file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setShowPaymentDialog(true);
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzeResumeFile(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI Resume Analyzer</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="resume-upload"
            disabled={isUploading || isAnalyzing}
          />
          <label 
            htmlFor="resume-upload" 
            className={`cursor-pointer ${(isUploading || isAnalyzing) ? 'opacity-50' : ''}`}
          >
            <div className="flex flex-col items-center space-y-4">
              <Upload className="h-12 w-12 text-gray-400" />
              <Button disabled={isUploading || isAnalyzing}>
                {isUploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isUploading ? 'Uploading...' : 'Upload Resume (PDF)'}
              </Button>
              <p className="text-sm text-gray-500">Upload your resume in PDF format (max 5MB)</p>
            </div>
          </label>
        </div>

        {analysis && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-lg">Your resume is {analysis}</p>
            </div>
          </div>
        )}
      </div>

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        onSuccess={handlePaymentSuccess}
        isAtsCheck={true}
      />
    </div>
  );
};

export default ATSChecker;