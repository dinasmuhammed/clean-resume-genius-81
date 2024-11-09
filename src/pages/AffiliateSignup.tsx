import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { generateAffiliateId } from "@/utils/affiliateUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getEmbedCode } from "@/utils/embed";
import { Copy } from "lucide-react";

const AffiliateSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && email && website) {
      const affiliateId = generateAffiliateId(email);
      setGeneratedId(affiliateId);
      setShowEmbedDialog(true);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  const handleCopyCode = () => {
    const embedCode = getEmbedCode(generatedId);
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Success",
      description: "Embed code copied to clipboard!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          {/* Credit System Information */}
          <Card className="p-6 bg-white">
            <h2 className="text-2xl font-bold text-primary mb-4">Referral Credit System</h2>
            <div className="grid gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">How to Earn</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Earn 1 credit (1 INR) for each successful referral</li>
                  <li>Minimum requirement: 200 members to activate monetization</li>
                  <li>Once activated, earn up to 20 INR per week</li>
                  <li>Start earning immediately after reaching 200 members</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Earning Potential</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Weekly earning cap: 20 INR</li>
                  <li>Monthly potential: Up to 80 INR</li>
                  <li>Additional bonuses for consistent performance</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Signup Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Become an Affiliate</h1>
            <p className="text-gray-600 mb-8">
              Join our affiliate program and start earning by promoting SXO Resume on your website.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL *
                </label>
                <Input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  How will you promote SXO Resume?
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your promotion strategy..."
                />
              </div>

              <Button type="submit" className="w-full">
                Sign Up as Affiliate
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={showEmbedDialog} onOpenChange={setShowEmbedDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Your Embed Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your affiliate ID is: <span className="font-mono font-bold">{generatedId}</span>
            </p>
            <div className="relative">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                {getEmbedCode(generatedId)}
              </pre>
              <Button
                onClick={handleCopyCode}
                className="absolute top-2 right-2"
                size="sm"
                variant="secondary"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Copy this code and paste it into your website where you want the SXO Resume widget to appear.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AffiliateSignup;