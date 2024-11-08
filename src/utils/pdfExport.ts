import html2pdf from 'html2pdf.js';
import { toast } from "@/hooks/use-toast";

export const exportToPDF = async () => {
  const element = document.getElementById('resume-preview');
  if (!element) {
    toast({
      title: "Error",
      description: "Could not generate PDF. Please try again.",
      variant: "destructive"
    });
    return;
  }

  toast({
    title: "Generating PDF",
    description: "Your resume is being prepared for download..."
  });

  const opt = {
    margin: 1,
    filename: 'sxo-resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    toast({
      title: "Success",
      description: "Your resume has been downloaded successfully!"
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to generate PDF. Please try again.",
      variant: "destructive"
    });
  }
};