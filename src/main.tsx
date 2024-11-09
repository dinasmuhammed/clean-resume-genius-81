import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'

// Initialize right-click protection in production only
if (process.env.NODE_ENV === 'production') {
  disableRightClick();
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(<App />);