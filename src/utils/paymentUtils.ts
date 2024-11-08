import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializePayment = (amount: number, onSuccess: () => void) => {
  if (!window.Razorpay) {
    toast({
      title: "Error",
      description: "Payment system is not available. Please try again later.",
      variant: "destructive",
    });
    return;
  }

  try {
    const options = {
      key: "rzp_live_5JYQnqKRnKhB5y",
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "SXO Resume",
      description: amount === 299 ? "Resume Download" : "ATS Score Check",
      handler: function (response: any) {
        if (response.razorpay_payment_id) {
          onSuccess();
          toast({
            title: "Payment Successful",
            description: "Thank you for your payment!",
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
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    toast({
      title: "Payment Error",
      description: "Failed to initialize payment. Please try again.",
      variant: "destructive",
    });
  }
};