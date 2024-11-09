(function() {
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const affiliateId = currentScript.getAttribute('data-affiliate-id');

  // Updated validation for new format
  const isValidAffiliateId = (id) => {
    return id && id.length === 7 && /^c\d{2}ak90$/.test(id);
  };

  if (!isValidAffiliateId(affiliateId)) {
    console.error('SXO Resume Widget Error: Invalid or missing affiliate ID. Format should be: cXXak90');
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

      const iframe = document.createElement('iframe');
      iframe.src = `https://sxoresumebulider.vercel.app/builder?ref=${affiliateId}`;
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';
      
      container.appendChild(iframe);

      const referralData = {
        affiliateId,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('sxo_affiliate_ref', JSON.stringify(referralData));
    }
  };

  window.SXOResumeWidget.init();
})();