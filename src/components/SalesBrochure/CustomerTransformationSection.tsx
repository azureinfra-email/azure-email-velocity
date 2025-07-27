import React from 'react';

interface ImpactCard {
  title: string;
  items: string[];
}

export const CustomerTransformationSection: React.FC = () => {
  const immediateImpact: ImpactCard[] = [
    {
      title: "✅ Rapid Infrastructure Deployment",
      items: [
        "3-hour setup: From order to sending emails same day",
        "Zero technical work: We handle all DNS, SPF, DKIM, DMARC configuration",
        "Instant mailbox access: Full Outlook 365 functionality immediately",
        "Pre-warmed domains: Start with established reputation scores"
      ]
    },
    {
      title: "📈 Immediate Deliverability Improvements",
      items: [
        "99%+ delivery rates: Dedicated Azure IPs with premium reputation",
        "Inbox placement: Land in primary inbox, not promotions/spam",
        "Domain isolation: Your reputation protected from other users",
        "Real-time monitoring: Instant alerts for any deliverability issues"
      ]
    }
  ];

  const longTermGrowth: ImpactCard[] = [
    {
      title: "💰 Pipeline & Revenue Impact",
      items: [
        "3-5x increase in reply rates: More conversations from same outreach volume",
        "50-80% more qualified meetings: Better inbox placement = more responses",
        "Reduced cost per lead: Higher efficiency means lower acquisition costs",
        "Predictable pipeline: Consistent deliverability enables accurate forecasting"
      ]
    },
    {
      title: "⚡ Operational Efficiency Gains",
      items: [
        "No technical maintenance: Focus on campaigns, not infrastructure",
        "Instant scaling: Add domains/mailboxes in hours, not weeks",
        "Unified management: Single dashboard for all email operations",
        "Risk mitigation: Backup domains and automatic failover"
      ]
    }
  ];

  const complianceFeatures = [
    "Microsoft Azure infrastructure: Enterprise security standards",
    "GDPR & CCPA compliant: Built-in privacy protection",
    "SOC 2 certified data centers: Bank-level security",
    "Automated compliance monitoring: Stay current with email regulations"
  ];

  const supportFeatures = [
    "Dedicated success manager: Monthly performance reviews",
    "Deliverability optimization: Continuous monitoring and improvements",
    "Campaign strategy consulting: Best practices and trend insights",
    "Priority technical support: Issues resolved within 2 hours"
  ];

  const successFramework = [
    { month: "Month 1", description: "Infrastructure setup, warmup execution, initial campaign launch" },
    { month: "Month 2-3", description: "Performance optimization, scaling successful campaigns" },
    { month: "Month 4+", description: "Advanced strategies, team expansion, revenue acceleration" }
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        How We Transform Your Email Operations
      </h1>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        🚀 Immediate Impact (First 30 Days)
      </h2>

      <div className="space-y-4 mb-10">
        {immediateImpact.map((card, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-blue-600 text-lg font-semibold mb-4">{card.title}</h4>
            <ul className="space-y-2">
              {card.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        📊 Long-term Revenue Growth (3-12 Months)
      </h2>

      <div className="space-y-4 mb-10">
        {longTermGrowth.map((card, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-blue-600 text-lg font-semibold mb-4">{card.title}</h4>
            <ul className="space-y-2">
              {card.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>{item.split(':')[0]}:</strong> {item.split(':').slice(1).join(':')}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        🛡️ Risk Elimination & Compliance
      </h2>

      <div className="bg-green-50 border border-green-200 p-5 mb-10 rounded-lg">
        <h4 className="text-green-800 font-semibold mb-3">Enterprise-Grade Security & Compliance</h4>
        <ul className="space-y-2">
          {complianceFeatures.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span><strong>{feature.split(':')[0]}:</strong> {feature.split(':').slice(1).join(':')}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        🔧 Ongoing Support & Optimization
      </h2>

      <div className="bg-white border-2 border-gray-200 p-6 mb-8 rounded-lg shadow-sm">
        <h4 className="text-blue-600 text-lg font-semibold mb-4">Proactive Account Management</h4>
        <ul className="space-y-2">
          {supportFeatures.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>{feature.split(':')[0]}:</strong> {feature.split(':').slice(1).join(':')}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-4">💡 Success Framework</h3>
        <div className="space-y-2">
          {successFramework.map((phase, index) => (
            <p key={index}>
              <strong>{phase.month}:</strong> {phase.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
