import { toast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency?: string;
  format?: string;
}

export const initializePayment = async ({ amount, currency = 'INR', format = 'PDF' }: PaymentOptions): Promise<boolean> => {
  try {
    console.log('Initializing payment with options:', { amount, currency, format });
    
    // Validate the payment amount before proceeding
    if (!validatePaymentAmount(amount)) {
      throw new Error('Invalid payment amount');
    }

    // Configure Razorpay options
    const options = {
      key: 'rzp_test_yQFgBqUY5IyZyF', // Replace with your actual key
      amount: amount * 100, // Convert to smallest currency unit
      currency,
      name: 'Resume Builder',
      description: `Resume download in ${format} format`,
      handler: function (response: any) {
        console.log('Payment successful:', response);
        toast({
          title: "Payment Successful",
          description: "Your resume is being prepared for download.",
        });
        return true;
      },
      prefill: {
        name: '',
        email: '',
      },
      theme: {
        color: '#6366f1',
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
          toast({
            title: "Payment Cancelled",
            description: "You can try again when you're ready.",
            variant: "destructive",
          });
        }
      }
    };

    // Create and open Razorpay instance
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    
    return true;
  } catch (error) {
    console.error('Payment initialization failed:', error);
    toast({
      title: "Payment Error",
      description: "There was an error initializing the payment. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

export const validatePaymentAmount = (amount: number): boolean => {
  if (amount <= 0) {
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};