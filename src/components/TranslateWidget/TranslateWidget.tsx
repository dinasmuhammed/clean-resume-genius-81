
import React, { useEffect, useState } from 'react';
import './TranslateWidget.css';

export const TranslateWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close popup when clicking outside
  const closePopup = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const widget = document.querySelector('.widgetify-translate-widget');
    if (widget && !widget.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Define the Google Translate initialization function
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function() {
        // @ts-ignore - Google Translate API exists after script loads
        new google.translate.TranslateElement({
          pageLanguage: 'auto',
          autoDisplay: false,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      };
    }

    // Add event listener for clicks outside the widget
    document.addEventListener('click', closePopup);
    
    // Add the Google Translate script
    addScript();

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener('click', closePopup);
    };
  }, []);

  return (
    <div className="widgetify-translate-widget">
      <div 
        className="widgetify-translate-button" 
        onClick={togglePopup}
      >
        <svg className="widgetify-translate-icon" viewBox="0 0 24 24" fill="white">
          <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
      </div>
      
      <div className={`widgetify-translate-popup ${isOpen ? 'active' : ''}`}>
        <div className="widgetify-popup-header">
          <div className="widgetify-popup-title">Translate</div>
          <button 
            className="widgetify-popup-close"
            onClick={() => setIsOpen(false)}
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
