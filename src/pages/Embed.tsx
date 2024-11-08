import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getEmbedCode } from "@/utils/embed";
import { Copy, CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Embed = () => {
  const [searchParams] = useSearchParams();
  const [affiliateId, setAffiliateId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setAffiliateId(idFromUrl);
    }
  }, [searchParams]);

  const handleCopyCode = () => {
    const embedCode = getEmbedCode(affiliateId);
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Copied to clipboard",
      description: "The embed code has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">Embed SXO Resume on Your Website</h1>
          <p className="text-gray-600 mb-4">
            Add our professional resume builder to your website and start earning through referrals.
          </p>
          {!affiliateId && (
            <Link to="/affiliate-signup">
              <Button variant="outline">Become an Affiliate</Button>
            </Link>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Earning Structure</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Earn 1 credit (1 INR) for each successful referral through your embedded widget
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Minimum requirement: 200 members to activate monetization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Once activated, earn up to 20 INR per week (80 INR monthly potential)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Get Your Embed Code</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="affiliateId" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Affiliate ID
                  </label>
                  <Input
                    id="affiliateId"
                    placeholder="Enter your affiliate ID"
                    value={affiliateId}
                    onChange={(e) => setAffiliateId(e.target.value)}
                  />
                </div>
                {affiliateId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Embed Code
                    </label>
                    <div className="relative">
                      <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                        {getEmbedCode(affiliateId)}
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
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">How it works</h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">1. Get your affiliate ID</h4>
                    <p className="text-sm text-gray-600">
                      Sign up for our affiliate program to receive your unique identifier.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">2. Add the code to your site</h4>
                    <p className="text-sm text-gray-600">
                      Copy and paste the embed code into your website where you want the widget to appear.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">3. Start earning</h4>
                    <p className="text-sm text-gray-600">
                      Begin earning credits for each referral and activate monetization at 200 members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Embed;