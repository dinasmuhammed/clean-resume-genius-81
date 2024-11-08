import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load route components
const Splash = lazy(() => import("./pages/Splash"));
const Index = lazy(() => import("./pages/Index"));
const ATSChecker = lazy(() => import("./pages/ATSChecker"));
const InterviewGuide = lazy(() => import("./pages/InterviewGuide"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Embed = lazy(() => import("./pages/Embed"));
const AffiliateSignup = lazy(() => import("./pages/AffiliateSignup"));
const BackupPage = lazy(() => import("./pages/BackupPage"));

// Configure QueryClient with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <div className="flex-1">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/builder" element={<Index />} />
                <Route path="/ats-checker" element={<ATSChecker />} />
                <Route path="/interview-guide" element={<InterviewGuide />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/embed" element={<Embed />} />
                <Route path="/affiliate-signup" element={<AffiliateSignup />} />
                <Route path="/error" element={<BackupPage />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;