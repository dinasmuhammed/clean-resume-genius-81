import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializePayment = (amount: number, onSuccess: () => void) => {
  console.log('Initializing payment with amount:', amount);
  
  if (!amount || amount <= 0) {
    console.error('Invalid payment amount:', amount);
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0.",
      variant: "destructive",
    });
    return;
  }

  if (!window.Razorpay) {
    console.error('Razorpay not initialized');
    toast({
      title: "Error",
      description: "Payment system is not available. Please try again later.",
      variant: "destructive",
    });
    return;
  }

  try {
    console.log('Setting up Razorpay options');
    const options = {
      key: "rzp_live_5JYQnqKRnKhB5y",
      amount: amount * 100,
      currency: "INR",
      name: "SXO Resume",
      description: amount === 59 ? "ATS Score Check" : "Resume Download",
      image: "https://your-logo-url.com/logo.png", // Add your logo URL
      notes: {
        address: "SXO Resume Headquarters"
      },
      handler: function (response: any) {
        console.log('Payment response received:', response);
        if (response.razorpay_payment_id) {
          console.log('Payment successful:', response.razorpay_payment_id);
          localStorage.setItem('last_payment_id', response.razorpay_payment_id);
          onSuccess();
          toast({
            title: "Payment Successful",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
        } else {
          console.error('Payment verification failed');
          toast({
            title: "Payment Failed",
            description: "Payment verification failed. Please try again.",
            variant: "destructive",
          });
        }
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#6366f1",
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed by user');
          toast({
            title: "Payment Cancelled",
            description: "You cancelled the payment process.",
          });
        }
      }
    };

    console.log('Opening Razorpay payment modal');
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Payment initialization error:', error);
    toast({
      title: "Payment Error",
      description: "Failed to initialize payment. Please try again.",
      variant: "destructive",
    });
  }
};
