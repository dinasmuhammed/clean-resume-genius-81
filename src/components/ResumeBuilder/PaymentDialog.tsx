import { Download } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initializePayment } from "@/utils/paymentUtils";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  isAtsCheck?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isAtsCheck = false }: PaymentDialogProps) => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  const validateReferralCode = (code: string) => {
    // Basic validation: must be exactly 5 characters and end with "ak90"
    return code.length === 5 && code.endsWith("ak90");
  };

  const calculateDiscountedAmount = (originalAmount: number, code: string) => {
    if (validateReferralCode(code)) {
      return Math.floor(originalAmount * 0.9); // 10% discount
    }
    return originalAmount;
  };

  const handlePayment = () => {
    setIsValidatingCode(true);
    try {
      const baseAmount = isAtsCheck ? 29 : 299;
      let finalAmount = baseAmount;

      if (referralCode) {
        if (validateReferralCode(referralCode)) {
          finalAmount = calculateDiscountedAmount(baseAmount, referralCode);
          toast({
            title: "Referral Applied",
            description: "You got 10% off with your referral code!",
          });
        } else {
          toast({
            title: "Invalid Referral",
            description: "The referral code is not valid.",
            variant: "destructive",
          });
          setIsValidatingCode(false);
          return;
        }
      }

      initializePayment(finalAmount, () => {
        onSuccess();
        setIsValidatingCode(false);
      });
    } catch (error) {
      setIsValidatingCode(false);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getDisplayAmount = () => {
    const baseAmount = isAtsCheck ? 29 : 299;
    return validateReferralCode(referralCode) ? 
      calculateDiscountedAmount(baseAmount, referralCode) : 
      baseAmount;
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{isAtsCheck ? "ATS Analysis" : "Resume Download"}</AlertDialogTitle>
          <AlertDialogDescription>
            {isAtsCheck ? (
              "Get your resume analyzed by our ATS system:"
            ) : (
              "Unlock your professional resume with our premium ATS-optimized format:"
            )}
            <ul className="mt-4 space-y-2">
              {isAtsCheck ? (
                <>
                  <li>• Detailed ATS compatibility score</li>
                  <li>• Keyword analysis</li>
                  <li>• Format optimization tips</li>
                </>
              ) : (
                <>
                  <li>• Professional formatting</li>
                  <li>• ATS optimization</li>
                  <li>• Instant download</li>
                </>
              )}
            </ul>

            <div className="mt-4 space-y-2">
              <Label htmlFor="referralCode">Have a referral code?</Label>
              <Input
                id="referralCode"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                disabled={isValidatingCode}
              />
              <p className="text-xs text-muted-foreground">
                Use a valid referral code to get 10% off! Don't have one? 
                <a href="/affiliate-signup" className="text-primary hover:underline ml-1">
                  Become an affiliate
                </a>
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0">
          <AlertDialogAction 
            onClick={handlePayment} 
            className="w-full sm:w-auto"
            disabled={isValidatingCode}
          >
            <Download className="w-4 h-4 mr-2" />
            {isAtsCheck ? 
              `Analyze Resume (₹${getDisplayAmount()})` : 
              `Download Premium Resume (₹${getDisplayAmount()})`
            }
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};