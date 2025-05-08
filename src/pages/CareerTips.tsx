
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, User, MessageSquare, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";

const CareerTips = () => {
  const [activeTab, setActiveTab] = useState("resume-advice");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Components */}
      <SeoKeywords page="career-tips" />
      <SeoStructuredData type="career-tips" />
      
      {/* Navigation Bar */}
      <nav className="w-full px-4 py-4 bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Career Tips</h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Career Success Tips</h1>
          <p className="mt-2 text-gray-600">
            Expert advice to help you land your dream job and advance your career
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <Tabs defaultValue="resume-advice" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resume-advice" className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Resume Advice
              </TabsTrigger>
              <TabsTrigger value="interview-tips" className="flex items-center gap-2">
                <User className="w-4 h-4" /> Interview Tips
              </TabsTrigger>
            </TabsList>

            {/* Resume Advice Content */}
            <TabsContent value="resume-advice" className="mt-6 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="text-primary" /> Resume Best Practices
                  </h2>
                  <Separator className="my-4" />
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">ATS-Friendly Format</h3>
                      <p className="text-gray-600">
                        Use a clean, simple format with standard headings. Avoid fancy templates with tables, 
                        graphics or columns that can confuse ATS systems. Our builder automatically creates 
                        ATS-optimized resumes.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Targeted Keywords</h3>
                      <p className="text-gray-600">
                        Include relevant keywords from the job description. Our ATS Checker tool can help identify 
                        which keywords to include for your specific role and industry.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Quantify Achievements</h3>
                      <p className="text-gray-600">
                        Use numbers to demonstrate your impact: "Increased sales by 25%" or "Managed a team of 15" 
                        is more powerful than general statements about responsibilities.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Professional Summary</h3>
                      <p className="text-gray-600">
                        Start with a concise professional summary that highlights your most relevant skills and 
                        experience for the specific job you're applying to.
                      </p>
                    </div>
                    
                    <Alert className="bg-blue-50">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-700">Pro Tip</AlertTitle>
                      <AlertDescription className="text-blue-600">
                        Customize your resume for each job application by mirroring the language used in the job description. 
                        This significantly improves your ATS compatibility score.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/ats-checker">
                      <Button className="w-full">Check Your Resume's ATS Score</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Common Resume Mistakes to Avoid</h2>
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 p-1 rounded-full mt-1">
                        <span className="text-red-600 text-xs font-bold">✕</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Generic Statements</h3>
                        <p className="text-gray-600">
                          Avoid vague claims like "team player" or "hard worker" without supporting evidence.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 p-1 rounded-full mt-1">
                        <span className="text-red-600 text-xs font-bold">✕</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Outdated Information</h3>
                        <p className="text-gray-600">
                          Remove old jobs (10+ years ago) unless they're highly relevant to the position.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 p-1 rounded-full mt-1">
                        <span className="text-red-600 text-xs font-bold">✕</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Spelling and Grammar Errors</h3>
                        <p className="text-gray-600">
                          These small mistakes can cost you an interview. Always proofread carefully.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 p-1 rounded-full mt-1">
                        <span className="text-red-600 text-xs font-bold">✕</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Inconsistent Formatting</h3>
                        <p className="text-gray-600">
                          Different fonts, spacing, or bullet styles look unprofessional and confuse ATS systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Interview Tips Content */}
            <TabsContent value="interview-tips" className="mt-6 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <User className="text-primary" /> Interview Preparation
                  </h2>
                  <Separator className="my-4" />
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Research the Company</h3>
                      <p className="text-gray-600">
                        Thoroughly research the company's products, services, values, recent news, and competitors. 
                        This demonstrates genuine interest and helps you tailor your answers.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Practice the STAR Method</h3>
                      <p className="text-gray-600">
                        For behavioral questions, structure your answers using the STAR method:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                        <li><span className="font-medium">Situation:</span> Set the context</li>
                        <li><span className="font-medium">Task:</span> Explain your responsibility</li>
                        <li><span className="font-medium">Action:</span> Describe what you did</li>
                        <li><span className="font-medium">Result:</span> Share the outcome and lessons learned</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Prepare Your Questions</h3>
                      <p className="text-gray-600">
                        Have 3-5 thoughtful questions ready to ask the interviewer. This shows you're engaged and 
                        interested in the role beyond just getting a job.
                      </p>
                    </div>
                    
                    <Alert className="bg-blue-50">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-700">Pro Tip</AlertTitle>
                      <AlertDescription className="text-blue-600">
                        Record yourself answering common interview questions and review the recordings. 
                        This helps identify areas for improvement in your communication style.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="mt-6">
                    <Link to="/interview-guide">
                      <Button className="w-full">View Complete Interview Guide</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Common Interview Questions</h2>
                  <Separator className="my-4" />
                  
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-medium text-primary">"Tell me about yourself."</h3>
                      <p className="text-gray-600 mt-1">
                        Keep your answer professional and relevant. Briefly mention your experience, 
                        skills, and what you're looking for in your career. This is your elevator pitch.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-primary">"What is your greatest weakness?"</h3>
                      <p className="text-gray-600 mt-1">
                        Be honest but strategic. Mention a real weakness, but focus on the steps you're 
                        taking to improve. For example: "I sometimes focus too much on details, but I've been 
                        working on improving my ability to see the bigger picture."
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-primary">"Why should we hire you?"</h3>
                      <p className="text-gray-600 mt-1">
                        Connect your skills and experience directly to the job requirements. Focus on the 
                        unique value you bring and how you can solve their specific problems.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-primary">"Where do you see yourself in five years?"</h3>
                      <p className="text-gray-600 mt-1">
                        Show ambition while remaining realistic. Discuss skills you want to develop and achievements 
                        you hope to accomplish that align with the company's growth trajectory.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CareerTips;
