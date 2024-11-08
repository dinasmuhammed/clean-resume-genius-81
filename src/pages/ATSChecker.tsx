import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { analyzeResume, improveResumeText } from "@/utils/huggingface";
import { Loader2 } from "lucide-react";

const ATSChecker = () => {
  const { toast } = useToast();
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [improvedText, setImprovedText] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume text",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(resumeText);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully",
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

  const handleImprove = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume text",
        variant: "destructive",
      });
      return;
    }

    setIsImproving(true);
    try {
      const result = await improveResumeText(resumeText);
      setImprovedText(result.generated_text);
      toast({
        title: "Improvement Complete",
        description: "Your resume has been improved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI Resume Analyzer</h1>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Paste your resume text here:
          </label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px]"
            placeholder="Paste your resume content here..."
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Resume
          </Button>
          <Button
            onClick={handleImprove}
            disabled={isImproving}
            variant="outline"
            className="w-full"
          >
            {isImproving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Improve Resume
          </Button>
        </div>

        {analysis && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">
              {JSON.stringify(analysis, null, 2)}
            </pre>
          </div>
        )}

        {improvedText && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Improved Resume</h2>
            <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
              {improvedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;