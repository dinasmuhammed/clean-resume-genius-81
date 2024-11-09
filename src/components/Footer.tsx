import { Link } from "react-router-dom";
import { Mail, Clock, Keyboard, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareUrl = "https://sxoresumebulider.vercel.app/";
    const shareMessage = "Create professional, ATS-optimized resumes easily with SXO Resume Builder! Check it out:";
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'SXO Resume Builder',
          text: shareMessage,
          url: shareUrl
        });
        toast({
          title: "Thanks for sharing!",
          description: "You're helping others discover professional resume building tools.",
        });
      } else {
        const textToShare = `${shareMessage} ${shareUrl}`;
        await navigator.clipboard.writeText(textToShare);
        toast({
          title: "Link copied!",
          description: "Share this link with your network to help them create professional resumes.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Couldn't share",
        description: "Please try copying the link manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-white border-t mt-auto print:hidden">
      <div className="responsive-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Quick Links Section */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { to: "/about", label: "About Us" },
                  { to: "/terms", label: "Terms & Conditions" },
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/cookies", label: "Cookies Policy" },
                  { to: "/embed", label: "Embed Widget" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="block text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-6 pt-6 border-t">
                <Mail className="w-4 h-4 text-gray-400" />
                <a
                  href="mailto:sxoresumebulider@f5.si"
                  className="text-sm text-gray-600 hover:text-primary transition-colors break-all"
                >
                  sxoresumebulider@f5.si
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Support Hours Section */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Support Hours</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Mon – Fri: 6:30 PM – 6:30 AM</p>
                <p>Sat: 6:30 PM – 3:30 AM</p>
                <p>Sun: 8:30 PM – 4:30 AM</p>
                <p className="text-gray-500">(IST Time Zone)</p>
              </div>
            </CardContent>
          </Card>

          {/* Platform Support Section */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Platform Support</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Windows: Full Support</p>
                <p>macOS: Full Support</p>
                <p>Linux: Full Support</p>
                <p>Mobile: Basic Support</p>
              </div>
            </CardContent>
          </Card>

          {/* Share Section */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Share</h3>
              <p className="text-sm text-gray-600 mb-6">
                Help others create professional, ATS-optimized resumes by sharing SXO Resume Builder.
              </p>
              <Button 
                onClick={handleShare}
                variant="outline"
                className="w-full justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Now
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} SXO Resume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
