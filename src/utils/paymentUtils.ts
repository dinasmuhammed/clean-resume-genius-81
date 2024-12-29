import { toast } from "@/hooks/use-toast";

// Types for Razorpay integration
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
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
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Constants
const RAZORPAY_KEY = "rzp_test_yqFPyHtrqSs3C9";

// Helper function to load Razorpay script
const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve();
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      reject(new Error('Razorpay SDK failed to load'));
    };
    document.body.appendChild(script);
  });
};

// Main payment initialization function
export const initializePayment = async (
  amount: number,
  onSuccess: (format: string) => void
): Promise<void> => {
  console.log('Initializing payment for amount:', amount);

  try {
    // Load Razorpay script if not already loaded
    if (!window.Razorpay) {
      console.log('Loading Razorpay script...');
      await loadRazorpayScript();
    }

    // Generate order ID (replace with actual order creation logic)
    const orderId = 'order_' + Math.random().toString(36).substr(2, 9);
    console.log('Generated order ID:', orderId);

    try {
      console.log('Creating Razorpay instance with options');
      
      // Get the current origin without any trailing slashes
      const origin = window.location.origin.replace(/\/$/, '');
      
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY,
        amount: amount * 100,
        currency: "INR",
        name: "Resume Builder Pro",
        description: "Resume Builder Pro Subscription",
        order_id: orderId,
        handler: function (response: any) {
          console.log('Payment successful:', response);
          toast({
            title: "Payment Successful",
            description: "Thank you for your purchase!",
          });
          onSuccess('pdf');
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          address: "Resume Builder Pro Corporate Office"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      console.log('Opening Razorpay payment modal');
      razorpayInstance.open();

    } catch (error) {
      console.error('Error creating Razorpay instance:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
      throw error;
    }

  } catch (error) {
    console.error('Payment initialization failed:', error);
    toast({
      title: "Payment Error",
      description: "Failed to initialize payment. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};