import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Zap,
  Target,
  Brain,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

interface SpamAnalysis {
  overallScore: number;
  deliverabilityRating: "excellent" | "good" | "poor" | "blocked";
  categories: {
    content: { score: number; issues: string[] };
    subject: { score: number; issues: string[] };
    technical: { score: number; issues: string[] };
    reputation: { score: number; issues: string[] };
  };
  suggestions: string[];
  riskFactors: Array<{ factor: string; impact: "high" | "medium" | "low"; description: string }>;
}

const SpamAnalyzerPage = () => {
  const [emailContent, setEmailContent] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [analysis, setAnalysis] = useState<SpamAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const spamTriggerWords = {
    high: [
      "free", "guaranteed", "no cost", "risk free", "100% satisfied", "money back",
      "act now", "limited time", "urgent", "expire", "winner", "congratulations",
      "cash", "profit", "earn money", "make money fast", "get rich", "millionaire",
      "viagra", "cialis", "pharmacy", "medication", "pills", "weight loss",
      "click here", "click now", "buy now", "order now", "call now", "sign up free"
    ],
    medium: [
      "special offer", "discount", "save", "deal", "promotion", "bonus",
      "exclusive", "limited", "only", "hurry", "don't delay", "act fast",
      "amazing", "incredible", "fantastic", "unbelievable", "revolutionary",
      "secret", "hidden", "revealed", "miracle", "breakthrough", "ultimate"
    ],
    low: [
      "best price", "lowest price", "compare", "cheap", "affordable", "bargain",
      "trial", "demo", "sample", "preview", "download", "subscribe",
      "newsletter", "updates", "information", "learn more", "find out"
    ]
  };

  const technicalIssues = [
    { check: "HTML structure", weight: 10 },
    { check: "Image-to-text ratio", weight: 8 },
    { check: "Link quantity", weight: 7 },
    { check: "URL shorteners", weight: 9 },
    { check: "Broken links", weight: 6 },
    { check: "Email authentication", weight: 10 }
  ];

  const analyzeEmail = () => {
    if (!emailContent.trim() && !subjectLine.trim()) {
      toast.error("Please enter email content or subject line");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const result = performSpamAnalysis();
      setAnalysis(result);
      setIsAnalyzing(false);
      toast.success("Spam analysis complete");
    }, 1500);
  };

  const performSpamAnalysis = (): SpamAnalysis => {
    const contentText = emailContent.toLowerCase();
    const subjectText = subjectLine.toLowerCase();
    const combinedText = `${contentText} ${subjectText}`;

    // Content Analysis
    const contentIssues: string[] = [];
    let contentScore = 0;

    // Check for spam trigger words
    spamTriggerWords.high.forEach(word => {
      if (combinedText.includes(word)) {
        contentScore += 15;
        contentIssues.push(`High-risk word: "${word}"`);
      }
    });

    spamTriggerWords.medium.forEach(word => {
      if (combinedText.includes(word)) {
        contentScore += 8;
        contentIssues.push(`Medium-risk word: "${word}"`);
      }
    });

    spamTriggerWords.low.forEach(word => {
      if (combinedText.includes(word)) {
        contentScore += 3;
        contentIssues.push(`Low-risk word: "${word}"`);
      }
    });

    // Check for excessive capitalization
    const capsCount = (emailContent.match(/[A-Z]/g) || []).length;
    const totalLetters = (emailContent.match(/[a-zA-Z]/g) || []).length;
    if (totalLetters > 0 && (capsCount / totalLetters) > 0.3) {
      contentScore += 12;
      contentIssues.push("Excessive capitalization detected");
    }

    // Check for excessive exclamation marks
    const exclamationCount = (emailContent.match(/!/g) || []).length;
    if (exclamationCount > 3) {
      contentScore += 8;
      contentIssues.push(`Too many exclamation marks (${exclamationCount})`);
    }

    // Check for suspicious characters
    if (/[$]{2,}/.test(emailContent)) {
      contentScore += 10;
      contentIssues.push("Multiple dollar signs detected");
    }

    // Subject Line Analysis
    const subjectIssues: string[] = [];
    let subjectScore = 0;

    if (subjectLine.length > 50) {
      subjectScore += 5;
      subjectIssues.push("Subject line too long");
    }

    if (subjectLine.length < 5) {
      subjectScore += 8;
      subjectIssues.push("Subject line too short");
    }

    if (/^(RE:|FW:|FWD:)/i.test(subjectLine)) {
      subjectScore += 6;
      subjectIssues.push("Fake reply/forward detected");
    }

    if (/[A-Z]{3,}/.test(subjectLine)) {
      subjectScore += 7;
      subjectIssues.push("All caps words in subject");
    }

    if ((subjectLine.match(/!/g) || []).length > 1) {
      subjectScore += 5;
      subjectIssues.push("Multiple exclamation marks in subject");
    }

    // Technical Analysis
    const technicalIssues: string[] = [];
    let technicalScore = 0;

    // Check HTML content ratio
    const htmlTags = (emailContent.match(/<[^>]*>/g) || []).length;
    if (htmlTags > 10) {
      technicalScore += 6;
      technicalIssues.push("Heavy HTML content");
    }

    // Check for suspicious links
    const urlCount = (emailContent.match(/https?:\/\/[^\s]+/g) || []).length;
    if (urlCount > 5) {
      technicalScore += 8;
      technicalIssues.push(`Too many links (${urlCount})`);
    }

    // Check for URL shorteners
    if (/bit\.ly|tinyurl|goo\.gl|t\.co/.test(emailContent)) {
      technicalScore += 12;
      technicalIssues.push("URL shorteners detected");
    }

    // Check for missing unsubscribe
    if (!emailContent.toLowerCase().includes("unsubscribe") && emailContent.length > 200) {
      technicalScore += 10;
      technicalIssues.push("Missing unsubscribe link");
    }

    // Reputation Analysis
    const reputationIssues: string[] = [];
    let reputationScore = 0;

    // Check sender domain
    if (senderEmail) {
      const domain = senderEmail.split('@')[1];
      if (domain && domain.includes('gmail.com')) {
        reputationScore += 3;
        reputationIssues.push("Using free email provider");
      }
      
      if (domain && domain.includes('noreply')) {
        reputationScore += 5;
        reputationIssues.push("No-reply sender address");
      }
    }

    // Calculate overall score
    const overallScore = Math.min(100, contentScore + subjectScore + technicalScore + reputationScore);

    // Determine deliverability rating
    let deliverabilityRating: "excellent" | "good" | "poor" | "blocked";
    if (overallScore <= 15) deliverabilityRating = "excellent";
    else if (overallScore <= 30) deliverabilityRating = "good";
    else if (overallScore <= 60) deliverabilityRating = "poor";
    else deliverabilityRating = "blocked";

    // Generate suggestions
    const suggestions: string[] = [];
    if (contentIssues.length > 0) suggestions.push("Review and reduce spam trigger words");
    if (subjectIssues.length > 0) suggestions.push("Optimize subject line length and formatting");
    if (technicalIssues.length > 0) suggestions.push("Improve technical email structure");
    if (overallScore > 30) suggestions.push("Consider A/B testing different versions");
    if (exclamationCount > 2) suggestions.push("Reduce exclamation marks for better deliverability");

    // Generate risk factors
    const riskFactors = [
      ...(contentScore > 20 ? [{ factor: "High-risk content words", impact: "high" as const, description: "Multiple spam trigger words detected" }] : []),
      ...(subjectScore > 15 ? [{ factor: "Problematic subject line", impact: "medium" as const, description: "Subject line contains spam indicators" }] : []),
      ...(technicalScore > 20 ? [{ factor: "Technical issues", impact: "high" as const, description: "Email structure needs improvement" }] : []),
      ...(urlCount > 3 ? [{ factor: "Too many links", impact: "medium" as const, description: "High link count may trigger spam filters" }] : [])
    ];

    return {
      overallScore,
      deliverabilityRating,
      categories: {
        content: { score: Math.min(100, contentScore), issues: contentIssues },
        subject: { score: Math.min(100, subjectScore), issues: subjectIssues },
        technical: { score: Math.min(100, technicalScore), issues: technicalIssues },
        reputation: { score: Math.min(100, reputationScore), issues: reputationIssues }
      },
      suggestions,
      riskFactors
    };
  };

  const getScoreColor = (score: number) => {
    if (score <= 15) return "text-green-600";
    if (score <= 30) return "text-yellow-600";
    if (score <= 60) return "text-orange-600";
    return "text-red-600";
  };

  const getDeliverabilityColor = (rating: string) => {
    switch (rating) {
      case "excellent": return "bg-green-100 text-green-800 border-green-200";
      case "good": return "bg-blue-100 text-blue-800 border-blue-200";
      case "poor": return "bg-orange-100 text-orange-800 border-orange-200";
      case "blocked": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const clearAnalysis = () => {
    setEmailContent("");
    setSubjectLine("");
    setSenderEmail("");
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.spamAnalyzer.title}
        description={seoConfig.spamAnalyzer.description}
        keywords={seoConfig.spamAnalyzer.keywords}
        canonical={seoConfig.spamAnalyzer.canonical}
        schemaType={seoConfig.spamAnalyzer.schemaType}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-4 py-2 mb-6 border border-red-200">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-red-700 text-sm font-medium">Spam Analyzer</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Email Spam
              <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Score Analyzer
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Analyze your email content for spam triggers and deliverability issues. 
              Get detailed insights and actionable suggestions to improve inbox placement.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Deliverability Score</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span>Actionable Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Input Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Email Content Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subjectLine">Subject Line</Label>
                    <input
                      id="subjectLine"
                      placeholder="Enter your email subject line"
                      value={subjectLine}
                      onChange={(e) => setSubjectLine(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="senderEmail">Sender Email (Optional)</Label>
                    <input
                      id="senderEmail"
                      placeholder="sender@example.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailContent">Email Content</Label>
                    <Textarea 
                      id="emailContent"
                      placeholder="Paste your email content here (HTML or plain text)"
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      rows={12}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={analyzeEmail}
                      disabled={isAnalyzing || (!emailContent.trim() && !subjectLine.trim())}
                      className="flex-1"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Spam Score"}
                    </Button>
                    <Button variant="outline" onClick={clearAnalysis}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-6">
                {analysis ? (
                  <>
                    {/* Overall Score */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-purple-600" />
                          Spam Score Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-6">
                          <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                            {analysis.overallScore}/100
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Spam Risk Score</div>
                          <Badge className={`mt-2 ${getDeliverabilityColor(analysis.deliverabilityRating)}`}>
                            {analysis.deliverabilityRating.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          {/* Category Scores */}
                          {Object.entries(analysis.categories).map(([category, data]) => (
                            <div key={category}>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium capitalize">{category}</span>
                                <span className={`text-sm font-medium ${getScoreColor(data.score)}`}>
                                  {data.score}/100
                                </span>
                              </div>
                              <Progress value={data.score} className="h-2" />
                              {data.issues.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {data.issues.map((issue, index) => (
                                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                                      <XCircle className="w-3 h-3 text-red-500" />
                                      {issue}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Risk Factors */}
                    {analysis.riskFactors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            Risk Factors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {analysis.riskFactors.map((risk, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{risk.factor}</span>
                                    <Badge className={getRiskColor(risk.impact)}>
                                      {risk.impact}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{risk.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Suggestions */}
                    {analysis.suggestions.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Improvement Suggestions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {analysis.suggestions.map((suggestion, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                      <p className="text-muted-foreground text-center">
                        Enter your email content and subject line to get a comprehensive spam score analysis
                      </p>
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

export default SpamAnalyzerPage;
