export const disableRightClick = () => {
  // Prevent context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Windows/Linux: PrintScreen, Ctrl+P, Ctrl+Shift+S, etc.
    if (
      e.key === 'PrintScreen' ||
      e.key === 'F12' ||
      (e.ctrlKey && e.key === 'p') ||
      (e.ctrlKey && e.shiftKey && e.key === 's') ||
      (e.ctrlKey && e.shiftKey && e.key === 'i') ||
      (e.ctrlKey && e.shiftKey && e.key === 'j') ||
      (e.ctrlKey && e.key === 'u')
    ) {
      e.preventDefault();
      return false;
    }

    // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
    if (
      e.metaKey && 
      e.shiftKey && 
      (e.key === '3' || e.key === '4' || e.key === '5')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Prevent selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent copy
  document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent drag and drop
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent mobile screenshot detection
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // When app goes to background (potential screenshot attempt)
      document.body.style.opacity = '0.1';
    } else {
      document.body.style.opacity = '1';
    }
  });
};