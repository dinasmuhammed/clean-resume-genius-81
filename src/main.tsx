import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { disableRightClick } from './utils/rightClickProtection'

// Initialize right-click protection
disableRightClick();

// Error handling for initial render
const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);

// Wrap the render in a try-catch to handle any initialization errors
try {
  root.render(<App />);
} catch (error) {
  console.error('Failed to render the app:', error);
  // Render a basic error message if the app fails to load
  root.render(
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Failed to load the application</h1>
        <p className="text-gray-600 mb-4">Please try refreshing the page</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}