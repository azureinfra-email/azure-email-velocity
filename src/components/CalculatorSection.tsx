import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/GetStartedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, DollarSign, Plus, Minus } from "lucide-react";
import { siteConfig } from "@/config/config";
import { useState } from "react";

const CalculatorSection = () => {
  const [mailboxCount, setMailboxCount] = useState(600);
  const [domainCount, setDomainCount] = useState(12);
  
  // Calculator logic
  const setupCost = 0;
  const mailboxPrice = siteConfig.pricing.price;
  const domainPrice = siteConfig.pricing.domain.price;
  
  const monthlyMailboxCost = mailboxCount * mailboxPrice;
  const totalDomainCost = domainCount * domainPrice;
  const firstMonthTotal = setupCost + monthlyMailboxCost + totalDomainCost;
  
  // Helper functions for increment/decrement
  const incrementMailboxes = () => {
    setMailboxCount(prev => prev + 50);
  };
  
  const decrementMailboxes = () => {
    setMailboxCount(prev => Math.max(50, prev - 50));
  };
  
  const incrementDomains = () => {
    setDomainCount(prev => prev + 1);
  };
  
  const decrementDomains = () => {
    if (domainCount > 1) {
      setDomainCount(prev => prev - 1);
    }
  };
  
  // Calculate savings vs competitors
  const hypertideSetup = 1500;
  const hypertideMonthly = mailboxCount * 0.50;
  const hypertideDomains = domainCount * 186;
  const hypertideFirstMonth = hypertideSetup + hyptertideMonthly + hypertideDomains;
  
  const superwaveSetup = 6000;
  const superwaveMonthly = mailboxCount * 1.00;
  const superwaveDomains = domainCount * 300;
  const superwaveFirstMonth = superwaveSetup + superwaveMonthly + superwaveDomains;
  
  const savingsVsHypertide = hypertideFirstMonth - firstMonthTotal;
  const savingsVsSuperwave = superwaveFirstMonth - firstMonthTotal;

  return (
    <section id="calculator" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Pricing Calculator</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Calculate Your
            <span className="block bg-gradient-primary bg-clip-text text-transparent">Investment</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get an instant quote for your cold email infrastructure. Adjust mailboxes and domains 
            to see exactly what you'll pay - no hidden fees, no surprises.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <Card className="bg-gradient-card border-primary/10">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Configure Your Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calculator Inputs */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="calc-mailboxes" className="text-sm font-medium">
                      Number of Mailboxes
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementMailboxes}
                        className="px-2"
                        disabled={mailboxCount <= 50}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        id="calc-mailboxes"
                        type="number"
                        value={mailboxCount}
                        onChange={(e) => setMailboxCount(Math.max(50, Number(e.target.value) || 50))}
                        className="text-lg font-semibold text-center"
                        min="50"
                        max="10000"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementMailboxes}
                        className="px-2"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum 50 mailboxes required. Click + to add 50 mailboxes.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="calc-domains" className="text-sm font-medium">
                      Number of Domains
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementDomains}
                        className="px-2"
                        disabled={domainCount <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        id="calc-domains"
                        type="number"
                        value={domainCount}
                        onChange={(e) => setDomainCount(Math.max(1, Number(e.target.value) || 1))}
                        className="text-lg font-semibold text-center"
                        min="1"
                        max="100"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementDomains}
                        className="px-2"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span className="font-semibold text-primary">{Math.round(mailboxCount / domainCount)}</span> mailboxes per domain. Adjust independently.
                    </p>
                  </div>
                </div>
                
                {/* Quick Presets */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">Quick Presets:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setMailboxCount(50); setDomainCount(1);}}
                      className="text-xs"
                    >
                      Starter (50/1)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setMailboxCount(100); setDomainCount(2);}}
                      className="text-xs"
                    >
                      Small (100/2)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setMailboxCount(200); setDomainCount(4);}}
                      className="text-xs"
                    >
                      Growth (200/4)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setMailboxCount(300); setDomainCount(6);}}
                      className="text-xs"
                    >
                      Medium (300/6)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setMailboxCount(500); setDomainCount(10);}}
                      className="text-xs"
                    >
                      Scale (500/10)
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {setMailboxCount(1000); setDomainCount(20);}}
                      className="text-xs"
                    >
                      Enterprise (1000/20)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Investment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cost Breakdown */}
                <div className="space-y-3">
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
                      ${totalDomainCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-primary/10 px-3 rounded-lg">
                    <span className="font-semibold text-foreground">First Month Total</span>
                    <span className="font-bold text-primary text-xl">
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
                
                {/* Savings Comparison */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-3">Your Savings vs Competitors</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">vs Hypertide</span>
                      <span className="text-sm font-semibold text-green-500">
                        Save ${savingsVsHypertide.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-muted-foreground">vs Superwave</span>
                      <span className="text-sm font-semibold text-green-500">
                        Save ${savingsVsSuperwave.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <GetStartedButton className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-card rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                🚀 Ready in 3 Hours
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Unlike competitors who take weeks to set up your infrastructure, we'll have your 
                mailboxes ready and sending emails in just 3 hours. No setup fees, no hidden costs.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>3-hour delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Premium Azure infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
