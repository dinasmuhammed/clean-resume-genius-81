
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export function useBreakpoint(): { 
  breakpoint: Breakpoint; 
  width: number;
  isXs: boolean;
  isSm: boolean; 
  isMd: boolean; 
  isLg: boolean; 
  isXl: boolean; 
  is2Xl: boolean;
  smallerThan: (bp: Breakpoint) => boolean;
  largerThan: (bp: Breakpoint) => boolean;
} {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');
  
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      
      if (newWidth < breakpoints.sm) {
        setBreakpoint('xs');
      } else if (newWidth < breakpoints.md) {
        setBreakpoint('sm');
      } else if (newWidth < breakpoints.lg) {
        setBreakpoint('md');
      } else if (newWidth < breakpoints.xl) {
        setBreakpoint('lg');
      } else if (newWidth < breakpoints['2xl']) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const smallerThan = (bp: Breakpoint) => width < breakpoints[bp];
  const largerThan = (bp: Breakpoint) => width >= breakpoints[bp];
  
  return {
    breakpoint,
    width,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    smallerThan,
    largerThan
  };
}
