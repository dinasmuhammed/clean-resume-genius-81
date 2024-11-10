import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'

// Initialize protection in production only
if (process.env.NODE_ENV === 'production') {
  disableRightClick();

  // Prevent screenshots and recordings
  document.addEventListener('keyup', (e) => {
    const isScreenshotAttempt = 
      (e.key === 'PrintScreen') ||
      (e.metaKey && e.shiftKey && e.key === '4') || // Mac screenshot
      (e.metaKey && e.shiftKey && e.key === '5');   // Mac screen recording
    
    if (isScreenshotAttempt) {
      e.preventDefault();
      return false;
    }
  });

  // Additional screenshot prevention
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
      e.cancelBubble = true;
      e.preventDefault();
      return false;
    }
  });
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(<App />);