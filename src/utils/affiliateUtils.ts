export const validateAffiliateId = (affiliateId: string): boolean => {
  // Validate affiliate ID format (ends with 'ak90' and is 5 characters long)
  return affiliateId && affiliateId.length === 5 && affiliateId.endsWith('ak90');
};

export const getAffiliateReferral = (): string | null => {
  try {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlParams.get('ref');
    
    if (refFromUrl && validateAffiliateId(refFromUrl)) {
      // Store with timestamp
      const referralData = {
        affiliateId: refFromUrl,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('sxo_affiliate_ref', JSON.stringify(referralData));
      return refFromUrl;
    }

    // Check localStorage as fallback
    const storedRefData = localStorage.getItem('sxo_affiliate_ref');
    if (storedRefData) {
      try {
        const { affiliateId } = JSON.parse(storedRefData);
        return validateAffiliateId(affiliateId) ? affiliateId : null;
      } catch {
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting affiliate referral:', error);
    return null;
  }
};

export const trackAffiliateConversion = async (affiliateId: string, amount: number) => {
  try {
    if (!validateAffiliateId(affiliateId)) {
      throw new Error('Invalid affiliate ID format');
    }

    const conversion = {
      affiliateId,
      amount,
      timestamp: new Date().toISOString()
    };
    
    // Store conversion data
    const conversions = JSON.parse(localStorage.getItem('sxo_affiliate_conversions') || '[]');
    conversions.push(conversion);
    localStorage.setItem('sxo_affiliate_conversions', JSON.stringify(conversions));
    
    // Here you would typically make an API call to your backend
    console.log('Tracking conversion:', conversion);
    
    return true;
  } catch (error) {
    console.error('Error tracking affiliate conversion:', error);
    return false;
  }
};