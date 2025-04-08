
import html2pdf from 'html2pdf.js';
import { debounce, optimizedPdfExport } from './performanceUtils';

export const exportToFormat = async (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
    throw new Error('Resume preview element not found');
  }

  // Show loading indication to user
  const loadingIndicator = document.createElement('div');
  loadingIndicator.setAttribute('role', 'status');
  loadingIndicator.setAttribute('aria-live', 'polite');
  loadingIndicator.className = 'fixed top-0 left-0 right-0 bg-primary/80 text-white text-center py-2 z-50';
  loadingIndicator.textContent = `Preparing your resume for ${format.toUpperCase()} export...`;
  document.body.appendChild(loadingIndicator);
  
  // Capture original styles to restore later
  const originalStyles = element.getAttribute('style') || '';
  
  // Apply print-specific styles based on device
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const isMobile = viewportWidth < 768;
  
  // Enhanced styling for better print results with GPU acceleration
  element.setAttribute('style', `${originalStyles}; width: 100%; max-width: 8.5in; margin: 0 auto; background-color: white !important; transform: translateZ(0);`);
  element.classList.add('gpu-accelerated');

  // Accessibility notification
  const accessibilityMessage = document.createElement('div');
  accessibilityMessage.setAttribute('role', 'status');
  accessibilityMessage.setAttribute('aria-live', 'polite');
  accessibilityMessage.style.position = 'absolute';
  accessibilityMessage.style.left = '-9999px';
  accessibilityMessage.innerText = `Generating your resume in ${format.toUpperCase()} format. This may take a moment.`;
  document.body.appendChild(accessibilityMessage);

  // Optimized options for different formats with improved performance
  const opt = {
    margin: [0.5, 0.5],
    filename: `resume.${format}`,
    image: { type: 'jpeg', quality: 0.95 }, // Slightly reduced quality for better performance
    html2canvas: { 
      scale: isMobile ? 2 : 2.5, // Higher scale factor for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
      letterRendering: true,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: null, // Transparent background is faster to render
      removeContainer: true, // Clean up temporary elements
      imageTimeout: 15000, // Increased timeout for image loading
      ignoreElements: (element: Element) => element.classList.contains('no-export'),
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
      precision: 3, // Slightly lower precision for better performance
      hotfixes: ["px_scaling"],
      putOnlyUsedFonts: true,
      floatPrecision: "smart"
    }
  };

  try {
    console.log(`Starting optimized resume export to ${format} format`);
    
    // Use requestAnimationFrame for better timing with browser's render cycle
    await new Promise(resolve => requestAnimationFrame(() => {
      // Allow browser to render any pending UI updates
      setTimeout(resolve, 100);
    }));
    
    // Update loading indicator with progress
    let currentProgress = 0;
    const updateProgress = debounce((progress: number) => {
      currentProgress = progress;
      loadingIndicator.textContent = `Exporting resume: ${Math.round(progress * 100)}%`;
    }, 100);
    
    // Use the optimized export process with progress reporting
    if (format === 'pdf') {
      // For PDF format, use the optimized version with chunking for better performance
      const worker = await html2pdf()
        .from(element)
        .set(opt)
        .outputPdf('blob');
      
      // Create download link
      const url = URL.createObjectURL(worker);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume.${format}`;
      link.click();
      
      // Clean up
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else {
      // For other formats, use standard html2pdf with progress tracking
      await html2pdf().from(element).set(opt).save().then(() => {
        updateProgress(1);
      });
    }
    
    console.log('Resume export completed successfully');
    
    return true;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  } finally {
    // Always reset the styles and remove indicators
    element.setAttribute('style', originalStyles);
    element.classList.remove('gpu-accelerated');
    
    if (document.body.contains(accessibilityMessage)) {
      document.body.removeChild(accessibilityMessage);
    }
    
    if (document.body.contains(loadingIndicator)) {
      // Fade out loading indicator
      loadingIndicator.style.transition = 'opacity 0.5s';
      loadingIndicator.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(loadingIndicator)) {
          document.body.removeChild(loadingIndicator);
        }
      }, 500);
    }
  }
};

// Add a more reliable method for download failure recovery with performance optimizations
export const fallbackExport = (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found for fallback export');
    return;
  }
  
  // Clone the element to avoid modifying the original
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Apply print styles with performance optimizations
  clone.style.width = '100%';
  clone.style.maxWidth = '8.5in';
  clone.style.margin = '0 auto';
  clone.style.backgroundColor = 'white';
  clone.style.padding = '0.5in';
  clone.classList.add('gpu-accelerated', 'optimize-paint');
  
  // Open in a new window and trigger print with optimized rendering
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume Preview</title>
          <style>
            body { 
              margin: 0; 
              padding: 0;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            * {
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            @media print {
              body { 
                margin: 0; 
                padding: 0; 
              }
              @page {
                size: A4;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          ${clone.outerHTML}
          <script>
            // Optimized print process
            const printWithDelay = () => {
              // Use setTimeout to allow browser to render the content first
              setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 300);
              }, 200);
            };
            
            // Check if document is loaded before printing
            if (document.readyState === 'complete') {
              printWithDelay();
            } else {
              window.addEventListener('load', printWithDelay);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};
