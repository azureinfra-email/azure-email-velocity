import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Cloud,
  Mail,
  BarChart3,
  AlertTriangle,
  BookOpen,
  Wrench
} from "lucide-react";
import { siteConfig } from "@/config/config";

const features = [
  {
    icon: Target,
    title: "Maximum Deliverability Potential",
    description: "Optimized infrastructure with dedicated Azure IPs, advanced reputation management, and pre-warmed domain infrastructure designed for high inbox delivery rates in cold email campaigns.",
    highlight: "Premium Infrastructure"
  },
  {
    icon: Shield,
    title: "Domain Isolation & Protection",
    description: "Each domain gets dedicated Azure infrastructure with IP isolation, protecting your reputation from other users and campaigns.",
    highlight: "Dedicated IPs"
  },
  {
    icon: Zap,
    title: "100% Compliance - Auto Setup",
    description: "SPF, DKIM, DMARC, and DNS records automatically configured and maintained. Fully compliant with all email authentication standards - no technical setup required.",
    highlight: "Auto SPF/DKIM/DMARC"
  },
  {
    icon: Mail,
    title: "Enterprise Outlook 365",
    description: "Full Microsoft Outlook 365 infrastructure with Exchange Online, ensuring maximum compatibility and professional appearance.",
    highlight: "Office 365"
  },
  {
    icon: Cloud,
    title: "Scalable Azure Infrastructure",
    description: "Built on Microsoft Azure with auto-scaling capabilities to handle high-volume campaigns (10k+ emails per day per domain).",
    highlight: "High Volume"
  },
  {
    icon: CheckCircle,
    title: "Cold Email Optimized",
    description: "Purpose-built for cold email marketers with advanced deliverability features, backup domains, and campaign management tools.",
    highlight: "Cold Email Focus"
  },
  {
    icon: Wrench,
    title: "Free Cold Email Tools",
    description: "Username generators, domain name ideas, and persona generators to streamline your campaign setup and testing processes.",
    highlight: "Free Tools"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Cold Email Infrastructure</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Maximum Deliverability
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Infrastructure</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium Azure-powered infrastructure designed specifically for cold email marketers who need maximum inbox delivery rates. 
            Get dedicated IPs, domain isolation, and enterprise-grade deliverability at {siteConfig.pricing.displayPrice} per mailbox.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isToolsCard = feature.highlight === "Free Tools";
            const CardWrapper = isToolsCard ? 'a' : 'div';
            const cardProps = isToolsCard ? { href: '/tools' } : {};
            
            return (
              <CardWrapper key={index} {...cardProps} className={isToolsCard ? "block" : ""}>
                <Card 
                  className={`relative group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-primary/10 ${isToolsCard ? 'cursor-pointer hover:border-primary/30' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary">{feature.highlight}</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                      {isToolsCard && <span className="text-sm text-primary ml-2">→</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </CardWrapper>
            );
          })}
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Deliverability Success Requires Proper Execution</h3>
                <p className="text-blue-700 text-sm mb-3">
                  While our infrastructure provides the foundation for high deliverability, your actual inbox rates depend on 
                  proper warmup strategies, list quality, content relevance, and sending patterns.
                </p>
                <a href="/warmup-guide" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors group">
                  <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium underline">Learn our proven warmup strategies →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-gradient-card rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-3">
                <Cloud className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Microsoft Azure</div>
                  <div className="text-sm text-muted-foreground">Global Infrastructure</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Outlook 365</div>
                  <div className="text-sm text-muted-foreground">Enterprise Mailboxes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">ATP & Compliance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;