
import React, { useEffect } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
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
  // Update document title dynamically based on route
  useEffect(() => {
    document.title = "Resume Builder - Create Professional Resumes Online";
    
    // Add meta description for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Build an ATS-optimized resume in minutes with our professional resume builder. Stand out to recruiters and land your dream job.');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Sonner position="top-center" closeButton richColors className="z-50" />
          <Navbar />
          <main id="main-content" className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
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
