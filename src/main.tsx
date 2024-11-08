import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'

// Initialize right-click protection
disableRightClick();

createRoot(document.getElementById("root")!).render(<App />);