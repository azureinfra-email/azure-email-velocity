import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/config";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">{siteConfig.domain}</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Legal Terms</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Terms of Service
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-card rounded-lg p-6 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              Agreement to Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using {siteConfig.name}'s email infrastructure services, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Service Description</h2>
            <p className="text-muted-foreground mb-4">
              {siteConfig.name} provides enterprise-grade email infrastructure services, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Outlook 365 mailbox hosting and management</li>
              <li>Microsoft Azure-powered email infrastructure</li>
              <li>Domain configuration and DNS management</li>
              <li>Email security and compliance features</li>
              <li>Technical support and maintenance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Pricing and Payment</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Service Fees</h3>
            <div className="bg-gradient-card rounded-lg p-4 border border-primary/10 mb-4">
              <p className="text-muted-foreground">
                Current pricing: <strong className="text-foreground">{siteConfig.pricing.displayPrice} {siteConfig.pricing.period}</strong>
              </p>
            </div>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Payment Terms</h3>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Services are billed monthly in advance</li>
              <li>Payment is due within 30 days of invoice date</li>
              <li>Late payments may result in service suspension</li>
              <li>All fees are non-refundable unless otherwise specified</li>
              <li>Prices may change with 30 days written notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Acceptable Use Policy</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Prohibited Activities</h3>
                  <p className="text-red-700 text-sm mb-2">You may not use our services for:</p>
                  <ul className="list-disc pl-6 text-red-700 text-sm">
                    <li>Sending spam, unsolicited, or bulk email</li>
                    <li>Illegal activities or violating applicable laws</li>
                    <li>Distributing malware, viruses, or harmful content</li>
                    <li>Phishing, fraud, or deceptive practices</li>
                    <li>Harassment, threats, or abusive behavior</li>
                    <li>Violating intellectual property rights</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-3">Compliance Requirements</h3>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Follow CAN-SPAM Act and other anti-spam regulations</li>
              <li>Comply with GDPR and data protection laws</li>
              <li>Maintain proper email authentication (SPF, DKIM, DMARC)</li>
              <li>Respect recipient opt-out requests</li>
              <li>Use reasonable sending volumes and patterns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Service Level Agreement</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-card rounded-lg p-4 border border-primary/10">
                <h3 className="font-semibold text-foreground mb-2">Uptime Guarantee</h3>
                <p className="text-2xl font-bold text-primary">{siteConfig.tech.uptime}</p>
                <p className="text-sm text-muted-foreground">Monthly uptime commitment</p>
              </div>
              
              <div className="bg-gradient-card rounded-lg p-4 border border-primary/10">
                <h3 className="font-semibold text-foreground mb-2">Support Response</h3>
                <p className="text-2xl font-bold text-primary">{siteConfig.contact.responseTime}</p>
                <p className="text-sm text-muted-foreground">Initial response time</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-3">Service Credits</h3>
            <p className="text-muted-foreground mb-4">
              If we fail to meet our uptime guarantee, you may be eligible for service credits:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>95.0% - 99.8% uptime: 10% monthly service credit</li>
              <li>90.0% - 94.9% uptime: 25% monthly service credit</li>
              <li>Below 90.0% uptime: 50% monthly service credit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data and Privacy</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>You retain ownership of your data and email content</li>
              <li>We implement enterprise-grade security measures</li>
              <li>Data is processed according to our Privacy Policy</li>
              <li>We comply with applicable data protection regulations</li>
              <li>Regular backups are performed for data protection</li>
              <li>You are responsible for maintaining secure account credentials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Our total liability for any claims arising from these terms or our services 
                shall not exceed the amount you paid for services in the 12 months preceding the claim. 
                We are not liable for indirect, incidental, or consequential damages.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Termination</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">By You</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Cancel anytime with 30 days written notice</li>
              <li>Responsible for charges incurred until termination date</li>
              <li>Data export available for 30 days after termination</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">By Us</h3>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>For violation of acceptable use policy</li>
              <li>For non-payment after 30-day grace period</li>
              <li>For violation of these terms</li>
              <li>With 30 days notice for convenience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Information</h2>
            <div className="bg-gradient-card rounded-lg p-6 border border-primary/10">
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Response time: {siteConfig.contact.responseTime}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Material changes will be communicated 
              via email 30 days before taking effect. Continued use of our services after changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
