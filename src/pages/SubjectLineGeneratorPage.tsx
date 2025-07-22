import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  Copy, 
  RefreshCw, 
  Download, 
  Settings, 
  CheckCircle,
  Filter,
  Shuffle,
  AlertTriangle,
  TrendingUp,
  Eye,
  Zap,
  Target,
  Brain
} from "lucide-react";
import { toast } from "sonner";

interface SubjectLine {
  text: string;
  type: string;
  spamScore: number;
  openRatePrediction: number;
  length: number;
  triggers: string[];
  sentiment: "positive" | "neutral" | "negative";
}

const SubjectLineGeneratorPage = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("technology");
  const [painPoint, setPainPoint] = useState("");
  const [value, setValue] = useState("");
  const [generatedSubjects, setGeneratedSubjects] = useState<SubjectLine[]>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState([15]);
  const [maxLength, setMaxLength] = useState([60]);
  
  // Options
  const [includePersonalization, setIncludePersonalization] = useState(true);
  const [includeUrgency, setIncludeUrgency] = useState(true);
  const [includeCuriosity, setIncludeCuriosity] = useState(true);
  const [includeBenefit, setIncludeBenefit] = useState(true);
  const [avoidSpamWords, setAvoidSpamWords] = useState(true);
  const [industrySpecific, setIndustrySpecific] = useState(true);

  const subjectTemplates = {
    personalization: [
      "{{company}} - {{value}}",
      "Quick question about {{company}}",
      "{{company}}'s {{painPoint}} solution",
      "Noticed {{company}} is {{painPoint}}",
      "{{company}} + {{value}} = ?",
      "{{company}} growth opportunity",
      "Regarding {{company}}'s {{industry}} strategy"
    ],
    urgency: [
      "Last chance: {{value}}",
      "Only 3 spots left for {{value}}",
      "{{value}} - ending soon",
      "Time-sensitive: {{value}}",
      "48-hour notice: {{value}}",
      "Final reminder: {{value}}",
      "Limited availability: {{value}}"
    ],
    curiosity: [
      "The secret to {{value}}",
      "What {{company}} doesn't know about {{painPoint}}",
      "{{industry}} companies are doing this",
      "Weird trick for {{value}}",
      "{{company}} missed this opportunity",
      "Hidden cost of {{painPoint}}",
      "Why {{industry}} leaders choose us"
    ],
    benefit: [
      "Increase {{value}} by 300%",
      "{{value}} in 30 days or less",
      "Cut {{painPoint}} costs by 50%",
      "{{value}} without the hassle",
      "Guaranteed {{value}} improvement",
      "{{company}}: {{value}} made simple",
      "Transform {{company}}'s {{painPoint}}"
    ],
    question: [
      "Are you struggling with {{painPoint}}?",
      "How is {{company}} handling {{painPoint}}?",
      "What if {{company}} could {{value}}?",
      "Ready to solve {{painPoint}}?",
      "Can {{company}} afford to ignore {{painPoint}}?",
      "Is {{painPoint}} costing {{company}} money?",
      "Would {{value}} help {{company}}?"
    ],
    social_proof: [
      "How 500+ companies achieved {{value}}",
      "{{industry}} leaders use this for {{value}}",
      "Case study: {{value}} success",
      "Join 1000+ companies getting {{value}}",
      "See how competitors achieve {{value}}",
      "{{industry}} benchmark: {{value}}",
      "Featured: {{company}}'s {{value}} potential"
    ]
  };

  const spamWords = [
    "free", "guaranteed", "money", "cash", "win", "winner", "prize", "offer",
    "deal", "discount", "save", "cheap", "lowest price", "act now", "urgent",
    "limited time", "expires", "bonus", "click here", "buy now", "order now"
  ];

  const industryPainPoints = {
    technology: ["slow development", "security vulnerabilities", "scaling issues", "technical debt"],
    healthcare: ["patient wait times", "compliance costs", "data security", "operational efficiency"],
    finance: ["regulatory compliance", "fraud detection", "customer acquisition", "risk management"],
    retail: ["inventory management", "customer retention", "supply chain", "online conversion"],
    manufacturing: ["production efficiency", "quality control", "supply chain", "equipment downtime"],
    education: ["student engagement", "administrative burden", "budget constraints", "technology adoption"],
    marketing: ["lead generation", "customer acquisition cost", "attribution tracking", "conversion rates"]
  };

  const industryValues = {
    technology: ["faster deployment", "improved security", "scalable solutions", "reduced costs"],
    healthcare: ["better patient outcomes", "streamlined workflows", "compliance automation", "cost reduction"],
    finance: ["risk mitigation", "automated compliance", "faster processing", "improved accuracy"],
    retail: ["increased sales", "better inventory control", "improved customer experience", "higher margins"],
    manufacturing: ["increased efficiency", "quality improvement", "cost reduction", "faster production"],
    education: ["improved learning outcomes", "administrative efficiency", "cost savings", "better engagement"],
    marketing: ["more qualified leads", "lower acquisition costs", "better ROI", "increased conversions"]
  };

  const generateSubjectLines = () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    const subjects: SubjectLine[] = [];
    const templates = Object.values(subjectTemplates).flat();
    const currentPainPoint = painPoint || industryPainPoints[industry as keyof typeof industryPainPoints][0];
    const currentValue = value || industryValues[industry as keyof typeof industryValues][0];

    const replacements = {
      "{{company}}": companyName,
      "{{industry}}": industry,
      "{{painPoint}}": currentPainPoint,
      "{{value}}": currentValue
    };

    // Generate from templates
    templates.forEach(template => {
      let subject = template;
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        subject = subject.replace(new RegExp(placeholder, 'g'), replacement);
      });

      if (subject.length <= maxLength[0]) {
        const spamScore = calculateSpamScore(subject);
        const openRate = predictOpenRate(subject, template);
        const triggers = getSubjectTriggers(subject, template);
        const sentiment = getSentiment(subject);

        subjects.push({
          text: subject,
          type: getSubjectType(template),
          spamScore,
          openRatePrediction: openRate,
          length: subject.length,
          triggers,
          sentiment
        });
      }
    });

    // Add variations
    const variations = generateVariations(subjects.slice(0, 5), replacements);
    subjects.push(...variations);

    // Filter and sort
    let filteredSubjects = subjects;
    if (avoidSpamWords) {
      filteredSubjects = subjects.filter(s => s.spamScore < 5);
    }

    filteredSubjects.sort((a, b) => b.openRatePrediction - a.openRatePrediction);
    
    setGeneratedSubjects(filteredSubjects.slice(0, quantity[0]));
    setCopiedItems(new Set());
    toast.success(`Generated ${filteredSubjects.slice(0, quantity[0]).length} subject lines`);
  };

  const calculateSpamScore = (subject: string): number => {
    let score = 0;
    const lowerSubject = subject.toLowerCase();
    
    spamWords.forEach(word => {
      if (lowerSubject.includes(word)) score += 2;
    });
    
    if (/[A-Z]{3,}/.test(subject)) score += 1; // All caps words
    if (subject.includes('!!!!') || subject.includes('????')) score += 2;
    if (subject.includes('$') || subject.includes('%')) score += 1;
    if (subject.length > 50) score += 1;
    
    return Math.min(score, 10);
  };

  const predictOpenRate = (subject: string, template: string): number => {
    let baseRate = 15; // Base open rate %
    
    if (template.includes('{{company}}')) baseRate += 8; // Personalization
    if (subject.length < 30) baseRate += 5; // Short subjects
    if (subject.includes('?')) baseRate += 3; // Questions
    if (template.includes('Quick question')) baseRate += 6;
    if (template.includes('secret') || template.includes('hidden')) baseRate += 4;
    if (subject.includes(industry)) baseRate += 3;
    
    return Math.min(baseRate + Math.random() * 5, 45);
  };

  const getSubjectTriggers = (subject: string, template: string): string[] => {
    const triggers = [];
    if (template.includes('{{company}}')) triggers.push('Personalized');
    if (subject.includes('?')) triggers.push('Question');
    if (/\d+%|\d+ days|\d+x/.test(subject)) triggers.push('Specific Number');
    if (subject.includes('secret') || subject.includes('hidden')) triggers.push('Curiosity');
    if (subject.includes('last chance') || subject.includes('limited')) triggers.push('Urgency');
    if (subject.includes('free') || subject.includes('save')) triggers.push('Value');
    return triggers;
  };

  const getSentiment = (subject: string): "positive" | "neutral" | "negative" => {
    const positive = ['increase', 'improve', 'boost', 'enhance', 'optimize', 'grow', 'success'];
    const negative = ['problem', 'issue', 'struggle', 'cost', 'waste', 'lose', 'fail'];
    
    const lowerSubject = subject.toLowerCase();
    const positiveCount = positive.filter(word => lowerSubject.includes(word)).length;
    const negativeCount = negative.filter(word => lowerSubject.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  const getSubjectType = (template: string): string => {
    if (Object.values(subjectTemplates.personalization).includes(template)) return 'Personalization';
    if (Object.values(subjectTemplates.urgency).includes(template)) return 'Urgency';
    if (Object.values(subjectTemplates.curiosity).includes(template)) return 'Curiosity';
    if (Object.values(subjectTemplates.benefit).includes(template)) return 'Benefit';
    if (Object.values(subjectTemplates.question).includes(template)) return 'Question';
    if (Object.values(subjectTemplates.social_proof).includes(template)) return 'Social Proof';
    return 'General';
  };

  const generateVariations = (baseSubjects: SubjectLine[], replacements: Record<string, string>): SubjectLine[] => {
    const variations: SubjectLine[] = [];
    
    baseSubjects.forEach(subject => {
      // Add emoji variations
      const emojiVariation = `${getRandomEmoji()} ${subject.text}`;
      if (emojiVariation.length <= maxLength[0]) {
        variations.push({
          ...subject,
          text: emojiVariation,
          type: subject.type + ' + Emoji',
          openRatePrediction: subject.openRatePrediction + 2
        });
      }
      
      // Add number variations
      if (!subject.text.includes('%') && !subject.text.includes('x')) {
        const numberVariation = subject.text.replace(replacements['{{value}}'], `${replacements['{{value}}']} by 50%`);
        if (numberVariation.length <= maxLength[0] && numberVariation !== subject.text) {
          variations.push({
            ...subject,
            text: numberVariation,
            type: subject.type + ' + Metric',
            openRatePrediction: subject.openRatePrediction + 3,
            triggers: [...subject.triggers, 'Specific Number']
          });
        }
      }
    });
    
    return variations;
  };

  const getRandomEmoji = (): string => {
    const emojis = ['🚀', '💡', '⚡', '🎯', '📈', '💰', '🔥', '⭐', '🏆', '💎'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, text]));
      toast.success("Copied to clipboard");
      
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(text);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const copyAllSubjects = async () => {
    const text = generatedSubjects.map(s => s.text).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success("All subject lines copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Subject Line,Type,Spam Score,Open Rate %,Length,Triggers,Sentiment\n" + 
      generatedSubjects.map(s => 
        `"${s.text}","${s.type}",${s.spamScore},${s.openRatePrediction.toFixed(1)},${s.length},"${s.triggers.join('; ')}","${s.sentiment}"`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `subject_lines_${companyName}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded");
  };

  const randomizeSettings = () => {
    const companies = ["TechCorp", "InnovateLab", "GrowthCo", "ScaleTech", "NextGen"];
    setCompanyName(companies[Math.floor(Math.random() * companies.length)]);
    setIncludePersonalization(Math.random() > 0.2);
    setIncludeUrgency(Math.random() > 0.4);
    setIncludeCuriosity(Math.random() > 0.3);
    setIncludeBenefit(Math.random() > 0.3);
    setQuantity([Math.floor(Math.random() * 20) + 10]);
    toast.info("Settings randomized");
  };

  const getScoreColor = (score: number, isSpam = false) => {
    if (isSpam) {
      if (score <= 2) return "text-green-600";
      if (score <= 5) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (score >= 25) return "text-green-600";
      if (score >= 15) return "text-yellow-600";
      return "text-red-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-6 border border-indigo-200">
              <Mail className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-700 text-sm font-medium">Subject Line Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              High-Converting
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Subject Line Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate personalized, high-converting subject lines with AI-powered optimization. 
              Get spam scores, open rate predictions, and psychological triggers.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>Spam Score Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>Open Rate Prediction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Settings Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-indigo-600" />
                      <CardTitle>Settings</CardTitle>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={randomizeSettings}
                    >
                      <Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium">Company Name *</Label>
                    <Input 
                      id="companyName"
                      placeholder="e.g., TechCorp, InnovateLab"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && generateSubjectLines()}
                      className="mt-1"
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <Label className="text-sm font-medium">Industry</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pain Point */}
                  <div>
                    <Label htmlFor="painPoint" className="text-sm font-medium">Pain Point (Optional)</Label>
                    <Input 
                      id="painPoint"
                      placeholder="e.g., slow deployment, high costs"
                      value={painPoint}
                      onChange={(e) => setPainPoint(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Value Proposition */}
                  <div>
                    <Label htmlFor="value" className="text-sm font-medium">Value Proposition (Optional)</Label>
                    <Input 
                      id="value"
                      placeholder="e.g., faster deployment, cost savings"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Quantity Slider */}
                  <div>
                    <Label className="text-sm font-medium">Quantity: {quantity[0]}</Label>
                    <Slider
                      value={quantity}
                      onValueChange={setQuantity}
                      max={30}
                      min={5}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Max Length */}
                  <div>
                    <Label className="text-sm font-medium">Max Length: {maxLength[0]} chars</Label>
                    <Slider
                      value={maxLength}
                      onValueChange={setMaxLength}
                      max={80}
                      min={30}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Include Elements</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="personalization" 
                        checked={includePersonalization}
                        onCheckedChange={(checked) => setIncludePersonalization(checked === true)}
                      />
                      <label htmlFor="personalization" className="text-sm">Personalization</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="urgency" 
                        checked={includeUrgency}
                        onCheckedChange={(checked) => setIncludeUrgency(checked === true)}
                      />
                      <label htmlFor="urgency" className="text-sm">Urgency triggers</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="curiosity" 
                        checked={includeCuriosity}
                        onCheckedChange={(checked) => setIncludeCuriosity(checked === true)}
                      />
                      <label htmlFor="curiosity" className="text-sm">Curiosity gaps</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="benefit" 
                        checked={includeBenefit}
                        onCheckedChange={(checked) => setIncludeBenefit(checked === true)}
                      />
                      <label htmlFor="benefit" className="text-sm">Clear benefits</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="avoidSpam" 
                        checked={avoidSpamWords}
                        onCheckedChange={(checked) => setAvoidSpamWords(checked === true)}
                      />
                      <label htmlFor="avoidSpam" className="text-sm">Avoid spam words</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="industrySpecific" 
                        checked={industrySpecific}
                        onCheckedChange={(checked) => setIndustrySpecific(checked === true)}
                      />
                      <label htmlFor="industrySpecific" className="text-sm">Industry-specific</label>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={generateSubjectLines} 
                    className="w-full"
                    disabled={!companyName.trim()}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Subject Lines
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-purple-600" />
                      <CardTitle>Generated Subject Lines</CardTitle>
                      {generatedSubjects.length > 0 && (
                        <Badge variant="secondary">{generatedSubjects.length}</Badge>
                      )}
                    </div>
                    
                    {generatedSubjects.length > 0 && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyAllSubjects}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadCSV}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          CSV
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedSubjects.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a company name and click "Generate Subject Lines" to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedSubjects.map((subject, index) => (
                        <Card key={index} className="bg-muted/20 hover:bg-muted/30 transition-colors">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {/* Subject Line */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <p className="font-medium text-foreground leading-relaxed">{subject.text}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {subject.type}
                                    </Badge>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${subject.sentiment === 'positive' ? 'border-green-300 text-green-700' : 
                                        subject.sentiment === 'negative' ? 'border-red-300 text-red-700' : 
                                        'border-gray-300 text-gray-700'}`}
                                    >
                                      {subject.sentiment}
                                    </Badge>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(subject.text)}
                                  className="shrink-0"
                                >
                                  {copiedItems.has(subject.text) ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>

                              {/* Metrics */}
                              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/50">
                                <div className="text-center">
                                  <div className={`text-lg font-semibold ${getScoreColor(subject.openRatePrediction)}`}>
                                    {subject.openRatePrediction.toFixed(1)}%
                                  </div>
                                  <div className="text-xs text-muted-foreground">Open Rate</div>
                                </div>
                                <div className="text-center">
                                  <div className={`text-lg font-semibold ${getScoreColor(subject.spamScore, true)}`}>
                                    {subject.spamScore}/10
                                  </div>
                                  <div className="text-xs text-muted-foreground">Spam Score</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-gray-600">
                                    {subject.length}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Characters</div>
                                </div>
                              </div>

                              {/* Triggers */}
                              {subject.triggers.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-2 border-t border-border/50">
                                  {subject.triggers.map((trigger, triggerIndex) => (
                                    <Badge key={triggerIndex} variant="secondary" className="text-xs">
                                      {trigger}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectLineGeneratorPage;
