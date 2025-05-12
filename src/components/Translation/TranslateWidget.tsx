
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: any;
      };
    };
  }
}

const TranslateWidget: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define the function that Google Translate will call
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'auto',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };

    // Load Google Translate API
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Add click event listener to close the popup when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div 
        ref={buttonRef}
        className="w-14 h-14 bg-[#4285F4] rounded-full flex justify-center items-center shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 hover:shadow-xl"
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
          <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
      </div>
      
      <div 
        ref={popupRef}
        className={`absolute bottom-16 right-0 bg-white rounded-xl shadow-xl p-4 min-w-[250px] transition-opacity duration-300 ${isPopupOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex justify-between items-center mb-3 pb-2 border-b">
          <div className="font-medium text-gray-800">Translate</div>
          <button 
            className="text-gray-500 hover:text-gray-800 transition-colors"
            onClick={() => setIsPopupOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div id="google_translate_element"></div>
        <div className="text-xs text-gray-500 text-center mt-2">
          <a 
            href="https://widgetify.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-700 transition-colors"
          >
            Powered by Widgetify
          </a>
        </div>
      </div>
    </div>
  );
};

export default TranslateWidget;
