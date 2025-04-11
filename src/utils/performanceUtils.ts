
/**
 * Performance optimization utilities
 */

// Image optimization with IntersectionObserver for true lazy loading
export const setupLazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy-image');
            imageObserver.unobserve(lazyImage);
          }
        }
      });
    }, {
      rootMargin: '100px',
    });

    document.querySelectorAll('img.lazy-image').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('img.lazy-image').forEach(img => {
      const image = img as HTMLImageElement;
      if (image.dataset.src) {
        image.src = image.dataset.src;
      }
    });
  }
};

// Optimize component rendering by debouncing updates
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Memoize expensive calculations to prevent redundant processing
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Resource hint for preloading critical resources
export const preloadCriticalResources = (urls: string[]) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    
    if (url.endsWith('.js')) {
      link.as = 'script';
    } else if (url.endsWith('.css')) {
      link.as = 'style';
    } else if (url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
      link.as = 'image';
    }
    
    document.head.appendChild(link);
  });
};

// Mobile-specific performance optimizations
export const applyMobileOptimizations = () => {
  // Check if we're on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Reduce animation duration on mobile devices for better performance
    document.documentElement.style.setProperty('--animation-duration', '0.2s');
    
    // Apply touch-specific optimizations
    document.body.classList.add('touch-device');
    
    // Optimize scrolling performance using property accessor with type assertion
    (document.body.style as any).webkitOverflowScrolling = 'touch';
    
    // Prevent 300ms tap delay on mobile devices
    const touchScript = document.createElement('script');
    touchScript.src = 'https://unpkg.com/fastclick@1.0.6/lib/fastclick.js';
    touchScript.onload = function() {
      if ('FastClick' in window) {
        // @ts-ignore
        FastClick.attach(document.body);
      }
    };
    document.head.appendChild(touchScript);
  }
};

// Optimize PDF export by chunking the work
export const optimizedPdfExport = async (
  element: HTMLElement,
  options: any,
  progressCallback?: (progress: number) => void
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      // Break down the rendering process
      setTimeout(() => {
        // First pass: capture the initial snapshot of the DOM
        if (progressCallback) progressCallback(0.25);
        
        // Second pass: start PDF conversion
        setTimeout(() => {
          if (progressCallback) progressCallback(0.5);
          
          // Get actual HTML content for conversion
          const content = element.outerHTML;
          
          // Final pass: generate the PDF (this would use html2pdf in a real implementation)
          setTimeout(() => {
            if (progressCallback) progressCallback(0.75);
            
            // In real implementation, this would use the html2pdf library
            // For now, we're just mocking the response
            const mockPdfBlob = new Blob(['pdf-content'], { type: 'application/pdf' });
            
            if (progressCallback) progressCallback(1);
            resolve(mockPdfBlob);
          }, 50);
        }, 50);
      }, 0);
    } catch (error) {
      reject(error);
    }
  });
};

// Resource loading state tracker
export const createResourceLoader = () => {
  const resources = new Map<string, boolean>();
  
  return {
    markAsLoading: (id: string) => {
      resources.set(id, false);
    },
    markAsLoaded: (id: string) => {
      resources.set(id, true);
    },
    isLoaded: (id: string) => resources.get(id) === true,
    areAllLoaded: () => {
      if (resources.size === 0) return true;
      for (const [_, loaded] of resources.entries()) {
        if (!loaded) return false;
      }
      return true;
    }
  };
};

// Helper for handling orientation changes
export const setupOrientationChangeHandler = (callback?: () => void) => {
  const handler = () => {
    // Update CSS custom property with viewport height to handle mobile browser chrome
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    if (callback) callback();
  };
  
  // Set initial value
  handler();
  
  // Listen for orientation changes and resize events
  window.addEventListener('orientationchange', handler);
  window.addEventListener('resize', debounce(handler, 150));
  
  return () => {
    window.removeEventListener('orientationchange', handler);
    window.removeEventListener('resize', handler);
  };
};
