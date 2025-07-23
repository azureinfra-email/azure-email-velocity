import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import InboxDeliverySection from "@/components/InboxDeliverySection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import PriceComparisonSection from "@/components/PriceComparisonSection";
import CalculatorSection from "@/components/CalculatorSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
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
        title="Land Every Email in GSuite & Outlook Inboxes - AzureInfra.email"
        description="Guarantee inbox delivery for your cold emails. 99.9% delivery rate to GSuite and Outlook inboxes. Enterprise-grade Azure infrastructure, 1-hour setup, $1.50/mailbox."
        keywords="gmail inbox delivery, outlook inbox delivery, cold email infrastructure, gsuite email delivery, microsoft 365 inbox, email deliverability, spam folder fix"
        canonical="/"
        schemaType="WebPage"
      />
      <HeroSection />
      {/* <InboxDeliverySection /> */}
      <FeaturesSection />
      <PricingSection />
      <PriceComparisonSection />
      <CalculatorSection />
      <GuaranteeSection />
      <ContactSection />
    </div>
  );
};

export default Index;
