import { useEffect } from 'react';

/**
 * Component that scrolls to top when mounted
 * Can be used in individual pages for more control
 */
export const ScrollToTopComponent = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return null;
};

/**
 * Function to programmatically scroll to top
 * Can be called from event handlers
 */
export const scrollToTop = (behavior: 'smooth' | 'auto' = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};
