
import React, { useEffect } from 'react';

interface SeoStructuredDataProps {
  type: 'home' | 'builder' | 'ats' | 'interview' | 'pricing' | 'career-tips' | 'about' | 'privacy' | 'terms' | 'cookies' | 'splash';
}

const SeoStructuredData: React.FC<SeoStructuredDataProps> = ({ type }) => {
  useEffect(() => {
    // Create schema data based on page type
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'SXO Resume Builder',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '1250'
      },
      description: getDescription(type),
      potentialAction: {
        '@type': 'UseAction',
        target: 'https://resume-builder.com/builder'
      }
    };

    // Add structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    
    // Ensure we don't duplicate
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
    
    // Clean up function
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type]);
  
  // Helper function to get appropriate descriptions
  function getDescription(type: string): string {
    switch (type) {
      case 'home':
        return 'SXO Resume Builder helps you create professional, ATS-optimized resumes in minutes. Stand out to recruiters and land your dream job with our easy-to-use resume creator.';
      case 'builder':
        return 'Use our interactive resume builder to create a professional, ATS-friendly resume tailored to your specific job applications with built-in optimization tools.';
      case 'ats':
        return 'Check if your resume is optimized for Applicant Tracking Systems (ATS) with our advanced ATS compatibility checker. Improve your chances of getting interviews.';
      case 'interview':
        return 'Prepare for job interviews with expert tips, common question answers, and strategies to showcase your skills and experience effectively.';
      case 'pricing':
        return 'Transparent, affordable pricing plans for our professional resume building tools. Choose the right option for your career needs and budget.';
      case 'career-tips':
        return 'Expert career advice, resume writing tips, and interview preparation strategies to help you advance in your professional journey and land your dream job.';
      case 'about':
        return 'Learn about our mission to help job seekers create professional resumes that stand out to employers and get past ATS systems.';
      case 'privacy':
        return 'Our privacy policy explains how we collect, use, and protect your personal information when you use our resume building tools.';
      case 'terms':
        return 'Our terms of service outline the rules and guidelines for using our resume building platform and services.';
      case 'cookies':
        return 'Learn how we use cookies and similar technologies to enhance your experience on our resume building platform.';
      case 'splash':
        return 'SXO Resume Builder - The professional tool for creating ATS-optimized resumes and advancing your career.';
      default:
        return 'SXO Resume Builder - The professional tool for creating ATS-optimized resumes and advancing your career.';
    }
  }

  return null; // This component doesn't render anything visible
};

export default SeoStructuredData;
