import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, AlertTriangle, Calculator } from "lucide-react";
import { siteConfig } from "@/config/config";
import { useState } from "react";

const PriceComparisonSection = () => {
  const [mailboxCount, setMailboxCount] = useState(600);
  const [domainCount, setDomainCount] = useState(12);
  
  // Calculator logic
  const setupCost = 0;
  const mailboxPrice = siteConfig.pricing.price;
  const domainPrice = 15;
  
  const monthlyMailboxCost = mailboxCount * mailboxPrice;
  const totalDomainCost = domainCount * domainPrice;
  const firstMonthTotal = setupCost + monthlyMailboxCost + totalDomainCost;
  const comparisonData = [
    {
      provider: "AzureInfra",
      setupCost: "Free",
      mailboxCost: `${siteConfig.pricing.displayPrice} each`,
      domainCost: "$15 one-time",
      domainsNeeded: "4-12 domains",
      setupTime: "3 hours",
      dnsSetup: "Automated",
      infraQuality: "Real Azure",
      ipQuality: "Extremely high",
      isolation: "Per domain + beyond",
      domainBuying: "On-platform (quality)",
      userCreation: "Automated + AI",
      highlight: true
    },
    {
      provider: "Hypertide",
      setupCost: "$1,500",
      mailboxCost: "$0.50 each",
      domainCost: "$186 one-time",
      domainsNeeded: "12 domains",
      setupTime: "5-8 hours", 
      dnsSetup: "Automated",
      infraQuality: "Azure (O365-based)",
      ipQuality: "Very high",
      isolation: "Per domain",
      domainBuying: "On-platform",
      userCreation: "Automated",
      highlight: false
    },
    {
      provider: "Superwave",
      setupCost: "$6,000",
      mailboxCost: "$1.00+ each",
      domainCost: "$300+ one-time",
      domainsNeeded: "20+ domains",
      setupTime: "1-2 weeks",
      dnsSetup: "Manual + Support",
      infraQuality: "Mixed platforms",
      ipQuality: "High",
      isolation: "Shared resources",
      domainBuying: "Third-party",
      userCreation: "Manual setup",
      highlight: false
    }
  ];

  const features = [
    "Cost (setup)",
    "Cost (mailboxes)", 
    "Cost (domains)",
    "Domains needed",
    "Speed to deploy",
    "DNS setup",
    "Infra quality", 
    "IP quality",
    "Isolation",
    "Buying domains",
    "Creating users"
  ];

  return (
    <section id="comparison" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Price Comparison</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Compare Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Options</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            See how we stack up against the competition for 600 mailboxes
          </p>
        </div>

        {/* Mobile-friendly comparison cards */}
        <div className="lg:hidden space-y-6 mb-12">
          {comparisonData.map((provider, index) => (
            <Card key={index} className={`${provider.highlight ? 'border-primary bg-gradient-card' : 'bg-card'}`}>
              <CardHeader>
                <CardTitle className={`${provider.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {provider.provider}
                  {provider.highlight && (
                    <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Setup Cost:</span>
                    <p className="font-semibold">{provider.setupCost}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Mailbox Cost:</span>
                    <p className="font-semibold">{provider.mailboxCost}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Domain Cost:</span>
                    <p className="font-semibold">{provider.domainCost}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Setup Time:</span>
                    <p className="font-semibold">{provider.setupTime}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">IP Quality:</span>
                    <p className="font-semibold">{provider.ipQuality}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Isolation:</span>
                    <p className="font-semibold">{provider.isolation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop comparison table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="grid grid-cols-4 gap-4">
              {/* Feature column */}
              <div className="space-y-4">
                <div className="h-16 flex items-center">
                  <h3 className="font-bold text-foreground">Features</h3>
                </div>
                {features.map((feature, index) => (
                  <div key={index} className="h-12 flex items-center">
                    <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Provider columns */}
              {comparisonData.map((provider, providerIndex) => (
                <div key={providerIndex} className={`space-y-4 ${provider.highlight ? 'relative' : ''}`}>
                  {provider.highlight && (
                    <div className="absolute -inset-2 bg-gradient-primary rounded-xl opacity-10" />
                  )}
                  <div className={`h-16 flex flex-col justify-center items-center text-center p-3 rounded-lg ${
                    provider.highlight ? 'bg-gradient-card border border-primary/20' : 'bg-muted/30'
                  }`}>
                    <h4 className={`font-bold text-sm ${provider.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {provider.provider}
                    </h4>
                    {provider.highlight && (
                      <span className="text-xs text-primary font-medium mt-1">Recommended</span>
                    )}
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm font-semibold ${provider.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {provider.setupCost}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm font-semibold ${provider.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {provider.mailboxCost}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.domainCost}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.domainsNeeded}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm font-medium ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.setupTime}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.dnsSetup}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm font-medium ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.infraQuality}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm font-medium ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.ipQuality}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.isolation}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.domainBuying}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center text-center">
                    <span className={`text-sm ${provider.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                      {provider.userCreation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Breakdown Section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-card border-primary/10">
            <CardHeader>
              <CardTitle className="text-primary">Why Choose Us?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">No Setup Fees</h4>
                  <p className="text-sm text-muted-foreground">Get started immediately without any upfront costs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">3-Hour Setup</h4>
                  <p className="text-sm text-muted-foreground">Your mailboxes ready in just 3 hours, not days or weeks</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Premium Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">True Azure infrastructure with enterprise-grade deliverability</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Complete Isolation</h4>
                  <p className="text-sm text-muted-foreground">Each domain gets its own isolated infrastructure</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calculator Inputs */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mailboxes" className="text-sm font-medium">
                    Number of Mailboxes
                  </Label>
                  <Input
                    id="mailboxes"
                    type="number"
                    value={mailboxCount}
                    onChange={(e) => setMailboxCount(Number(e.target.value) || 0)}
                    className="text-lg font-semibold"
                    min="1"
                    max="10000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="domains" className="text-sm font-medium">
                    Number of Domains
                  </Label>
                  <Input
                    id="domains"
                    type="number"
                    value={domainCount}
                    onChange={(e) => setDomainCount(Number(e.target.value) || 0)}
                    className="text-lg font-semibold"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
              
              {/* Cost Breakdown */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Setup Cost</span>
                  <span className="font-semibold text-green-500">${setupCost}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">
                    Monthly Mailbox Cost ({mailboxCount} × ${mailboxPrice})
                  </span>
                  <span className="font-semibold text-foreground">
                    ${monthlyMailboxCost.toLocaleString()}/mo
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">
                    Domain Cost ({domainCount} × ${domainPrice})
                  </span>
                  <span className="font-semibold text-foreground">
                    ${totalDomainCost}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-primary/10 px-3 rounded-lg">
                  <span className="font-semibold text-foreground">First Month Total</span>
                  <span className="font-bold text-primary text-lg">
                    ${firstMonthTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 text-sm text-muted-foreground">
                  <span>Monthly Cost (after first month)</span>
                  <span className="font-medium">
                    ${monthlyMailboxCost.toLocaleString()}/mo
                  </span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Get Started Today
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceComparisonSection;
