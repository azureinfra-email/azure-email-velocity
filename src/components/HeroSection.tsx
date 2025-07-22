import { Button } from "@/components/ui/button";
import { Mail, Shield } from "lucide-react";
import { siteConfig } from "@/config/config";
import heroImage from "@/assets/hero-email.jpg";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Premium Cold Email Infrastructure</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Maximum Deliverability
            <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Cold Email Infrastructure
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
            Premium Azure-powered cold email infrastructure for marketers who demand <strong className="text-white">99.9% inbox rates</strong>. 
            Dedicated IPs, domain isolation, and enterprise-grade deliverability at competitive pricing.
            <span className="block mt-3 text-cyan-200 font-semibold">
              🚀 Mailboxes ready in just 3 hours!
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button variant="hero" size="lg" className="group">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start at {siteConfig.pricing.displayPrice}/mailbox
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => scrollToSection('features')}
            >
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{siteConfig.stats.uptime.value}</div>
              <div className="text-blue-200 text-sm">{siteConfig.stats.uptime.label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{siteConfig.stats.support.value}</div>
              <div className="text-blue-200 text-sm">{siteConfig.stats.support.label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{siteConfig.stats.network.value}</div>
              <div className="text-blue-200 text-sm">{siteConfig.stats.network.label}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;