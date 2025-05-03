
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
  const {
    toast
  } = useToast();
  return <div className="min-h-screen">
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
          
          {/* Product Hunt Badge */}
          <div className="flex justify-center mb-8">
            <a 
              href="https://www.producthunt.com/posts/sxo-resume?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-sxo&#0045;resume" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=594173&theme=light&t=1746111330161" 
                alt="SXO Resume - Professional resume builder | Product Hunt" 
                style={{ width: '250px', height: '54px' }} 
                width="250" 
                height="54" 
              />
            </a>
          </div>

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
    </div>;
};
export default Home;
