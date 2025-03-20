
import html2pdf from 'html2pdf.js';

export const exportToFormat = async (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
    throw new Error('Resume preview element not found');
  }

  // Capture original styles to restore later
  const originalStyles = element.getAttribute('style') || '';
  
  // Apply print-specific styles based on device
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const isMobile = viewportWidth < 768;
  
  // Enhanced styling for better print results
  element.setAttribute('style', `${originalStyles}; width: 100%; max-width: 8.5in; margin: 0 auto; background-color: white !important;`);

  // Accessibility notification
  const accessibilityMessage = document.createElement('div');
  accessibilityMessage.setAttribute('role', 'status');
  accessibilityMessage.setAttribute('aria-live', 'polite');
  accessibilityMessage.style.position = 'absolute';
  accessibilityMessage.style.left = '-9999px';
  accessibilityMessage.innerText = `Generating your resume in ${format.toUpperCase()} format. This may take a moment.`;
  document.body.appendChild(accessibilityMessage);

  // Optimized options for different formats
  const opt = {
    margin: [0.5, 0.5],
    filename: `resume.${format}`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: isMobile ? 2 : 2.5, // Higher scale factor for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
      precision: 4,
      hotfixes: ["px_scaling"]
    }
  };

  try {
    console.log(`Starting resume export to ${format} format`);
    
    // Add a small delay to ensure styles are applied
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Export with optimized settings
    await html2pdf().set(opt).from(element).save();
    
    console.log('Resume export completed successfully');
    
    return true;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  } finally {
    // Always reset the styles and remove accessibility message
    element.setAttribute('style', originalStyles);
    if (document.body.contains(accessibilityMessage)) {
      document.body.removeChild(accessibilityMessage);
    }
  }
};

// Add a more reliable method for download failure recovery
export const fallbackExport = (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found for fallback export');
    return;
  }
  
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Apply print styles
  clone.style.width = '100%';
  clone.style.maxWidth = '8.5in';
  clone.style.margin = '0 auto';
  clone.style.backgroundColor = 'white';
  clone.style.padding = '0.5in';
  
  // Open in a new window and trigger print
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume Preview</title>
          <style>
            body { margin: 0; padding: 0; }
            @media print {
              body { margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body>
          ${clone.outerHTML}
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 300);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};
