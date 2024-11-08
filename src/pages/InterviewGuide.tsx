import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const InterviewGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full px-4 py-4 bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Interview Guide</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Interview Preparation Guide</h2>
          <p className="text-gray-600">
            Master your next job interview with our comprehensive guide covering everything
            from common questions to post-interview follow-ups.
          </p>
        </section>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Research shows that 47% of candidates fail interviews due to insufficient company research.
            Always thoroughly research the company before your interview.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Before the Interview</CardTitle>
              <CardDescription>Essential preparation steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Research company history and recent news</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Review the job description thoroughly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Prepare relevant examples of past work</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>During the Interview</CardTitle>
              <CardDescription>Key strategies for success</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Use the STAR method for behavioral questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Maintain positive body language</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span>Ask thoughtful questions about the role</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="common-questions">
            <AccordionTrigger>Common Interview Questions</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Tell me about yourself</h4>
                  <p className="text-gray-600">
                    Focus on professional background and relevant achievements. Keep it under 2 minutes.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Why do you want to work here?</h4>
                  <p className="text-gray-600">
                    Connect your career goals with the company's mission and values.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">What's your biggest weakness?</h4>
                  <p className="text-gray-600">
                    Choose a real weakness, but focus on how you're actively improving it.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="salary-negotiation">
            <AccordionTrigger>Salary Negotiation Tips</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Research industry standards before discussing numbers.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Consider the total compensation package, not just salary</li>
                  <li>Be prepared to discuss your value proposition</li>
                  <li>Don't be the first to mention a number if possible</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="follow-up">
            <AccordionTrigger>Post-Interview Follow-up</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p>Send a thank-you email within 24 hours.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Reference specific conversation points</li>
                  <li>Reiterate your interest in the position</li>
                  <li>Keep it concise and professional</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-700">Remember</AlertTitle>
          <AlertDescription className="text-blue-600">
            The interview is a two-way conversation. It's your opportunity to evaluate if the company and role are right for you too.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
};

export default InterviewGuide;