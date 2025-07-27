import React from 'react';

export const ICPSection: React.FC = () => {
  const companyTypes = [
    "Mid-market to Enterprise B2B companies ($10M+ ARR)",
    "High-growth SaaS companies scaling outbound efforts", 
    "Sales Development teams with 5+ SDRs",
    "Marketing agencies managing client cold email campaigns"
  ];

  const decisionMakers = [
    {
      title: "RevOps Directors/VPs",
      description: "Budget owners seeking infrastructure solutions"
    },
    {
      title: "Sales Development Leaders", 
      description: "Need reliable email delivery for team quotas"
    },
    {
      title: "Marketing Operations Managers",
      description: "Responsible for email deliverability"
    },
    {
      title: "Growth Team Leaders",
      description: "Focus on scalable acquisition channels"
    }
  ];

  const challenges = [
    "Low inbox delivery rates with current email providers",
    "Emails landing in spam folders reducing response rates",
    "Long setup times delaying campaign launches", 
    "Shared infrastructure affecting sender reputation",
    "High costs for premium email services",
    "Technical complexity in email authentication setup"
  ];

  const buyingSignals = [
    "Our cold email open rates have dropped significantly",
    "We're spending too much time warming up domains",
    "Our current provider's deliverability is inconsistent",
    "We need to scale our outbound team quickly",
    "Our emails keep getting flagged as spam"
  ];

  const volumeIndicators = [
    "Minimum 50 mailboxes needed (our minimum order)",
    "Sending 1,000+ emails per day across the team",
    "Budget of $2,000+/month for email infrastructure",
    "Currently using multiple domains for email campaigns"
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        Ideal Customer Profile (ICP)
      </h1>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 mb-8 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-4">🎯 Primary Target: B2B RevOps Teams</h3>
        <p className="text-gray-700 font-semibold">
          Revenue Operations professionals who manage cold email campaigns and need reliable inbox delivery to drive pipeline growth.
        </p>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        Perfect Fit Criteria
      </h2>

      {/* Company Size & Type */}
      <div className="bg-white border-2 border-gray-200 p-6 mb-4 rounded-lg shadow-sm">
        <h4 className="text-blue-600 text-lg font-semibold mb-4">📊 Company Size & Type</h4>
        <ul className="space-y-2">
          {companyTypes.map((type, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>{type.split(' ')[0]} {type.split(' ')[1]} {type.split(' ')[2]}</strong> {type.split(' ').slice(3).join(' ')}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Decision Makers */}
      <div className="bg-white border-2 border-gray-200 p-6 mb-4 rounded-lg shadow-sm">
        <h4 className="text-blue-600 text-lg font-semibold mb-4">👥 Key Decision Makers</h4>
        <ul className="space-y-3">
          {decisionMakers.map((maker, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>{maker.title}</strong> - {maker.description}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Current Challenges */}
      <div className="bg-white border-2 border-gray-200 p-6 mb-8 rounded-lg shadow-sm">
        <h4 className="text-blue-600 text-lg font-semibold mb-4">💼 Current Challenges They Face</h4>
        <ul className="space-y-2">
          {challenges.map((challenge, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>{challenge.split(' ')[0]} {challenge.split(' ')[1]} {challenge.split(' ')[2]}</strong> {challenge.split(' ').slice(3).join(' ')}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        Buying Signals to Look For
      </h2>

      {/* Strong Buying Signals */}
      <div className="bg-yellow-50 border border-yellow-200 p-5 mb-5 rounded-lg">
        <h4 className="text-yellow-800 font-semibold mb-3">🟢 Strong Buying Signals</h4>
        <ul className="space-y-1">
          {buyingSignals.map((signal, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span className="italic">"{signal}"</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Volume & Budget Indicators */}
      <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
        <h4 className="text-green-800 font-semibold mb-3">🎯 Volume & Budget Indicators</h4>
        <ul className="space-y-2">
          {volumeIndicators.map((indicator, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span><strong>{indicator.split(' ')[0]} {indicator.split(' ')[1]} {indicator.split(' ')[2]}</strong> {indicator.split(' ').slice(3).join(' ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
