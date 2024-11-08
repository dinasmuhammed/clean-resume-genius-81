import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const AffiliateSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name && email && website) {
      // Generate affiliate ID from email
      const affiliateId = email.slice(-3) + "ak90";
      
      toast({
        title: "Success",
        description: `Your affiliate ID is: ${affiliateId}`,
      });
      
      // Redirect to embed page with the affiliate ID
      navigate(`/embed?id=${affiliateId}`);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
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
                <h3 className="font-semibold mb-2">How to Earn Credits</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Get 1 credit for each successful referral</li>
                  <li>Earn bonus credits when you reach 20 members</li>
                  <li>Credits can be used for premium features</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Credit Values</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Basic Plan: 1 credit (₹200 value)</li>
                  <li>Mid Plan: 2 credits (₹10 value)</li>
                  <li>Premium features unlock with more credits</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Signup Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Become an Affiliate</h1>
            <p className="text-gray-600 mb-8">
              Join our affiliate program and earn credits by promoting SXO Resume on your website.
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
    </div>
  );
};

export default AffiliateSignup;