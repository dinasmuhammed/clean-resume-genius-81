
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Bot, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { initializePayment } from "@/utils/paymentUtils";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  linkedInUrl: z.string().url("Please enter a valid LinkedIn URL").includes("linkedin.com", {
    message: "URL must be from LinkedIn"
  }),
  additionalInfo: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const LinkedInOptimizationDialog = () => {
  const [isPaid, setIsPaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedInUrl: "",
      additionalInfo: ""
    }
  });

  const handlePayment = async () => {
    try {
      // Get form values but don't submit yet
      const values = form.getValues();
      
      // Validate the form manually
      const result = formSchema.safeParse(values);
      if (!result.success) {
        // Show validation errors
        form.trigger();
        return;
      }

      await initializePayment(499, () => {
        setIsPaid(true);
        toast({
          title: "Payment Successful",
          description: "Please complete and submit the form now.",
        });
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!isPaid) {
      toast({
        title: "Payment Required",
        description: "Please complete the payment before submitting your information.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/mqapgnlg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your LinkedIn profile optimization request has been submitted. Our team will contact you soon.",
        });
        form.reset();
        setIsPaid(false);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Linkedin className="h-4 w-4" />
          LinkedIn Optimization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 items-center">
            <Linkedin className="h-5 w-5" />
            LinkedIn Profile Optimization Service
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Professional LinkedIn Optimization - ₹499</h3>
            <p className="text-sm text-muted-foreground">
              Our expert team will review and optimize your LinkedIn profile to increase your visibility to recruiters and improve your professional brand.
            </p>
            
            {!isPaid && (
              <Button onClick={handlePayment} className="mt-4 w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay ₹499 to Continue
              </Button>
            )}
            
            {isPaid && (
              <div className="bg-green-50 text-green-700 p-2 rounded mt-4 text-sm flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                Payment complete! Please fill out the form below.
              </div>
            )}
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="linkedInUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.linkedin.com/in/yourprofile" {...field} disabled={!isPaid || isSubmitting} />
                    </FormControl>
                    <FormDescription>
                      {!isPaid ? "Complete payment to enable this field" : "Enter your full LinkedIn profile URL"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific areas you'd like us to focus on..."
                        className="h-24"
                        {...field}
                        disabled={!isPaid || isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!isPaid || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit for Optimization"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInOptimizationDialog;
