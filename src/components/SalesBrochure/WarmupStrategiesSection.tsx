import React from 'react';

interface WarmupPhase {
  title: string;
  activities: string[];
}

interface WarmupTactic {
  title: string;
  description: string;
  example: string;
}

export const WarmupStrategiesSection: React.FC = () => {
  const warmupPhases: WarmupPhase[] = [
    {
      title: "Week 1-2: Foundation Building",
      activities: [
        "Start with 10-20 emails per day per mailbox",
        "Focus on internal team communications to build positive engagement",
        "Send emails to warm contacts who will open and reply",
        "Use conversational, non-sales content in initial emails",
        "Maintain 80%+ open rates during this phase"
      ]
    },
    {
      title: "Week 3-4: Gradual Volume Increase",
      activities: [
        "Increase to 30-50 emails per day per mailbox",
        "Introduce prospects from high-quality lists",
        "Mix of replies, forwards, and organic engagement",
        "Start A/B testing subject lines and content",
        "Monitor deliverability metrics daily"
      ]
    },
    {
      title: "Week 5+: Full Campaign Launch",
      activities: [
        "Scale to 80-150 emails per day per mailbox",
        "Launch full cold outreach campaigns",
        "Maintain engagement through sequence optimization",
        "Regular list cleaning and hygiene"
      ]
    }
  ];

  const advancedTactics: WarmupTactic[] = [
    {
      title: "🎯 The \"Conversation Starter\" Method",
      description: "Begin each new domain with industry-relevant questions or insights that naturally generate replies. This builds positive engagement signals before sales pitches.",
      example: "Quick question about [industry trend] - seeing this impact at [company]?"
    },
    {
      title: "📊 The \"Data-Driven\" Approach", 
      description: "Share relevant industry data or insights that provide value upfront. This positions your emails as informative rather than purely promotional.",
      example: "Thought you'd find this [industry report] interesting given [company's recent news]"
    },
    {
      title: "🤝 The \"Warm Introduction\" Strategy",
      description: "Leverage mutual connections, shared experiences, or common interests to create natural conversation starters.",
      example: "Saw your comment on [LinkedIn post] - had similar experience at [previous company]"
    }
  ];

  const keyMetrics = [
    { metric: "Delivery Rate", target: "99%+", description: "(emails successfully delivered)" },
    { metric: "Open Rate", target: "40%+", description: "for cold campaigns" },
    { metric: "Reply Rate", target: "3-8%", description: "depending on industry" },
    { metric: "Spam Complaints", target: "under 0.1%", description: "" },
    { metric: "Bounce Rate", target: "under 2%", description: "" }
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        Proven Email Warmup Strategies
      </h1>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 mb-8 rounded">
        <h3 className="text-blue-600 text-xl font-semibold mb-4">🔥 The AzureInfra Warmup Advantage</h3>
        <p className="text-gray-700">
          While our infrastructure provides the foundation for high deliverability, these proven warmup strategies 
          will maximize your inbox rates and campaign performance.
        </p>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        Pre-Launch Warmup Protocol
      </h2>

      <div className="space-y-4 mb-10">
        {warmupPhases.map((phase, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-blue-600 text-lg font-semibold mb-4">{phase.title}</h4>
            <ul className="space-y-2">
              {phase.activities.map((activity, activityIndex) => (
                <li key={activityIndex} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>{activity.split(' ')[0]} {activity.split(' ')[1]}</strong> {activity.split(' ').slice(2).join(' ')}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        Advanced Warmup Tactics
      </h2>

      <div className="space-y-4 mb-10">
        {advancedTactics.map((tactic, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-blue-600 text-lg font-semibold mb-3">{tactic.title}</h4>
            <p className="text-gray-700 mb-3">{tactic.description}</p>
            <p className="text-sm bg-gray-50 p-3 rounded border-l-4 border-blue-300">
              <strong>Example:</strong> "{tactic.example}"
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        Monitoring & Optimization
      </h2>

      <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
        <h4 className="text-yellow-800 font-semibold mb-4">📈 Key Metrics to Track Daily</h4>
        <ul className="space-y-2">
          {keyMetrics.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>
                <strong>{item.metric}:</strong> Target {item.target} {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
