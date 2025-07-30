import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/config";

const ComparisonTable = () => {
  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4 text-foreground">
          Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">AzureInfra</span>?
        </h3>
        <p className="text-lg text-muted-foreground">
          Compare our premium infrastructure with alternatives
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <th className="text-left p-4 font-semibold text-gray-700 border-b">Feature</th>
              <th className="text-center p-4 font-semibold text-blue-600 border-b bg-blue-100">
                <div className="flex flex-col items-center">
                  <span className="text-lg">AzureInfra</span>
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full mt-1">Recommended</span>
                </div>
              </th>
              <th className="text-center p-4 font-semibold text-gray-600 border-b">Hypertide</th>
              <th className="text-center p-4 font-semibold text-gray-600 border-b">Superwave</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Cost (setup)</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">Free</span>
              </td>
              <td className="p-4 text-center">$1,500</td>
              <td className="p-4 text-center">$6,000</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Cost (mailboxes)</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">$1.50 each</span>
              </td>
              <td className="p-4 text-center">$0.50 each</td>
              <td className="p-4 text-center">$1.00+ each</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Cost (domains)</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">$15.55 one-time</span>
              </td>
              <td className="p-4 text-center">$186 one-time</td>
              <td className="p-4 text-center">$300+ one-time</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Domains needed</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">2-6 domains</span>
              </td>
              <td className="p-4 text-center">12+ domains</td>
              <td className="p-4 text-center">20+ domains</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Speed to deploy</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">1 hour</span>
              </td>
              <td className="p-4 text-center">5-8 hours</td>
              <td className="p-4 text-center">24+ hours</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Email compliance</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">Auto SPF/DKIM/DMARC</span>
              </td>
              <td className="p-4 text-center">Semi-automated</td>
              <td className="p-4 text-center">Manual setup</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Infra quality</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">Pure Azure Enterprise</span>
              </td>
              <td className="p-4 text-center">Shared Azure (O365)</td>
              <td className="p-4 text-center">Mixed infrastructure</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">IP quality</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">Premium dedicated</span>
              </td>
              <td className="p-4 text-center">Shared pool</td>
              <td className="p-4 text-center">Mixed pool</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Isolation</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">Complete domain isolation</span>
              </td>
              <td className="p-4 text-center">Basic domain separation</td>
              <td className="p-4 text-center">Limited isolation</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Buying domains</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">AI-powered selection</span>
              </td>
              <td className="p-4 text-center">Manual selection</td>
              <td className="p-4 text-center">Manual selection</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Creating users</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">Instant AI automation</span>
              </td>
              <td className="p-4 text-center">Semi-automated</td>
              <td className="p-4 text-center">Manual process</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-700">Domain redirects</td>
              <td className="p-4 text-center bg-blue-50">
                <span className="text-green-600 font-bold">✓ Full redirect support</span>
              </td>
              <td className="p-4 text-center">
                <span className="text-red-500">✗ Not available</span>
              </td>
              <td className="p-4 text-center">
                <span className="text-red-500">✗ Not available</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="text-center mt-8">
        <a
          href={siteConfig.contact.calendly}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Get Started with AzureInfra
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-sm text-muted-foreground mt-2">30-day money-back guarantee • No setup fees</p>
      </div>
    </div>
  );
};

export default ComparisonTable;
