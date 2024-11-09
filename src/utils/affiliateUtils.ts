// Store counter in localStorage to persist across sessions
const getNextAffiliateCounter = (): number => {
  const currentCounter = parseInt(localStorage.getItem('affiliate_counter') || '0');
  const nextCounter = currentCounter + 1;
  localStorage.setItem('affiliate_counter', nextCounter.toString());
  return nextCounter;
};

export const generateAffiliateId = (email: string): string => {
  const counter = getNextAffiliateCounter();
  // Format: CXXak90 where XX is a sequential number padded to 2 digits
  const paddedCounter = counter.toString().padStart(2, '0');
  return `c${paddedCounter}ak90`;
};

export const validateAffiliateId = (affiliateId: string): boolean => {
  // Updated validation to match new format: cXXak90
  const pattern = /^c\d{2}ak90$/;
  return affiliateId && affiliateId.length === 7 && pattern.test(affiliateId);
};

export const getAffiliateReferral = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const refFromUrl = urlParams.get('ref');
    
    if (refFromUrl && validateAffiliateId(refFromUrl)) {
      const referralData = {
        affiliateId: refFromUrl,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('sxo_affiliate_ref', JSON.stringify(referralData));
      return refFromUrl;
    }

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