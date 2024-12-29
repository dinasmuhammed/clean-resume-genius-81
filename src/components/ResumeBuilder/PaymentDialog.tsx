import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { initializePayment } from "@/utils/paymentUtils";
import { Download } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (format: string) => void;
  isAtsCheck?: boolean;
}

export const PaymentDialog = ({ open, onOpenChange, onSuccess, isAtsCheck = false }: PaymentDialogProps) => {
  const handlePayment = async (format: string) => {
    console.log('Initiating payment for format:', format);
    const amount = isAtsCheck ? 299 : (format === 'PDF' ? 499 : 699); // Different price for ATS check
    
    const success = await initializePayment({
      amount,
      format,
      currency: 'INR'
    });

    if (success) {
      console.log('Payment flow initiated successfully');
      onSuccess(format);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isAtsCheck ? 'ATS Check Payment' : 'Choose Download Format'}</DialogTitle>
          <DialogDescription>
            {isAtsCheck ? 'Process payment to get detailed ATS analysis' : 'Select your preferred resume format to download'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {isAtsCheck ? (
            <Button
              onClick={() => handlePayment('ATS')}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <span>ATS Check</span>
              </div>
              <span className="font-semibold">₹299</span>
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handlePayment('PDF')}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  <span>PDF Format</span>
                </div>
                <span className="font-semibold">₹499</span>
              </Button>

              <Button
                onClick={() => handlePayment('DOCX')}
                className="flex items-center justify-between p-4"
                variant="outline"
              >
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  <span>DOCX Format</span>
                </div>
                <span className="font-semibold">₹699</span>
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};