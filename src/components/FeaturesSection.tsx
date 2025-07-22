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
    icon: Shield,
    title: "Azure-Powered Reliability",
    description: "Built on Microsoft Azure infrastructure for maximum uptime and security. Enterprise-grade reliability you can count on.",
    highlight: "99.9% Uptime"
  },
  {
    icon: Zap,
    title: "Lightning Fast Delivery",
    description: "No MS-365 bottlenecks. Our optimized infrastructure ensures your emails reach recipients faster than ever.",
    highlight: "2x Faster"
  },
  {
    icon: Target,
    title: "Superior Outlook Delivery",
    description: "Best-in-class delivery rates to Outlook mailboxes. Our proven strategies ensure your emails land in the inbox.",
    highlight: "35% Better"
  },
  {
    icon: Clock,
    title: "Timely Responses",
    description: "Real-time email processing and instant reply handling. Never miss an important response or opportunity.",
    highlight: "<2s Response"
  },
  {
    icon: CheckCircle,
    title: "Zero Fuckups",
    description: "Unlike cheap email providers, we maintain consistent quality and reliability. No surprises, no downtime.",
    highlight: "100% Reliable"
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Our clients see measurable improvements in their email campaign performance and response rates.",
    highlight: "35% More Opens"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Why Choose Our Infrastructure</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Built for 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Performance</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cold email infrastructure delivers results where others fail. 
            Experience the difference of enterprise-grade email delivery.
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
                  <div className="font-semibold text-foreground">Azure Infrastructure</div>
                  <div className="text-sm text-muted-foreground">Enterprise Grade</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Email Delivery</div>
                  <div className="text-sm text-muted-foreground">Optimized Routes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <div className="font-semibold text-foreground">Security First</div>
                  <div className="text-sm text-muted-foreground">Best Practices</div>
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