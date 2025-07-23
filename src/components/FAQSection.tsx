import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import GetStartedButton from './GetStartedButton';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is AzureInfra.email different from other Azure providers?",
      answer: "Yes, significantly. While most providers share infrastructure or use basic Azure setups, we provide complete domain isolation with dedicated Azure servers per domain. Each domain gets its own tenant, IP addresses, and infrastructure - not shared pools. This means better deliverability and zero cross-contamination between domains."
    },
    {
      question: "$0 setup fee. How?",
      answer: "We've automated everything. While competitors like Superwave charge $6,000 and Hypertide charges $1,500 for manual setup, our platform automates SPF, DKIM, DMARC, DNS configuration, and mailbox creation. What takes others hours of manual work, we complete in seconds through automation."
    },
    {
      question: "Does this replace tools like Instantly/Smartlead?",
      answer: "No, we complement them. AzureInfra.email provides the premium email infrastructure (mailboxes, domains, servers), while tools like Instantly, Smartlead, Apollo, and others handle the campaign management, sequences, and sending logic. We integrate seamlessly with all major cold email platforms via API."
    },
    {
      question: "Can I bring my own domains?",
      answer: "Yes, absolutely! You can bring your own domains at no extra cost. We'll configure all the necessary DNS records, authentication, and setup automatically. If you need domains, we also offer high-reputation domains at $15.55 each (at-cost pricing with no markup)."
    },
    {
      question: "Why do domains cost $15.55 in AzureInfra.email?",
      answer: "This is our at-cost pricing with zero markup. We source high-reputation domains that are pre-verified and optimized for email delivery. Compared to buying 100+ low-quality domains elsewhere, you'll pay 96-99% less while getting better deliverability with just 2-6 domains."
    },
    {
      question: "What happens if I burn a domain?",
      answer: "No panic needed! Unlike other providers, we offer backup infrastructure. Your backup domains are pre-warmed and completely isolated from the burned domain. You can switch instantly with no downtime, saving you weeks of warm-up time and thousands in lost opportunities."
    },
    {
      question: "Do I still need to warmup before sending?",
      answer: "Yes, but much less. Warm up your mailboxes for 7-14 days before full-scale sending. Our premium Azure infrastructure and dedicated IPs mean faster warmup times compared to shared systems. The infrastructure quality significantly reduces the warmup period needed."
    },
    {
      question: "Do you provide a warmup pool?",
      answer: "We focus on providing the infrastructure. For warmup, we recommend using specialized warmup services like Mailwarm, Lemlist, or the built-in warmup features in your sending platform (Instantly, Smartlead, etc.). Our role is to provide the premium mailboxes that warm up faster and perform better."
    },
    {
      question: "How many mailboxes do I need?",
      answer: "For 2,000+ emails per day, start with 600+ mailboxes (our minimum order). This allows ~3-4 emails per mailbox per day, which is optimal for deliverability. You can send up to 10 emails per mailbox daily, but 3-4 gives the best inbox rates. Scale up as needed - mailboxes can be added anytime."
    },
    {
      question: "How many outreach emails can I send daily?",
      answer: "With 600 mailboxes: 1,800-2,400 emails daily (conservative) or up to 6,000 emails daily (aggressive). Our infrastructure supports high-volume sending while maintaining deliverability. The key is gradual scaling and proper list quality, not just infrastructure limits."
    },
    {
      question: "Can I send >10 emails per mailbox per day?",
      answer: "Technically yes, but we don't recommend it. 10+ emails per mailbox daily hurts deliverability regardless of infrastructure quality. Our sweet spot is 3-4 emails per mailbox for maximum inbox rates. Premium infrastructure doesn't override fundamental email best practices."
    },
    {
      question: "What kind of results can I expect?",
      answer: "With proper setup: 80-90%+ inbox delivery rates to GSuite and Outlook, 2-5% reply rates (depending on your offer/copy), and significantly better performance than shared infrastructure. Results depend on list quality, offer strength, and copy - we provide the infrastructure foundation for success."
    },
    {
      question: "What if I don't see results?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the infrastructure performance within 30 days, we'll refund your payment. However, results depend on multiple factors including list quality, offer, and copy - not just infrastructure."
    },
    {
      question: "Can I try for free before paying?",
      answer: "We don't offer free trials, but we do offer a 30-day money-back guarantee and our pricing starts at just $1.50/mailbox. The minimum order of 600 mailboxes lets you test the infrastructure properly for serious cold email campaigns. One-off tests don't provide meaningful data."
    },
    {
      question: "How can I get mailboxes for free?",
      answer: "We don't offer free mailboxes as premium Azure infrastructure has real costs. However, at $1.50/mailbox, we're significantly cheaper than competitors while providing better quality. Consider it an investment in better deliverability and higher reply rates."
    },
    {
      question: "I applied during the closed beta. What now?",
      answer: "We're now in open beta! You can create mailboxes directly without applying or waiting for approval. Simply visit our order page and set up your infrastructure. The application process is no longer needed."
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-card rounded-full px-4 py-2 mb-6 border border-primary/20">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">FAQ</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            The 1 place with
            <span className="block bg-gradient-primary bg-clip-text text-transparent">all the answers</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get instant answers to the most common questions about our premium Azure email infrastructure.
          </p>

          <GetStartedButton className="mb-8">
            Try AzureInfra.email Now
          </GetStartedButton>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-border hover:border-primary/20 transition-all duration-200">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 border-t border-border/50">
                    <div className="pt-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <GetStartedButton variant="outline">
            Contact Support
          </GetStartedButton>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
