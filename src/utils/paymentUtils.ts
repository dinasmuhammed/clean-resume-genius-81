declare global {
  interface Window {
    Razorpay: any;
  }
}

export const initializePayment = (amount: number, onSuccess: () => void) => {
  const options = {
    key: "rzp_live_5JYQnqKRnKhB5y",
    amount: amount * 100, // Razorpay expects amount in paise
    currency: "INR",
    name: "Resume Builder",
    description: "Resume Builder Pro Access",
    handler: function () {
      onSuccess();
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
};