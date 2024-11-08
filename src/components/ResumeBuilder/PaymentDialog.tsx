import { Heart } from "lucide-react";
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
    const amount = 299; // Updated amount for resume builder
    initializePayment(amount, onSuccess);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>One-Time Support</AlertDialogTitle>
          <AlertDialogDescription>
            Support our work with a one-time payment. This helps us maintain and improve our resume-building services.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlePayment} className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Proceed to Payment
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};