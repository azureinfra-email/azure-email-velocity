import React from 'react';

export const ICPSection: React.FC = () => {
  const companyTypes = [
    {
      type: "Mid-market to Enterprise B2B companies ($10M+ ARR)",
      examples: [
        "Software companies like HubSpot, Salesforce partners, or HR tech platforms",
        "Manufacturing companies selling to other businesses (industrial equipment, supplies)",
        "Professional services firms (consulting, accounting, legal services)",
        "Financial services targeting business clients (fintech, banking, insurance)"
      ]
    },
    {
      type: "High-growth SaaS companies scaling outbound efforts",
      examples: [
        "Series A-C startups expanding beyond product-market fit",
        "Companies transitioning from inbound to outbound sales motions",
        "SaaS platforms adding new market segments or verticals",
        "Companies that just raised funding and need to scale sales quickly"
      ]
    },
    {
      type: "Sales Development teams with 5+ SDRs",
      examples: [
        "Teams sending 500+ cold emails per SDR per day",
        "Organizations with dedicated outbound sales development roles",
        "Companies with separate prospecting and closing functions",
        "Teams that have outgrown basic email tools like Gmail or Outlook"
      ]
    },
    {
      type: "Marketing agencies managing client cold email campaigns",
      examples: [
        "Digital marketing agencies offering lead generation services",
        "B2B marketing consultancies running outbound campaigns",
        "Growth agencies specializing in outbound sales development",
        "Agencies managing multiple client domains and need isolation"
      ]
    }
  ];

  const decisionMakers = [
    {
      title: "RevOps Directors/VPs",
      description: "Budget owners seeking infrastructure solutions",
      details: "Responsible for sales operations, tech stack decisions, and pipeline efficiency. Usually have $50K+ annual budget for sales tools.",
      painPoints: ["Unreliable email deliverability affecting pipeline", "Complex tech stack integrations", "Need for scalable infrastructure"]
    },
    {
      title: "Sales Development Leaders", 
      description: "Need reliable email delivery for team quotas",
      details: "Manage teams of 5-50 SDRs with aggressive outbound targets. Success measured by meetings booked and pipeline generated.",
      painPoints: ["SDR productivity blocked by poor deliverability", "Long ramp times for new domains", "Inconsistent results across team"]
    },
    {
      title: "Marketing Operations Managers",
      description: "Responsible for email deliverability and reputation",
      details: "Own email infrastructure, domain management, and campaign performance. Often technical background with marketing focus.",
      painPoints: ["Domain reputation management", "Complex DNS configurations", "Compliance and security requirements"]
    },
    {
      title: "Growth Team Leaders",
      description: "Focus on scalable acquisition channels",
      details: "Data-driven leaders optimizing customer acquisition costs across channels. Cold email is a key growth lever.",
      painPoints: ["Channel performance inconsistency", "Scaling challenges", "CAC optimization across channels"]
    }
  ];

  const challenges = [
    {
      challenge: "Low inbox delivery rates with current email providers",
      details: "Seeing 40-70% delivery rates instead of 95%+",
      examples: ["Emails going to promotions tab", "High bounce rates", "Domain reputation issues"]
    },
    {
      challenge: "Emails landing in spam folders reducing response rates",
      details: "Poor sender reputation causing deliverability issues",
      examples: ["Zero replies from campaigns", "Spam folder placement", "Domain blacklisting"]
    },
    {
      challenge: "Long setup times delaying campaign launches",
      details: "Weeks to months to get new domains properly configured",
      examples: ["DNS configuration delays", "IP warmup taking too long", "Technical setup complexity"]
    },
    {
      challenge: "Shared infrastructure affecting sender reputation",
      details: "Other users' bad practices hurting your deliverability",
      examples: ["Shared IP reputation damage", "Domain pool contamination", "No isolation control"]
    },
    {
      challenge: "High costs for premium email services",
      details: "Paying $5-15+ per mailbox with enterprise providers",
      examples: ["Expensive enterprise packages", "Hidden setup fees", "Volume-based pricing tiers"]
    },
    {
      challenge: "Technical complexity in email authentication setup", 
      details: "Struggling with SPF, DKIM, DMARC configuration",
      examples: ["DNS record management", "Authentication failures", "Technical team dependencies"]
    }
  ];

  const buyingSignals = [
    {
      signal: "Our cold email open rates have dropped significantly",
      context: "Usually indicates deliverability issues or domain reputation problems",
      followUp: "Ask: What were your open rates before vs now? What changed?"
    },
    {
      signal: "We're spending too much time warming up domains",
      context: "Manual warmup processes are time-consuming and inconsistent",
      followUp: "Ask: How long does your current warmup process take?"
    },
    {
      signal: "Our current provider's deliverability is inconsistent",
      context: "Shared infrastructure causing unpredictable results",
      followUp: "Ask: What's your current average inbox delivery rate?"
    },
    {
      signal: "We need to scale our outbound team quickly",
      context: "Growth pressure requiring rapid email infrastructure scaling",
      followUp: "Ask: How many new SDRs are you planning to hire?"
    },
    {
      signal: "Our emails keep getting flagged as spam",
      context: "Clear deliverability crisis requiring immediate solution",
      followUp: "Ask: What percentage of your emails are landing in spam?"
    }
  ];

  const volumeIndicators = [
    {
      indicator: "Minimum 50 mailboxes needed (our minimum order)",
      details: "Teams this size typically send 25K+ emails per month",
      qualification: "Perfect fit for our pricing model and infrastructure"
    },
    {
      indicator: "Sending 1,000+ emails per day across the team",
      details: "High-volume senders who need reliable infrastructure",
      qualification: "Strong ROI on premium deliverability improvements"
    },
    {
      indicator: "Budget of $2,000+/month for email infrastructure",
      details: "Serious about email as a channel, not looking for cheap solutions",
      qualification: "Budget aligns with our value proposition"
    },
    {
      indicator: "Currently using multiple domains for email campaigns",
      details: "Sophisticated setup indicating email channel maturity",
      qualification: "Understands domain management and isolation benefits"
    }
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
        <div className="space-y-6">
          {companyTypes.map((company, index) => (
            <div key={index}>
              <div className="flex items-start mb-3">
                <span className="text-blue-600 mr-2">•</span>
                <span className="font-semibold text-gray-800">{company.type}</span>
              </div>
              <div className="ml-4 space-y-1">
                {company.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">→</span>
                    <span className="text-gray-600 text-sm italic">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Decision Makers */}
      <div className="bg-white border-2 border-gray-200 p-6 mb-4 rounded-lg shadow-sm">
        <h4 className="text-blue-600 text-lg font-semibold mb-4">👥 Key Decision Makers</h4>
        <div className="space-y-6">
          {decisionMakers.map((maker, index) => (
            <div key={index}>
              <div className="flex items-start mb-2">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <span className="font-semibold text-gray-800">{maker.title}</span>
                  <span className="text-gray-600"> - {maker.description}</span>
                </div>
              </div>
              <div className="ml-4 mb-3">
                <p className="text-gray-600 text-sm mb-2">{maker.details}</p>
                <div className="bg-red-50 border border-red-200 p-2 rounded">
                  <p className="text-red-800 text-xs font-semibold mb-1">Key Pain Points:</p>
                  <ul className="space-y-1">
                    {maker.painPoints.map((pain, painIndex) => (
                      <li key={painIndex} className="text-red-700 text-xs flex items-start">
                        <span className="mr-1">→</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Challenges */}
      <div className="bg-white border-2 border-gray-200 p-6 mb-8 rounded-lg shadow-sm">
        <h4 className="text-blue-600 text-lg font-semibold mb-4">💼 Current Challenges They Face</h4>
        <div className="space-y-6">
          {challenges.map((item, index) => (
            <div key={index}>
              <div className="flex items-start mb-2">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <span className="font-semibold text-gray-800">{item.challenge}</span>
                  <p className="text-gray-600 text-sm mt-1">{item.details}</p>
                </div>
              </div>
              <div className="ml-4">
                <div className="bg-orange-50 border border-orange-200 p-2 rounded">
                  <p className="text-orange-800 text-xs font-semibold mb-1">Common Symptoms:</p>
                  <ul className="space-y-1">
                    {item.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="text-orange-700 text-xs flex items-start">
                        <span className="mr-1">→</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        Buying Signals to Look For
      </h2>

      {/* Strong Buying Signals */}
      <div className="bg-yellow-50 border border-yellow-200 p-5 mb-5 rounded-lg">
        <h4 className="text-yellow-800 font-semibold mb-3">🟢 Strong Buying Signals</h4>
        <div className="space-y-4">
          {buyingSignals.map((item, index) => (
            <div key={index} className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
              <div className="italic text-lg text-yellow-800">"{item.signal}"</div>
              <div className="text-sm text-gray-600 mt-1">Context: {item.context}</div>
              <div className="text-sm text-blue-600 mt-1">{item.followUp}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Volume & Budget Indicators */}
      <div className="bg-green-50 border border-green-200 p-5 rounded-lg">
        <h4 className="text-green-800 font-semibold mb-3">🎯 Volume & Budget Indicators</h4>
        <div className="space-y-4">
          {volumeIndicators.map((item, index) => (
            <div key={index} className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
              <div className="font-semibold text-green-800">{item.indicator}</div>
              <div className="text-sm text-gray-600 mt-1">Details: {item.details}</div>
              <div className="text-sm text-blue-600 mt-1">Why it matters: {item.qualification}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
