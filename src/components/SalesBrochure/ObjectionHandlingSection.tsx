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

interface FollowUpStrategy {
  scenario: string;
  timing: string;
  message: string;
  goal: string;
}

interface NegotiationTactic {
  situation: string;
  approach: string;
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
    },
    {
      icon: "🏢",
      title: "We're already locked into a contract with our current provider",
      response: "I understand contract commitments. What's your renewal date? Many clients start planning 90 days before renewal since switching takes only 3 hours. In the meantime, we can run a deliverability audit to show exactly what you're missing. When does your current contract expire?"
    },
    {
      icon: "🤝",
      title: "We need to discuss this internally first",
      response: "Of course, this affects your entire outbound strategy. Who else needs to be involved in this conversation? I'd be happy to join your internal discussion or prepare materials for your team. What specific concerns do you think they'll have?"
    },
    {
      icon: "📈",
      title: "We're not sure if this will integrate with our current tools",
      response: "Great question. We integrate seamlessly with all major CRMs and outreach platforms - Salesforce, HubSpot, Outreach, SalesLoft, Apollo, and more. It's just Outlook/Exchange, so it works with everything. What specific tools are you using that you're concerned about?"
    },
    {
      icon: "🎯",
      title: "We've been burned by email providers before",
      response: "I completely understand that concern. What went wrong with your previous provider? Our approach is different - dedicated infrastructure means no shared reputation issues, and our 3-hour setup means you're not investing weeks only to be disappointed. Plus our 30-day guarantee eliminates the risk."
    },
    {
      icon: "📱",
      title: "This sounds too good to be true",
      response: "I appreciate the healthy skepticism. Let me share some specific client results: [Company X] went from 65% to 99% inbox delivery in 48 hours. [Company Y] doubled their reply rates in the first month. I can connect you with similar clients in your industry for references. Would that help?"
    },
    {
      icon: "⚡",
      title: "We need this implemented faster than your timeline",
      response: "We typically complete setup in 3 hours, but I understand urgent needs. What's driving the rush? If you have a critical campaign launching, we can prioritize your setup and potentially have you live within 24 hours. What's your exact deadline?"
    },
    {
      icon: "🔄",
      title: "We just implemented a new email solution",
      response: "How's it performing so far? What inbox delivery rates are you seeing? Sometimes new implementations take time to show their true performance. If you're not seeing 95%+ inbox delivery within 30 days, there might be fundamental infrastructure issues. Would you like a quick audit to benchmark against industry standards?"
    },
    {
      icon: "💼",
      title: "Our legal team needs to review all vendor contracts",
      response: "Absolutely, legal review is important for enterprise decisions. Our standard MSA has been approved by Fortune 500 legal teams. I can send our contract template now to expedite their review. Most legal reviews take 5-7 business days. Should I send it over?"
    },
    {
      icon: "🏃",
      title: "We're too busy to implement something new right now",
      response: "I understand bandwidth constraints. The beauty is that we handle 100% of the implementation - zero work for your team. You literally just give us access and we handle everything. Your team keeps working while we set everything up in the background. What would need to change for this to become a priority?"
    }
  ];

  const essentialQuestions: QualificationQuestion[] = [
    { question: "How many emails is your team sending per month?", note: "(Need 5K+ minimum)" },
    { question: "What's your current inbox delivery rate?", note: "(If under 90%, strong opportunity)" },
    { question: "How many people are on your outbound team?", note: "(Size helps determine package)" },
    { question: "What's your current email infrastructure cost?", note: "(Budget qualification)" },
    { question: "How long did your last email setup take?", note: "(Speed advantage positioning)" },
    { question: "Who handles your email authentication?", note: "(Pain point identification)" },
    { question: "Are you currently using shared or dedicated sending infrastructure?", note: "(Quality differentiation)" },
    { question: "How often do your emails end up in spam folders?", note: "(Deliverability pain point)" },
    { question: "What's the biggest challenge with your current email setup?", note: "(Primary pain identification)" },
    { question: "How many domains are you currently using for outbound?", note: "(Complexity assessment)" },
    { question: "Do you have dedicated IP addresses for sending?", note: "(Infrastructure understanding)" },
    { question: "What CRM and outreach tools are you using?", note: "(Integration requirements)" }
  ];

  const budgetQuestions: QualificationQuestion[] = [
    { question: "What's your monthly budget for email infrastructure?", note: "" },
    { question: "When do you need this implemented?", note: "(Urgency assessment)" },
    { question: "Who else is involved in this decision?", note: "(Decision maker identification)" },
    { question: "What would happen if your deliverability improved by 30%?", note: "(Value realization)" },
    { question: "How much revenue could you attribute to email outreach monthly?", note: "(ROI baseline)" },
    { question: "What's the cost of a missed sales opportunity?", note: "(Risk assessment)" },
    { question: "How much time does your team spend on email setup and maintenance?", note: "(Time cost evaluation)" },
    { question: "What's your average customer lifetime value?", note: "(Investment justification)" },
    { question: "How many leads do you need to generate monthly to hit targets?", note: "(Volume requirements)" },
    { question: "What percentage of your pipeline comes from cold email?", note: "(Channel importance)" }
  ];

  const followUpStrategies: FollowUpStrategy[] = [
    {
      scenario: "Prospect went silent after initial interest",
      timing: "3 days after last contact",
      message: "Hi [Name], just wanted to circle back on our deliverability discussion. I know email infrastructure isn't the most exciting topic, but I've seen teams increase pipeline by 40% just by fixing this one thing. Should we schedule 15 minutes this week?",
      goal: "Re-engage with value focus"
    },
    {
      scenario: "Prospect said 'maybe next quarter'",
      timing: "First week of next quarter",
      message: "Hi [Name], hope your Q[X] is off to a great start! Now that budgets have reset, is this the right time to revisit that email deliverability project we discussed? I have availability this week for a quick setup call.",
      goal: "Capitalize on new budget cycle"
    },
    {
      scenario: "Technical evaluation requested",
      timing: "1 week after sending materials",
      message: "Hi [Name], following up on the technical documentation I sent. Have your IT/security teams had a chance to review? Happy to jump on a call to answer any specific questions they might have.",
      goal: "Move technical review forward"
    },
    {
      scenario: "Price negotiation stalled",
      timing: "2 days after price discussion",
      message: "Hi [Name], I understand budget constraints. Let me check what flexibility I have on pricing for a 12-month commitment. Can we schedule 10 minutes tomorrow to discuss options?",
      goal: "Find pricing compromise"
    },
    {
      scenario: "Competitor evaluation mentioned",
      timing: "1 week after competitive discussion",
      message: "Hi [Name], how's your email provider evaluation going? I'm curious what criteria matter most to your team. Happy to show how we stack up on deliverability, setup time, and total cost.",
      goal: "Competitive positioning"
    }
  ];

  const negotiationTactics: NegotiationTactic[] = [
    {
      situation: "Client wants lower pricing",
      approach: "Volume/term commitment trade-off",
      script: "I understand pricing is a concern. If you can commit to a 12-month term instead of month-to-month, I can get approval for a 15% discount. That brings your cost down to $1.28 per mailbox. Does that work?"
    },
    {
      situation: "Comparing to cheaper alternatives",
      approach: "Total cost of ownership reframe",
      script: "Let's look at total costs: Their $0.50/mailbox + $300 setup + 2 weeks implementation vs our $1.50/mailbox + $15.55 setup + 3-hour implementation. Over 12 months on 100 mailboxes, we're actually $2,400 less expensive."
    },
    {
      situation: "Wants to start with fewer mailboxes",
      approach: "Gradual expansion pathway",
      script: "I understand wanting to start small. While our minimum is 50 mailboxes, what if we structure it as 50 now with guaranteed pricing for expansion to 100 within 6 months? That gives you room to grow without repricing."
    },
    {
      situation: "Needs approval from higher-ups",
      approach: "Executive summary support",
      script: "I'll prepare a one-page executive summary highlighting the ROI, risk mitigation, and competitive advantage. What specific metrics would resonate most with your CEO/CFO - cost savings, productivity gains, or revenue impact?"
    },
    {
      situation: "Contract terms concerns",
      approach: "Flexible terms offering",
      script: "What specific contract terms are concerning? We can adjust payment terms, add performance guarantees, or include early termination clauses. My goal is making this a no-brainer decision for your team."
    }
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
    },
    {
      title: "🔥 The \"Urgency\" Close",
      script: "Your competitors are already using dedicated infrastructure to reach the same prospects. Every day you wait, they're landing in inboxes while you're hitting spam folders. How much pipeline can you afford to lose this month?"
    },
    {
      title: "🎁 The \"Bonus\" Close",
      script: "If we can get you set up this week, I'll include our premium deliverability monitoring dashboard at no extra cost. That's a $500 value. Should we schedule your setup for tomorrow?"
    },
    {
      title: "📊 The \"Comparison\" Close",
      script: "You mentioned [competitor] charges $3 per mailbox. At $1.50, you're saving $75 monthly on 50 mailboxes while getting 4x better deliverability. That's $900 annual savings plus better results. Makes sense to switch, right?"
    },
    {
      title: "🤔 The \"What If\" Close",
      script: "What if I told you that six months from now, you could be sending 50% fewer emails but getting 3x more responses? Would that change how you think about email infrastructure investment?"
    },
    {
      title: "⚡ The \"Takeaway\" Close",
      script: "You know what, maybe this isn't the right fit. It sounds like you're happy with 70% deliverability and don't mind the setup complexity. Should we revisit this when your current contract expires?"
    },
    {
      title: "🎪 The \"Demonstration\" Close",
      script: "I can set up a single test mailbox in the next hour and show you live deliverability results. No commitment, just proof. Are you free for 15 minutes this afternoon to see the difference?"
    },
    {
      title: "💡 The \"Insight\" Close",
      script: "Here's what I've learned from 200+ implementations: teams that switch in Q1 see 40% better annual results because they optimize their entire year's outreach. What quarter are we in now?"
    },
    {
      title: "🏆 The \"Champion\" Close",
      script: "I can already see you presenting this win to your team - '99% inbox delivery, 3-hour setup, 30-day guarantee.' What would make you look like the hero who solved email deliverability?"
    },
    {
      title: "🔮 The \"Future Pacing\" Close",
      script: "Imagine it's three months from now. Your SDRs are hitting quota, your response rates doubled, and you haven't thought about email deliverability once. What needs to happen today to make that reality?"
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

      <h2 className="text-blue-700 text-2xl font-bold mt-10 mb-6 border-l-4 border-blue-600 pl-4">
        🔄 Follow-Up Strategies
      </h2>

      <div className="space-y-4 mb-10">
        {followUpStrategies.map((strategy, index) => (
          <div key={index} className="bg-purple-50 border border-purple-200 p-5 rounded-lg">
            <h4 className="text-purple-800 font-semibold mb-2">
              📧 {strategy.scenario}
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-purple-700">Timing:</strong> {strategy.timing}
              </div>
              <div>
                <strong className="text-purple-700">Goal:</strong> {strategy.goal}
              </div>
            </div>
            <div className="mt-3">
              <strong className="text-purple-700">Message:</strong>
              <p className="italic mt-1 text-gray-700">"{strategy.message}"</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-blue-700 text-2xl font-bold mt-10 mb-6 border-l-4 border-blue-600 pl-4">
        💼 Negotiation Tactics
      </h2>

      <div className="space-y-4">
        {negotiationTactics.map((tactic, index) => (
          <div key={index} className="bg-orange-50 border border-orange-200 p-5 rounded-lg">
            <h4 className="text-orange-800 font-semibold mb-2">
              🤝 {tactic.situation}
            </h4>
            <div className="mb-3">
              <strong className="text-orange-700">Approach:</strong> {tactic.approach}
            </div>
            <div>
              <strong className="text-orange-700">Script:</strong>
              <p className="italic mt-1 text-gray-700">"{tactic.script}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
