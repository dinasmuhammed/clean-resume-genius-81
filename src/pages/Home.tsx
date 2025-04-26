
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PricingPlans } from "@/components/Pricing/PricingPlans";
import { Features } from "@/components/Features/Features";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import { AffiliateSection } from "@/components/AffiliateProgram/AffiliateSection";
import SeoKeywords from "@/components/SEO/SeoKeywords";
import SeoStructuredData from "@/components/SEO/SeoStructuredData";

const Home = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen">
      <SeoKeywords page="home" />
      <SeoStructuredData type="home" />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Pricing Section */}
      <PricingPlans />

      {/* Affiliate Program Section */}
      <AffiliateSection />

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Professional Resume?</h2>
          <div className="space-x-4">
            <Link to="/builder">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/ats-checker">
              <Button variant="outline" size="lg">Check ATS Score</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
