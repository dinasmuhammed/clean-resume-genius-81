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
import { Button } from "@/components/ui/button";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  isSelfLearner?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isSelfLearner }: PaymentDialogProps) => {
  const { toast } = useToast();
  
  const handlePayment = () => {
    try {
      const amount = 299;
      initializePayment(amount, onSuccess);
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFreeDownload = () => {
    onSuccess();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Resume Download Options</AlertDialogTitle>
          <AlertDialogDescription>
            Choose how you'd like to download your resume:
            <ul className="mt-4 space-y-2">
              <li>• Free Download - Basic format</li>
              <li>• Premium Download (₹299) - Professional format with ATS optimization</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0">
          <Button onClick={handleFreeDownload} variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Free Download
          </Button>
          <AlertDialogAction onClick={handlePayment} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Premium Download (₹299)
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};