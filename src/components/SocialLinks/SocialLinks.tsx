import { Facebook, Twitter, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SocialLinks = () => {
  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://www.facebook.com/profile.php?id=100084139741037",
      label: "Facebook",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/MuhammadAd93421",
      label: "X (Twitter)",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/ai.adnanvv/",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/muhammedadnanvv/",
      label: "LinkedIn",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      href: "https://wa.me/919656778508",
      label: "WhatsApp",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {socialLinks.map((link) => (
        <Button
          key={link.label}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          asChild
        >
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};