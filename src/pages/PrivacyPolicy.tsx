import { Mail, Shield, Eye, Lock } from "lucide-react";
import { siteConfig } from "@/config/config";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl">
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 border border-primary/20">
            <Shield className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-primary text-xs sm:text-sm font-medium">Privacy & Security</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
            Privacy Policy
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-card rounded-lg p-6 border border-primary/10 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              Your Privacy Matters
            </h2>
            <p className="text-muted-foreground">
              At {siteConfig.name}, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our email infrastructure services.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Name and contact information (email address, company name)</li>
              <li>Account credentials and authentication information</li>
              <li>Billing and payment information</li>
              <li>Support and communication records</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mb-3">Service Data</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Email infrastructure usage metrics</li>
              <li>Technical logs and performance data</li>
              <li>Domain and DNS configuration information</li>
              <li>Security monitoring and threat detection data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Provide and maintain our email infrastructure services</li>
              <li>Process payments and manage billing</li>
              <li>Provide customer support and technical assistance</li>
              <li>Monitor service performance and security</li>
              <li>Comply with legal obligations and industry standards</li>
              <li>Improve our services and develop new features</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
            <div className="bg-gradient-card rounded-lg p-6 border border-primary/10">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Enterprise-Grade Security</h3>
                  <p className="text-muted-foreground mb-3">
                    We implement industry-leading security measures to protect your data:
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Data encryption in transit and at rest</li>
                    <li>Microsoft Azure security infrastructure</li>
                    <li>Multi-factor authentication and access controls</li>
                    <li>Regular security audits and compliance monitoring</li>
                    <li>SOC 2 Type II and ISO 27001 compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>With Microsoft Azure for infrastructure services (covered by their privacy policy)</li>
              <li>With payment processors for billing purposes</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights, property, or safety</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information only as long as necessary to provide our services, comply with legal obligations, 
              or resolve disputes. Account data is typically retained for the duration of your service agreement plus 
              90 days for billing and support purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request data portability</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
            <div className="bg-gradient-card rounded-lg p-6 border border-primary/10">
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:underline font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                We typically respond within {siteConfig.contact.responseTime}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date. 
              Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
