
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface PartnerFormData {
  name: string;
  email: string;
  website: string;
  message: string;
}

export const PartnerRegistrationForm = () => {
  const { toast } = useToast();
  const form = useForm<PartnerFormData>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    
    toast({
      title: "Form Submitted Successfully",
      description: `Your SCERT code will be: Sxoresume${name}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Registration</CardTitle>
        <CardDescription>
          Register as a partner to receive your unique SCERT code and earn 30% commission
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          onSubmit={onSubmit}
          action="https://formspree.io/f/mleqngye"
          method="POST"
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input 
                  name="website"
                  type="url"
                  placeholder="https://your-website.com"
                  required
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Additional Information</FormLabel>
              <FormControl>
                <Textarea
                  name="message"
                  placeholder="Tell us about your platform and audience"
                  className="min-h-[100px]"
                />
              </FormControl>
            </FormItem>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Submit Registration
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
