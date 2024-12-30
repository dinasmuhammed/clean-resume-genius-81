import { toast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency?: string;
  format: string;
}

interface RazorpayResponse {
  razorpay_payment_id?: string;
}

export const initializePayment = async ({
  amount,
  currency = 'INR',
  format
}: PaymentOptions): Promise<boolean> => {
  try {
    console.log('Initializing payment with options:', { amount, currency, format });
    
    if (!validatePaymentAmount(amount)) {
      console.error('Invalid payment amount:', amount);
      return false;
    }

    return new Promise((resolve) => {
      const options = {
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
        handler: function(response: RazorpayResponse) {
          if (response.razorpay_payment_id) {
            console.log('Payment successful with ID:', response.razorpay_payment_id);
            toast({
              title: "Payment Successful",
              description: "Your resume is ready for download",
            });
            resolve(true);
            return true;
          }
          console.log('Payment failed - no payment ID received');
          toast({
            title: "Payment Failed",
            description: "Please try again or contact support",
            variant: "destructive",
          });
          resolve(false);
          return false;
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed by user');
            toast({
              title: "Payment Cancelled",
              description: "You can try again when ready",
              variant: "destructive",
            });
            resolve(false);
            return false;
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    });

  } catch (error) {
    console.error('Payment initialization error:', error);
    toast({
      title: "Error",
      description: "Unable to initialize payment. Please try again.",
      variant: "destructive",
    });
    return false;
  }
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