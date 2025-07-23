import { Button } from "@/components/ui/button";
import { Mail, Shield, BookOpen, Target, CheckCircle, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/config";
import heroImage from "@/assets/hero-email.jpg";
import GetStartedButton from "./GetStartedButton";

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
        <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-green-400/30">
            <Target className="w-4 h-4 text-green-300" />
            <span className="text-green-200 text-sm font-medium">99.9% Inbox Delivery Rate</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            <span className="block">Land Every Email in</span>
            <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200 bg-clip-text text-transparent">
              GSuite & Outlook Inboxes
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
            We help companies <strong className="text-white">guarantee inbox delivery</strong> for their cold email campaigns. 
            Our premium Azure-powered infrastructure ensures your emails reach decision-makers, not spam folders.
          </p>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-semibold">GSuite Ready</span>
              </div>
              <p className="text-blue-100 text-sm">Optimized for Google Workspace with perfect reputation scores</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-semibold">Outlook Compatible</span>
              </div>
              <p className="text-blue-100 text-sm">Microsoft 365 & Outlook.com inbox delivery guaranteed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="text-white font-semibold">1-Hour Setup</span>
              </div>
              <p className="text-blue-100 text-sm">Mailboxes ready with perfect authentication in 60 minutes</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <GetStartedButton 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform mr-2" />
              Get Started - {siteConfig.pricing.displayPrice}/mailbox
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GetStartedButton>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-4 text-lg"
              onClick={() => scrollToSection('comparison')}
            >
              Compare Providers
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mb-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>SPF, DKIM, DMARC Auto-Setup</span>
            </div>
            <div className="flex items-center gap-2 text-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Dedicated IP Per Domain</span>
            </div>
            <div className="flex items-center gap-2 text-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>
          
          <div className="mb-8">
            <a href="/warmup-guide" className="inline-flex items-center gap-2 text-cyan-200 hover:text-white transition-colors group">
              <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium underline">Learn inbox delivery strategies →</span>
            </a>
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