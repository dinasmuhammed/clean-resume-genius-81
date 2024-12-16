import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram } from "lucide-react";

export const InstagramWidget = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Follow Us on Instagram
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <iframe
          src="https://www.instagram.com/ai.adnanvv/embed"
          className="w-full h-[450px] border-0"
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};