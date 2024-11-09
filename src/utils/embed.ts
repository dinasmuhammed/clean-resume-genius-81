export const getEmbedCode = (affiliateId: string) => {
  if (!affiliateId || affiliateId.length !== 7 || !/^c\d{2}ak90$/.test(affiliateId)) {
    throw new Error('Invalid affiliate ID format. Must be in format cXXak90');
  }

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
  if (!affiliateId || affiliateId.length !== 7 || !/^c\d{2}ak90$/.test(affiliateId)) {
    console.error('Invalid affiliate ID format');
    return;
  }

  const container = document.getElementById('sxo-resume-widget');
  if (!container) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://sxoresumebulider.vercel.app/builder?ref=${affiliateId}`;
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '8px';
  
  container.appendChild(iframe);

  // Track affiliate referral with timestamp
  const referralData = {
    affiliateId,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('sxo_affiliate_ref', JSON.stringify(referralData));
  
  // Notify parent window
  window.parent.postMessage({
    type: 'SXO_AFFILIATE_REFERRAL',
    ...referralData
  }, '*');
};
