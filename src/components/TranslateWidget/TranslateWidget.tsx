
import React, { useEffect, useState } from 'react';

const TranslateWidget: React.FC = () => {
  const [isPopupActive, setIsPopupActive] = useState(false);
  
  useEffect(() => {
    const loadTranslateScript = () => {
      // Check if script already exists
      if (document.getElementById('google-translate-script')) {
        return;
      }
      
      // Create Google Translate script
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
      
      // Define the global init function
      window.googleTranslateElementInit = function() {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'auto',
          autoDisplay: false,
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      };
    };
    
    loadTranslateScript();
    
    // Setup click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      const widget = document.querySelector('.widgetify-translate-widget');
      const button = document.querySelector('.widgetify-translate-button');
      const popup = document.querySelector('.widgetify-translate-popup');
      
      if (widget && button && popup &&
          !button.contains(event.target as Node) && 
          !popup.contains(event.target as Node)) {
        setIsPopupActive(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // Cleanup the global function
      delete window.googleTranslateElementInit;
    };
  }, []);
  
  return (
    <div className="widgetify-translate-widget">
      <div 
        className="widgetify-translate-button" 
        onClick={() => setIsPopupActive(!isPopupActive)}
      >
        <svg className="widgetify-translate-icon" viewBox="0 0 24 24" fill="white">
          <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
      </div>
      
      <div className={`widgetify-translate-popup ${isPopupActive ? 'active' : ''}`}>
        <div className="widgetify-popup-header">
          <div className="widgetify-popup-title">Translate</div>
          <button 
            className="widgetify-popup-close" 
            onClick={() => setIsPopupActive(false)}
          >
            &times;
          </button>
        </div>
        <div id="google_translate_element"></div>
        <div className="widgetify-credit">
          <a href="https://widgetify.vercel.app/" target="_blank" rel="noopener noreferrer">
            Powered by Widgetify
          </a>
        </div>
      </div>
    </div>
  );
};

export default TranslateWidget;
