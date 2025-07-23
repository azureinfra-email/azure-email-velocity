import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import WarmupCalculator from "@/components/WarmupCalculator";
import { Calculator, TrendingUp, Users, Clock } from "lucide-react";

const WarmupCalculatorPage = () => {
  const location = useLocation();

  // Handle hash-based navigation when component mounts or location changes
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.warmupCalculator.title}
        description={seoConfig.warmupCalculator.description}
        keywords={seoConfig.warmupCalculator.keywords}
        canonical={seoConfig.warmupCalculator.canonical}
        schemaType={seoConfig.warmupCalculator.schemaType}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6 border border-green-200">
              <Calculator className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Strategy Planner</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground">
              Warmup Strategy
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Planner
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Plan your email warmup strategy and export settings to sequencers like Instantly, 
              SmartLead, or Apollo. Perfect for VAs and email marketers who need a strategic approach.
            </p>
            
            {/* Link to Guide */}
            <div className="mb-8">
              <a 
                href="/warmup-guide" 
                className="inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-border rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                📚 Read the Complete Warmup Guide First →
              </a>
            </div>
            
            {/* Quick Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Export Ready</h3>
                <p className="text-sm text-muted-foreground">Download settings for Instantly, SmartLead, Apollo</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Strategy Planning</h3>
                <p className="text-sm text-muted-foreground">Week-by-week breakdown with advanced settings</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Infrastructure Focus</h3>
                <p className="text-sm text-muted-foreground">We handle infrastructure, you handle strategy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <WarmupCalculator />
        </div>
      </section>

      {/* Additional Tips Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Pro Tips for VAs
              </h2>
              <p className="text-lg text-muted-foreground">
                Essential knowledge for managing successful warmup campaigns
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3">📊 Monitor Key Metrics</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Keep bounce rate below 2%</li>
                  <li>• Aim for 20-30% open rates during warmup</li>
                  <li>• Watch for spam folder placement</li>
                  <li>• Track reply rates and engagement</li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3">⏰ Timing Best Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Send during business hours (9 AM - 5 PM)</li>
                  <li>• Vary sending times throughout the day</li>
                  <li>• Use weekdays only for natural patterns</li>
                  <li>• Add random delays between emails</li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3">📝 Content Guidelines</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Start with personal, non-promotional content</li>
                  <li>• Use different subject lines and templates</li>
                  <li>• Include proper unsubscribe links</li>
                  <li>• Avoid spam trigger words</li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-3">🚨 Warning Signs</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• High bounce rates (above 5%)</li>
                  <li>• Low open rates (below 15%)</li>
                  <li>• Emails landing in spam folder</li>
                  <li>• Spam complaints or blocks</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Need More Guidance?</h3>
              <p className="text-blue-700 text-sm mb-3">
                Check out our comprehensive warmup guide for detailed strategies and troubleshooting tips.
              </p>
              <a href="/warmup-guide" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group">
                <span className="text-sm font-medium underline">View Complete Warmup Guide →</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarmupCalculatorPage;
