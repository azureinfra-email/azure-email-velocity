import { ArrowRight, DollarSign, Package, Globe, Clock, Shield, Server, Cpu, Network, Bot, Users, Route } from "lucide-react";
import { siteConfig } from "@/config/config";

// Comparison data structure
const comparisonData = {
  title: "Why Choose AzureInfra?",
  subtitle: "Compare our premium infrastructure with alternatives",
  providers: {
    azureinfra: {
      name: "AzureInfra",
      recommended: true,
      highlight: "Recommended"
    },
    hypertide: {
      name: "Hypertide",
      recommended: false
    },
    superwave: {
      name: "Superwave", 
      recommended: false
    }
  },
  features: [
    {
      category: "Cost (setup)",
      icon: DollarSign,
      azureinfra: { value: "Free", highlight: true },
      hypertide: { value: "$1,500", highlight: false },
      superwave: { value: "$6,000", highlight: false }
    },
    {
      category: "Cost (mailboxes)",
      icon: Package,
      azureinfra: { value: "$1.50 each", highlight: true },
      hypertide: { value: "$0.50 each", highlight: false },
      superwave: { value: "$1.00+ each", highlight: false }
    },
    {
      category: "Cost (domains)",
      icon: Globe,
      azureinfra: { value: "$15.55 one-time", highlight: true },
      hypertide: { value: "$186 one-time", highlight: false },
      superwave: { value: "$300+ one-time", highlight: false }
    },
    {
      category: "Domains needed",
      icon: Network,
      azureinfra: { value: "2-6 domains", highlight: true },
      hypertide: { value: "12+ domains", highlight: false },
      superwave: { value: "20+ domains", highlight: false }
    },
    {
      category: "Speed to deploy",
      icon: Clock,
      azureinfra: { value: "1 hour", highlight: true },
      hypertide: { value: "5-8 hours", highlight: false },
      superwave: { value: "24+ hours", highlight: false }
    },
    {
      category: "Email compliance",
      icon: Shield,
      azureinfra: { value: "Auto SPF/DKIM/DMARC", highlight: true },
      hypertide: { value: "Semi-automated", highlight: false },
      superwave: { value: "Manual setup", highlight: false }
    },
    {
      category: "Infra quality",
      icon: Server,
      azureinfra: { value: "Pure Azure Enterprise", highlight: true },
      hypertide: { value: "Shared Azure (O365)", highlight: false },
      superwave: { value: "Mixed infrastructure", highlight: false }
    },
    {
      category: "IP quality",
      icon: Cpu,
      azureinfra: { value: "Premium dedicated", highlight: true },
      hypertide: { value: "Shared pool", highlight: false },
      superwave: { value: "Mixed pool", highlight: false }
    },
    {
      category: "Isolation",
      icon: Shield,
      azureinfra: { value: "Complete domain isolation", highlight: true },
      hypertide: { value: "Basic domain separation", highlight: false },
      superwave: { value: "Limited isolation", highlight: false }
    },
    {
      category: "Buying domains",
      icon: Bot,
      azureinfra: { value: "AI-powered selection", highlight: true },
      hypertide: { value: "Manual selection", highlight: false },
      superwave: { value: "Manual selection", highlight: false }
    },
    {
      category: "Creating users",
      icon: Users,
      azureinfra: { value: "Instant AI automation", highlight: true },
      hypertide: { value: "Semi-automated", highlight: false },
      superwave: { value: "Manual process", highlight: false }
    },
    {
      category: "Domain redirects",
      icon: Route,
      azureinfra: { value: "✓ Full redirect support", highlight: true },
      hypertide: { value: "✗ Not available", highlight: false, negative: true },
      superwave: { value: "✗ Not available", highlight: false, negative: true }
    }
  ],
  cta: {
    text: "Get Started with AzureInfra",
    subtitle: "30-day money-back guarantee • No setup fees"
  }
};

const ComparisonTable = () => {
  return (
    <div className="mt-16" id="comparison">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-foreground">
          {comparisonData.title.split(' ').slice(0, 2).join(' ')} <span className="bg-gradient-primary bg-clip-text text-transparent">{comparisonData.title.split(' ').slice(2).join(' ')}</span>
        </h3>
        <p className="text-lg text-muted-foreground">
          {comparisonData.subtitle}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <th className="text-left p-4 font-semibold text-gray-700 border-b">Feature</th>
              <th className="text-center p-4 font-semibold text-blue-600 border-b bg-blue-100">
                <div className="flex flex-col items-center">
                  <span className="text-lg">{comparisonData.providers.azureinfra.name}</span>
                  {comparisonData.providers.azureinfra.recommended && (
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full mt-1">
                      {comparisonData.providers.azureinfra.highlight}
                    </span>
                  )}
                </div>
              </th>
              <th className="text-center p-4 font-semibold text-gray-600 border-b">{comparisonData.providers.hypertide.name}</th>
              <th className="text-center p-4 font-semibold text-gray-600 border-b">{comparisonData.providers.superwave.name}</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <tr key={index} className={`${index < comparisonData.features.length - 1 ? 'border-b' : ''} hover:bg-gray-50`}>
                  <td className="p-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      {feature.category}
                    </div>
                  </td>
                  <td className="p-4 text-center bg-blue-50">
                    <span className={`${feature.azureinfra.highlight ? 'text-green-600 font-bold' : ''}`}>
                      {feature.azureinfra.value}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`${feature.hypertide.negative ? 'text-red-500' : ''}`}>
                      {feature.hypertide.value}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`${feature.superwave.negative ? 'text-red-500' : ''}`}>
                      {feature.superwave.value}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="text-center mt-8">
        <a
          href={siteConfig.links.start}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {comparisonData.cta.text}
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-sm text-muted-foreground mt-2">{comparisonData.cta.subtitle}</p>
      </div>
    </div>
  );
};

export default ComparisonTable;
