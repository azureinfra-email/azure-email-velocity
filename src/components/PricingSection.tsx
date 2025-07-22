import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Mail, Users, Building2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$3.33",
    period: "per mailbox/month",
    description: "Perfect for small teams getting started with cold email campaigns",
    features: [
      "Azure-powered infrastructure",
      "99.9% uptime guarantee", 
      "35% better Outlook delivery",
      "Fine-grained infrastructure control",
      "Real-time monitoring",
      "Email authentication setup"
    ],
    icon: Mail,
    popular: false
  },
  {
    name: "Professional", 
    price: "Custom",
    period: "per mailbox/month",
    description: "Optimized for growing businesses with higher volume needs",
    features: [
      "Everything in Starter",
      "Priority support",
      "Custom domain configuration",
      "Advanced analytics",
      "Dedicated IP pools",
      "White-label options"
    ],
    icon: Users,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For large organizations requiring maximum control and customization",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom SLA agreements",
      "Multi-region deployment",
      "Advanced compliance features",
      "24/7 phone support"
    ],
    icon: Building2,
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Simple, Transparent Pricing</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Scale Your Email
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Infrastructure</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pay only for what you use. No hidden fees, no surprises. 
            Start at $3.33 per mailbox and scale with your business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group transition-all duration-300 hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-primary shadow-card bg-gradient-card scale-105' 
                  : 'border-border hover:shadow-card bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-lg ${plan.popular ? 'bg-primary/20' : 'bg-muted'}`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
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
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.name === "Starter" ? "Start Now" : "Contact Sales"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 border border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need a custom solution?
            </h3>
            <p className="text-muted-foreground mb-6">
              Enterprise clients with specific requirements can get tailored infrastructure 
              solutions with dedicated support and custom SLAs.
            </p>
            <Button variant="outline" size="lg">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;