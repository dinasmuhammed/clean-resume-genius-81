
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'
import { toast } from "@/components/ui/use-toast"

// Initialize protection in all environments
disableRightClick();

// Prevent screenshots and recordings with better error handling
document.addEventListener('keyup', (e) => {
  // Detect various screenshot combinations across platforms
  const isScreenshotAttempt = 
    (e.key === 'PrintScreen') ||
    (e.metaKey && e.shiftKey && e.key === '3') || // Mac screenshot full
    (e.metaKey && e.shiftKey && e.key === '4') || // Mac screenshot area
    (e.metaKey && e.shiftKey && e.key === '5') || // Mac screen recording
    (e.ctrlKey && e.key === 'PrintScreen');       // Windows screenshot to clipboard
  
  if (isScreenshotAttempt) {
    e.preventDefault();
    toast({
      title: "Screenshot Blocked",
      description: "Screenshots are not allowed for security reasons.",
      variant: "destructive"
    });
    return false;
  }
});

// Additional screenshot prevention with user feedback
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
    e.cancelBubble = true;
    e.preventDefault();
    toast({
      title: "Print Blocked",
      description: "Printing is not allowed for security reasons.",
      variant: "destructive"
    });
    return false;
  }
});

// Fix for iOS/Safari context menu
document.addEventListener('touchstart', function(e) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}, { passive: false });

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
