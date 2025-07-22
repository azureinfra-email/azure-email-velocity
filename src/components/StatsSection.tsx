import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Mail, Clock } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "35%",
    label: "Better Outlook Delivery",
    description: "Compared to other providers"
  },
  {
    icon: Users,
    value: "10K+",
    label: "Active Users",
    description: "Trust our infrastructure"
  },
  {
    icon: Mail,
    value: "50M+",
    label: "Emails Delivered",
    description: "Monthly volume"
  },
  {
    icon: Clock,
    value: "99.9%",
    label: "Uptime Guarantee",
    description: "Azure-powered reliability"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Proven Performance Metrics
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Real numbers from real campaigns. See why businesses choose our infrastructure for their cold email needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 text-white group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold mb-1 text-white">
                  {stat.label}
                </div>
                <div className="text-blue-100 text-sm">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;