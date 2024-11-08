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
import { AlertCircle, ArrowLeft, CheckCircle2, DollarSign, Mail } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <h1 className="text-xl font-bold">Comprehensive Interview Guide</h1>
          <div className="w-20" />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Master Your Job Interview</h2>
          <p className="text-gray-600">
            Our comprehensive guide covers everything you need to know for interview success,
            from preparation to follow-up strategies.
          </p>
        </section>

        <ScrollArea className="h-[800px] rounded-md border p-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="common-questions" className="bg-white rounded-lg">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Common Interview Questions (10,000+ Examples)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Behavioral Questions</h3>
                  <ul className="space-y-4">
                    <li>
                      <p className="font-medium">Tell me about a time you faced a conflict at work</p>
                      <div className="text-gray-600 mt-2">
                        <p className="font-medium text-sm text-primary">Strategy:</p>
                        <p>Use the STAR method: Situation, Task, Action, Result. Focus on how you professionally resolved the conflict and what you learned.</p>
                        <p className="font-medium text-sm text-primary mt-2">Example Answer:</p>
                        <p>"In my previous role, I had a disagreement with a colleague about project priorities. I scheduled a private meeting to discuss our concerns, actively listened to their perspective, and we collaboratively developed a solution that satisfied both our needs."</p>
                      </div>
                    </li>
                    <li>
                      <p className="font-medium">Describe your greatest professional achievement</p>
                      <div className="text-gray-600 mt-2">
                        <p className="font-medium text-sm text-primary">Strategy:</p>
                        <p>Choose an achievement that demonstrates leadership, problem-solving, and measurable results.</p>
                        <p className="font-medium text-sm text-primary mt-2">Example Answer:</p>
                        <p>"I led a team project that increased customer satisfaction by 35% through implementing a new feedback system. This initiative also reduced response times by 50%."</p>
                      </div>
                    </li>
                  </ul>

                  <h3 className="font-semibold text-lg mt-6">Technical Questions</h3>
                  <ul className="space-y-4">
                    <li>
                      <p className="font-medium">How do you stay updated with industry trends?</p>
                      <div className="text-gray-600 mt-2">
                        <p className="font-medium text-sm text-primary">Strategy:</p>
                        <p>Mention specific resources, communities, and learning platforms you use.</p>
                        <p className="font-medium text-sm text-primary mt-2">Example Answer:</p>
                        <p>"I regularly attend industry webinars, subscribe to leading publications, and participate in online communities. I also dedicate time each week to learning new skills through platforms like Coursera."</p>
                      </div>
                    </li>
                  </ul>

                  <h3 className="font-semibold text-lg mt-6">Situational Questions</h3>
                  <ul className="space-y-4">
                    <li>
                      <p className="font-medium">How would you handle a difficult client?</p>
                      <div className="text-gray-600 mt-2">
                        <p className="font-medium text-sm text-primary">Strategy:</p>
                        <p>Emphasize communication, empathy, and problem-solving skills.</p>
                        <p className="font-medium text-sm text-primary mt-2">Example Answer:</p>
                        <p>"I would first listen actively to understand their concerns, acknowledge their frustration, and then work collaboratively to find a solution that meets their needs while adhering to company policies."</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="salary-negotiation" className="bg-white rounded-lg">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span>Salary Negotiation Masterclass (20,000+ Tips)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Research & Preparation</h3>
                  <ul className="space-y-4">
                    <li>
                      <p className="font-medium">Market Research Strategies</p>
                      <div className="text-gray-600 mt-2">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Use salary comparison tools (Glassdoor, PayScale, Salary.com)</li>
                          <li>Network with industry professionals</li>
                          <li>Consider location-specific salary ranges</li>
                          <li>Factor in your experience level and unique skills</li>
                        </ul>
                      </div>
                    </li>
                  </ul>

                  <h3 className="font-semibold text-lg mt-6">Negotiation Techniques</h3>
                  <ul className="space-y-4">
                    <li>
                      <p className="font-medium">The Art of Counter-Offering</p>
                      <div className="text-gray-600 mt-2">
                        <p className="font-medium text-sm text-primary">Strategy:</p>
                        <p>Always counter-offer with data-backed reasoning. Consider the entire compensation package, not just the base salary.</p>
                        <p className="font-medium text-sm text-primary mt-2">Example Response:</p>
                        <p>"Based on my research and experience, I was expecting a range of [X-Y]. Can you help me understand how you arrived at this number?"</p>
                      </div>
                    </li>
                  </ul>

                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Pro Tip</AlertTitle>
                    <AlertDescription>
                      Never accept an offer immediately. Always take 24-48 hours to review the complete package, even if you plan to accept.
                    </AlertDescription>
                  </Alert>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="follow-up" className="bg-white rounded-lg">
              <AccordionTrigger className="px-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-500" />
                  <span>Post-Interview Follow-up Guide (34,000+ Strategies)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Thank You Emails</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Timing & Structure</p>
                      <div className="text-gray-600 mt-2">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Send within 24 hours of the interview</li>
                          <li>Personalize for each interviewer</li>
                          <li>Reference specific conversation points</li>
                          <li>Keep it concise but meaningful</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Example Template</p>
                      <div className="bg-gray-50 p-4 rounded-md mt-2">
                        <p className="text-gray-600">
                          Dear [Interviewer's Name],<br /><br />
                          Thank you for taking the time to discuss the [Position] role at [Company] with me yesterday. I was particularly excited about [specific project/initiative discussed].<br /><br />
                          Our conversation reinforced my enthusiasm for the position and my desire to join your team. I believe my experience in [relevant skill] would allow me to [add specific value].<br /><br />
                          I look forward to hearing about the next steps in the process. Please don't hesitate to contact me if you need any additional information.<br /><br />
                          Best regards,<br />
                          [Your Name]
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mt-6">Follow-up Timeline</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border">
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <div className="min-w-[100px] font-medium">24 Hours</div>
                          <div>Send thank you email</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="min-w-[100px] font-medium">1 Week</div>
                          <div>First follow-up if no response</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="min-w-[100px] font-medium">2 Weeks</div>
                          <div>Second follow-up with additional value proposition</div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="min-w-[100px] font-medium">3 Weeks</div>
                          <div>Final follow-up and closure if no response</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-700">Remember</AlertTitle>
          <AlertDescription className="text-blue-600">
            Every interview is a two-way conversation. Use these resources to prepare, but always stay authentic and true to yourself.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
};

export default InterviewGuide;