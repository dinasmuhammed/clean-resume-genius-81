import { toast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency?: string;
  format: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

export const initializePayment = async ({
  amount,
  currency = 'INR',
  format
}: PaymentOptions): Promise<boolean> => {
  console.log('Initializing payment with options:', { amount, currency, format });
  
  if (!validatePaymentAmount(amount)) {
    console.error('Payment validation failed for amount:', amount);
    return false;
  }

  return new Promise<boolean>((resolve) => {
    const options: RazorpayOptions = {
      key: 'rzp_test_yQFgBqUY5IyZyF',
      amount: amount * 100,
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
      handler: function(response: RazorpayResponse): void {
        if (response.razorpay_payment_id) {
          console.log('Payment successful with ID:', response.razorpay_payment_id);
          toast({
            title: "Payment Successful",
            description: "Your resume is ready for download",
            variant: "default",
          });
          resolve(true);
        } else {
          console.error('Payment failed - no payment ID received');
          toast({
            title: "Payment Failed",
            description: "Please try again or contact support",
            variant: "destructive",
          });
          resolve(false);
        }
      },
      modal: {
        ondismiss: function(): void {
          console.log('Payment modal dismissed by user');
          toast({
            title: "Payment Cancelled",
            description: "You can try again when ready",
            variant: "destructive",
          });
          resolve(false);
        }
      }
    };

    try {
      const razorpay = new (window as any).Razorpay(options) as RazorpayInstance;
      razorpay.open();
    } catch (error) {
      console.error('Failed to initialize Razorpay:', error);
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      resolve(false);
    }
  });
};

const validatePaymentAmount = (amount: number): boolean => {
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