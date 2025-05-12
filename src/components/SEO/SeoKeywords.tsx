
import React from 'react';

interface SeoKeywordsProps {
  page?: 'home' | 'builder' | 'ats' | 'interview' | 'pricing' | 'career-tips' | 'about' | 'privacy' | 'terms' | 'cookies' | 'splash';
}

const SeoKeywords: React.FC<SeoKeywordsProps> = ({ page = 'home' }) => {
  // Different keyword sets for different pages
  const keywords = {
    home: [
      "best resume builder", "free resume maker", "professional resume creator", 
      "ATS resume builder", "ATS friendly resume", "resume templates",
      "job application tools", "career advancement", "resume optimization",
      "job search help", "professional CV builder", "resume format guide",
      "career profile creator", "work history formatter", "job seeker tools"
    ],
    builder: [
      "resume sections", "resume skills list", "work experience format", 
      "education section template", "resume bullet points", "achievement statements",
      "resume action verbs", "professional summary examples", "resume objective samples",
      "resume header format", "contact information layout", "skills section optimization",
      "resume tailoring", "job description matching", "keyword optimization"
    ],
    ats: [
      "applicant tracking system", "ATS compatibility", "resume scanner", 
      "keyword optimization", "resume parsing", "ATS friendly format",
      "resume ranking factors", "resume screening", "application tracking",
      "resume scoring system", "ATS tips", "resume keyword density",
      "resume SEO", "resume ranking", "getting past ATS"
    ],
    interview: [
      "interview preparation", "common interview questions", "behavioral interview tips", 
      "STAR method responses", "salary negotiation", "interview attire",
      "virtual interview tips", "follow-up email templates", "interview thank you notes",
      "panel interview preparation", "technical interview guidance", "interview confidence",
      "answering difficult questions", "interview body language", "remote interview success"
    ],
    pricing: [
      "resume builder pricing", "best value resume service", "professional resume cost",
      "affordable resume creator", "resume writing service pricing", "resume template pricing",
      "online resume builder subscription", "one time payment resume tool", "resume package deals",
      "career service pricing", "ATS checker cost", "resume optimization pricing",
      "CV builder plans", "resume writing packages", "job application tools cost"
    ],
    'career-tips': [
      "resume writing advice", "resume format tips", "job interview preparation", 
      "interview questions and answers", "career development strategies", "job search tips",
      "professional resume guide", "cover letter tips", "career advancement advice",
      "job application strategies", "networking for job seekers", "LinkedIn profile optimization",
      "job market trends", "career change advice", "salary negotiation tips"
    ],
    about: [
      "resume builder company", "resume tool creators", "professional resume service team",
      "ATS optimization experts", "resume building mission", "career advancement tools",
      "job search assistance team", "resume technology company", "employment solutions provider",
      "resume industry leaders", "resume service background", "career development company",
      "resume creation specialists", "job application experts", "resume technology innovation"
    ],
    privacy: [
      "resume builder privacy policy", "data protection resume service", "personal information security",
      "resume data storage", "job seeker privacy rights", "resume confidentiality",
      "user data protection", "resume information usage", "privacy compliance",
      "GDPR resume builder", "data security measures", "confidential resume storage"
    ],
    terms: [
      "resume builder terms", "resume service conditions", "user agreement",
      "resume builder rules", "service usage terms", "legal resume terms",
      "account terms conditions", "resume copyright policy", "usage limitations",
      "resume builder liability", "service termination policy", "intellectual property rights"
    ],
    cookies: [
      "resume builder cookies", "website cookie policy", "cookie consent resume",
      "data tracking information", "browser cookie settings", "cookie preferences",
      "website tracking technologies", "cookie usage policy", "session cookies resume",
      "persistent cookies information", "cookie management", "tracking opt out"
    ],
    splash: [
      "professional resume creator", "ATS resume builder", "job application success",
      "resume optimization tools", "career advancement solutions", "online resume maker",
      "resume formatting service", "job hunting assistant", "resume building platform",
      "employment document creator", "resume wizard", "career document preparation"
    ]
  };

  // Select the appropriate keyword set based on page
  const pageKeywords = keywords[page] || keywords.home;
  
  // Long-tail keywords that are relevant to all pages
  const selectedLongTail = [
    "how to make resume pass ATS system", 
    "best resume format for job application 2023",
    "professional resume templates for career change", 
    "optimize resume for applicant tracking system",
    "how to highlight skills on resume"
  ];
  
  // Industry-specific keywords
  const selectedIndustry = [
    "IT resume template", 
    "healthcare professional resume", 
    "finance resume keywords",
    "marketing resume examples", 
    "engineering resume format"
  ];
  
  // Job level keywords
  const selectedJobLevel = [
    "entry level resume format", 
    "mid-career professional resume", 
    "senior management resume"
  ];
  
  // Combine all keywords
  const allKeywords = [...pageKeywords, ...selectedLongTail, ...selectedIndustry, ...selectedJobLevel];
  
  return (
    <div className="seo-keywords sr-only" aria-hidden="true">
      <h2 className="sr-only">Related Resume Building Resources</h2>
      <ul className="sr-only">
        {allKeywords.map((keyword, index) => (
          <li key={index} className="sr-only">{keyword}</li>
        ))}
      </ul>
    </div>
  );
};

export default SeoKeywords;
