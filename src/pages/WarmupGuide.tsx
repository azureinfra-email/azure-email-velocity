import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GetStartedButton from "@/components/ui/GetStartedButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { 
  ThermometerSun, 
  Clock, 
  Users, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Mail,
  Target,
  Zap,
  BookOpen,
  ArrowRight,
  BarChart3
} from "lucide-react";
import { siteConfig } from "@/config/config";
import WarmupCalculator from "@/components/WarmupCalculator";

const WarmupGuide = () => {
  const warmupSteps = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Week 1-2: Foundation",
      description: "Start with 5-10 emails per day per mailbox",
      details: [
        "Send to engaged contacts first",
        "Use personal, non-promotional content",
        "Focus on building sender reputation",
        "Monitor bounce rates (<2%)"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Week 3-4: Gradual Increase",
      description: "Scale to 20-30 emails per day per mailbox",
      details: [
        "Increase volume by 25% weekly",
        "Maintain high engagement rates",
        "Monitor spam folder placement",
        "Adjust sending patterns based on metrics"
      ]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Week 5-8: Optimization",
      description: "Reach 50-100+ emails per day per mailbox",
      details: [
        "Fine-tune sending times and frequency",
        "A/B test subject lines and content",
        "Segment lists for better targeting",
        "Maintain consistent engagement"
      ]
    }
  ];

  const criticalFactors = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "List Quality",
      description: "Clean, verified, and engaged recipients",
      impact: "70% of deliverability success",
      tips: [
        "Use double opt-in when possible",
        "Remove hard bounces immediately",
        "Segment by engagement levels",
        "Regularly clean inactive contacts"
      ]
    },
    {
      icon: <ThermometerSun className="w-6 h-6 text-orange-600" />,
      title: "Proper Warmup Period",
      description: "Gradual volume increase over 6-8 weeks",
      impact: "60% of reputation building",
      tips: [
        "Follow the 25% weekly increase rule",
        "Monitor sender reputation daily",
        "Use multiple domains strategically",
        "Don't rush the process"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Content Quality",
      description: "Relevant, personalized, and valuable messages",
      impact: "50% of engagement rates",
      tips: [
        "Avoid spam trigger words",
        "Personalize beyond just first name",
        "Provide clear value proposition",
        "Include proper unsubscribe options"
      ]
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      title: "Sending Patterns",
      description: "Human-like sending behavior and timing",
      impact: "40% of spam detection avoidance",
      tips: [
        "Vary sending times throughout the day",
        "Use random delays between sends",
        "Match business hours of recipients",
        "Avoid bulk sending patterns"
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Sending too much volume too quickly",
      consequence: "Immediate spam folder placement",
      solution: "Follow gradual warmup schedule",
      responsibility: "user",
      category: "Warmup Strategy"
    },
    {
      mistake: "Using purchased or scraped email lists",
      consequence: "High bounce rates and spam complaints",
      solution: "Build your own verified lists",
      responsibility: "user",
      category: "List Management"
    },
    {
      mistake: "Identical content across all emails",
      consequence: "Spam filter detection",
      solution: "Use dynamic content and personalization",
      responsibility: "user",
      category: "Content Strategy"
    },
    {
      mistake: "Ignoring engagement metrics",
      consequence: "Declining sender reputation",
      solution: "Monitor and adjust based on data",
      responsibility: "user",
      category: "Performance Monitoring"
    },
    {
      mistake: "Not setting up proper authentication",
      consequence: "Poor deliverability from day one",
      solution: "Configure SPF, DKIM, and DMARC properly",
      responsibility: "provider",
      category: "Technical Setup"
    },
    {
      mistake: "Using shared IP addresses",
      consequence: "Reputation affected by other users",
      solution: "Use dedicated IP infrastructure",
      responsibility: "provider",
      category: "Infrastructure"
    },
    {
      mistake: "Poor email server configuration",
      consequence: "Technical deliverability issues",
      solution: "Professional infrastructure management",
      responsibility: "provider",
      category: "Server Management"
    },
    {
      mistake: "Inconsistent domain warming",
      consequence: "Unpredictable delivery performance",
      solution: "Systematic domain reputation building",
      responsibility: "user",
      category: "Domain Strategy"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.warmupGuide.title}
        description={seoConfig.warmupGuide.description}
        keywords={seoConfig.warmupGuide.keywords}
        canonical={seoConfig.warmupGuide.canonical}
        schemaType={seoConfig.warmupGuide.schemaType}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6 border border-blue-200">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Complete Guide</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground">
              Email Warmup &
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Deliverability Guide
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Learn the proven strategies to achieve maximum inbox delivery rates. 
              High deliverability isn't guaranteed - it's earned through proper execution.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Success Factors */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Critical Success Factors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These factors determine 90% of your deliverability success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {criticalFactors.map((factor, index) => (
              <Card key={index} className="bg-card border border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-muted rounded-lg">
                      {factor.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{factor.title}</CardTitle>
                      <p className="text-sm text-primary font-medium">{factor.impact}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{factor.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {factor.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warmup Timeline */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              8-Week Warmup Timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow this proven schedule to build strong sender reputation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {warmupSteps.map((step, index) => (
              <Card key={index} className="bg-card border border-border">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Common Mistakes to Avoid
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Learn from others' failures to protect your sender reputation
            </p>
            
            {/* Responsibility Legend */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">Your Responsibility</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-muted-foreground">We Handle This</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto space-y-6">
            {commonMistakes.map((item, index) => (
              <Card key={index} className="bg-card border border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 items-start">
                    {/* Category and Responsibility Tag */}
                    <div className="md:col-span-1">
                      <div className="flex flex-col gap-2">
                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium w-fit ${
                          item.responsibility === 'user' 
                            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                            : 'bg-green-100 text-green-700 border border-green-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            item.responsibility === 'user' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          {item.responsibility === 'user' ? 'Your Focus' : 'We Handle'}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{item.category}</span>
                      </div>
                    </div>
                    
                    {/* Mistake */}
                    <div className="md:col-span-1">
                      <h3 className="font-semibold text-foreground mb-1">Mistake:</h3>
                      <p className="text-sm text-muted-foreground">{item.mistake}</p>
                    </div>
                    
                    {/* Consequence */}
                    <div className="md:col-span-1">
                      <h3 className="font-semibold text-red-600 mb-1">Consequence:</h3>
                      <p className="text-sm text-muted-foreground">{item.consequence}</p>
                    </div>
                    
                    {/* Solution */}
                    <div className="md:col-span-1">
                      <h3 className={`font-semibold mb-1 ${
                        item.responsibility === 'user' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {item.responsibility === 'user' ? 'Your Action:' : 'Our Solution:'}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <Card className="bg-blue-50 border border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Your Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Follow proper warmup timeline (8+ weeks)</li>
                  <li>• Build and maintain clean email lists</li>
                  <li>• Create engaging, personalized content</li>
                  <li>• Monitor metrics and adjust strategies</li>
                  <li>• Implement proper domain rotation</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  What We Provide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Auto-configured SPF, DKIM, DMARC</li>
                  <li>• Dedicated IP infrastructure</li>
                  <li>• Professional server management</li>
                  <li>• Azure enterprise-grade reliability</li>
                  <li>• 24/7 technical infrastructure support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Ready to Build Your Email Infrastructure?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We provide the premium infrastructure and technical foundation. You implement the warmup strategy 
              using your preferred sequencer. Together, we'll maximize your deliverability potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GetStartedButton />
              <a href="/warmup-calculator">
                <Button variant="outline" size="lg">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Use Strategy Planner
                </Button>
              </a>
              <a href={siteConfig.contact.calendly} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Discuss Your Strategy
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarmupGuide;
