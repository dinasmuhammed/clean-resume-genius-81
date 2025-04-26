
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link as LinkIcon } from 'lucide-react';
import { PartnerRegistrationForm } from './PartnerRegistrationForm';

export const AffiliateSection = () => {
  const whatsappLink = "https://api.whatsapp.com/send/?phone=919656778508&text&type=phone_number&app_absent=0";
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Affiliate Program</h2>
          <p className="text-gray-600 mb-8">
            Partner with us and earn by sharing our resume building tools with your audience
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Benefits</CardTitle>
                <CardDescription>Earn commission for every successful referral</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <LinkIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Easy Integration</h3>
                      <p className="text-sm text-gray-600">Embed our widget on your website with simple code</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <LinkIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">30% Commission</h3>
                      <p className="text-sm text-gray-600">Earn attractive commissions on each conversion</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      Contact Us on WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <PartnerRegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
};
