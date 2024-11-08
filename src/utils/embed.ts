export const getEmbedCode = (affiliateId: string) => {
  return `
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://sxoresume.com/embed.js';
    script.setAttribute('data-affiliate-id', '${affiliateId}');
    document.head.appendChild(script);
  })();
</script>
<div id="sxo-resume-widget"></div>
  `.trim();
};

export const initializeWidget = (affiliateId: string) => {
  // This function would be called by embed.js to initialize the widget
  console.log(`Initializing widget for affiliate: ${affiliateId}`);
  // Add widget initialization logic here
};