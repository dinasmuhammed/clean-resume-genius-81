(function() {
  // Get affiliate ID from script tag and validate format
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const affiliateId = currentScript.getAttribute('data-affiliate-id');

  // Validate affiliate ID format
  const isValidAffiliateId = (id) => {
    return id && id.length === 5 && id.endsWith('ak90');
  };

  if (!isValidAffiliateId(affiliateId)) {
    console.error('SXO Resume Widget Error: Invalid or missing affiliate ID. Format should be: XX-ak90');
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

      // Create widget iframe with validated affiliate ID
      const iframe = document.createElement('iframe');
      iframe.src = `https://sxoresumebulider.vercel.app/builder?ref=${affiliateId}`;
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      
      // Add iframe to container
      container.appendChild(iframe);

      // Track referral with timestamp
      const referralData = {
        affiliateId,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('sxo_affiliate_ref', JSON.stringify(referralData));
    }
  };

  // Initialize widget
  window.SXOResumeWidget.init();
})();