import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { initializePayment } from "@/utils/paymentUtils";
import { Download, AlertCircle, Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async (format: string) => {
    setIsProcessing(true);
    setError(null);
    setSelectedFormat(format);
    setProgress(0);
    setPaymentStatus('processing');
    console.log('Initiating payment for format:', format);
    
    const amount = isAtsCheck 
      ? 59 
      : format.toLowerCase() === 'pdf' 
        ? 599 
        : 699;

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 500);
    
    try {
      toast({
        title: "Initializing Payment",
        description: "Please wait while we connect to our payment gateway...",
      });

      const success = await initializePayment({
        amount,
        format,
        currency: 'INR'
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (success) {
        console.log('Payment successful for format:', format);
        setPaymentStatus('success');
        toast({
          title: "Payment Successful! 🎉",
          description: "Your document is being prepared for download.",
          variant: "default",
        });
        setTimeout(() => {
          onSuccess(format);
        }, 1000);
      } else {
        setPaymentStatus('error');
        setError('Payment could not be processed. Please try again.');
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Payment failed:', error);
      setPaymentStatus('error');
      setError('An unexpected error occurred. Please try again later.');
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setSelectedFormat(null);
        setProgress(0);
        setPaymentStatus('idle');
      }, 1000);
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'processing':
        return <Loader2 className="h-6 w-6 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!isProcessing) {
          setError(null);
          setSelectedFormat(null);
          setProgress(0);
          setPaymentStatus('idle');
          onOpenChange(newOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            {isAtsCheck ? 'ATS Check Payment' : 'Choose Download Format'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {isAtsCheck 
              ? 'Process payment to get detailed ATS analysis' 
              : 'Select your preferred resume format to download'
            }
          </DialogDescription>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive" className="animate-in fade-in-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isProcessing && (
          <div className="space-y-4 animate-in fade-in-50">
            <div className="flex items-center justify-center">{getStatusIcon()}</div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {paymentStatus === 'processing' ? 'Processing your payment...' : 
               paymentStatus === 'success' ? 'Payment successful!' :
               paymentStatus === 'error' ? 'Payment failed' : ''}
            </p>
          </div>
        )}

        <div className="grid gap-4 py-4">
          {isAtsCheck ? (
            <Button
              onClick={() => handlePayment('ATS')}
              className="flex items-center justify-between p-4 hover:bg-primary/90 transition-all duration-200 relative group"
              disabled={isProcessing}
            >
              <div className="flex items-center gap-3">
                {isProcessing && selectedFormat === 'ATS' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span className="font-medium">ATS Check</span>
              </div>
              <span className="font-semibold">₹59</span>
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handlePayment('PDF')}
                className="flex items-center justify-between p-4 hover:bg-primary/90 transition-all duration-200 group"
                disabled={isProcessing}
              >
                <div className="flex items-center gap-3">
                  {isProcessing && selectedFormat === 'PDF' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  )}
                  <span className="font-medium">PDF Format</span>
                </div>
                <span className="font-semibold">₹599</span>
              </Button>

              <Button
                onClick={() => handlePayment('DOCX')}
                className="flex items-center justify-between p-4 hover:bg-secondary/90 transition-all duration-200 group"
                variant="secondary"
                disabled={isProcessing}
              >
                <div className="flex items-center gap-3">
                  {isProcessing && selectedFormat === 'DOCX' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  )}
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