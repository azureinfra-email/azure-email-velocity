import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  FileText, 
  Copy, 
  Download, 
  Mail,
  Zap,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  RefreshCw,
  Lightbulb,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

interface EmailTemplate {
  id: string;
  subject: string;
  content: string;
  industry: string;
  goal: string;
  tone: string;
  length: "short" | "medium" | "long";
  personalizations: string[];
  cta: string;
  psNote?: string;
}

interface IndustryData {
  painPoints: string[];
  valueProps: string[];
  socialProof: string[];
}

interface TemplateStructure {
  opener: string;
  value?: string;
  problem?: string;
  proof?: string;
  cta: string;
  closing: string;
}

interface TemplateSettings {
  industry: string;
  goal: string;
  tone: string;
  length: "short" | "medium" | "long";
  includePS: boolean;
  includeSocialProof: boolean;
  personalizationLevel: number;
  ctaStyle: string;
}

const TemplateGeneratorPage = () => {
  const [settings, setSettings] = useState<TemplateSettings>({
    industry: "technology",
    goal: "demo",
    tone: "professional",
    length: "medium",
    includePS: true,
    includeSocialProof: true,
    personalizationLevel: 3,
    ctaStyle: "direct"
  });

  const [companyName, setCompanyName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderCompany, setSenderCompany] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [generatedTemplates, setGeneratedTemplates] = useState<EmailTemplate[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const industryTemplates = {
    technology: {
      painPoints: [
        "scaling challenges",
        "technical debt",
        "security vulnerabilities", 
        "development velocity",
        "infrastructure costs",
        "system reliability"
      ],
      valueProps: [
        "reduce deployment time by 60%",
        "cut infrastructure costs by 40%",
        "improve system reliability",
        "accelerate development cycles",
        "enhance security posture",
        "optimize performance"
      ],
      socialProof: [
        "Similar companies like [Company A] and [Company B] have seen 40% faster deployments",
        "We've helped 200+ tech companies reduce their infrastructure costs",
        "Our solution is trusted by unicorn startups and Fortune 500 companies"
      ]
    },
    healthcare: {
      painPoints: [
        "patient wait times",
        "compliance requirements",
        "data security concerns",
        "operational inefficiencies",
        "staff burnout",
        "revenue cycle management"
      ],
      valueProps: [
        "reduce patient wait times by 30%",
        "ensure HIPAA compliance",
        "streamline operations",
        "improve patient outcomes",
        "reduce administrative burden",
        "optimize revenue cycles"
      ],
      socialProof: [
        "Healthcare systems like [Hospital A] have reduced wait times by 35%",
        "We're trusted by 500+ healthcare providers nationwide",
        "Our platform meets the highest security and compliance standards"
      ]
    },
    finance: {
      painPoints: [
        "regulatory compliance",
        "fraud detection",
        "risk management",
        "customer acquisition costs",
        "operational efficiency",
        "digital transformation"
      ],
      valueProps: [
        "reduce compliance costs by 50%",
        "detect fraud in real-time",
        "optimize risk management",
        "lower customer acquisition costs",
        "accelerate digital transformation",
        "improve operational efficiency"
      ],
      socialProof: [
        "Financial institutions using our platform see 50% fewer compliance issues",
        "We protect over $100B in transactions annually",
        "Trusted by top-tier banks and fintech companies"
      ]
    }
  };

  const templateStructures = {
    short: {
      opener: "Quick question about {{company}}'s {{pain_point}}.",
      value: "{{value_prop}} - worth a brief chat?",
      cta: "{{cta_text}}",
      closing: "Best regards,\n{{sender_name}}"
    },
    medium: {
      opener: "Hi {{recipient_name}},\n\nI noticed {{company}} has been {{growth_indicator}}. Impressive work in the {{industry}} space!",
      problem: "Many {{industry}} companies struggle with {{pain_point}}, which can {{negative_impact}}.",
      value: "We help companies like {{company}} {{value_prop}}. {{social_proof}}",
      cta: "{{cta_text}}",
      closing: "Best regards,\n{{sender_name}}\n{{sender_company}}"
    },
    long: {
      opener: "Hi {{recipient_name}},\n\nI've been following {{company}}'s journey in the {{industry}} space, and I'm impressed by {{specific_achievement}}.",
      problem: "As {{company}} continues to scale, you're likely facing challenges with {{pain_point}}. This is something we see consistently with growing {{industry}} companies.",
      value: "{{sender_company}} specializes in helping companies {{value_prop}}. {{detailed_social_proof}}",
      proof: "For example, {{case_study_example}}",
      cta: "{{cta_text}}",
      closing: "Best regards,\n{{sender_name}}\n{{title}}\n{{sender_company}}"
    }
  };

  const generateTemplates = () => {
    if (!companyName.trim() || !recipientName.trim() || !senderName.trim()) {
      toast.error("Please fill in the required fields");
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const templates: EmailTemplate[] = [];
      const industryData = industryTemplates[settings.industry as keyof typeof industryTemplates];
      const structure = templateStructures[settings.length];

      // Generate 3 different variations
      for (let i = 0; i < 3; i++) {
        const template = generateSingleTemplate(industryData, structure, i);
        templates.push(template);
      }

      setGeneratedTemplates(templates);
      setIsGenerating(false);
      toast.success(`Generated ${templates.length} email templates`);
    }, 2000);
  };

  const generateSingleTemplate = (industryData: IndustryData, structure: TemplateStructure, variant: number): EmailTemplate => {
    const painPoint = industryData.painPoints[variant % industryData.painPoints.length];
    const valueProp = industryData.valueProps[variant % industryData.valueProps.length];
    const socialProofText = settings.includeSocialProof ? 
      industryData.socialProof[variant % industryData.socialProof.length] : "";

    const personalizations = [
      "{{company}}",
      "{{recipient_name}}",
      "{{sender_name}}",
      "{{industry}}",
      "{{pain_point}}",
      "{{value_prop}}"
    ];

    const replacements = {
      "{{company}}": companyName,
      "{{recipient_name}}": recipientName,
      "{{sender_name}}": senderName,
      "{{sender_company}}": senderCompany,
      "{{industry}}": settings.industry,
      "{{pain_point}}": painPoint,
      "{{value_prop}}": valueProposition || valueProp,
      "{{social_proof}}": socialProofText,
      "{{cta_text}}": generateCTA(settings.goal, settings.ctaStyle),
      "{{growth_indicator}}": getGrowthIndicator(variant),
      "{{negative_impact}}": getNegativeImpact(painPoint),
      "{{specific_achievement}}": getSpecificAchievement(variant),
      "{{detailed_social_proof}}": socialProofText,
      "{{case_study_example}}": getCaseStudyExample(variant),
      "{{title}}": getSenderTitle(variant)
    };

    let content = "";
    
    if (settings.length === "short") {
      content = `${structure.opener}\n\n${structure.value}\n\n${structure.cta}\n\n${structure.closing}`;
    } else if (settings.length === "medium") {
      content = `${structure.opener}\n\n${structure.problem}\n\n${structure.value}\n\n${structure.cta}\n\n${structure.closing}`;
    } else {
      content = `${structure.opener}\n\n${structure.problem}\n\n${structure.value}\n\n${structure.proof}\n\n${structure.cta}\n\n${structure.closing}`;
    }

    // Apply replacements
    Object.entries(replacements).forEach(([placeholder, replacement]) => {
      content = content.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    });

    const subject = generateSubject(variant, painPoint);

    return {
      id: `template-${variant}`,
      subject: applyReplacements(subject, replacements),
      content,
      industry: settings.industry,
      goal: settings.goal,
      tone: settings.tone,
      length: settings.length,
      personalizations,
      cta: generateCTA(settings.goal, settings.ctaStyle),
      psNote: settings.includePS ? generatePSNote(variant) : undefined
    };
  };

  const generateSubject = (variant: number, painPoint: string): string => {
    const subjects = [
      `Quick question about {{company}}'s ${painPoint}`,
      `{{company}} + ${valueProposition || 'improved efficiency'} = ?`,
      `{{recipient_name}}, noticed {{company}}'s growth`,
      `{{company}}'s ${painPoint} - 5 minute solution?`,
      `{{recipient_name}} - worth a brief chat about {{company}}?`
    ];
    return subjects[variant % subjects.length];
  };

  const generateCTA = (goal: string, style: string): string => {
    const ctas = {
      demo: {
        direct: "Would you be open to a 15-minute demo this week?",
        soft: "I'd love to show you how this could work for {{company}}. Worth a brief call?",
        urgent: "I have a spot open this Thursday - would that work for a quick demo?"
      },
      consultation: {
        direct: "Can we schedule a 20-minute consultation?", 
        soft: "Would you be interested in exploring this further?",
        urgent: "I'm only taking on 2 more clients this quarter - interested in learning more?"
      },
      trial: {
        direct: "Would {{company}} be interested in a free trial?",
        soft: "Want to test this out with your team?",
        urgent: "We're offering free pilots to the first 10 companies - interested?"
      }
    };

    return ctas[goal as keyof typeof ctas]?.[style as keyof typeof ctas.demo] || 
           "Would you be open to a brief conversation about this?";
  };

  const getGrowthIndicator = (variant: number): string => {
    const indicators = [
      "expanding rapidly",
      "making impressive moves",
      "scaling effectively",
      "gaining significant traction"
    ];
    return indicators[variant % indicators.length];
  };

  const getNegativeImpact = (painPoint: string): string => {
    return `impact your ability to scale efficiently and maintain competitive advantage`;
  };

  const getSpecificAchievement = (variant: number): string => {
    const achievements = [
      "your recent funding round and expansion plans",
      "the innovative solutions you're building", 
      "your rapid growth and market position",
      "your team's technical expertise"
    ];
    return achievements[variant % achievements.length];
  };

  const getCaseStudyExample = (variant: number): string => {
    const examples = [
      "we helped [Similar Company] reduce their operational costs by 40% in just 3 months",
      "[Industry Leader] was able to scale 3x faster after implementing our solution",
      "one of our clients saw a 60% improvement in efficiency within the first quarter"
    ];
    return examples[variant % examples.length];
  };

  const getSenderTitle = (variant: number): string => {
    const titles = [
      "VP of Business Development",
      "Senior Account Executive", 
      "Strategic Partnerships Lead"
    ];
    return titles[variant % titles.length];
  };

  const generatePSNote = (variant: number): string => {
    const psNotes = [
      "P.S. I've helped similar companies achieve remarkable results. Happy to share some quick wins even if we don't end up working together.",
      "P.S. If you're not the right person for this, I'd appreciate a quick redirect to who might be.",
      "P.S. I promise this isn't another generic sales pitch - I've done my homework on {{company}}."
    ];
    return psNotes[variant % psNotes.length];
  };

  const applyReplacements = (text: string, replacements: Record<string, string>): string => {
    let result = text;
    Object.entries(replacements).forEach(([placeholder, replacement]) => {
      result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
    });
    return result;
  };

  const copyToClipboard = async (text: string, id?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (id) {
        setCopiedItems(prev => new Set([...prev, id]));
        setTimeout(() => {
          setCopiedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }, 2000);
      }
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadTemplates = () => {
    if (generatedTemplates.length === 0) {
      toast.error("No templates to download");
      return;
    }

    const content = generatedTemplates.map((template, index) => 
      `TEMPLATE ${index + 1}\n` +
      `Subject: ${template.subject}\n\n` +
      `${template.content}\n\n` +
      `${template.psNote ? `${template.psNote}\n\n` : ''}` +
      `${'='.repeat(50)}\n\n`
    ).join('');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email_templates_${companyName}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Templates downloaded");
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case "professional": return "bg-blue-100 text-blue-800 border-blue-200";
      case "casual": return "bg-green-100 text-green-800 border-green-200";
      case "urgent": return "bg-red-100 text-red-800 border-red-200";
      case "helpful": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.templateGenerator.title}
        description={seoConfig.templateGenerator.description}
        keywords={seoConfig.templateGenerator.keywords}
        canonical={seoConfig.templateGenerator.canonical}
        schemaType={seoConfig.templateGenerator.schemaType}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6 border border-purple-200">
              <FileText className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Template Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Cold Email
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Template Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate personalized cold email templates with proven frameworks, 
              psychological triggers, and industry-specific messaging that converts.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span>Proven Frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>High Converting</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span>Personalized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Settings Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      Campaign Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="recipientName">Recipient Name *</Label>
                      <Input 
                        id="recipientName"
                        placeholder="John"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input 
                        id="companyName"
                        placeholder="Acme Corp"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="senderName">Your Name *</Label>
                      <Input 
                        id="senderName"
                        placeholder="Jane Smith"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="senderCompany">Your Company</Label>
                      <Input 
                        id="senderCompany"
                        placeholder="Your Company Inc"
                        value={senderCompany}
                        onChange={(e) => setSenderCompany(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valueProposition">Value Proposition</Label>
                      <Textarea 
                        id="valueProposition"
                        placeholder="What specific value do you provide?"
                        value={valueProposition}
                        onChange={(e) => setValueProposition(e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Template Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Industry</Label>
                      <Select value={settings.industry} onValueChange={(value) => setSettings({...settings, industry: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Campaign Goal</Label>
                      <Select value={settings.goal} onValueChange={(value) => setSettings({...settings, goal: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="demo">Book Demo</SelectItem>
                          <SelectItem value="consultation">Schedule Consultation</SelectItem>
                          <SelectItem value="trial">Sign Up for Trial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Email Length</Label>
                      <Select value={settings.length} onValueChange={(value: "short" | "medium" | "long") => setSettings({...settings, length: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short (50-75 words)</SelectItem>
                          <SelectItem value="medium">Medium (75-150 words)</SelectItem>
                          <SelectItem value="long">Long (150-250 words)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Tone</Label>
                      <Select value={settings.tone} onValueChange={(value) => setSettings({...settings, tone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="helpful">Helpful</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>CTA Style</Label>
                      <Select value={settings.ctaStyle} onValueChange={(value) => setSettings({...settings, ctaStyle: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="direct">Direct</SelectItem>
                          <SelectItem value="soft">Soft</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includeSocialProof"
                          checked={settings.includeSocialProof}
                          onChange={(e) => setSettings({...settings, includeSocialProof: e.target.checked})}
                          className="rounded border-border"
                        />
                        <label htmlFor="includeSocialProof" className="text-sm">Include social proof</label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="includePS"
                          checked={settings.includePS}
                          onChange={(e) => setSettings({...settings, includePS: e.target.checked})}
                          className="rounded border-border"
                        />
                        <label htmlFor="includePS" className="text-sm">Add P.S. note</label>
                      </div>
                    </div>

                    <Button 
                      onClick={generateTemplates}
                      disabled={isGenerating || !companyName.trim() || !recipientName.trim() || !senderName.trim()}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate Templates
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Templates Display */}
              <div className="lg:col-span-2">
                {generatedTemplates.length > 0 ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-green-600" />
                            Generated Templates ({generatedTemplates.length})
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedTemplates.map(t => `Subject: ${t.subject}\n\n${t.content}${t.psNote ? `\n\n${t.psNote}` : ''}`).join('\n\n---\n\n'))}>
                              <Copy className="w-4 h-4 mr-1" />
                              Copy All
                            </Button>
                            <Button variant="outline" size="sm" onClick={downloadTemplates}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {generatedTemplates.map((template, index) => (
                            <Card key={template.id} className="bg-muted/20">
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs">
                                      Template {index + 1}
                                    </Badge>
                                    <Badge className={getToneColor(template.tone)}>
                                      {template.tone}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {template.length}
                                    </Badge>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(`Subject: ${template.subject}\n\n${template.content}${template.psNote ? `\n\n${template.psNote}` : ''}`, template.id)}
                                  >
                                    {copiedItems.has(template.id) ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <Label className="text-xs text-muted-foreground">SUBJECT LINE</Label>
                                  <p className="font-medium text-lg">{template.subject}</p>
                                </div>
                                
                                <div>
                                  <Label className="text-xs text-muted-foreground">EMAIL CONTENT</Label>
                                  <div className="mt-1 p-4 bg-background rounded border">
                                    <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{template.content}</pre>
                                    {template.psNote && (
                                      <div className="mt-4 pt-4 border-t border-border/50">
                                        <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">{template.psNote}</pre>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 pt-2 border-t border-border/50 text-xs text-muted-foreground">
                                  <div>
                                    <span className="font-medium">Industry:</span> {template.industry}
                                  </div>
                                  <div>
                                    <span className="font-medium">Goal:</span> {template.goal}
                                  </div>
                                  <div>
                                    <span className="font-medium">Length:</span> {template.length}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Generate Templates</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Enter your campaign details and preferences to generate personalized 
                        cold email templates using proven frameworks and industry best practices.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">Proven Frameworks</Badge>
                        <Badge variant="outline">Psychology Triggers</Badge>
                        <Badge variant="outline">Industry-Specific</Badge>
                        <Badge variant="outline">Personalization</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplateGeneratorPage;
