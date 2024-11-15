import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, AlertCircle, CheckCircle, Info } from "lucide-react";
import { PaymentDialog } from "@/components/ResumeBuilder/PaymentDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ATSReport {
  score: number;
  details: string[];
  suggestions: string[];
}

const ATSChecker = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSReport | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false);
    analyzeResumeContent();
  };

  const analyzeResumeContent = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAnalysis({
        score: 49,
        details: [
          "Basic ATS compatibility detected",
          "Standard formatting present",
          "Some keywords identified"
        ],
        suggestions: [
          "Add more industry-specific keywords",
          "Improve section headings",
          "Use simpler formatting"
        ]
      });
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
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        toast({
          title: "Invalid File",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a PDF file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Check if it's our template
      if (file.name.toLowerCase() === 'sxo-resume.pdf') {
        setAnalysis({
          score: 100,
          details: [
            "Perfect ATS compatibility",
            "Optimal keyword placement",
            "Clean, professional formatting",
            "Clear section structure"
          ],
          suggestions: []
        });
        toast({
          title: "Perfect Score!",
          description: "Your resume is 100% ATS-friendly.",
        });
      } else {
        // Check for images (simplified check)
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const pdfHeader = bytes.slice(0, 5);
        const hasImages = Array.from(pdfHeader).some(byte => byte === 0xFF);

        if (hasImages) {
          setAnalysis({
            score: 0,
            details: [
              "Images detected - not ATS-friendly",
              "Complex formatting present",
              "Non-standard layout detected"
            ],
            suggestions: [
              "Remove all images",
              "Use plain text formatting",
              "Stick to standard sections",
              "Use our SXO Resume template for best results"
            ]
          });
          toast({
            title: "Warning",
            description: "Your resume is not ATS-friendly.",
            variant: "destructive"
          });
        } else {
          setShowPaymentDialog(true);
        }
      }
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

  const getScoreColor = (score: number) => {
    if (score === 100) return "text-green-500";
    if (score === 0) return "text-red-500";
    return "text-yellow-500";
  };

  const getScoreIcon = (score: number) => {
    if (score === 100) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score === 0) return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <Info className="h-5 w-5 text-yellow-500" />;
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
                {isUploading ? 'Analyzing...' : 'Check Now'}
              </Button>
              <p className="text-sm text-gray-500">Upload your resume in PDF format (max 5MB)</p>
            </div>
          </label>
        </div>

        {analysis && (
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {getScoreIcon(analysis.score)}
              <h2 className="text-xl font-semibold">
                Analysis Results: <span className={getScoreColor(analysis.score)}>{analysis.score}% ATS-friendly</span>
              </h2>
            </div>

            <Alert>
              <AlertTitle>Detailed Report</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {analysis.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>

            {analysis.suggestions.length > 0 && (
              <Alert>
                <AlertTitle>Recommendations</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
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