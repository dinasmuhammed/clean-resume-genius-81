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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { initializePayment } from "@/utils/paymentUtils";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (format: string) => void;
  isAtsCheck?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isAtsCheck = false }: PaymentDialogProps) => {
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState("");
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isProcessing, setIsProcessing] = useState(false);

  const validateReferralCode = (code: string) => {
    return code.length === 5 && code.endsWith("ak90");
  };

  const calculateDiscountedAmount = (originalAmount: number, code: string) => {
    if (validateReferralCode(code)) {
      return Math.floor(originalAmount * 0.9);
    }
    return originalAmount;
  };

  const handlePayment = async () => {
    if (isProcessing) return;
    
    console.log('Starting payment process');
    setIsValidatingCode(true);
    setIsProcessing(true);
    
    try {
      const baseAmount = isAtsCheck ? 59 : 599;
      let finalAmount = baseAmount;

      if (referralCode) {
        if (validateReferralCode(referralCode)) {
          finalAmount = calculateDiscountedAmount(baseAmount, referralCode);
          console.log('Referral code applied, new amount:', finalAmount);
          toast({
            title: "Referral Applied",
            description: "You got 10% off with your referral code!",
          });
        } else {
          console.log('Invalid referral code:', referralCode);
          toast({
            title: "Invalid Referral",
            description: "The referral code is not valid.",
            variant: "destructive",
          });
          setIsValidatingCode(false);
          setIsProcessing(false);
          return;
        }
      }

      await initializePayment(finalAmount, () => {
        console.log('Payment successful, initiating download/check');
        onSuccess(selectedFormat);
        setIsValidatingCode(false);
        setIsProcessing(false);
        onOpenChange(false);
      });
    } catch (error) {
      console.error('Payment error:', error);
      setIsValidatingCode(false);
      setIsProcessing(false);
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
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
                  <li>• Multiple format options</li>
                </>
              )}
            </ul>

            {!isAtsCheck && (
              <div className="mt-4 space-y-2">
                <Label>Select Format</Label>
                <RadioGroup
                  defaultValue="pdf"
                  value={selectedFormat}
                  onValueChange={setSelectedFormat}
                  className="grid grid-cols-3 gap-2"
                >
                  <div>
                    <RadioGroupItem value="pdf" id="pdf" className="peer sr-only" />
                    <Label
                      htmlFor="pdf"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      PDF
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="docx" id="docx" className="peer sr-only" />
                    <Label
                      htmlFor="docx"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      DOCX
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="doc" id="doc" className="peer sr-only" />
                    <Label
                      htmlFor="doc"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      DOC
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

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
                Use a valid referral code to get 10% off!
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0">
          <AlertDialogAction 
            onClick={handlePayment} 
            className="w-full sm:w-auto"
            disabled={isValidatingCode || isProcessing}
          >
            <Download className="w-4 h-4 mr-2" />
            {isAtsCheck ? 'Check Now' : 'Download Now'}
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};