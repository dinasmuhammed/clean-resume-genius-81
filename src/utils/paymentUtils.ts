import { toast } from "@/hooks/use-toast";

// Define Razorpay types for better TypeScript support
declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface PaymentSuccessHandler {
  (): void;
}

const RAZORPAY_KEY = "rzp_live_5JYQnqKRnKhB5y";

export const initializePayment = (amount: number, onSuccess: PaymentSuccessHandler) => {
  console.log('Initializing payment with amount:', amount);
  
  if (!amount || amount <= 0) {
    console.error('Invalid payment amount:', amount);
    toast({
      title: "Invalid Amount",
      description: "Payment amount must be greater than 0.",
      variant: "destructive",
    });
    return Promise.reject(new Error('Invalid amount'));
  }

  if (!window.Razorpay) {
    console.error('Razorpay SDK not loaded');
    toast({
      title: "Payment Error",
      description: "Payment system is not available. Please refresh the page.",
      variant: "destructive",
    });
    window.location.href = '/error';
    return Promise.reject(new Error('Razorpay not initialized'));
  }

  return new Promise((resolve, reject) => {
    try {
      console.log('Creating Razorpay instance with options');
      
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "SXO Resume",
        description: "Resume Builder Premium Access",
        image: "https://i.imgur.com/n5tjHFD.png",
        handler: function (response: RazorpayResponse) {
          console.log('Payment response received:', response);
          if (response.razorpay_payment_id) {
            console.log('Payment successful:', response.razorpay_payment_id);
            localStorage.setItem('last_payment_id', response.razorpay_payment_id);
            toast({
              title: "Payment Successful",
              description: `Payment ID: ${response.razorpay_payment_id}`,
            });
            onSuccess();
            resolve(response);
          } else {
            console.error('Payment verification failed - no payment ID');
            toast({
              title: "Payment Failed",
              description: "Payment verification failed. Please try again.",
              variant: "destructive",
            });
            reject(new Error('Payment verification failed'));
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          address: "SXO Resume Builder"
        },
        theme: {
          color: "#2C3E50"
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed by user');
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
            });
            reject(new Error('Payment cancelled by user'));
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
      window.location.href = '/error';
      reject(error);
    }
  });
};