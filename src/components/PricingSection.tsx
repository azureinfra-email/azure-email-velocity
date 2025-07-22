import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/GetStartedButton";
import { Check, Mail } from "lucide-react";
import siteConfig from "@/config/config";

const plans = [
  {
    name: "Email Infrastructure",
    price: siteConfig.pricing.displayPrice,
    period: "per mailbox/month",
    description: "Enterprise-grade Outlook 365 infrastructure without compromising on quality",
    features: [
      "Azure-powered infrastructure",
      "99.9% uptime guarantee", 
      "Full Outlook 365 capabilities",
      "Enterprise security standards",
      "Real-time monitoring",
      "Exchange Online integration",
      "Microsoft ecosystem access",
      "24/7 infrastructure monitoring",
      "Instant activation"
    ],
    icon: Mail,
    popular: true
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Enterprise Quality, Affordable Price</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Premium Email
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Infrastructure</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get enterprise-grade Outlook 365 infrastructure at an unbeatable price. 
            <strong className="text-foreground"> We never compromise on quality</strong> - just transparent, honest pricing.
          </p>
        </div>
        
        <div className="flex justify-center max-w-lg mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className="relative group transition-all duration-300 hover:scale-[1.02] border-primary shadow-card bg-gradient-card w-full"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  No Compromise on Quality
                </div>
              </div>
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <plan.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <GetStartedButton 
                  className="w-full mb-4" 
                  size="lg"
                  text="Get Started Now"
                />
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    🛡️ 30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why choose quality over cheap alternatives?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our infrastructure is built on Microsoft Azure with enterprise-grade security and reliability. 
              <strong className="text-foreground"> We believe in providing premium quality at an honest price</strong> - 
              no hidden fees, no compromises on performance or security.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>No hidden costs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>Enterprise quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;