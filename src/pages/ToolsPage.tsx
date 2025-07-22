import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Users
} from "lucide-react";

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
              Essential free tools for cold email campaigns. Generate usernames, domain names, 
              and personas to streamline your outreach setup.
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
                <h3 className="text-xl font-semibold mb-4">Need More Tools?</h3>
                <p className="text-muted-foreground mb-6">
                  We're constantly adding new tools to help with your cold email campaigns. 
                  Have a suggestion? Let us know what you'd like to see next.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Email Validators</Badge>
                  <Badge variant="outline">Subject Line Tester</Badge>
                  <Badge variant="outline">ESP Checker</Badge>
                  <Badge variant="outline">Spam Score Analyzer</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolsPage;
