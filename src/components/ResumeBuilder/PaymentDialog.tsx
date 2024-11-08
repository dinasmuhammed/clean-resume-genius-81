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
import { initializePayment } from "@/utils/paymentUtils";
import { useToast } from "@/components/ui/use-toast";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  isAtsCheck?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isAtsCheck = false }: PaymentDialogProps) => {
  const { toast } = useToast();
  
  const handlePayment = () => {
    try {
      const amount = isAtsCheck ? 29 : 299;
      initializePayment(amount, onSuccess);
    } catch (error) {
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
                  <li>• Instant download</li>
                </>
              )}
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0">
          <AlertDialogAction onClick={handlePayment} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            {isAtsCheck ? "Analyze Resume (₹29)" : "Download Premium Resume (₹299)"}
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};