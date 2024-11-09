import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import ATSChecker from "./pages/ATSChecker";
import InterviewGuide from "./pages/InterviewGuide";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Embed from "./pages/Embed";
import AffiliateSignup from "./pages/AffiliateSignup";
import Footer from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <main className="flex-1">
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;