declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializePayment = (amount: number, onSuccess: () => void) => {
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
    console.error("Payment initialization failed:", error);
  }
};