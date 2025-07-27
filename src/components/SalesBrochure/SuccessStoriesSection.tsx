import React from 'react';

interface SuccessStory {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  quote: {
    text: string;
    author: string;
  };
}

export const SuccessStoriesSection: React.FC = () => {
  const successStories: SuccessStory[] = [
    {
      title: "🚀 SaaS Startup: 400% Increase in Reply Rates",
      challenge: "Fast-growing B2B SaaS company with 8 SDRs was struggling with 15% inbox delivery using a shared email service. Their cold outreach was generating minimal pipeline.",
      solution: "Migrated to our dedicated Azure infrastructure with 80 mailboxes across 8 domains. Complete setup in 3 hours with automatic authentication configuration.",
      results: [
        "Inbox delivery improved from 15% to 99%",
        "Reply rates increased from 2% to 8%",
        "Monthly pipeline generation increased by $180K",
        "ROI: 12x within first quarter"
      ],
      quote: {
        text: "AzureInfra.email transformed our outbound program. We went from barely getting responses to having our SDRs exceed quota every month.",
        author: "author: provided upon request"
      }
    },
    {
      title: "💼 Marketing Agency: Reduced Client Churn by 60%",
      challenge: "Digital marketing agency managing cold email campaigns for 12 B2B clients was losing accounts due to poor deliverability and slow setup times.",
      solution: "Implemented our enterprise solution with 200 mailboxes across 24 domains, one setup per client with complete isolation.",
      results: [
        "Client setup time reduced from 2 weeks to 3 hours",
        "Average client inbox rate: 96%",
        "Client churn reduced by 60%",
        "Agency revenue increased by $50K/month"
      ],
      quote: {
        text: "Our clients now see immediate results. The 3-hour setup time means we can onboard new clients the same day they sign.",
        author: "author: provided upon request"
      }
    },
    {
      title: "🏢 Enterprise: Scaled Outbound Team 3x Without Infrastructure Issues",
      challenge: "Fortune 500 company needed to rapidly scale their outbound sales team from 15 to 45 SDRs while maintaining strict compliance and deliverability standards.",
      solution: "Deployed 450 mailboxes across 45 domains with our enterprise package, including dedicated IP ranges and priority support.",
      results: [
        "Scaled team 3x without any deliverability issues",
        "Maintained 97% inbox delivery across all domains",
        "Zero technical issues during rapid scaling",
        "Saved $120K annually vs enterprise competitors"
      ],
      quote: {
        text: "The reliability and scalability of AzureInfra.email allowed us to focus on hiring and training, not technical infrastructure.",
        author: "author: provided upon request"
      }
    }
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        Customer Success Stories
      </h1>

      <div className="space-y-8">
        {successStories.map((story, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-lg relative">
            {/* Quote decoration */}
            <div className="absolute top-0 left-5 text-6xl text-blue-600 opacity-30 leading-none">"</div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4 pt-4">{story.title}</h3>
            
            <div className="space-y-4">
              <p><strong>Challenge:</strong> {story.challenge}</p>
              
              <p><strong>Solution:</strong> {story.solution}</p>
              
              <div>
                <p className="font-semibold mb-2">Results:</p>
                <ul className="space-y-1 ml-4">
                  {story.results.map((result, resultIndex) => (
                    <li key={resultIndex} className="flex items-start">
                      <span className="text-green-600 mr-2">✅</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <blockquote className="italic text-gray-700 border-l-4 border-blue-600 pl-4 mt-4">
                "{story.quote.text}" - {story.quote.author}
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
