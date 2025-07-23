import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Clock, CheckCircle, Mail } from "lucide-react";
import { siteConfig } from "@/config/config";
import SEO from "@/components/SEO";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Refund Policy - AzureInfra.email"
        description="Our 30-day money-back guarantee and refund policy. Risk-free trial of our premium cold email infrastructure service."
        keywords="refund policy, money back guarantee, cold email refund, azureinfra refund"
        canonical="/refund-policy"
        schemaType="WebPage"
      />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 mb-6 border border-green-200">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Money-Back Guarantee</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Refund Policy
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're confident in our service quality. Try AzureInfra.email risk-free with our 30-day money-back guarantee.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Quick Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">30-Day Guarantee</div>
                  <div className="text-blue-700 text-sm">Full refund within 30 days of purchase</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">No Questions Asked</div>
                  <div className="text-blue-700 text-sm">Simple refund process, no lengthy explanations required</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">Keep Your Data</div>
                  <div className="text-blue-700 text-sm">All emails sent during trial period remain yours</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-blue-900">Fast Processing</div>
                  <div className="text-blue-700 text-sm">Refunds processed within 3-5 business days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Policy */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Refund Policy</h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-2xl font-semibold text-foreground mb-4">30-Day Money-Back Guarantee</h3>
                <p className="text-muted-foreground mb-4">
                  We offer a comprehensive 30-day money-back guarantee on all AzureInfra.email services. If you're not completely satisfied with your cold email infrastructure service within 30 days of your initial purchase, we will provide a full refund of your first month's payment.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">
                    <strong>Guarantee Period:</strong> 30 calendar days from your initial service activation date.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-foreground mb-4">What's Covered</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>First Month Payment:</strong> Full refund of your initial monthly subscription fee</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Setup Fees:</strong> Any one-time setup or configuration fees (if applicable)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Domain Costs:</strong> Domain registration fees paid through our service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>All Service Features:</strong> Including dedicated IPs, SPF/DKIM setup, and support</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-foreground mb-4">How to Request a Refund</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <ol className="space-y-4 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                      <div>
                        <strong>Contact Support:</strong> Email us at <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">{siteConfig.contact.email}</a> with the subject line "Refund Request"
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                      <div>
                        <strong>Provide Details:</strong> Include your account email, service start date, and reason for refund (optional)
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                      <div>
                        <strong>Confirmation:</strong> We'll confirm your refund request within 24 hours
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                      <div>
                        <strong>Processing:</strong> Refund will be processed to your original payment method within 3-5 business days
                      </div>
                    </li>
                  </ol>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Important Notes</h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800">
                      <strong>Service Continuity:</strong> After requesting a refund, your service will continue until the end of your current billing period to ensure no disruption to your campaigns.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">
                      <strong>Data Retention:</strong> All emails sent and data created during your service period remain yours. We don't delete your email contacts or campaign data upon refund.
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">
                      <strong>No Questions Policy:</strong> While we appreciate feedback, you don't need to provide a detailed explanation for your refund request. Your satisfaction is our priority.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Refund Processing Time</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">Credit Card Payments</h4>
                    <p className="text-muted-foreground">3-5 business days to appear on your statement</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">PayPal Payments</h4>
                    <p className="text-muted-foreground">1-2 business days to appear in your PayPal account</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Email Support</div>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">Response Time</div>
                      <div className="text-muted-foreground">{siteConfig.contact.responseTime} average response time</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Try Risk-Free?</h3>
            <p className="text-lg text-blue-100 mb-6">
              Start your 30-day trial today with complete confidence in our money-back guarantee.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              Get Started Now
            </Link>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
