import { toast } from "@/hooks/use-toast";

interface PaymentOptions {
  amount: number;
  currency?: string;
  format?: string;
}

export const initializePayment = async ({ amount, currency = 'INR', format = 'PDF' }: PaymentOptions) => {
  try {
    console.log('Initializing payment with options:', { amount, currency, format });
    
    const options = {
      key: 'rzp_test_yQFgBqUY5IyZyF', // Replace with your actual key
      amount: amount * 100, // Razorpay expects amount in smallest currency unit
      currency,
      name: 'Resume Builder',
      description: `Resume download in ${format} format`,
      handler: function (response: any) {
        console.log('Payment successful:', response);
        toast({
          title: "Payment Successful",
          description: "Your resume is being prepared for download.",
        });
        // Handle successful payment
        handlePaymentSuccess(response, format);
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

    const razorpay = new (window as any).Razorpay(options);
    console.log('Razorpay instance created');
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

const handlePaymentSuccess = (response: any, format: string) => {
  try {
    console.log('Processing successful payment:', { response, format });
    // Add your payment success logic here
    // For example, trigger the resume download
    
    toast({
      title: "Download Starting",
      description: `Your resume will download shortly in ${format} format.`,
    });
  } catch (error) {
    console.error('Error processing payment success:', error);
    toast({
      title: "Processing Error",
      description: "There was an error processing your payment. Please contact support.",
      variant: "destructive",
    });
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