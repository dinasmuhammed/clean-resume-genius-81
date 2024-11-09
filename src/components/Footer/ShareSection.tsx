import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SocialLinks } from "../SocialLinks/SocialLinks";

export const ShareSection = () => {
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
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Share</h3>
        <p className="text-sm text-gray-600 mb-6">
          Help others create professional, ATS-optimized resumes by sharing SXO Resume Builder.
        </p>
        <Button 
          onClick={handleShare}
          variant="outline"
          className="w-full justify-center gap-2 mb-4"
        >
          <Share2 className="w-4 h-4" />
          Share Now
        </Button>
        <SocialLinks />
      </CardContent>
    </Card>
  );
};