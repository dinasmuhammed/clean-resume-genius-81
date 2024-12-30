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

export const PaymentDialog = ({
  open,
  onOpenChange,
  onSuccess,
  isAtsCheck = false,
}: PaymentDialogProps) => {
  const handlePayment = async (format: string) => {
    console.log('Initiating payment for format:', format);
    
    // Calculate payment amount based on format and type
    const amount = isAtsCheck 
      ? 59 
      : format.toLowerCase() === 'pdf' 
        ? 599 
        : 699;
    
    try {
      // Initialize payment with calculated amount
      const success = await initializePayment({
        amount,
        format,
        currency: 'INR'
      });

      if (success) {
        console.log('Payment successful for format:', format);
        onSuccess(format);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {isAtsCheck ? 'ATS Check Payment' : 'Choose Download Format'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {isAtsCheck 
              ? 'Process payment to get detailed ATS analysis' 
              : 'Select your preferred resume format to download'
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {isAtsCheck ? (
            <Button
              onClick={() => handlePayment('ATS')}
              className="flex items-center justify-between p-4 hover:bg-primary/90 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5" />
                <span className="font-medium">ATS Check</span>
              </div>
              <span className="font-semibold">₹59</span>
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handlePayment('PDF')}
                className="flex items-center justify-between p-4 hover:bg-primary/90 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5" />
                  <span className="font-medium">PDF Format</span>
                </div>
                <span className="font-semibold">₹599</span>
              </Button>

              <Button
                onClick={() => handlePayment('DOCX')}
                className="flex items-center justify-between p-4 hover:bg-secondary/90 transition-colors"
                variant="secondary"
              >
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5" />
                  <span className="font-medium">DOCX Format</span>
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