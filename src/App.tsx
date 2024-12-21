import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "./components/Navbar";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import ATSChecker from "./pages/ATSChecker";
import InterviewGuide from "./pages/InterviewGuide";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import { initializePushNotifications } from "./utils/pushNotifications";

// Configure query client with optimized error handling and caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 3,
      refetchOnWindowFocus: false,
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
          toast({
            title: "Error",
            description: "An error occurred while fetching data. Please try again.",
            variant: "destructive",
          });
        },
      },
    },
    mutations: {
      retry: 2,
      meta: {
        onError: (error: Error) => {
          console.error('Mutation error:', error);
          toast({
            title: "Error",
            description: "An error occurred while updating data. Please try again.",
            variant: "destructive",
          });
        },
      },
    },
  },
});

const App = () => {
  useEffect(() => {
    console.log('App initialized');
    try {
      initializePushNotifications();
      console.log('Push notifications initialized successfully');
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
      toast({
        title: "Warning",
        description: "Push notifications could not be initialized. Some features may be limited.",
        variant: "warning" as const,
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Toaster />
          <Sonner position="top-center" closeButton richColors />
          <BrowserRouter>
            <Navbar />
            <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/builder" element={<Index />} />
                <Route path="/ats-checker" element={<ATSChecker />} />
                <Route path="/interview-guide" element={<InterviewGuide />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/error" element={<Error />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;