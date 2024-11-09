export const validateAffiliateId = (affiliateId: string): boolean => {
  // Validate affiliate ID format (ends with 'ak90' and is 5 characters long)
  return affiliateId.length === 5 && affiliateId.endsWith('ak90');
};

export const getAffiliateReferral = (): string | null => {
  try {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlParams.get('ref');
    
    if (refFromUrl && validateAffiliateId(refFromUrl)) {
      localStorage.setItem('sxo_affiliate_ref', refFromUrl);
      return refFromUrl;
    }

    // Check localStorage as fallback
    const storedRef = localStorage.getItem('sxo_affiliate_ref');
    return storedRef && validateAffiliateId(storedRef) ? storedRef : null;
  } catch (error) {
    console.error('Error getting affiliate referral:', error);
    return null;
  }
};

export const trackAffiliateConversion = async (affiliateId: string, amount: number) => {
  try {
    // Here you would typically make an API call to your backend to track the conversion
    console.log(`Tracking conversion for affiliate ${affiliateId} with amount ${amount}`);
    
    // For now, we'll just store it in localStorage for demonstration
    const conversions = JSON.parse(localStorage.getItem('sxo_affiliate_conversions') || '[]');
    conversions.push({
      affiliateId,
      amount,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('sxo_affiliate_conversions', JSON.stringify(conversions));
  } catch (error) {
    console.error('Error tracking affiliate conversion:', error);
  }
};