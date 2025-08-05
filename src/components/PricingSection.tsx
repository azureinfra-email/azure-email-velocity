import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/GetStartedButton";
import { Check, Mail, Zap, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import siteConfig from "@/config/config";

const features = [
  "Azure-powered infrastructure",
  "99.9% uptime guarantee", 
  "Full Outlook 365 capabilities",
  "Enterprise security standards",
  "Real-time monitoring",
  "Exchange Online integration",
  "Microsoft ecosystem access",
  "24/7 infrastructure monitoring",
  "Instant activation"
];

const PricingSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  
  // Initialize selected plan from URL params or default to quarterly
  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam && ['monthly', 'quarterly', 'annual'].includes(planParam)) {
      setSelectedPlan(planParam as 'monthly' | 'quarterly' | 'annual');
    }
  }, [searchParams]);
  
  // Update URL when plan changes
  const handlePlanChange = (plan: 'monthly' | 'quarterly' | 'annual') => {
    setSelectedPlan(plan);
    
    // Update URL search params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('plan', plan);
    setSearchParams(newSearchParams, { replace: true });
  };

  // Generate shareable URL
  const getShareableUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#pricing?plan=${selectedPlan}`;
  };

  // Copy link to clipboard
  const handleSharePricing = async () => {
    try {
      await navigator.clipboard.writeText(getShareableUrl());
      // You could add a toast notification here
      console.log('Pricing link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  
  const pricingOptions = [
    { 
      key: 'monthly' as const, 
      label: 'Monthly', 
      plan: siteConfig.pricing.monthly 
    },
    { 
      key: 'quarterly' as const, 
      label: 'Quarterly', 
      plan: siteConfig.pricing.quarterly 
    },
    { 
      key: 'annual' as const, 
      label: 'Annual', 
      plan: siteConfig.pricing.annual 
    }
  ];

  const currentPlan = pricingOptions.find(option => option.key === selectedPlan)?.plan || siteConfig.pricing.quarterly;
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Choose Your Plan
            </h2>
            <div className="relative">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
                Updated Plans
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur opacity-30 animate-ping"></div>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Get the best value with our new pricing options
          </p>
        </div>
        
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted/50 rounded-lg p-1 inline-flex relative shadow-lg ring-1 ring-primary/10">
            {pricingOptions.map((option) => (
              <Button
                key={option.key}
                variant={selectedPlan === option.key ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePlanChange(option.key)}
                className={`px-6 py-2 rounded-md transition-all relative ${
                  selectedPlan === option.key 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "hover:bg-muted"
                }`}
              >
                {option.label}
                {option.plan.savings && (
                  <span className="absolute -top-2 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium animate-pulse">
                    Save {option.plan.savings}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Single Pricing Card */}
        <div className="flex justify-center max-w-md mx-auto">
          <Card className="relative group transition-all duration-300 hover:scale-[1.02] border-primary shadow-xl shadow-primary/10 bg-gradient-card w-full">
            {currentPlan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg animate-pulse">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-foreground mb-2">
                Email Infrastructure
              </CardTitle>
              
              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-foreground">{currentPlan.displayPrice}</span>
                  <span className="text-muted-foreground">{currentPlan.period}</span>
                </div>
                {currentPlan.monthlyEquivalent && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    {currentPlan.monthlyEquivalent}/month when billed {selectedPlan}
                  </p>
                )}
                {currentPlan.savings && (
                  <p className="text-sm text-green-600 font-medium mt-1">
                    Save {currentPlan.savings} vs monthly billing
                  </p>
                )}
              </div>
              
              <p className="text-muted-foreground text-sm">
                Enterprise-grade Outlook 365 infrastructure without compromising on quality
              </p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <GetStartedButton 
                className="w-full mb-4" 
                size="lg"
                plan={selectedPlan}
                text={`Get Started - ${currentPlan.billingCycle.charAt(0).toUpperCase() + currentPlan.billingCycle.slice(1)} Plan`}
              />
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  🛡️ 30-day money-back guarantee
                </p>
              </div>
            </CardContent>
          </Card>
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