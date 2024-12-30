import { toast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency?: string;
  format?: string;
}

export const initializePayment = async ({ amount, currency = 'INR', format = 'PDF' }: PaymentOptions): Promise<boolean> => {
  try {
    console.log('Initializing payment with options:', { amount, currency, format });
    
    // Enhanced validation with detailed error messages
    if (!validatePaymentAmount(amount)) {
      console.error('Payment validation failed:', { amount, currency });
      toast({
        title: "Invalid Payment",
        description: `Payment amount ${amount} ${currency} is invalid.`,
        variant: "destructive",
      });
      return false;
    }

    // Enhanced Razorpay configuration with better error tracking
    const options = {
      key: 'rzp_test_yQFgBqUY5IyZyF',
      amount: amount * 100,
      currency,
      name: 'Resume Builder Pro',
      description: `Professional Resume in ${format} format`,
      handler: function (response: any) {
        console.log('Payment successful:', response);
        toast({
          title: "Success!",
          description: "Your payment was processed successfully.",
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
          console.log('Payment modal closed by user');
          toast({
            title: "Payment Cancelled",
            description: "You can try again when ready.",
            variant: "destructive",
          });
        }
      }
    };

    // Initialize Razorpay with comprehensive error handling
    try {
      const razorpay = new (window as any).Razorpay(options);
      console.log('Razorpay instance created successfully');
      razorpay.open();
      return true;
    } catch (razorpayError) {
      console.error('Razorpay initialization error:', razorpayError);
      toast({
        title: "Payment Error",
        description: "Could not initialize payment gateway. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  } catch (error) {
    console.error('Payment system error:', error);
    toast({
      title: "System Error",
      description: "An unexpected error occurred. Please try again later.",
      variant: "destructive",
    });
    return false;
  }
};

export const validatePaymentAmount = (amount: number): boolean => {
  if (!amount || amount <= 0) {
    console.error('Invalid payment amount detected:', amount);
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0.",
      variant: "destructive",
    });
    return false;
  }
  
  if (amount > 100000) {
    console.error('Amount exceeds maximum limit:', amount);
    toast({
      title: "Invalid Amount",
      description: "Payment amount exceeds maximum limit.",
      variant: "destructive",
    });
    return false;
  }
  
  return true;
};