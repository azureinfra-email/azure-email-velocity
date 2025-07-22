import { Button } from "@/components/ui/button";
import { Mail, Shield, Zap, Target } from "lucide-react";
import heroImage from "@/assets/hero-email.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Enterprise Email Infrastructure</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Reliable Cold Email
              <span className="block bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Infrastructure
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              Powered by Azure infrastructure. No MS-365 bottlenecks. 
              <strong className="text-white"> 35% better delivery to Outlook mailboxes</strong> than other providers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button variant="hero" size="lg" className="group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Get Started Now
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                View Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-blue-200 text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">35%</div>
                <div className="text-blue-200 text-sm">Better Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">&lt;2s</div>
                <div className="text-blue-200 text-sm">Response Time</div>
              </div>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-gradient-card rounded-3xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="Email Infrastructure" 
              className="relative rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;