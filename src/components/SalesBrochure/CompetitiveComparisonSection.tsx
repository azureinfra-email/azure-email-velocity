import React from 'react';

interface CompetitorComparison {
  title: string;
  advantages: string[];
}

interface BattleCard {
  objection: string;
  response: string;
}

interface ChecklistItem {
  text: string;
}

interface FollowUpStep {
  title: string;
  subject: string;
  goal: string;
  keyPoints: string;
}

export const CompetitiveComparisonSection: React.FC = () => {
  const competitorComparisons: CompetitorComparison[] = [
    {
      title: "vs. Google Workspace + Instantly",
      advantages: [
        "Setup Time: 3 hours vs 2-5 days",
        "Infrastructure: Dedicated Azure vs shared Gmail pools",
        "Cost: $1.50/mailbox vs $6-15/user + $37-97/month Instantly",
        "Support: Dedicated success manager vs self-service tickets",
        "Deliverability: 99%+ vs 60-80% typical"
      ]
    },
    {
      title: "vs. Saleshandy + Office 365",
      advantages: [
        "Domain Isolation: Complete separation vs shared reputation",
        "Technical Setup: Zero work vs manual DNS configuration",
        "Scaling Speed: Same-day provisioning vs weeks", 
        "Enterprise Security: Built-in SOC 2 vs basic Office 365",
        "Cost Predictability: Flat $1.50 vs variable enterprise pricing"
      ]
    },
    {
      title: "vs. Lemlist + Custom Setup",
      advantages: [
        "Inbox Rates: 99%+ guaranteed vs 40-70% typical",
        "Maintenance: Zero ongoing work vs constant monitoring",
        "Risk: 30-day guarantee vs sunk setup costs",
        "Integration: Native Outlook vs third-party tools",
        "Reputation Protection: Individual domains vs shared sending"
      ]
    }
  ];

  const battleCards: BattleCard[] = [
    {
      objection: "We're already using [Competitor]",
      response: "That's great! What inbox delivery rates are you seeing with them? Most teams we've migrated from [Competitor] were stuck at 60-70% delivery. Our customers typically see 99%+ within the first week. Would a side-by-side test be valuable to compare results?"
    },
    {
      objection: "We can build this ourselves",
      response: "Absolutely possible! Most of our enterprise customers initially tried that approach. The challenge is that email deliverability requires constant monitoring, IP warmup, reputation management, and staying current with anti-spam updates. Our team does this full-time. What's your IT team's bandwidth for ongoing email infrastructure management?"
    }
  ];

  const discoveryChecklist: ChecklistItem[] = [
    { text: "Qualified budget ($2,000+ monthly email spend)" },
    { text: "Confirmed volume (5,000+ emails/month minimum)" },
    { text: "Identified decision makers (RevOps, Sales Ops, VP Sales)" },
    { text: "Understood current pain points (deliverability, setup time, cost)" },
    { text: "Established timeline (when they need solution)" },
    { text: "Agreed on next steps (demo, technical review, pilot)" }
  ];

  const demoChecklist: ChecklistItem[] = [
    { text: "Customized ROI calculation based on their volume" },
    { text: "Tailored package recommendation (50-500+ mailboxes)" },
    { text: "Technical requirements documented" },
    { text: "Security documentation prepared (if enterprise)" },
    { text: "Reference customer contact prepared" },
    { text: "Pilot terms defined with money-back guarantee" }
  ];

  const followUpSequence: FollowUpStep[] = [
    {
      title: "Day 1: Initial Contact Response",
      subject: "Quick question about [Company]'s cold email deliverability",
      goal: "Book discovery call within 24 hours",
      keyPoints: "Address their specific pain point, share relevant case study, propose specific meeting times"
    },
    {
      title: "Day 3: Value-First Follow-up",
      subject: "Free deliverability audit for [Company]",
      goal: "Provide immediate value while maintaining engagement",
      keyPoints: "Offer free domain reputation check, share industry benchmark data, reiterate meeting request"
    },
    {
      title: "Day 7: Social Proof Follow-up",
      subject: "How [Similar Company] increased reply rates 400%",
      goal: "Use social proof to overcome hesitation",
      keyPoints: "Share relevant success story, quantified results, offer 30-day money-back guarantee"
    }
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        Competitive Comparison
      </h1>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 mb-8 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-4">🥊 AzureInfra.email vs Major Competitors</h3>
        <p className="text-gray-700">
          Use this comparison to position against common alternatives your prospects are evaluating.
        </p>
      </div>

      {/* Competitor Comparisons */}
      <div className="space-y-8 mb-10">
        {competitorComparisons.map((comparison, index) => (
          <div key={index}>
            <h2 className="text-blue-700 text-2xl font-bold my-6 border-l-4 border-blue-600 pl-4">
              {comparison.title}
            </h2>
            <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
              <h4 className="text-green-800 font-semibold mb-3">✅ Our Advantages</h4>
              <ul className="space-y-2">
                {comparison.advantages.map((advantage, advIndex) => (
                  <li key={advIndex} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span><strong>{advantage.split(':')[0]}:</strong> {advantage.split(':').slice(1).join(':')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        🎯 Battle Cards for Common Objections
      </h2>

      <div className="space-y-4 mb-10">
        {battleCards.map((card, index) => (
          <div key={index} className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
            <h4 className="text-yellow-800 font-semibold mb-3">"{card.objection}"</h4>
            <p>
              <strong>Response:</strong> "{card.response}"
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        📋 Sales Process Checklist
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="text-blue-600 text-lg font-semibold mb-4">✅ Discovery Call Checklist</h4>
          <ul className="space-y-2">
            {discoveryChecklist.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">☐</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
          <h4 className="text-blue-600 text-lg font-semibold mb-4">✅ Demo/Proposal Preparation</h4>
          <ul className="space-y-2">
            {demoChecklist.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">☐</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        ⚡ Next Steps Framework
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-6">🎯 The Perfect Follow-Up Sequence</h3>
        
        <div className="space-y-6">
          {followUpSequence.map((step, index) => (
            <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
              <h4 className="text-blue-600 text-lg font-semibold mb-3">{step.title}</h4>
              <p className="mb-2"><strong>Email Subject:</strong> "{step.subject}"</p>
              <p className="mb-2"><strong>Goal:</strong> {step.goal}</p>
              <p><strong>Key Points:</strong> {step.keyPoints}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
