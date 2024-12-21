import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { initializePushNotifications } from "@/utils/pushNotifications";

// Pages
import Index from "@/pages/Index";
import About from "@/pages/About";
import Error from "@/pages/Error";
import ATSChecker from "@/pages/ATSChecker";
import InterviewGuide from "@/pages/InterviewGuide";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";
import Splash from "@/pages/Splash";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function App() {
  const { toast } = useToast();

  useEffect(() => {
    console.info("App initialized");

    const initializeApp = async () => {
      try {
        await initializePushNotifications();
        console.info("Push notifications initialized successfully");
      } catch (error) {
        console.warn("Push notifications initialization failed:", error);
        toast({
          title: "Warning",
          description: "Push notifications could not be initialized. Some features may be limited.",
          variant: "warning" as const,
        });
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
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
      <Toaster />
    </>
  );
}

export default App;