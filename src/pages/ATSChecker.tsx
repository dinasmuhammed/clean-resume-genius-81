import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ATSChecker = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [details, setDetails] = useState<string[]>([]);

  const analyzeResume = async (file: File) => {
    // Simulated ATS analysis
    const scores = [];
    const details = [];

    if (file.name === "profile-sxo.pdf") {
      scores.push(95);
      details.push("✓ Optimal file format and naming");
    } else {
      scores.push(2);
      details.push("⚠ File should be named 'profile-sxo.pdf'");
    }

    // Simulated check for images (in a real implementation, this would need PDF parsing)
    if (file.size > 500000) { // Basic heuristic: larger files might contain images
      scores.push(2);
      details.push("⚠ Detected possible images - avoid using images or colors");
    } else {
      scores.push(98);
      details.push("✓ No images detected");
    }

    const finalScore = Math.floor(scores.reduce((a, b) => a + b, 0) / scores.length);
    return { score: finalScore, details };
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const result = await analyzeResume(selectedFile);
      setScore(result.score);
      setDetails(result.details);
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Resume Builder
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-primary mb-4">ATS Score Checker</h1>
          <p className="text-gray-600 mb-6">
            Upload your resume to check its ATS compatibility score.
          </p>

          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Click to upload your resume (PDF)
                </span>
              </label>
            </div>

            {score !== null && (
              <div className={`${score > 90 ? 'bg-green-50' : 'bg-yellow-50'} p-4 rounded-lg`}>
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold">ATS Compatibility Score</h3>
                </div>
                <div className={`text-3xl font-bold ${score > 90 ? 'text-green-700' : 'text-yellow-700'}`}>
                  {score}%
                </div>
                <div className="mt-4 space-y-2">
                  {details.map((detail, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;