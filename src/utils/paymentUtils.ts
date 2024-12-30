import { toast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency?: string;
  format?: string;
}

export const initializePayment = async ({ 
  amount, 
  currency = 'INR', 
  format = 'PDF' 
}: PaymentOptions): Promise<boolean> => {
  try {
    console.log('Initializing payment with options:', { amount, currency, format });
    
    if (!validatePaymentAmount(amount)) {
      return false;
    }

    const options = {
      key: 'rzp_test_yQFgBqUY5IyZyF',
      amount: amount * 100, // Razorpay expects amount in smallest currency unit
      currency,
      name: 'Resume Builder Pro',
      description: `Professional Resume in ${format} format`,
      prefill: {
        name: '',
        email: '',
      },
      theme: {
        color: '#6366f1',
      },
      handler: function(response: any) {
        if (response.razorpay_payment_id) {
          console.log('Payment successful with ID:', response.razorpay_payment_id);
          toast({
            title: "Payment Successful",
            description: "Your resume is ready for download",
          });
          return true;
        }
        return false;
      },
      modal: {
        ondismiss: function() {
          toast({
            title: "Payment Cancelled",
            description: "You can try again when ready",
            variant: "destructive",
          });
        }
      }
    };

    // Create and open Razorpay instance
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    
    return new Promise((resolve) => {
      options.handler = function(response: any) {
        if (response.razorpay_payment_id) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    toast({
      title: "Payment Error",
      description: "Unable to initialize payment. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

export const validatePaymentAmount = (amount: number): boolean => {
  if (!amount || amount <= 0) {
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0",
      variant: "destructive",
    });
    return false;
  }

  if (amount > 100000) {
    toast({
      title: "Invalid Amount",
      description: "Amount exceeds maximum limit",
      variant: "destructive",
    });
    return false;
  }

  return true;
};