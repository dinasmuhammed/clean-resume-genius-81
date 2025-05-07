
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { calculatePrice, initializePayment } from "@/utils/paymentUtils";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (format: string) => void;
  discountApplied?: boolean;
  isAtsCheck?: boolean;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
  discountApplied = false,
  isAtsCheck = false
}) => {
  const [format, setFormat] = useState<string>("pdf");
  const [isPaymentSubmitted, setIsPaymentSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const basePrice = 399;
  const finalPrice = calculatePrice(basePrice);
  const showDiscount = discountApplied || localStorage.getItem('resume_challenge_completed') === 'true';

  const handleFormatChange = (value: string) => {
    setFormat(value);
  };

  const handlePaymentInitiation = async () => {
    try {
      setIsLoading(true);
      
      // Record payment attempt in Supabase if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        try {
          await supabase.from("payment_attempts").insert({
            user_id: session.user.id,
            amount: finalPrice,
            status: 'initiated',
            product: isAtsCheck ? 'ats_check' : 'resume_download',
            format: format
          } as Database["public"]["Tables"]["payment_attempts"]["Insert"]);
        } catch (error) {
          console.error("Failed to record payment attempt:", error);
          // Continue with payment even if logging fails
        }
      }
      
      // Initialize Razorpay payment
      await initializePayment(finalPrice, (paymentFormat) => {
        setIsLoading(false);
        setIsPaymentSubmitted(true);
        
        toast({
          title: "Payment Successful",
          description: "Your resume is being prepared for download.",
          variant: "success"
        });
        
        // Record successful payment in Supabase if user is logged in
        if (session?.user?.id) {
          try {
            supabase.from("payment_success").insert({
              user_id: session.user.id,
              amount: finalPrice,
              product: isAtsCheck ? 'ats_check' : 'resume_download',
              format: format
            } as Database["public"]["Tables"]["payment_success"]["Insert"]);
          } catch (error) {
            console.error("Failed to record successful payment:", error);
            // Don't block the download if logging fails
          }
        }
        
        // Call the onSuccess callback after a short delay
        setTimeout(() => {
          onSuccess(paymentFormat || format);
        }, 1000);
      }, format);
      
    } catch (error) {
      setIsLoading(false);
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Pre-populate user info from localStorage if available
  const userName = localStorage.getItem('user_name') || "";
  const userEmail = localStorage.getItem('user_email') || "";
  const userPhone = localStorage.getItem('user_phone') || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resume Download</DialogTitle>
          <DialogDescription>
            Complete the payment to download your professional resume.
          </DialogDescription>
        </DialogHeader>
        
        {!isPaymentSubmitted ? (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="format">Select Format</Label>
              <RadioGroup defaultValue={format} onValueChange={handleFormatChange} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf">PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="docx" id="docx" />
                  <Label htmlFor="docx">DOCX</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-base">Price:</Label>
                <div className="text-right">
                  {showDiscount && (
                    <div className="line-through text-gray-500">₹{basePrice}</div>
                  )}
                  <div className="text-lg font-semibold flex items-center gap-1">
                    ₹{finalPrice}
                    {showDiscount && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        10% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="text-sm font-semibold mb-2">Payment Information</div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      defaultValue={userName} 
                      onChange={(e) => localStorage.setItem('user_name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      defaultValue={userPhone} 
                      onChange={(e) => localStorage.setItem('user_phone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={userEmail} 
                    onChange={(e) => localStorage.setItem('user_email', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Secure payment powered by Razorpay. Your payment information is protected.
            </div>
            
            <DialogFooter>
              <Button
                onClick={handlePaymentInitiation}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : `Pay ₹${finalPrice}`}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="rounded-full bg-green-100 w-12 h-12 mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-gray-500 mb-6">Your resume is being prepared for download.</p>
            <div className="animate-pulse text-sm text-gray-500">Downloading will start automatically...</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
