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
    icon: Target,
    title: "Inbox Delivery Mastery",
    description: "Proven warmup techniques that ensure your emails reach the inbox, not spam folders. Our methods build sender reputation systematically.",
    highlight: "Inbox Focused"
  },
  {
    icon: Clock,
    title: "15-Day Minimum Warmup",
    description: "Our recommended 15-day warmup protocol gradually builds your sender reputation, ensuring long-term inbox delivery success.",
    highlight: "15+ Days"
  },
  {
    icon: Shield,
    title: "Reputation Protection",
    description: "Built on Azure infrastructure with advanced warmup protocols that protect and enhance your sender reputation over time.",
    highlight: "Protected Rep"
  },
  {
    icon: CheckCircle,
    title: "Proven Warmup Process",
    description: "Step-by-step warmup methodology that's been tested across thousands of mailboxes to ensure consistent inbox placement.",
    highlight: "Tested Process"
  },
  {
    icon: TrendingUp,
    title: "Gradual Volume Scaling",
    description: "Smart volume progression during warmup ensures mailbox providers trust your sending patterns for better inbox delivery.",
    highlight: "Smart Scaling"
  },
  {
    icon: Zap,
    title: "Optimized Send Patterns",
    description: "Advanced sending patterns and timing optimization that mimics natural email behavior for maximum inbox delivery.",
    highlight: "Natural Patterns"
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
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Inbox Delivery</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master inbox delivery with proven warmup techniques and strategic sender reputation building. 
            Our 15-day minimum warmup ensures your emails reach inboxes consistently.
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