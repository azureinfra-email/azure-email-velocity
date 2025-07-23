import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SimpleSEO from "@/components/SimpleSEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Calendar, 
  Copy, 
  Download, 
  Mail,
  Clock,
  Target,
  TrendingUp,
  Users,
  Zap,
  RefreshCw,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

interface EmailSequence {
  id: number;
  day: number;
  subject: string;
  content: string;
  type: "initial" | "follow-up" | "value-add" | "breakup";
  cta: string;
  tone: "professional" | "casual" | "urgent" | "helpful";
  length: "short" | "medium" | "long";
}

interface SequenceSettings {
  industry: string;
  goal: string;
  audienceLevel: string;
  sequenceLength: number;
  daysBetween: number[];
  includeValueAdd: boolean;
  includeSocialProof: boolean;
  includeUrgency: boolean;
  personalityType: string;
}

const SequencePlannerPage = () => {
  const [settings, setSettings] = useState<SequenceSettings>({
    industry: "technology",
    goal: "demo",
    audienceLevel: "manager",
    sequenceLength: 5,
    daysBetween: [3, 5, 7, 10],
    includeValueAdd: true,
    includeSocialProof: true,
    includeUrgency: false,
    personalityType: "professional"
  });
  
  const [sequence, setSequence] = useState<EmailSequence[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const sequenceTemplates = {
    technology: {
      demo: {
        initial: {
          subjects: [
            "Quick question about {{company}}'s {{pain_point}}",
            "{{company}} + {{value_prop}} = ?",
            "Noticed {{company}} is scaling fast",
            "{{recipient_name}}, worth a 15-minute chat?"
          ],
          content: `Hi {{recipient_name}},

I noticed {{company}} has been growing rapidly in the {{industry}} space. Impressive work!

I'm reaching out because {{value_proposition}} - something I think could be valuable for {{company}}'s continued growth.

Would you be open to a quick 15-minute call this week to explore how this could benefit {{company}}?

Best regards,
[Your name]

P.S. I've helped similar companies like [Company A] and [Company B] achieve [specific result].`
        },
        follow_up_1: {
          subjects: [
            "Following up on {{company}}'s growth",
            "{{recipient_name}} - still interested in that chat?",
            "One more try: {{value_prop}} for {{company}}"
          ],
          content: `Hi {{recipient_name}},

I sent you a note last week about {{value_proposition}} for {{company}}.

I understand you're probably swamped with priorities, but this is exactly why I think we should connect.

Quick question: What's your biggest challenge when it comes to [relevant pain point]?

I've got a few ideas that might help, and it would only take 10 minutes to share them.

Worth a brief call?

[Your name]`
        }
      }
    }
  };

  const industryData = {
    technology: {
      pain_points: ["scaling challenges", "technical debt", "security concerns", "development velocity"],
      value_props: ["faster deployment", "improved security", "cost reduction", "better performance"],
      ctas: ["Book a demo", "Schedule a call", "See the platform", "Get a trial"]
    },
    healthcare: {
      pain_points: ["patient wait times", "compliance costs", "data security", "operational efficiency"],
      value_props: ["better patient outcomes", "streamlined workflows", "compliance automation", "cost reduction"],
      ctas: ["Schedule consultation", "Book a demo", "Learn more", "Get assessment"]
    },
    finance: {
      pain_points: ["regulatory compliance", "fraud detection", "customer acquisition", "risk management"],
      value_props: ["risk mitigation", "automated compliance", "faster processing", "improved accuracy"],
      ctas: ["Schedule demo", "Book consultation", "See platform", "Get analysis"]
    },
    retail: {
      pain_points: ["inventory management", "customer acquisition costs", "omnichannel experience", "supply chain disruptions"],
      value_props: ["increased sales", "better inventory control", "enhanced customer experience", "optimized operations"],
      ctas: ["Schedule demo", "See case studies", "Book consultation", "Get free audit"]
    },
    manufacturing: {
      pain_points: ["production downtime", "quality control", "supply chain visibility", "regulatory compliance"],
      value_props: ["reduced downtime", "improved quality", "supply chain optimization", "automated reporting"],
      ctas: ["Book facility tour", "Schedule demo", "See ROI calculator", "Get assessment"]
    }
  };


  const generateSequence = () => {
    if (!companyName.trim() || !recipientName.trim()) {
      toast.error("Please enter company name and recipient name");
      return;
    }

    setIsGenerating(true);

    // Simulate generation delay
    setTimeout(() => {
      const newSequence = createEmailSequence();
      setSequence(newSequence);
      setIsGenerating(false);
      toast.success(`Generated ${newSequence.length}-email sequence`);
    }, 2000);
  };

  const createEmailSequence = (): EmailSequence[] => {
    const sequence: EmailSequence[] = [];
    const industry_data = industryData[settings.industry as keyof typeof industryData];
    
    let currentDay = 0;

    // Email 1: Initial outreach
    sequence.push({
      id: 1,
      day: currentDay,
      subject: generateSubject("initial", 0),
      content: generateContent("initial", 0),
      type: "initial",
      cta: industry_data.ctas[0],
      tone: "professional",
      length: "medium"
    });

    // Generate follow-up emails
    for (let i = 1; i < settings.sequenceLength; i++) {
      currentDay += settings.daysBetween[Math.min(i - 1, settings.daysBetween.length - 1)];
      
      let type: "follow-up" | "value-add" | "breakup" = "follow-up";
      if (i === settings.sequenceLength - 1) {
        type = "breakup";
      } else if (settings.includeValueAdd && i === Math.floor(settings.sequenceLength / 2)) {
        type = "value-add";
      }

      sequence.push({
        id: i + 1,
        day: currentDay,
        subject: generateSubject(type, i),
        content: generateContent(type, i),
        type,
        cta: industry_data.ctas[i % industry_data.ctas.length],
        tone: type === "breakup" ? "casual" : "professional",
        length: type === "value-add" ? "long" : "medium"
      });
    }

    return sequence;
  };

  const generateSubject = (type: string, index: number): string => {
    const industry_data = industryData[settings.industry as keyof typeof industryData];
    const subjects = {
      initial: [
        `{{company}} + ${valueProposition || industry_data.value_props[0]}`,
        `Quick question about {{company}}'s ${industry_data.pain_points[0]}`,
        `${recipientName}, worth a 15-minute chat?`,
        `Noticed {{company}} is growing fast`
      ],
      "follow-up": [
        `Following up on {{company}}'s growth`,
        `${recipientName} - still interested?`,
        `One more try: ${valueProposition || industry_data.value_props[0]}`,
        `{{company}}'s ${industry_data.pain_points[0]} solution`
      ],
      "value-add": [
        `Free resource: ${industry_data.value_props[0]} guide`,
        `Thought you'd find this interesting`,
        `{{company}} might benefit from this`,
        `Industry insight for {{company}}`
      ],
      breakup: [
        `Last email from me, ${recipientName}`,
        `Closing the loop on {{company}}`,
        `Final follow-up for {{company}}`,
        `{{company}} - my last attempt`
      ]
    };

    const typeSubjects = subjects[type as keyof typeof subjects] || subjects["follow-up"];
    return typeSubjects[index % typeSubjects.length]
      .replace(/{{company}}/g, companyName)
      .replace(/{{recipient_name}}/g, recipientName);
  };

  const generateContent = (type: string, index: number): string => {
    const industry_data = industryData[settings.industry as keyof typeof industryData];
    
    const templates = {
      initial: `Hi ${recipientName},

I noticed ${companyName} has been making impressive moves in the ${settings.industry} space.

I'm reaching out because ${valueProposition || industry_data.value_props[0]} - something I think could be valuable for ${companyName}'s continued growth.

${settings.includeSocialProof ? `I've helped similar companies like [Company A] and [Company B] achieve [specific results].` : ''}

Would you be open to a quick 15-minute call this week to explore how this could benefit ${companyName}?

Best regards,
[Your name]`,

      "follow-up": `Hi ${recipientName},

I sent you a note ${settings.daysBetween[Math.min(index - 1, settings.daysBetween.length - 1)]} days ago about ${valueProposition || industry_data.value_props[0]} for ${companyName}.

I understand you're probably swamped with priorities, but this is exactly why I think we should connect.

Quick question: What's your biggest challenge when it comes to ${industry_data.pain_points[0]}?

${settings.includeUrgency ? `I've got a few ideas that might help, and it would only take 10 minutes to share them.` : `I have some insights that might be helpful.`}

Worth a brief call?

[Your name]`,

      "value-add": `Hi ${recipientName},

Instead of pitching you again, I wanted to share something that might be valuable regardless of whether we work together.

[Attach relevant resource/case study/industry report]

This ${settings.industry} report shows how companies like ${companyName} are tackling ${industry_data.pain_points[0]}. Thought you might find the insights useful.

No strings attached - just hoping it helps with your current initiatives.

${settings.includeSocialProof ? `By the way, if you ever want to chat about how we've helped [similar company] achieve [specific result], I'm here.` : ''}

Best,
[Your name]`,

      breakup: `Hi ${recipientName},

I've reached out a few times about ${valueProposition || industry_data.value_props[0]} for ${companyName}, but I understand timing might not be right.

I'll stop here and won't reach out again unless you reply.

If things change and you'd like to explore how we can help ${companyName} with ${industry_data.pain_points[0]}, just hit reply.

All the best with ${companyName}'s growth!

[Your name]

P.S. If you're not the right person for this, I'd appreciate a quick redirect to who might be.`
    };

    return templates[type as keyof typeof templates] || templates["follow-up"];
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

  const downloadSequence = () => {
    if (sequence.length === 0) {
      toast.error("No sequence to download");
      return;
    }

    const content = sequence.map(email => 
      `EMAIL ${email.id} (Day ${email.day})\n` +
      `Subject: ${email.subject}\n` +
      `Type: ${email.type}\n` +
      `CTA: ${email.cta}\n\n` +
      `${email.content}\n\n` +
      `${'='.repeat(50)}\n\n`
    ).join('');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cold_email_sequence_${companyName}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Sequence downloaded");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "initial": return "bg-blue-100 text-blue-800 border-blue-200";
      case "follow-up": return "bg-green-100 text-green-800 border-green-200";
      case "value-add": return "bg-purple-100 text-purple-800 border-purple-200";
      case "breakup": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Email Sequence Planner - Azure Email Velocity"
        description="Free email sequence planner tool. Plan and optimize your email sequences for maximum conversion. Create drip campaigns, follow-up sequences, and automated workflows."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6 border border-blue-200">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Sequence Planner</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Cold Email
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Sequence Planner
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate personalized multi-touch email sequences with strategic timing, 
              psychological triggers, and industry-specific messaging.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>Strategic Timing</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Conversion Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Audience-Specific</span>
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
                      <Target className="w-5 h-5 text-blue-600" />
                      Campaign Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input 
                        id="companyName"
                        placeholder="Target company"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="recipientName">Recipient Name *</Label>
                      <Input 
                        id="recipientName"
                        placeholder="Contact first name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valueProposition">Value Proposition</Label>
                      <Input 
                        id="valueProposition"
                        placeholder="What you offer"
                        value={valueProposition}
                        onChange={(e) => setValueProposition(e.target.value)}
                      />
                    </div>

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
                          <SelectItem value="meeting">General Meeting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Sequence Length: {settings.sequenceLength} emails</Label>
                      <Slider
                        value={[settings.sequenceLength]}
                        onValueChange={([value]) => setSettings({...settings, sequenceLength: value})}
                        max={7}
                        min={3}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="valueAdd" 
                        checked={settings.includeValueAdd}
                        onCheckedChange={(checked) => setSettings({...settings, includeValueAdd: checked === true})}
                      />
                      <label htmlFor="valueAdd" className="text-sm">Include value-add email</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="socialProof" 
                        checked={settings.includeSocialProof}
                        onCheckedChange={(checked) => setSettings({...settings, includeSocialProof: checked === true})}
                      />
                      <label htmlFor="socialProof" className="text-sm">Add social proof</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="urgency" 
                        checked={settings.includeUrgency}
                        onCheckedChange={(checked) => setSettings({...settings, includeUrgency: checked === true})}
                      />
                      <label htmlFor="urgency" className="text-sm">Create urgency</label>
                    </div>

                    <Button 
                      onClick={generateSequence}
                      disabled={isGenerating || !companyName.trim() || !recipientName.trim()}
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
                          Generate Sequence
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sequence Display */}
              <div className="lg:col-span-2">
                {sequence.length > 0 ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-green-600" />
                            Email Sequence
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(sequence.map(e => `${e.subject}\n\n${e.content}`).join('\n\n---\n\n'))}>
                              <Copy className="w-4 h-4 mr-1" />
                              Copy All
                            </Button>
                            <Button variant="outline" size="sm" onClick={downloadSequence}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {sequence.map((email, index) => (
                            <Card key={email.id} className="bg-muted/20">
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs">
                                      Email {email.id}
                                    </Badge>
                                    <Badge className={getTypeColor(email.type)}>
                                      {email.type.replace('-', ' ')}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <Clock className="w-3 h-3" />
                                      Day {email.day}
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(`${email.subject}\n\n${email.content}`, `email-${email.id}`)}
                                  >
                                    {copiedItems.has(`email-${email.id}`) ? (
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
                                  <p className="font-medium">{email.subject}</p>
                                </div>
                                
                                <div>
                                  <Label className="text-xs text-muted-foreground">EMAIL CONTENT</Label>
                                  <div className="mt-1 p-3 bg-background rounded border">
                                    <pre className="whitespace-pre-wrap text-sm font-mono">{email.content}</pre>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 pt-2 border-t border-border/50">
                                  <div className="text-xs text-muted-foreground">
                                    <span className="font-medium">CTA:</span> {email.cta}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    <span className="font-medium">Tone:</span> {email.tone}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    <span className="font-medium">Length:</span> {email.length}
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
                      <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Plan Your Sequence</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Enter your campaign details and generate a personalized email sequence 
                        with strategic timing and proven messaging frameworks.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">Multi-touch Strategy</Badge>
                        <Badge variant="outline">Psychological Triggers</Badge>
                        <Badge variant="outline">Industry-Specific</Badge>
                        <Badge variant="outline">Timing Optimization</Badge>
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

export default SequencePlannerPage;
