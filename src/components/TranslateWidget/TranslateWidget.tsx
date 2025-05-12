
import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import "./TranslateWidget.css";

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          InlineLayout: {
            SIMPLE: string;
            HORIZONTAL: string;
          };
          FloatPosition: {
            TOP_LEFT: number;
            TOP_RIGHT: number;
            BOTTOM_RIGHT: number;
            BOTTOM_LEFT: number;
          };
        };
        Element: new (options: {
          pageLanguage: string;
          includedLanguages?: string;
          layout?: any;
          autoDisplay?: boolean;
          floatPosition?: number;
        }, element: HTMLElement | null) => void;
      };
    };
  }
}

const TranslateWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the Google Translate API is available
    if (window.google && window.google.translate) {
      if (isOpen && containerRef.current) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar,zh-CN,fr,de,hi,ja,ko,pt,ru,es',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          containerRef.current
        );
      }
    } else {
      console.warn('Google Translate API not loaded');
    }
  }, [isOpen]);

  return (
    <div className="translate-widget-container">
      <Button
        variant="outline"
        size="icon"
        className="translate-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Translate"
      >
        <Globe className="h-4 w-4" />
        <span className="sr-only">Translate</span>
      </Button>
      
      {isOpen && (
        <div className="translate-popup">
          <div ref={containerRef} id="google_translate_element"></div>
        </div>
      )}
    </div>
  );
};

export default TranslateWidget;
