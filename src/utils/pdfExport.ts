
import html2pdf from 'html2pdf.js';

export const exportToFormat = async (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  // Apply print-specific styles to ensure proper layout across devices
  const originalStyles = element.getAttribute('style') || '';
  
  // Responsive adjustments for different screen sizes
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const scaleFactor = viewportWidth < 768 ? 1.5 : 2; // Higher scale factor for mobile
  
  // Apply mobile-optimized styles
  element.setAttribute('style', `${originalStyles}; width: 100%; max-width: 8.5in; margin: 0 auto;`);

  // Create accessibility message for screen readers
  const accessibilityMessage = document.createElement('div');
  accessibilityMessage.setAttribute('role', 'status');
  accessibilityMessage.setAttribute('aria-live', 'polite');
  accessibilityMessage.style.position = 'absolute';
  accessibilityMessage.style.left = '-9999px';
  accessibilityMessage.innerText = 'Generating your resume for download. This may take a moment.';
  document.body.appendChild(accessibilityMessage);

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

  try {
    console.log('Starting resume export to:', format);
    
    await html2pdf().set(opt).from(element).save();
    console.log('Resume export completed');
    
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    // Always reset the styles and remove accessibility message
    element.setAttribute('style', originalStyles);
    document.body.removeChild(accessibilityMessage);
  }
};
