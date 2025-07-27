import React from 'react';

export const SalesBrochureHeader: React.FC = () => {
  const metrics = [
    { value: "99.9%", label: "Inbox Rate" },
    { value: "3 Hours", label: "Setup Time" },
    { value: "$1.50", label: "Per Mailbox" },
    { value: "10K+", label: "Daily Emails" }
  ];

  const features = [
    {
      icon: "🚀",
      title: "Rapid Deployment",
      description: "Mailboxes ready in 3 hours vs 5-8 hours with competitors"
    },
    {
      icon: "🛡️",
      title: "Dedicated Infrastructure",
      description: "Complete domain isolation on premium Azure infrastructure"
    },
    {
      icon: "📧",
      title: "Enterprise Outlook 365",
      description: "Full Microsoft infrastructure with Exchange Online compatibility"
    },
    {
      icon: "⚙️",
      title: "Zero Technical Setup",
      description: "SPF, DKIM, DMARC automatically configured and maintained"
    }
  ];

  return (
    <div className="bg-white">
      {/* Header with brand */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-16 px-10 text-center">
        <div className="text-4xl font-bold mb-3">AzureInfra.email</div>
        <div className="text-xl opacity-90 mb-5">Premium B2B Email Infrastructure for RevOps Teams</div>
        <div className="text-base opacity-80">Enterprise-Grade Cold Email Deliverability on Microsoft Azure</div>
      </div>

      <div className="p-10">
        {/* Main heading */}
        <h1 className="text-blue-600 text-4xl font-bold mb-8 border-b-4 border-blue-600 pb-3">
          Transform Your Cold Email Performance
        </h1>

        {/* What we do */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-6 mb-8 rounded">
          <h3 className="text-blue-600 text-xl font-semibold mb-4">🎯 What We Do</h3>
          <p className="text-gray-700">
            We provide premium Azure-powered email infrastructure specifically designed for B2B RevOps teams 
            who need guaranteed inbox delivery for their cold email campaigns. Our service ensures your emails 
            reach decision-makers, not spam folders.
          </p>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-blue-600 text-white px-6 py-4 rounded-lg text-center min-w-[120px]">
              <div className="text-2xl font-bold block">{metric.value}</div>
              <div className="text-sm opacity-90">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Why RevOps Teams Choose Us */}
        <h2 className="text-blue-700 text-2xl font-bold my-10 border-l-4 border-blue-600 pl-4">
          Why RevOps Teams Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg text-center shadow-sm">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
