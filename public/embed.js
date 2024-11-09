(function() {
  // Get affiliate ID from script tag
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const affiliateId = currentScript.getAttribute('data-affiliate-id');

  if (!affiliateId) {
    console.error('SXO Resume Widget Error: No affiliate ID provided');
    return;
  }

  // Initialize widget with affiliate ID
  window.SXOResumeWidget = {
    init: function() {
      const container = document.getElementById('sxo-resume-widget');
      if (!container) {
        console.error('SXO Resume Widget Error: No container element found');
        return;
      }

      // Create widget iframe
      const iframe = document.createElement('iframe');
      iframe.src = `https://sxoresumebulider.vercel.app/builder?ref=${affiliateId}`;
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      
      // Add iframe to container
      container.appendChild(iframe);

      // Track referral
      localStorage.setItem('sxo_affiliate_ref', affiliateId);
    }
  };

  // Initialize widget
  window.SXOResumeWidget.init();
})();