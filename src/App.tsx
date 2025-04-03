
import React, { useEffect } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import ATSChecker from "@/pages/ATSChecker";
import InterviewGuide from "@/pages/InterviewGuide";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import Error from "@/pages/Error";
import Splash from "@/pages/Splash";

// Initialize QueryClient with configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const location = useLocation();
  
  // Update document title dynamically based on route
  useEffect(() => {
    const path = location.pathname;
    
    let title = "Resume Builder - Create Professional Resumes Online";
    let description = "Build an ATS-optimized resume in minutes with our professional resume builder. Stand out to recruiters and land your dream job.";
    
    // Set appropriate title and description based on current route
    if (path === "/") {
      title = "Resume Builder - Create Professional ATS-Friendly Resumes Online";
      description = "Build an ATS-optimized resume in minutes with our professional resume builder. Stand out to recruiters with keyword-optimized templates.";
    } else if (path === "/about") {
      title = "About SXO Resume | Professional Resume Building Services";
      description = "Learn about SXO Resume Builder and our mission to help job seekers create ATS-optimized resumes that stand out in today's competitive job market.";
    } else if (path === "/ats-checker") {
      title = "ATS Compatibility Checker | Test Your Resume Against ATS Systems";
      description = "Check if your resume is optimized for Applicant Tracking Systems with our advanced ATS compatibility tool. Improve your chances of getting interviews.";
    } else if (path === "/interview-guide") {
      title = "Job Interview Preparation Guide | Professional Interview Tips";
      description = "Prepare for your job interviews with our comprehensive guide including common questions, STAR method responses, and expert tips for success.";
    } else if (path === "/privacy") {
      title = "Privacy Policy | SXO Resume Builder";
      description = "Read our privacy policy to understand how we collect, use, and protect your data when using the SXO Resume Builder platform.";
    } else if (path === "/terms") {
      title = "Terms of Service | SXO Resume Builder";
      description = "View our terms of service for using the SXO Resume Builder platform and creating professional, ATS-optimized resumes.";
    } else if (path === "/splash") {
      title = "SXO Resume Builder | Professional ATS-Optimized Resume Creation";
      description = "Create professional, ATS-friendly resumes that help you stand out to recruiters and land more interviews with our advanced resume builder.";
    }
    
    // Update document title
    document.title = title;
    
    // Update meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update OG and Twitter meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Sonner position="top-center" closeButton richColors className="z-50" />
          <Navbar />
          <main 
            id="main-content" 
            className="flex-1 w-full max-w-full mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 safe-bottom"
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/ats-checker" element={<ATSChecker />} />
              <Route path="/interview-guide" element={<InterviewGuide />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/splash" element={<Splash />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
