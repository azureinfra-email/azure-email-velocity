import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Clock, Calendar } from "lucide-react";
import { useEffect } from "react";
import { siteConfig } from "@/config/config";

const ContactSection = () => {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    script.onload = () => {
      // Initialize Tally embeds
      const windowWithTally = window as unknown as { Tally?: { loadEmbeds: () => void } };
      if (typeof window !== 'undefined' && windowWithTally.Tally) {
        windowWithTally.Tally.loadEmbeds();
      } else {
        // Fallback: manually set src for iframes
        document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
          const iframeElement = iframe as HTMLIFrameElement;
          const tallySource = iframeElement.getAttribute('data-tally-src');
          if (tallySource) {
            iframeElement.src = tallySource;
          }
        });
      }
    };
    script.onerror = () => {
      // Fallback: manually set src for iframes
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
        const iframeElement = iframe as HTMLIFrameElement;
        const tallySource = iframeElement.getAttribute('data-tally-src');
        if (tallySource) {
          iframeElement.src = tallySource;
        }
      });
    };
    
    // Only add script if it doesn't already exist
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Get in Touch</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Contact
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Our Team</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to get started with enterprise-grade email infrastructure? 
            Our team is here to help you set up your Outlook 365 mailboxes quickly and efficiently.
            <span className="block mt-3 text-primary font-semibold">
              ⚡ Get your mailboxes ready in just 3 hours!
            </span>
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Get Started Today</h3>
              <p className="text-muted-foreground mb-8">
                Have questions about our email infrastructure? Need help with setup? 
                We're here to ensure your transition to enterprise-grade email is seamless.
              </p>
            </div>
            
            <div className="grid gap-6">
              <Card className="bg-gradient-card border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                      <p className="text-muted-foreground mb-2">Get help via email</p>
                      <a 
                        href="mailto:support@azureinfra.email" 
                        className="text-primary hover:underline font-medium"
                      >
                        support@azureinfra.email
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">Schedule a Call</h4>
                      <p className="text-muted-foreground mb-3">Speak with our team directly</p>
                      <a 
                        href={siteConfig.contact.calendly} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="w-full">
                          Book a Call
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Setup Time</h4>
                      <p className="text-muted-foreground mb-2">Your mailboxes ready in</p>
                      <p className="text-primary font-bold text-lg">3 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Global Infrastructure</h4>
                      <p className="text-muted-foreground mb-2">Microsoft Azure data centers</p>
                      <p className="text-primary font-medium">Worldwide availability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground mb-4">
                Tell us about your email infrastructure needs and we'll help you get set up.
              </p>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <p className="text-primary font-semibold text-center">
                  🚀 Fast Setup: Your mailboxes will be ready in just 3 hours!
                </p>
              </div>
            </div>
            <div className="relative">
              <iframe 
                data-tally-src="https://tally.so/embed/mZbrYB?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="500"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact Form"
                className="min-h-[500px] border-0"
                style={{ background: 'transparent' }}
              ></iframe>
              <style>{`
                iframe[data-tally-src] {
                  overflow: hidden !important;
                }
                
                /* Hide Tally logo and branding */
                .tally-logo,
                .tally-branding,
                [class*="tally"]:has(img),
                [class*="branding"],
                [class*="logo"],
                iframe[data-tally-src] + div,
                iframe[data-tally-src] ~ div:has(img),
                div:has(> a[href*="tally.so"]),
                a[href*="tally.so"],
                .tally-footer,
                .tally-powered-by {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  height: 0 !important;
                  overflow: hidden !important;
                  position: absolute !important;
                  left: -9999px !important;
                }
              `}</style>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Why Choose Our Support?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt; 3h</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Infrastructure Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
