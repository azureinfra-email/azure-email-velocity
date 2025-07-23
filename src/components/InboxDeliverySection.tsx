import { CheckCircle, Mail, Users, Target, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import GetStartedButton from "./GetStartedButton";

const InboxDeliverySection = () => {
  return (
    <section id="inbox-delivery" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-500 rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-green-500 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-purple-500 rounded-full transform -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6 border border-green-200">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Inbox Delivery Guarantee</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your Emails Will Land in 
            <span className="block text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
              GSuite & Outlook Inboxes
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Stop losing deals to spam folders. Our enterprise-grade infrastructure ensures your cold emails 
            reach decision-makers where they check messages daily.
          </p>
        </div>

        {/* Provider Logos Section */}
        <div className="mb-16">
          <p className="text-center text-gray-500 mb-8 font-medium">Optimized for the platforms your prospects use:</p>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            <div className="flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-sm border">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-700">Google Workspace</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-sm border">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-700">Microsoft 365</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-lg px-6 py-4 shadow-sm border">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-700">Outlook.com</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Why Companies Choose Us for Inbox Delivery
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Perfect Authentication Setup</h4>
                  <p className="text-gray-600">SPF, DKIM, and DMARC records automatically configured for maximum trust with email providers.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dedicated IP Reputation</h4>
                  <p className="text-gray-600">Each domain gets its own dedicated IP address, ensuring your reputation isn't affected by others.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Enterprise-Grade Infrastructure</h4>
                  <p className="text-gray-600">Azure-powered servers with 99.9% uptime and enterprise-level security protocols.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Proven Track Record</h4>
                  <p className="text-gray-600">99.9% inbox delivery rate across GSuite and Outlook, trusted by 500+ companies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Results */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Real Results from Real Companies
              </h4>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">99.9%</div>
                  <div className="text-sm text-green-700 font-medium">Inbox Delivery Rate</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                    <div className="text-xs text-blue-700">GSuite Success</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600 mb-1">97%</div>
                    <div className="text-xs text-purple-700">Outlook Success</div>
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">
                    "Our open rates increased by 300% after switching. Finally reaching inboxes instead of spam folders."
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    - Sarah M., VP Marketing at TechCorp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Guarantee Inbox Delivery?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ companies who trust us to deliver their emails to GSuite and Outlook inboxes.
            Setup takes just 1 hour.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetStartedButton 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg group shadow-lg border-2 border-white"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform mr-2" />
              Start Delivering to Inboxes
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GetStartedButton>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
              onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Pricing Details
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-blue-100">
              <CheckCircle className="w-4 h-4" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <CheckCircle className="w-4 h-4" />
              <span>30-day guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <CheckCircle className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InboxDeliverySection;
