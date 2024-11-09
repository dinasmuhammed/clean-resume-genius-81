import { Link } from "react-router-dom";
import { Mail, Clock, Keyboard, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <footer className="bg-gray-50 border-t mt-auto print:hidden">
      <div className="responsive-container py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
                    className="text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:sxoresumebulider@f5.si"
                  className="text-gray-600 hover:text-primary transition-colors duration-200 break-all"
                >
                  sxoresumebulider@f5.si
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Support Hours Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Support Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block mb-2">IST Time Zone</span>
                  <div className="space-y-1">
                    <p className="text-gray-600">Mon – Fri: 6:30 PM – 6:30 AM</p>
                    <p className="text-gray-600">Sat: 6:30 PM – 3:30 AM</p>
                    <p className="text-gray-600">Sun: 8:30 PM – 4:30 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Support Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Platform Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <Keyboard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block mb-2">Supported Systems</span>
                  <div className="space-y-1">
                    <p className="text-gray-600">Windows: Full Support</p>
                    <p className="text-gray-600">macOS: Full Support</p>
                    <p className="text-gray-600">Linux: Full Support</p>
                    <p className="text-gray-600">Mobile: Basic Support</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">Share</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <Share2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-700 block mb-2">Help Others Succeed</span>
                  <p className="text-gray-600 mb-4">Share SXO Resume Builder with your network and help them create professional, ATS-optimized resumes.</p>
                  <Button 
                    onClick={handleShare}
                    className="w-full"
                    variant="outline"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SXO Resume. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;