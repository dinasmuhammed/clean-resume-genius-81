
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

  // Apply print-specific styles to ensure proper layout across devices
  const originalStyles = element.getAttribute('style') || '';
  
  // Responsive adjustments for different screen sizes
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const scaleFactor = viewportWidth < 768 ? 1.5 : 2; // Higher scale factor for mobile
  
  // Apply mobile-optimized styles
  element.setAttribute('style', `${originalStyles}; width: 100%; max-width: 8.5in; margin: 0 auto;`);

  const opt = {
    margin: [0.5, 0.5],
    filename: `resume.${format}`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: scaleFactor,
      useCORS: true,
      logging: false, // Disable logging in production
      allowTaint: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
      precision: 4
    }
  };

  toast({
    title: "Preparing Download",
    description: "Your resume is being generated, please wait...",
  });

  try {
    console.log('Starting resume export to:', format);
    
    // Add an accessibility message for screen readers
    const accessibilityMessage = document.createElement('div');
    accessibilityMessage.setAttribute('role', 'status');
    accessibilityMessage.setAttribute('aria-live', 'polite');
    accessibilityMessage.style.position = 'absolute';
    accessibilityMessage.style.left = '-9999px';
    accessibilityMessage.innerText = 'Generating your resume for download. This may take a moment.';
    document.body.appendChild(accessibilityMessage);
    
    await html2pdf().set(opt).from(element).save();
    console.log('Resume export completed');
    
    // Reset the styles
    element.setAttribute('style', originalStyles);
    
    // Clean up accessibility message
    document.body.removeChild(accessibilityMessage);
    
    toast({
      title: "Download Complete",
      description: "Your resume has been downloaded successfully.",
    });
    
    // Track successful downloads
    try {
      const downloadCount = parseInt(localStorage.getItem('download_count') || '0');
      localStorage.setItem('download_count', (downloadCount + 1).toString());
      
      // If this is their first download, show a feedback prompt
      if (downloadCount === 0) {
        setTimeout(() => {
          toast({
            title: "How was your experience?",
            description: "We'd love to hear your feedback about our resume builder!",
          });
        }, 3000);
      }
    } catch (e) {
      // Ignore analytics errors
      console.error('Analytics error:', e);
    }
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Reset the styles
    element.setAttribute('style', originalStyles);
    
    toast({
      title: "Export Error",
      description: "Failed to generate your resume. Please try again.",
      variant: "destructive"
    });
  }
};
