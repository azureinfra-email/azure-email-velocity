import React from 'react';

interface Objection {
  icon: string;
  title: string;
  response: string;
}

interface QualificationQuestion {
  question: string;
  note: string;
}

interface ClosingTechnique {
  title: string;
  script: string;
}

export const ObjectionHandlingSection: React.FC = () => {
  const objections: Objection[] = [
    {
      icon: "💰",
      title: "Your pricing seems higher than some alternatives",
      response: "You're investing in premium dedicated infrastructure, not shared pools. While our per-mailbox cost is $1.50, our total cost of ownership is often lower because of our $15.55 setup fee vs competitors charging $300+. Plus, our 4x higher deliverability rates mean you need fewer mailboxes to achieve the same results."
    },
    {
      icon: "⏰",
      title: "We need to evaluate other options first",
      response: "I completely understand wanting to do due diligence. What specific criteria are most important to you - setup speed, deliverability rates, or cost? While you're evaluating, remember we offer a 30-day money-back guarantee, so you can test our service risk-free alongside any comparisons."
    },
    {
      icon: "🔧",
      title: "Our current solution is working fine",
      response: "That's great to hear. What inbox delivery rates are you currently seeing? Most teams we work with were getting 60-80% before switching to us and now consistently see 99%+. Even a 20% improvement in deliverability can double your response rates. Would a quick deliverability audit be valuable?"
    },
    {
      icon: "🔒",
      title: "We need to involve IT/Security team first",
      response: "Absolutely, security is crucial. We're built on Microsoft Azure with SOC 2 certification and enterprise-grade security. I can provide our security documentation and schedule a technical call with your IT team. Most security reviews take 2-3 days. Would you like me to send our security brief now?"
    },
    {
      icon: "📊",
      title: "We don't send enough volume to justify this",
      response: "Our minimum is 50 mailboxes, which works for teams sending as few as 5,000 emails per month. At $75/month total cost, you're looking at $0.015 per email vs potential lost revenue from poor deliverability. What's your current monthly send volume?"
    },
    {
      icon: "⚙️",
      title: "This seems too technical for our team",
      response: "That's exactly why our customers love us - zero technical work required. We handle 100% of the setup, authentication, and maintenance. Your team just logs into Outlook and starts sending. No DNS changes, no technical expertise needed. It's designed for RevOps teams, not IT departments."
    }
  ];

  const essentialQuestions: QualificationQuestion[] = [
    { question: "How many emails is your team sending per month?", note: "(Need 5K+ minimum)" },
    { question: "What's your current inbox delivery rate?", note: "(If under 90%, strong opportunity)" },
    { question: "How many people are on your outbound team?", note: "(Size helps determine package)" },
    { question: "What's your current email infrastructure cost?", note: "(Budget qualification)" },
    { question: "How long did your last email setup take?", note: "(Speed advantage positioning)" },
    { question: "Who handles your email authentication?", note: "(Pain point identification)" }
  ];

  const budgetQuestions: QualificationQuestion[] = [
    { question: "What's your monthly budget for email infrastructure?", note: "" },
    { question: "When do you need this implemented?", note: "(Urgency assessment)" },
    { question: "Who else is involved in this decision?", note: "(Decision maker identification)" },
    { question: "What would happen if your deliverability improved by 30%?", note: "(Value realization)" }
  ];

  const closingTechniques: ClosingTechnique[] = [
    {
      title: "🎯 The \"Risk Reversal\" Close",
      script: "Given our 30-day money-back guarantee and 3-hour setup, you can literally be testing our service alongside your current provider tomorrow. What's the downside of running a parallel test?"
    },
    {
      title: "💰 The \"ROI Calculator\" Close",
      script: "Let's do quick math - if we improve your reply rate from 2% to 6% on 10,000 monthly emails, that's 400 extra replies. If just 10% become meetings, that's 40 more sales conversations. What's that worth to your pipeline?"
    },
    {
      title: "⏰ The \"Calendar\" Close",
      script: "I have two setup slots this week - Thursday at 2 PM or Friday at 10 AM. Which works better for your team to get started?"
    }
  ];

  return (
    <div className="p-10">
      <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
        Objection Handling Guide
      </h1>

      <div className="space-y-6 mb-10">
        {objections.map((objection, index) => (
          <div key={index} className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
            <h4 className="text-yellow-800 font-semibold mb-3">
              {objection.icon} "{objection.title}"
            </h4>
            <p>
              <strong>Response:</strong> "{objection.response}"
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        🎯 Qualification Questions for Sales Team
      </h2>

      <div className="bg-green-50 border border-green-200 p-5 mb-4 rounded-lg">
        <h4 className="text-green-800 font-semibold mb-3">Essential Discovery Questions</h4>
        <ul className="space-y-2">
          {essentialQuestions.map((q, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                <strong>"{q.question}"</strong> {q.note}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-green-50 border border-green-200 p-5 mb-10 rounded-lg">
        <h4 className="text-green-800 font-semibold mb-3">Budget & Timeline Questions</h4>
        <ul className="space-y-2">
          {budgetQuestions.map((q, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>
                <strong>"{q.question}"</strong> {q.note}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
        📞 Closing Techniques
      </h2>

      <div className="space-y-4">
        {closingTechniques.map((technique, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 p-6 rounded-lg shadow-sm">
            <h4 className="text-blue-600 text-lg font-semibold mb-3">{technique.title}</h4>
            <p>
              <strong>Script:</strong> "{technique.script}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
