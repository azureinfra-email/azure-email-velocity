import React from 'react';

export const PricingROISection: React.FC = () => {
  const pricingFeatures = [
    { icon: "⚡", title: "3-Hour Setup", subtitle: "Ready same day" },
    { icon: "🛡️", title: "Dedicated Infrastructure", subtitle: "Complete domain isolation" },
    { icon: "📧", title: "Full Outlook 365", subtitle: "Enterprise integration" },
    { icon: "💰", title: "30-Day Guarantee", subtitle: "Money-back guarantee" }
  ];

  const competitiveAdvantages = [
    "Speed: 3-hour setup vs weeks with other providers",
    "Quality: Premium dedicated Azure infrastructure vs shared pools",
    "Value: Enterprise-grade service at startup prices",
    "Support: Dedicated success management and priority support",
    "Reliability: 99.9% uptime with Microsoft Azure backbone",
    "Security: Complete domain isolation protects your reputation"
  ];

  const roiMetrics = [
    "4x improvement in reply rates (2% → 8%)",
    "$150 monthly cost per SDR (100 emails/day)",
    "Average customer adds $50K+ monthly pipeline within 90 days",
    "ROI: 30:1 within first quarter"
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        Investment & ROI
      </h1>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 mb-8 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-6">💰 Simple, Transparent Pricing</h3>
        
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            $1.50
            <span className="text-lg text-gray-600 font-normal">/mailbox/month</span>
          </div>
          <p className="text-lg font-semibold">
            Minimum 50 mailboxes • $15.55 one-time setup fee
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="font-semibold">{feature.title}</div>
              <div className="text-sm text-gray-600">{feature.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        🎯 Key Competitive Advantages
      </h2>

      <div className="bg-green-50 border border-green-200 p-5 mb-8 rounded-lg">
        <h4 className="text-green-800 font-semibold mb-3">Why RevOps Teams Choose AzureInfra.email</h4>
        <ul className="space-y-2">
          {competitiveAdvantages.map((advantage, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span><strong>{advantage.split(':')[0]}:</strong> {advantage.split(':').slice(1).join(':')}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-4">💡 ROI Calculator</h3>
        <p className="font-semibold mb-3">Typical Customer Results:</p>
        <ul className="space-y-1">
          {roiMetrics.map((metric, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className={index === roiMetrics.length - 1 ? "font-bold" : ""}>
                {metric}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
