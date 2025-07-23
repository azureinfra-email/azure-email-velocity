import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  AtSign, 
  Globe, 
  UserCircle, 
  ArrowRight,
  Zap,
  Target,
  Users,
  MessageSquare,
  CheckCircle,
  Shield,
  Calendar,
  Link as LinkIcon,
  BarChart3,
  Signature,
  TestTube2,
  Clock,
  Wand2,
  Eye
} from "lucide-react";
import SEO from "@/components/SEO";

const ToolsPage = () => {
  const location = useLocation();

  // Handle hash-based navigation
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
    }
  }, [location]);

  const tools = [
    {
      title: "Username Generator",
      description: "Generate professional email usernames with advanced customization options. Perfect for cold email campaigns and account creation.",
      icon: AtSign,
      color: "blue",
      link: "/tools/username-generator",
      features: ["50+ Username variations", "Length & style controls", "Professional prefixes/suffixes", "Bulk export options"],
      category: "Email Setup"
    },
    {
      title: "Domain Generator",
      description: "Create domain name suggestions with smart categorization and availability checking integration.",
      icon: Globe,
      color: "green", 
      link: "/tools/domain-generator",
      features: ["Multiple domain types", "Extension filtering", "Availability checking", "Business-focused suggestions"],
      category: "Infrastructure"
    },
    {
      title: "Person Generator",
      description: "Generate realistic person profiles with names, emails, and professional details for testing and demos.",
      icon: UserCircle,
      color: "purple",
      link: "/tools/person-generator", 
      features: ["Realistic name combinations", "Professional job titles", "International diversity", "CSV export"],
      category: "Testing & Demo"
    },
    {
      title: "Subject Line Generator",
      description: "Create compelling subject lines with psychology triggers, A/B testing variations, and spam score analysis.",
      icon: MessageSquare,
      color: "orange",
      link: "/tools/subject-line-generator",
      features: ["Psychology triggers", "Industry targeting", "A/B test variations", "Spam score analysis"],
      category: "Content Creation"
    },
    {
      title: "Email Validator",
      description: "Validate email addresses with comprehensive syntax, domain, and deliverability checking.",
      icon: CheckCircle,
      color: "emerald",
      link: "/tools/email-validator",
      features: ["Syntax validation", "Domain verification", "MX record checking", "Bulk processing"],
      category: "Validation"
    },
    {
      title: "Spam Analyzer",
      description: "Analyze email content for spam triggers and get detailed recommendations to improve deliverability.",
      icon: Shield,
      color: "red",
      link: "/tools/spam-analyzer",
      features: ["Content analysis", "Spam scoring", "Detailed feedback", "Improvement suggestions"],
      category: "Deliverability"
    },
    {
      title: "Sequence Planner",
      description: "Plan multi-touch email sequences with strategic timing, personalized messaging, and proven frameworks.",
      icon: Calendar,
      color: "indigo",
      link: "/tools/sequence-planner",
      features: ["Multi-touch strategy", "Strategic timing", "Personalized content", "Industry templates"],
      category: "Campaign Planning"
    },
    {
      title: "UTM Generator",
      description: "Create trackable URLs with UTM parameters for precise campaign attribution and performance analysis.",
      icon: LinkIcon,
      color: "teal",
      link: "/tools/utm-generator",
      features: ["Campaign tracking", "Bulk generation", "UTM templates", "Analytics ready"],
      category: "Analytics"
    },
    {
      title: "Email Signature Generator",
      description: "Create professional email signatures with multiple templates, social media links, and mobile-responsive design.",
      icon: Signature,
      color: "pink",
      link: "/tools/email-signature-generator",
      features: ["4 Professional templates", "Customizable colors", "Social media integration", "HTML export"],
      category: "Branding"
    },
    {
      title: "Spintax Generator",
      description: "Create dynamic email variations using spintax syntax to avoid spam filters, increase deliverability, and personalize cold email campaigns at scale.",
      icon: Wand2,
      color: "purple",
      link: "/tools/spintax-generator",
      features: ["8 Pre-built templates", "Smart variation generator", "Unlimited variations", "Copy-paste ready"],
      category: "Content Creation"
    },
    {
      title: "Email Preview Tool",
      description: "Preview your cold emails across different email clients and devices with spam analysis to ensure perfect formatting and deliverability.",
      icon: Eye,
      color: "cyan",
      link: "/tools/email-preview",
      features: ["Multi-client preview", "Device compatibility", "Spam score analysis", "Character count optimizer"],
      category: "Testing & Optimization"
    },
    {
      title: "A/B Subject Line Tester",
      description: "Compare two subject lines head-to-head with predictive open rates, psychology analysis, and optimization recommendations.",
      icon: TestTube2,
      color: "amber",
      link: "/tools/ab-subject-line-tester",
      features: ["Head-to-head comparison", "Predictive open rates", "Psychology analysis", "Optimization tips"],
      category: "Testing & Optimization"
    },
    {
      title: "Best Send Time Calculator",
      description: "Find optimal email send times with visual heatmaps, timezone optimization, and A/B testing schedules for maximum engagement.",
      icon: Clock,
      color: "blue",
      link: "/tools/best-send-time-calculator",
      features: ["Visual send time heatmap", "Multi-timezone optimization", "A/B test schedules", "Industry-specific insights"],
      category: "Testing & Optimization"
    },
    {
      title: "Timezone Converter",
      description: "Convert dates and times across multiple global timezones with business hours indicators and international scheduling optimization.",
      icon: Globe,
      color: "indigo",
      link: "/tools/timezone-converter",
      features: ["50+ Global timezones", "Business hours indicators", "Multiple conversions", "Meeting scheduler"],
      category: "Testing & Optimization"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          icon: "text-blue-600",
          badge: "bg-blue-100 text-blue-700 border-blue-200",
          button: "hover:bg-blue-50",
          gradient: "from-blue-50 to-indigo-50"
        };
      case "green":
        return {
          icon: "text-green-600", 
          badge: "bg-green-100 text-green-700 border-green-200",
          button: "hover:bg-green-50",
          gradient: "from-green-50 to-emerald-50"
        };
      case "purple":
        return {
          icon: "text-purple-600",
          badge: "bg-purple-100 text-purple-700 border-purple-200", 
          button: "hover:bg-purple-50",
          gradient: "from-purple-50 to-pink-50"
        };
      case "orange":
        return {
          icon: "text-orange-600",
          badge: "bg-orange-100 text-orange-700 border-orange-200",
          button: "hover:bg-orange-50",
          gradient: "from-orange-50 to-amber-50"
        };
      case "emerald":
        return {
          icon: "text-emerald-600",
          badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
          button: "hover:bg-emerald-50", 
          gradient: "from-emerald-50 to-green-50"
        };
      case "red":
        return {
          icon: "text-red-600",
          badge: "bg-red-100 text-red-700 border-red-200",
          button: "hover:bg-red-50",
          gradient: "from-red-50 to-rose-50"
        };
      case "indigo":
        return {
          icon: "text-indigo-600", 
          badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
          button: "hover:bg-indigo-50",
          gradient: "from-indigo-50 to-blue-50"
        };
      case "teal":
        return {
          icon: "text-teal-600",
          badge: "bg-teal-100 text-teal-700 border-teal-200",
          button: "hover:bg-teal-50",
          gradient: "from-teal-50 to-cyan-50"
        };
      case "pink":
        return {
          icon: "text-pink-600",
          badge: "bg-pink-100 text-pink-700 border-pink-200",
          button: "hover:bg-pink-50",
          gradient: "from-pink-50 to-rose-50"
        };
      case "amber":
        return {
          icon: "text-amber-600",
          badge: "bg-amber-100 text-amber-700 border-amber-200",
          button: "hover:bg-amber-50",
          gradient: "from-amber-50 to-yellow-50"
        };
      default:
        return {
          icon: "text-gray-600",
          badge: "bg-gray-100 text-gray-700 border-gray-200",
          button: "hover:bg-gray-50", 
          gradient: "from-gray-50 to-slate-50"
        };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Cold Email Tools - AzureInfra.email"
        description="Professional cold email tools collection. Subject line generators, warmup calculators, email validators, spam analyzers and more professional tools."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6 border border-purple-200">
              <Wrench className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Free Tools</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground">
              Cold Email
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Toolkit
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive free tools for cold email success. From generating content to validating deliverability,
              everything you need to run professional outreach campaigns.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>Instant Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-600" />
                <span>Professional Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Bulk Export</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          
          {/* Tools List */}
          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {tools.map((tool, index) => {
              const colors = getColorClasses(tool.color);
              const Icon = tool.icon;
              
              return (
                <Card key={index} className="bg-card border border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.gradient}`}>
                            <Icon className={`w-6 h-6 ${colors.icon}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-foreground">{tool.title}</h3>
                              <Badge className={colors.badge}>{tool.category}</Badge>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">{tool.description}</p>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-2 mb-6">
                          {tool.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.icon.replace('text-', 'from-').replace('-600', '-400')} to-${colors.icon.replace('text-', '').replace('-600', '-600')}`} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Action */}
                      <div className="flex flex-col items-center lg:items-end gap-4">
                        <Link to={tool.link}>
                          <Button 
                            size="lg" 
                            className={`group ${colors.button} transition-all duration-300`}
                          >
                            Open Tool
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                        
                        <div className="text-center lg:text-right">
                          <p className="text-sm text-muted-foreground">Free • No signup required</p>
                        </div>
                      </div>
                      
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="max-w-2xl mx-auto text-center mt-16">
            <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-dashed">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Complete Cold Email Toolkit</h3>
                <p className="text-muted-foreground mb-6">
                  All tools are completely free with no signup required. Export your data, 
                  copy results, and integrate with your existing workflow seamlessly.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">✅ Email Validation</Badge>
                  <Badge variant="outline">✅ Subject Line Testing</Badge>
                  <Badge variant="outline">✅ Spam Analysis</Badge>
                  <Badge variant="outline">✅ Campaign Planning</Badge>
                  <Badge variant="outline">✅ UTM Tracking</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
