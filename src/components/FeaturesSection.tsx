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
  BarChart3
} from "lucide-react";
import { siteConfig } from "@/config/config";

const features = [
  {
    icon: Target,
    title: "Maximum Inbox Delivery",
    description: "99.9% inbox rates with dedicated Azure IPs, advanced reputation management, and pre-warmed domain infrastructure for cold email campaigns.",
    highlight: "99.9% Inbox Rate"
  },
  {
    icon: Shield,
    title: "Domain Isolation & Protection",
    description: "Each domain gets dedicated Azure infrastructure with IP isolation, protecting your reputation from other users and campaigns.",
    highlight: "Dedicated IPs"
  },
  {
    icon: Zap,
    title: "Instant Campaign Ready",
    description: "Pre-configured SPF, DKIM, DMARC, and DNS settings. Start sending high-volume cold campaigns within minutes of setup.",
    highlight: "Zero Setup Time"
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
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative group hover:shadow-card transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-primary/10"
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
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
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