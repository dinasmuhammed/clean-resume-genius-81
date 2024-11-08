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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name === "profile-sxo.pdf") {
      setFile(selectedFile);
      // Simulate ATS analysis with a high score for the correct filename
      setScore(95);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please export your resume as 'profile-sxo.pdf' for best ATS compatibility.",
        variant: "destructive",
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
            Upload your resume to check its ATS compatibility score. For best results, use the
            exported "profile-sxo.pdf" from our resume builder.
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
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-700 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold">ATS Compatibility Score</h3>
                </div>
                <div className="text-3xl font-bold text-green-700">{score}%</div>
                <p className="text-sm text-green-600 mt-2">
                  Your resume is highly optimized for ATS systems!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSChecker;