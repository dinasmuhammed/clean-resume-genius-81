import html2pdf from 'html2pdf.js';
import { toast } from "@/hooks/use-toast";

export const exportToFormat = async (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
    toast({
      title: "Export Error",
      description: "Could not find resume preview. Please try again.",
      variant: "destructive"
    });
    return;
  }

  const opt = {
    margin: 1,
    filename: `resume.${format}`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  try {
    console.log('Starting resume export to:', format);
    await html2pdf().set(opt).from(element).save();
    console.log('Resume export completed');
    toast({
      title: "Download Complete",
      description: "Your resume has been downloaded successfully.",
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    toast({
      title: "Export Error",
      description: "Failed to generate your resume. Please try again.",
      variant: "destructive"
    });
  }
};