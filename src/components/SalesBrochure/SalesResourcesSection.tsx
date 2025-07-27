import siteConfig from '@/config/config';
import React from 'react';

interface ContactInfo {
  label: string;
  value: string;
}

interface QuickRef {
  title: string;
  items: string[];
}

export const SalesResourcesSection: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    { label: "Sales Email", value: siteConfig.contact.email },
    { label: "Demo Booking", value: siteConfig.contact.calendly },
    { label: "Technical Support", value: siteConfig.contact.email },
    { label: "Website", value: siteConfig.links.homepage }
  ];

  const quickStats: ContactInfo[] = [
    { label: "Average Setup Time", value: "3 hours" },
    { label: "Minimum Order", value: "50 mailboxes" },
    { label: "Typical ROI", value: "30:1 in 90 days" },
    { label: "Customer Satisfaction", value: "98%" }
  ];

  const quickRefCards: QuickRef[] = [
    {
      title: "Qualifying Questions",
      items: [
        "Monthly email volume?",
        "Current delivery rates?",
        "Team size?",
        "Current email budget?"
      ]
    },
    {
      title: "Key Differentiators",
      items: [
        "3-hour setup time",
        "99%+ delivery guarantee",
        "Dedicated Azure infrastructure",
        "Zero technical setup"
      ]
    },
    {
      title: "Common Objections",
      items: [
        '"Too expensive" → ROI focus',
        '"Current solution works" → Audit offer',
        '"Need IT approval" → Security docs',
        '"Too technical" → Zero setup'
      ]
    },
    {
      title: "Closing Techniques",
      items: [
        "Risk reversal (30-day guarantee)",
        "ROI calculator",
        "Calendar booking",
        "Parallel testing"
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* CTA Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 px-10 text-center">
        <h1 className="text-4xl font-bold mb-5">Ready to Transform Your Email Deliverability?</h1>
        <p className="text-xl mb-8">Join 500+ RevOps teams already seeing 99%+ inbox delivery rates</p>
        
        <div className="flex flex-wrap justify-center gap-5">
          <a 
            href={siteConfig.links.homepage}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Visit Website
          </a>
          <a 
            href={siteConfig.links.start}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
          <a 
            href={siteConfig.contact.calendly}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Book Demo Call
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 p-10 text-center border-t-4 border-blue-600">
        <h2 className="text-blue-600 text-3xl font-bold mb-8">Sales Team Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-10">
          <div>
            <h3 className="text-blue-600 text-xl font-semibold mb-4">📞 Contact Information</h3>
            <div className="space-y-2">
              {contactInfo.map((info, index) => (
                <p key={index}>
                  <strong>{info.label}:</strong> {info.value}
                </p>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-blue-600 text-xl font-semibold mb-4">🎯 Quick Stats</h3>
            <div className="space-y-2">
              {quickStats.map((stat, index) => (
                <p key={index}>
                  <strong>{stat.label}:</strong> {stat.value}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Team Quick Reference */}
        <div className="border-t-2 border-blue-600 pt-8">
          <h3 className="text-blue-600 text-2xl font-bold mb-6">🚀 Sales Team Quick Reference</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickRefCards.map((card, index) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 text-left">
                <h4 className="text-blue-600 font-semibold mb-3">{card.title}</h4>
                <ul className="text-sm space-y-1">
                  {card.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-600 mr-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-10 pt-8 border-t border-gray-300">
          <p className="text-lg text-blue-600 font-bold mb-5">
            💪 Remember: Every prospect is losing money on poor deliverability.<br />
            Your job is to show them the cost of doing nothing.
          </p>
          <p className="text-gray-600 italic">
            Last Updated: July 2025 | Version 2.0<br />
            Internal Use Only - Sales Team
          </p>
        </div>
      </div>
    </div>
  );
};
