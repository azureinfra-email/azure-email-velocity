import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import PriceComparisonSection from "@/components/PriceComparisonSection";
import CalculatorSection from "@/components/CalculatorSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  const location = useLocation();

  // Handle hash-based navigation when component mounts or location changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [location]);
  return (
    <div className="min-h-screen">
      <SEO 
        title="AzureInfra.email - Premium Cold Email Infrastructure"
        description="Premium Azure-powered cold email infrastructure at $1.50/mailbox. 99.9% inbox rates, dedicated IPs, domain isolation, instant setup for high-volume marketers."
        keywords="cold email infrastructure, azure email, dedicated IPs, email deliverability, outlook 365, cold email service, email hosting, domain isolation"
        canonical="/"
        schemaType="WebPage"
      />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <PriceComparisonSection />
      <CalculatorSection />
      <GuaranteeSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
