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

const features = [
  {
    icon: Mail,
    title: "Outlook 365 Infrastructure",
    description: "Enterprise-grade Outlook 365 mailboxes with full Microsoft infrastructure backing, ensuring maximum deliverability and trust.",
    highlight: "Office 365"
  },
  {
    icon: Shield,
    title: "Microsoft Security Standards",
    description: "Built-in security features including Advanced Threat Protection, encryption, and compliance with enterprise security protocols.",
    highlight: "Enterprise Security"
  },
  {
    icon: Cloud,
    title: "Azure Cloud Platform",
    description: "Hosted on Microsoft Azure with 99.9% uptime guarantee, global data centers, and enterprise-level reliability.",
    highlight: "99.9% Uptime"
  },
  {
    icon: CheckCircle,
    title: "Exchange Online Integration",
    description: "Full Exchange Online capabilities with calendar, contacts, and advanced email management features built-in.",
    highlight: "Exchange Online"
  },
  {
    icon: Target,
    title: "Domain Reputation Management",
    description: "Pre-configured domains with established sender reputation, SPF, DKIM, and DMARC records for optimal deliverability.",
    highlight: "Pre-Configured"
  },
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Ready-to-use mailboxes with immediate access to full Outlook features, mobile sync, and Microsoft ecosystem integration.",
    highlight: "Instant Setup"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Microsoft Infrastructure</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Enterprise 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Email Infrastructure</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional Outlook 365 mailboxes with enterprise-grade security, reliability, and Microsoft ecosystem integration. 
            Get instant access to fully configured email infrastructure at $3.33 per mailbox.
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