import { useState } from "react";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TestTube2, 
  Copy, 
  Download, 
  Trophy,
  TrendingUp,
  BarChart3,
  Eye,
  MousePointer,
  Target,
  Zap,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

interface SubjectLineTest {
  subjectA: string;
  subjectB: string;
  industry: string;
  audience: string;
  emailType: string;
}

interface SubjectAnalysisFactor {
  factor: string;
  impact: number;
  description: string;
}

interface SubjectAnalysisResult {
  score: number;
  openRate: number;
  factors: SubjectAnalysisFactor[];
}

interface IndustryData {
  triggers: string[];
  multiplier: number;
  avgOpenRate: number;
}

interface TestResults {
  subjectA: SubjectAnalysisResult;
  subjectB: SubjectAnalysisResult;
  winner: 'A' | 'B' | 'tie';
  insights: string[];
  recommendations: string[];
}

const ABSubjectLineTesterPage = () => {
  const [test, setTest] = useState<SubjectLineTest>({
    subjectA: "",
    subjectB: "",
    industry: "technology",
    audience: "b2b",
    emailType: "cold_outreach"
  });
  
  const [results, setResults] = useState<TestResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState<string>("");

  const industryFactors = {
    technology: {
      triggers: ["demo", "platform", "solution", "integration", "API"],
      multiplier: 1.1,
      avgOpenRate: 0.23
    },
    healthcare: {
      triggers: ["patient", "care", "compliance", "HIPAA", "medical"],
      multiplier: 1.05,
      avgOpenRate: 0.25
    },
    finance: {
      triggers: ["ROI", "savings", "audit", "compliance", "risk"],
      multiplier: 1.08,
      avgOpenRate: 0.21
    },
    retail: {
      triggers: ["sales", "customer", "inventory", "conversion", "revenue"],
      multiplier: 1.12,
      avgOpenRate: 0.28
    },
    manufacturing: {
      triggers: ["efficiency", "production", "quality", "downtime", "operations"],
      multiplier: 1.06,
      avgOpenRate: 0.19
    }
  };

  const psychologyFactors = [
    { trigger: "urgency", words: ["urgent", "deadline", "expires", "limited time", "act now"], weight: 8 },
    { trigger: "curiosity", words: ["secret", "revealed", "discover", "hidden", "unknown"], weight: 7 },
    { trigger: "social_proof", words: ["others", "everyone", "customers", "users", "clients"], weight: 6 },
    { trigger: "personalization", words: ["you", "your", "custom", "personal", "tailored"], weight: 9 },
    { trigger: "benefit", words: ["save", "increase", "improve", "boost", "enhance"], weight: 7 },
    { trigger: "fear", words: ["missing", "lose", "behind", "risk", "danger"], weight: 5 },
    { trigger: "authority", words: ["expert", "proven", "certified", "official", "study"], weight: 6 },
    { trigger: "exclusivity", words: ["exclusive", "private", "select", "invitation", "VIP"], weight: 8 }
  ];

  const spamTriggers = [
    "free", "guaranteed", "100%", "money back", "act now", "click here", 
    "buy now", "order now", "limited time", "expires", "winner", "congratulations",
    "cash", "profit", "earn money", "make money", "get rich", "amazing deal"
  ];

  const runABTest = () => {
    if (!test.subjectA.trim() || !test.subjectB.trim()) {
      toast.error("Please enter both subject lines");
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const result = analyzeSubjectLines();
      setResults(result);
      setIsAnalyzing(false);
      toast.success(`Analysis complete - Subject ${result.winner.toUpperCase()} wins!`);
    }, 2000);
  };

  const analyzeSubjectLines = (): TestResults => {
    const industryData = industryFactors[test.industry as keyof typeof industryFactors];
    
    // Analyze Subject A
    const resultsA = analyzeSubject(test.subjectA, industryData);
    
    // Analyze Subject B  
    const resultsB = analyzeSubject(test.subjectB, industryData);

    // Determine winner
    let winner: 'A' | 'B' | 'tie' = 'tie';
    if (resultsA.score > resultsB.score + 5) {
      winner = 'A';
    } else if (resultsB.score > resultsA.score + 5) {
      winner = 'B';
    }

    // Generate insights
    const insights = generateInsights(resultsA, resultsB, winner);
    const recommendations = generateRecommendations(resultsA, resultsB);

    return {
      subjectA: resultsA,
      subjectB: resultsB,
      winner,
      insights,
      recommendations
    };
  };

  const analyzeSubject = (subject: string, industryData: IndustryData): SubjectAnalysisResult => {
    const lowerSubject = subject.toLowerCase();
    let score = 50; // Base score
    const factors = [];
    
    // Length analysis
    if (subject.length >= 30 && subject.length <= 50) {
      score += 10;
      factors.push({ factor: "Optimal length", impact: 10, description: "Subject line is in the ideal 30-50 character range" });
    } else if (subject.length < 30) {
      score -= 5;
      factors.push({ factor: "Too short", impact: -5, description: "Subject line may lack context" });
    } else {
      score -= 8;
      factors.push({ factor: "Too long", impact: -8, description: "May be truncated on mobile devices" });
    }

    // Psychology triggers
    psychologyFactors.forEach(factor => {
      const foundWords = factor.words.filter(word => lowerSubject.includes(word));
      if (foundWords.length > 0) {
        score += factor.weight;
        factors.push({
          factor: `${factor.trigger} trigger`,
          impact: factor.weight,
          description: `Contains ${foundWords.join(', ')} - triggers ${factor.trigger}`
        });
      }
    });

    // Industry relevance
    const industryWords = industryData.triggers.filter(trigger => lowerSubject.includes(trigger));
    if (industryWords.length > 0) {
      const impact = industryWords.length * 5;
      score += impact;
      factors.push({
        factor: "Industry relevance",
        impact,
        description: `Contains industry-specific terms: ${industryWords.join(', ')}`
      });
    }

    // Spam check
    const spamWords = spamTriggers.filter(spam => lowerSubject.includes(spam));
    if (spamWords.length > 0) {
      const penalty = spamWords.length * -8;
      score += penalty;
      factors.push({
        factor: "Spam risk",
        impact: penalty,
        description: `Contains potential spam words: ${spamWords.join(', ')}`
      });
    }

    // Personalization check
    if (lowerSubject.includes('{{') || lowerSubject.includes('[name]') || lowerSubject.includes('{name}')) {
      score += 12;
      factors.push({
        factor: "Personalization",
        impact: 12,
        description: "Contains personalization placeholders"
      });
    }

    // Question format bonus
    if (subject.includes('?')) {
      score += 6;
      factors.push({
        factor: "Question format",
        impact: 6,
        description: "Questions can increase curiosity and open rates"
      });
    }

    // Numbers bonus
    if (/\d/.test(subject)) {
      score += 4;
      factors.push({
        factor: "Contains numbers",
        impact: 4,
        description: "Numbers can increase credibility and specificity"
      });
    }

    // Calculate predicted open rate
    const baseOpenRate = industryData.avgOpenRate;
    const scoreMultiplier = (score / 50) * industryData.multiplier;
    const openRate = Math.max(0.05, Math.min(0.45, baseOpenRate * scoreMultiplier));

    return {
      score: Math.max(0, Math.min(100, score)),
      openRate: Math.round(openRate * 100) / 100,
      factors
    };
  };

  const generateInsights = (resultsA: SubjectAnalysisResult, resultsB: SubjectAnalysisResult, winner: string) => {
    const insights = [];
    
    if (winner === 'A') {
      insights.push(`Subject A scored ${resultsA.score - resultsB.score} points higher than Subject B`);
    } else if (winner === 'B') {
      insights.push(`Subject B scored ${resultsB.score - resultsA.score} points higher than Subject A`);
    } else {
      insights.push("Both subject lines scored very similarly - consider testing both");
    }

    // Add specific insights
    const highestFactorA = resultsA.factors.reduce((prev: SubjectAnalysisFactor, current: SubjectAnalysisFactor) => 
      (current.impact > prev.impact) ? current : prev, resultsA.factors[0]);
    const highestFactorB = resultsB.factors.reduce((prev: SubjectAnalysisFactor, current: SubjectAnalysisFactor) => 
      (current.impact > prev.impact) ? current : prev, resultsB.factors[0]);

    if (highestFactorA) {
      insights.push(`Subject A's strongest factor: ${highestFactorA.factor} (+${highestFactorA.impact})`);
    }
    if (highestFactorB) {
      insights.push(`Subject B's strongest factor: ${highestFactorB.factor} (+${highestFactorB.impact})`);
    }

    return insights;
  };

  const generateRecommendations = (resultsA: SubjectAnalysisResult, resultsB: SubjectAnalysisResult) => {
    const recommendations = [];
    
    // Length recommendations
    const avgLength = (resultsA.factors.find((f: SubjectAnalysisFactor) => f.factor.includes('length')) || 
                      resultsB.factors.find((f: SubjectAnalysisFactor) => f.factor.includes('length')));
    
    if (!avgLength) {
      recommendations.push("Consider keeping subject lines between 30-50 characters for optimal performance");
    }

    // Personalization
    const hasPersonalization = resultsA.factors.some((f: SubjectAnalysisFactor) => f.factor === "Personalization") ||
                              resultsB.factors.some((f: SubjectAnalysisFactor) => f.factor === "Personalization");
    if (!hasPersonalization) {
      recommendations.push("Add personalization tokens like {{firstName}} or {{company}} to increase relevance");
    }

    // Psychology triggers
    const psychTriggers = [...resultsA.factors, ...resultsB.factors].filter((f: SubjectAnalysisFactor) => 
      f.factor.includes('trigger')).length;
    if (psychTriggers < 2) {
      recommendations.push("Consider adding psychology triggers like curiosity, urgency, or social proof");
    }

    // Spam check
    const hasSpam = resultsA.factors.some((f: SubjectAnalysisFactor) => f.factor === "Spam risk") ||
                   resultsB.factors.some((f: SubjectAnalysisFactor) => f.factor === "Spam risk");
    if (hasSpam) {
      recommendations.push("Remove spam trigger words to improve deliverability");
    }

    return recommendations;
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(""), 2000);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadResults = () => {
    if (!results) return;

    const content = `A/B Subject Line Test Results
Generated: ${new Date().toLocaleDateString()}

Subject A: ${test.subjectA}
Score: ${results.subjectA.score}/100
Predicted Open Rate: ${(results.subjectA.openRate * 100).toFixed(1)}%

Subject B: ${test.subjectB}
Score: ${results.subjectB.score}/100
Predicted Open Rate: ${(results.subjectB.openRate * 100).toFixed(1)}%

Winner: Subject ${results.winner.toUpperCase()}

Insights:
${results.insights.map(insight => `• ${insight}`).join('\n')}

Recommendations:
${results.recommendations.map(rec => `• ${rec}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ab_test_results_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Results downloaded");
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 45) return "text-yellow-600";
    return "text-red-600";
  };

  const clearTest = () => {
    setTest({
      subjectA: "",
      subjectB: "",
      industry: "technology",
      audience: "b2b", 
      emailType: "cold_outreach"
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.abSubjectLineTester.title}
        description={seoConfig.abSubjectLineTester.description}
        keywords={seoConfig.abSubjectLineTester.keywords}
        canonical={seoConfig.abSubjectLineTester.canonical}
        schemaType={seoConfig.abSubjectLineTester.schemaType}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 rounded-full px-4 py-2 mb-6 border border-amber-200">
              <TestTube2 className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 text-sm font-medium">A/B Subject Line Tester</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              A/B Subject Line
              <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Performance Tester
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Test and compare two subject lines head-to-head. Get predictive open rates, 
              psychology analysis, and actionable recommendations to maximize email performance.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span>Predictive Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Open Rate Prediction</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>Psychology Analysis</span>
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
                    <TestTube2 className="w-5 h-5 text-amber-600" />
                    A/B Test Setup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subjectA">Subject Line A *</Label>
                    <Input 
                      id="subjectA"
                      placeholder="Enter first subject line to test"
                      value={test.subjectA}
                      onChange={(e) => setTest({...test, subjectA: e.target.value})}
                      className="mt-1"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {test.subjectA.length} characters
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subjectB">Subject Line B *</Label>
                    <Input 
                      id="subjectB"
                      placeholder="Enter second subject line to test"
                      value={test.subjectB}
                      onChange={(e) => setTest({...test, subjectB: e.target.value})}
                      className="mt-1"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {test.subjectB.length} characters
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Industry</Label>
                      <Select value={test.industry} onValueChange={(value) => setTest({...test, industry: value})}>
                        <SelectTrigger className="mt-1">
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
                      <Label>Email Type</Label>
                      <Select value={test.emailType} onValueChange={(value) => setTest({...test, emailType: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cold_outreach">Cold Outreach</SelectItem>
                          <SelectItem value="follow_up">Follow Up</SelectItem>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="transactional">Transactional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Target Audience</Label>
                    <Select value={test.audience} onValueChange={(value) => setTest({...test, audience: value})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="b2b">B2B Decision Makers</SelectItem>
                        <SelectItem value="b2c">B2C Consumers</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="smb">Small/Medium Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={runABTest}
                      disabled={isAnalyzing || !test.subjectA.trim() || !test.subjectB.trim()}
                      className="flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <TestTube2 className="w-4 h-4 mr-2" />
                          Run A/B Test
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={clearTest}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-6">
                {results ? (
                  <>
                    {/* Winner Announcement */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-600" />
                          Test Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-6">
                          <div className="text-3xl font-bold text-foreground mb-2">
                            Subject {results.winner.toUpperCase()} {results.winner === 'tie' ? 'TIE' : 'WINS!'}
                          </div>
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(test.subjectA, 'subjectA')}>
                              {copied === 'subjectA' ? <CheckCircle className="w-4 h-4 mr-1 text-green-600" /> : <Copy className="w-4 h-4 mr-1" />}
                              Copy A
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(test.subjectB, 'subjectB')}>
                              {copied === 'subjectB' ? <CheckCircle className="w-4 h-4 mr-1 text-green-600" /> : <Copy className="w-4 h-4 mr-1" />}
                              Copy B
                            </Button>
                            <Button variant="outline" size="sm" onClick={downloadResults}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>

                        {/* Subject A Results */}
                        <div className="space-y-4 mb-6">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-semibold">Subject A</h4>
                              <Badge variant="outline" className={results.winner === 'A' ? 'bg-green-100 text-green-800 border-green-200' : ''}>
                                {results.winner === 'A' && <Trophy className="w-3 h-3 mr-1" />}
                                Score: {results.subjectA.score}/100
                              </Badge>
                            </div>
                            <p className="text-sm font-mono mb-3 bg-white p-2 rounded border">
                              {test.subjectA}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Performance Score</div>
                                <div className={`font-bold text-lg ${getScoreColor(results.subjectA.score)}`}>
                                  {results.subjectA.score}/100
                                </div>
                                <Progress value={results.subjectA.score} className="h-2 mt-1" />
                              </div>
                              <div>
                                <div className="text-muted-foreground">Predicted Open Rate</div>
                                <div className="font-bold text-lg text-purple-600">
                                  {(results.subjectA.openRate * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Subject B Results */}
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-semibold">Subject B</h4>
                              <Badge variant="outline" className={results.winner === 'B' ? 'bg-green-100 text-green-800 border-green-200' : ''}>
                                {results.winner === 'B' && <Trophy className="w-3 h-3 mr-1" />}
                                Score: {results.subjectB.score}/100
                              </Badge>
                            </div>
                            <p className="text-sm font-mono mb-3 bg-white p-2 rounded border">
                              {test.subjectB}
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-muted-foreground">Performance Score</div>
                                <div className={`font-bold text-lg ${getScoreColor(results.subjectB.score)}`}>
                                  {results.subjectB.score}/100
                                </div>
                                <Progress value={results.subjectB.score} className="h-2 mt-1" />
                              </div>
                              <div>
                                <div className="text-muted-foreground">Predicted Open Rate</div>
                                <div className="font-bold text-lg text-purple-600">
                                  {(results.subjectB.openRate * 100).toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Insights */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          Key Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {results.insights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recommendations */}
                    {results.recommendations.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-amber-600" />
                            Optimization Tips
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {results.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <TestTube2 className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Run A/B Test</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Enter two subject lines to compare and get detailed performance analysis 
                        with predictive open rates and optimization recommendations.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">Predictive Scoring</Badge>
                        <Badge variant="outline">Psychology Analysis</Badge>
                        <Badge variant="outline">Industry Optimization</Badge>
                        <Badge variant="outline">Actionable Insights</Badge>
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

export default ABSubjectLineTesterPage;
