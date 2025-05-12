
import { useEffect, useState } from 'react';

// Custom hook to detect device type
export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

// Hook to apply different classes based on screen size
export const useResponsiveClasses = (
  mobileClasses: string,
  tabletClasses: string,
  desktopClasses: string
) => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  
  if (isMobile) return mobileClasses;
  if (isTablet) return tabletClasses;
  return desktopClasses;
};

// Function to optimize images for different screen sizes
export const getResponsiveImageSrc = (
  baseImagePath: string,
  deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
) => {
  // Remove file extension
  const pathWithoutExtension = baseImagePath.substring(0, baseImagePath.lastIndexOf('.'));
  const extension = baseImagePath.substring(baseImagePath.lastIndexOf('.'));
  
  switch (deviceType) {
    case 'mobile':
      return `${pathWithoutExtension}-mobile${extension}`;
    case 'tablet':
      return `${pathWithoutExtension}-tablet${extension}`;
    default:
      return baseImagePath;
  }
};

// Function to add preconnect links for performance
export const addPreconnectLinks = (domains: string[]) => {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
    
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = domain;
    document.head.appendChild(dnsLink);
  });
};

// Optimize touch target size for mobile
export const optimizeTouchTarget = (element: HTMLElement | null) => {
  if (!element) return;
  
  const minSize = 44; // Minimum recommended touch target size in px
  const rect = element.getBoundingClientRect();
  
  if (rect.width < minSize || rect.height < minSize) {
    element.style.minWidth = `${minSize}px`;
    element.style.minHeight = `${minSize}px`;
  }
};

// Function to register a service worker for PWA capabilities
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
};
