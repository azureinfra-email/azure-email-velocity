import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { siteConfig } from "@/config/config";
import GetStartedButton from "@/components/ui/GetStartedButton";

const GuaranteeSection = () => {
  return (
    <section id="guarantee" className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6 border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Risk-Free Guarantee</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {siteConfig.guarantee.title}
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {siteConfig.guarantee.description}
            </p>
          </div>

          {/* Guarantee Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {siteConfig.guarantee.features.map((feature, index) => {
              const icons = [CheckCircle, Shield, Clock, RefreshCw];
              const Icon = icons[index % icons.length];
              
              return (
                <Card key={index} className="bg-white border-green-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {feature}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Trust Building Statement */}
          <div className="bg-white rounded-2xl p-8 border border-green-200 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Why We Can Offer This Guarantee
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're confident in our Azure-powered infrastructure and 99.9% inbox rate. 
                  Most customers see improved deliverability within the first week. 
                  Your success is our success.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Try Risk-Free?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start with our premium cold email infrastructure today. If you're not completely satisfied, 
              get your money back within {siteConfig.guarantee.period}.
            </p>
            <GetStartedButton 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              text="Start Risk-Free Trial"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
