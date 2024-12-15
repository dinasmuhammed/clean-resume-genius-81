import html2pdf from 'html2pdf.js';

export const exportToFormat = async (format: string = 'pdf') => {
  const element = document.getElementById('resume-preview');
  
  if (!element) {
    console.error('Resume preview element not found');
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
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};