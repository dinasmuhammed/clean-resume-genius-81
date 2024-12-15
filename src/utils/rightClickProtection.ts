export const disableRightClick = () => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Disable keyboard shortcuts for developer tools
  document.addEventListener('keydown', (e) => {
    if (
      // Chrome dev tools
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'U') ||
      // Firefox dev tools
      (e.ctrlKey && e.shiftKey && e.key === 'C') ||
      // Safari dev tools
      (e.metaKey && e.altKey && e.key === 'I')
    ) {
      e.preventDefault();
      return false;
    }
  });
};