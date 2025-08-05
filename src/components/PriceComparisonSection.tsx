import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GetStartedButton from "@/components/ui/GetStartedButton";
import { Check, X, AlertTriangle, Calculator } from "lucide-react";
import { siteConfig } from "@/config/config";
import { useState } from "react";

const PriceComparisonSection = () => {
  const [mailboxCount, setMailboxCount] = useState(600);
  
  // Calculate domains automatically (50 mailboxes per domain, minimum 1)
  const domainCount = Math.max(1, Math.ceil(mailboxCount / 50));
  
  // Calculator logic
  const setupCost = 0;
  const mailboxPrice = 1.35; // Use quarterly monthly equivalent price
  const domainPrice = siteConfig.pricing.domain.price;
  
  const monthlyMailboxCost = mailboxCount * mailboxPrice;
  const totalDomainCost = domainCount * domainPrice;
  const firstMonthTotal = setupCost + monthlyMailboxCost + totalDomainCost;
  const comparisonData = [
    {
      provider: "AzureInfra",
      setupCost: "Free",
      mailboxCost: `${siteConfig.pricing.quarterly.monthlyEquivalent} each/month`,
      domainCost: `${siteConfig.pricing.domain.displayPrice} one-time`,
      domainsNeeded: "2-6 domains",
      setupTime: "1 hour",
      dnsSetup: "Auto SPF/DKIM/DMARC",
      infraQuality: "Pure Azure Enterprise",
      ipQuality: "Premium dedicated",
      isolation: "Complete domain isolation",
      domainBuying: "AI-powered selection",
      userCreation: "Instant AI automation",
      highlight: true
    },
    {
      provider: "Hypertide",
      setupCost: "$1,500",
      mailboxCost: "$0.50 each",
      domainCost: "$186 one-time",
      domainsNeeded: "12+ domains",
      setupTime: "5-8 hours", 
      dnsSetup: "Semi-automated",
      infraQuality: "Shared Azure (O365)",
      ipQuality: "Shared pool",
      isolation: "Basic domain separation",
      domainBuying: "Manual selection",
      userCreation: "Semi-automated",
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
      infraQuality: "Mixed/legacy platforms",
      ipQuality: "Variable quality",
      isolation: "Shared infrastructure",
      domainBuying: "Third-party vendors",
      userCreation: "Manual configuration",
      highlight: false
    }
  ];

  const features = [
    "Cost (setup)",
    "Cost (mailboxes)", 
    "Cost (domains)",
    "Domains needed",
    "Speed to deploy",
    "Email compliance",
    "Infra quality", 
    "IP quality",
    "Isolation",
    "Buying domains",
    "Creating users"
  ];

  return (
    <section id="comparison" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Price Comparison</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground px-4">
            Why We're The
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Clear Winner</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 px-4">
            Premium enterprise infrastructure at startup prices. Compare our advanced features and better value.
          </p>
          
          {/* Key Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fastest Setup</h3>
              <p className="text-sm text-muted-foreground">1 hour vs 5-8 hours (competitors)</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Pure Azure Enterprise</h3>
              <p className="text-sm text-muted-foreground">Not shared O365 like others</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fewer Domains Needed</h3>
              <p className="text-sm text-muted-foreground">2-6 domains vs 12+ (save money)</p>
            </div>
          </div>
        </div>

        {/* Mobile-friendly comparison cards */}
        <div className="lg:hidden space-y-4 sm:space-y-6 mb-8 sm:mb-12 px-4">
          {comparisonData.map((provider, index) => (
            <Card key={index} className={`${provider.highlight ? 'border-primary bg-gradient-card shadow-lg' : 'bg-card border-border'}`}>
              <CardHeader className="pb-4">
                <CardTitle className={`text-lg sm:text-xl flex items-center justify-between ${provider.highlight ? 'text-primary' : 'text-foreground'}`}>
                  <span>{provider.provider}</span>
                  {provider.highlight && (
                    <span className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium">
                      Recommended
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-muted-foreground block mb-1">Setup Cost:</span>
                    <p className="font-bold text-base text-foreground">{provider.setupCost}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-muted-foreground block mb-1">Mailbox Cost:</span>
                    <p className="font-bold text-base text-foreground">{provider.mailboxCost}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-muted-foreground block mb-1">Domain Cost:</span>
                    <p className="font-bold text-base text-foreground">{provider.domainCost}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-muted-foreground block mb-1">Setup Time:</span>
                    <p className="font-bold text-base text-foreground">{provider.setupTime}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-muted-foreground block mb-1">IP Quality:</span>
                    <p className="font-bold text-base text-foreground">{provider.ipQuality}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <span className="font-medium text-muted-foreground block mb-1">Isolation:</span>
                    <p className="font-bold text-base text-foreground">{provider.isolation}</p>
                  </div>
                </div>
                {provider.highlight && (
                  <div className="pt-4 border-t border-primary/20">
                    <GetStartedButton className="w-full py-3 text-base font-semibold" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop comparison table */}
        <div className="hidden lg:block">
          <div className="bg-card rounded-2xl border border-border p-4 lg:p-8 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-2 lg:gap-4">
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
                  
                  {provider.highlight && (
                    <div className="h-12 flex items-center justify-center text-center pt-2">
                      <GetStartedButton 
                        className="w-full max-w-[120px]" 
                        size="sm"
                        compact
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      />
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparisonSection;
