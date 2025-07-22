import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import WarmupGuide from "./pages/WarmupGuide";
import WarmupCalculatorPage from "./pages/WarmupCalculatorPage";
import ToolsPage from "./pages/ToolsPage";
import UsernameGeneratorPage from "./pages/UsernameGeneratorPage";
import DomainGeneratorPage from "./pages/DomainGeneratorPage";
import PersonGeneratorPage from "./pages/PersonGeneratorPage";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/warmup-guide" element={<WarmupGuide />} />
          <Route path="/warmup-calculator" element={<WarmupCalculatorPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/username-generator" element={<UsernameGeneratorPage />} />
          <Route path="/tools/domain-generator" element={<DomainGeneratorPage />} />
          <Route path="/tools/person-generator" element={<PersonGeneratorPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
