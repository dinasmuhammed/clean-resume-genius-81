export const getEmbedCode = (affiliateId: string) => {
  return `
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://sxoresumebulider.vercel.app/embed.js';
    script.setAttribute('data-affiliate-id', '${affiliateId}');
    document.head.appendChild(script);
  })();
</script>
<div id="sxo-resume-widget" class="sxo-resume-container"></div>
  `.trim();
};

export const initializeWidget = (affiliateId: string) => {
  const container = document.getElementById('sxo-resume-widget');
  if (!container) return;

  // Create the widget iframe
  const iframe = document.createElement('iframe');
  iframe.src = `https://sxoresumebulider.vercel.app/builder?ref=${affiliateId}`;
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  
  // Add the iframe to the container
  container.appendChild(iframe);

  // Track affiliate referral
  const trackReferral = () => {
    try {
      // Store affiliate ID in localStorage for attribution
      localStorage.setItem('sxo_affiliate_ref', affiliateId);
      
      // Send tracking event to parent
      window.parent.postMessage({
        type: 'SXO_AFFILIATE_REFERRAL',
        affiliateId: affiliateId,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (error) {
      console.error('Error tracking affiliate referral:', error);
    }
  };

  trackReferral();
};