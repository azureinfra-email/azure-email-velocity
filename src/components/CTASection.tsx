import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight, Shield, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-card">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto bg-gradient-hero text-white border-0 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
          <CardContent className="p-12 text-center relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Mail className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Scale Your 
              <span className="block">Cold Email Campaigns?</span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of businesses who trust our Azure-powered infrastructure 
              for reliable, fast, and effective cold email delivery.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Shield className="w-6 h-6 text-white flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold">Enterprise Security</div>
                  <div className="text-blue-100 text-sm">Azure infrastructure</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white flex-shrink-0" />
                <div className="text-left">
                  <div className="font-semibold">Fast Setup</div>
                  <div className="text-blue-100 text-sm">Ready in minutes</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Schedule Demo
              </Button>
            </div>
            
            <div className="mt-8 text-blue-100 text-sm">
              No setup fees • Cancel anytime • 99.9% uptime SLA
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;