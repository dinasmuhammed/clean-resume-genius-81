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

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  isSelfLearner?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isSelfLearner }: PaymentDialogProps) => {
  const handlePayment = () => {
    const amount = 299;
    initializePayment(amount, onSuccess);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Resume Download</AlertDialogTitle>
          <AlertDialogDescription>
            Proceed to download your professionally formatted resume.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePayment} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download (₹299)
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};