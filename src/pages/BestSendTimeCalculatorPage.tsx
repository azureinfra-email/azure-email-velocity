import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Copy, 
  Download, 
  Globe,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Zap,
  RefreshCw,
  CheckCircle,
  BarChart3,
  MapPin,
  TestTube2
} from "lucide-react";
import { toast } from "sonner";

interface SendTimeSettings {
  industry: string;
  audienceType: string;
  emailType: string;
  targetTimezone: string;
  campaignGoal: string;
  audienceRegions: string[];
}

interface TimeSlot {
  hour: number;
  day: string;
  score: number;
  openRate: number;
  clickRate: number;
  region: string;
}

interface IndustryData {
  peakDays: string[];
  peakHours: number[];
  avoidHours: number[];
  baseOpenRate: number;
}

interface AudienceMultipliers {
  workingHours: number;
  weekends: number;
  evenings: number;
}

interface TimezoneRecommendation {
  timezone: string;
  bestHour: number;
  score: number;
  reasoning: string;
}

interface SendTimeResults {
  bestTimes: TimeSlot[];
  heatmapData: Array<{
    day: string;
    hour: number;
    score: number;
    openRate: number;
    tooltip: string;
  }>;
  timezoneRecommendations: TimezoneRecommendation[];
  abTestSchedules: Array<{
    name: string;
    schedule: Array<{ day: string; time: string; timezone: string }>;
    rationale: string;
  }>;
  insights: string[];
  recommendations: string[];
}

const BestSendTimeCalculatorPage = () => {
  const [settings, setSettings] = useState<SendTimeSettings>({
    industry: "technology",
    audienceType: "b2b",
    emailType: "cold_outreach",
    targetTimezone: "America/New_York",
    campaignGoal: "meetings",
    audienceRegions: ["North America"]
  });
  
  const [results, setResults] = useState<SendTimeResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("heatmap");
  const [copied, setCopied] = useState("");

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (EST/EDT)", offset: -5 },
    { value: "America/Chicago", label: "Central Time (CST/CDT)", offset: -6 },
    { value: "America/Denver", label: "Mountain Time (MST/MDT)", offset: -7 },
    { value: "America/Los_Angeles", label: "Pacific Time (PST/PDT)", offset: -8 },
    { value: "Europe/London", label: "London (GMT/BST)", offset: 0 },
    { value: "Europe/Paris", label: "Central European Time", offset: 1 },
    { value: "Asia/Tokyo", label: "Japan Standard Time", offset: 9 },
    { value: "Asia/Shanghai", label: "China Standard Time", offset: 8 },
    { value: "Asia/Kolkata", label: "India Standard Time", offset: 5.5 },
    { value: "Australia/Sydney", label: "Australian Eastern Time", offset: 10 }
  ];

  const regions = [
    "North America", "Europe", "Asia-Pacific", "Latin America", "Middle East", "Africa"
  ];

  const industryData = {
    technology: {
      peakDays: ["Tuesday", "Wednesday", "Thursday"],
      peakHours: [9, 10, 14, 15],
      avoidHours: [0, 1, 2, 3, 4, 5, 6, 22, 23],
      baseOpenRate: 0.23
    },
    healthcare: {
      peakDays: ["Tuesday", "Wednesday", "Thursday"],
      peakHours: [8, 9, 13, 14],
      avoidHours: [0, 1, 2, 3, 4, 5, 6, 19, 20, 21, 22, 23],
      baseOpenRate: 0.25
    },
    finance: {
      peakDays: ["Tuesday", "Wednesday", "Thursday"],
      peakHours: [8, 9, 10, 14, 15, 16],
      avoidHours: [0, 1, 2, 3, 4, 5, 6, 7, 17, 18, 19, 20, 21, 22, 23],
      baseOpenRate: 0.21
    },
    retail: {
      peakDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      peakHours: [10, 11, 14, 15, 19, 20],
      avoidHours: [0, 1, 2, 3, 4, 5, 6, 7],
      baseOpenRate: 0.28
    },
    manufacturing: {
      peakDays: ["Tuesday", "Wednesday", "Thursday"],
      peakHours: [8, 9, 14, 15],
      avoidHours: [0, 1, 2, 3, 4, 5, 6, 17, 18, 19, 20, 21, 22, 23],
      baseOpenRate: 0.19
    }
  };

  const audienceTypeMultipliers = {
    b2b: { workingHours: 1.4, weekends: 0.3, evenings: 0.6 },
    b2c: { workingHours: 1.0, weekends: 1.2, evenings: 1.3 },
    enterprise: { workingHours: 1.5, weekends: 0.2, evenings: 0.4 },
    smb: { workingHours: 1.3, weekends: 0.7, evenings: 0.8 }
  };

  const calculateSendTimes = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const result = generateSendTimeAnalysis();
      setResults(result);
      setIsAnalyzing(false);
      toast.success("Send time analysis complete!");
    }, 2000);
  };

  const generateSendTimeAnalysis = (): SendTimeResults => {
    const industry = industryData[settings.industry as keyof typeof industryData];
    const audienceMultipliers = audienceTypeMultipliers[settings.audienceType as keyof typeof audienceTypeMultipliers];

    // Generate heatmap data
    const heatmapData = generateHeatmapData(industry, audienceMultipliers);

    // Find best times
    const bestTimes = heatmapData
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(slot => ({
        hour: slot.hour,
        day: slot.day,
        score: slot.score,
        openRate: slot.openRate,
        clickRate: slot.openRate * 0.15, // Rough CTR estimate
        region: "Primary"
      }));

    // Generate timezone recommendations
    const timezoneRecommendations = generateTimezoneRecommendations(bestTimes);

    // Generate A/B test schedules
    const abTestSchedules = generateABTestSchedules(bestTimes, timezoneRecommendations);

    // Generate insights and recommendations
    const insights = generateInsights(bestTimes, industry);
    const recommendations = generateRecommendations(settings, bestTimes);

    return {
      bestTimes,
      heatmapData,
      timezoneRecommendations,
      abTestSchedules,
      insights,
      recommendations
    };
  };

  const generateHeatmapData = (industry: IndustryData, audienceMultipliers: AudienceMultipliers) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const heatmapData = [];

    for (const day of days) {
      for (let hour = 0; hour < 24; hour++) {
        let score = 30; // Base score

        // Industry peak hours
        if (industry.peakHours.includes(hour)) {
          score += 25;
        }

        // Industry peak days
        if (industry.peakDays.includes(day)) {
          score += 15;
        }

        // Avoid hours penalty
        if (industry.avoidHours.includes(hour)) {
          score -= 20;
        }

        // Audience type adjustments
        const isWorkingHours = hour >= 8 && hour <= 17;
        const isEvening = hour >= 18 && hour <= 21;
        const isWeekend = day === "Saturday" || day === "Sunday";

        if (isWorkingHours && !isWeekend) {
          score *= audienceMultipliers.workingHours;
        } else if (isEvening && !isWeekend) {
          score *= audienceMultipliers.evenings;
        } else if (isWeekend) {
          score *= audienceMultipliers.weekends;
        }

        // Email type adjustments
        if (settings.emailType === "cold_outreach" && (hour < 8 || hour > 18)) {
          score *= 0.7;
        } else if (settings.emailType === "newsletter" && isWeekend) {
          score *= 1.2;
        } else if (settings.emailType === "promotional" && (hour >= 19 && hour <= 21)) {
          score *= 1.3;
        }

        // Calculate open rate
        const openRate = Math.max(0.05, Math.min(0.45, 
          (industry.baseOpenRate * (score / 50)) * (0.8 + Math.random() * 0.4)
        ));

        score = Math.max(0, Math.min(100, score));

        heatmapData.push({
          day,
          hour,
          score: Math.round(score),
          openRate: Math.round(openRate * 100) / 100,
          tooltip: `${day} ${formatHour(hour)}: ${Math.round(score)} score, ${Math.round(openRate * 100)}% open rate`
        });
      }
    }

    return heatmapData;
  };

  const generateTimezoneRecommendations = (bestTimes: TimeSlot[]): TimezoneRecommendation[] => {
    return timezones.slice(0, 5).map(tz => {
      const bestTime = bestTimes[0];
      const adjustedHour = (bestTime.hour + tz.offset) % 24;
      
      return {
        timezone: tz.label,
        bestHour: adjustedHour,
        score: bestTime.score * (0.8 + Math.random() * 0.4),
        reasoning: `Optimal for ${settings.audienceType} audiences in ${tz.label.split('(')[0]} region`
      };
    });
  };

  const generateABTestSchedules = (bestTimes: TimeSlot[], timezoneRecs: TimezoneRecommendation[]) => {
    const topTime = bestTimes[0];
    const secondTime = bestTimes[1];
    const thirdTime = bestTimes[2];

    return [
      {
        name: "Peak Performance Schedule",
        schedule: [
          { day: topTime.day, time: formatHour(topTime.hour), timezone: settings.targetTimezone },
          { day: secondTime.day, time: formatHour(secondTime.hour), timezone: settings.targetTimezone },
          { day: thirdTime.day, time: formatHour(thirdTime.hour), timezone: settings.targetTimezone }
        ],
        rationale: "Tests the top 3 highest-scoring time slots for maximum engagement"
      },
      {
        name: "Day Variation Test",
        schedule: [
          { day: "Tuesday", time: formatHour(topTime.hour), timezone: settings.targetTimezone },
          { day: "Wednesday", time: formatHour(topTime.hour), timezone: settings.targetTimezone },
          { day: "Thursday", time: formatHour(topTime.hour), timezone: settings.targetTimezone }
        ],
        rationale: "Tests same optimal time across different weekdays to find best day"
      },
      {
        name: "Time Variation Test",
        schedule: [
          { day: topTime.day, time: formatHour(9), timezone: settings.targetTimezone },
          { day: topTime.day, time: formatHour(14), timezone: settings.targetTimezone },
          { day: topTime.day, time: formatHour(16), timezone: settings.targetTimezone }
        ],
        rationale: "Tests different hours on the same optimal day"
      },
      {
        name: "Global Timezone Test",
        schedule: timezoneRecs.slice(0, 3).map(tz => ({
          day: topTime.day,
          time: formatHour(tz.bestHour),
          timezone: tz.timezone
        })),
        rationale: "Tests optimal local times across different regions"
      }
    ];
  };

  const generateInsights = (bestTimes: TimeSlot[], industry: IndustryData) => {
    const insights = [];
    
    const topTime = bestTimes[0];
    insights.push(`Best time: ${topTime.day} at ${formatHour(topTime.hour)} with ${topTime.score}/100 score`);
    
    const topDays = [...new Set(bestTimes.slice(0, 5).map(t => t.day))];
    insights.push(`Top performing days: ${topDays.join(', ')}`);

    const avgScore = bestTimes.slice(0, 5).reduce((sum, t) => sum + t.score, 0) / 5;
    insights.push(`Average top 5 performance score: ${Math.round(avgScore)}/100`);

    if (settings.audienceType === 'b2b') {
      insights.push("B2B audiences respond best during business hours on weekdays");
    } else if (settings.audienceType === 'b2c') {
      insights.push("B2C audiences show higher engagement during evenings and weekends");
    }

    return insights;
  };

  const generateRecommendations = (settings: SendTimeSettings, bestTimes: TimeSlot[]) => {
    const recommendations = [];

    recommendations.push("Start with the top 3 time slots for your initial campaigns");
    
    if (settings.audienceRegions.length > 1) {
      recommendations.push("Consider timezone-specific campaigns for multi-region audiences");
    }

    if (settings.emailType === "cold_outreach") {
      recommendations.push("Avoid very early morning or late evening sends for cold emails");
    }

    recommendations.push("Run A/B tests for at least 2-3 weeks to gather statistically significant data");
    recommendations.push("Monitor performance by day of week and adjust schedule accordingly");

    return recommendations;
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    if (score >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const getHeatmapCellStyle = (score: number) => {
    if (score >= 75) return "bg-green-500 hover:bg-green-600";
    if (score >= 50) return "bg-yellow-400 hover:bg-yellow-500";
    if (score >= 25) return "bg-orange-400 hover:bg-orange-500";
    return "bg-red-400 hover:bg-red-500";
  };

  const getScoreOpacity = (score: number) => {
    return Math.max(0.1, score / 100);
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

    const content = `Best Send Time Analysis
Generated: ${new Date().toLocaleDateString()}

Settings:
- Industry: ${settings.industry}
- Audience: ${settings.audienceType}
- Email Type: ${settings.emailType}
- Target Timezone: ${settings.targetTimezone}

TOP 5 BEST SEND TIMES:
${results.bestTimes.slice(0, 5).map((time, i) => 
  `${i + 1}. ${time.day} at ${formatHour(time.hour)} - Score: ${time.score}/100, Open Rate: ${(time.openRate * 100).toFixed(1)}%`
).join('\n')}

TIMEZONE RECOMMENDATIONS:
${results.timezoneRecommendations.map(tz => 
  `${tz.timezone}: ${formatHour(tz.bestHour)} (Score: ${Math.round(tz.score)})`
).join('\n')}

A/B TEST SCHEDULES:
${results.abTestSchedules.map(schedule => 
  `${schedule.name}:
${schedule.schedule.map(s => `  - ${s.day} at ${s.time} (${s.timezone})`).join('\n')}
  Rationale: ${schedule.rationale}`
).join('\n\n')}

KEY INSIGHTS:
${results.insights.map(insight => `• ${insight}`).join('\n')}

RECOMMENDATIONS:
${results.recommendations.map(rec => `• ${rec}`).join('\n')}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `send_time_analysis_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Analysis downloaded");
  };

  const clearAnalysis = () => {
    setSettings({
      industry: "technology",
      audienceType: "b2b",
      emailType: "cold_outreach",
      targetTimezone: "America/New_York",
      campaignGoal: "meetings",
      audienceRegions: ["North America"]
    });
    setResults(null);
    setActiveTab("heatmap");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.bestSendTimeCalculator.title}
        description={seoConfig.bestSendTimeCalculator.description}
        keywords={seoConfig.bestSendTimeCalculator.keywords}
        canonical={seoConfig.bestSendTimeCalculator.canonical}
        schemaType={seoConfig.bestSendTimeCalculator.schemaType}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6 border border-blue-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Best Send Time Calculator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Optimal Email
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Send Time Calculator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find the perfect send times for your email campaigns with data-driven insights,
              timezone optimization, and A/B testing schedules tailored to your audience.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Visual Heatmap</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-600" />
                <span>Multi-Timezone</span>
              </div>
              <div className="flex items-center gap-2">
                <TestTube2 className="w-4 h-4 text-purple-600" />
                <span>A/B Test Plans</span>
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
                <Card className="shadow-lg border-t-4 border-t-blue-500">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Campaign Settings
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Configure your campaign parameters for personalized recommendations</p>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Industry
                      </Label>
                      <Select value={settings.industry} onValueChange={(value) => setSettings({...settings, industry: value})}>
                        <SelectTrigger className="border-2 hover:border-blue-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">💻 Technology</SelectItem>
                          <SelectItem value="healthcare">🏥 Healthcare</SelectItem>
                          <SelectItem value="finance">💰 Finance</SelectItem>
                          <SelectItem value="retail">🛍️ Retail</SelectItem>
                          <SelectItem value="manufacturing">🏭 Manufacturing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Target Audience
                      </Label>
                      <Select value={settings.audienceType} onValueChange={(value) => setSettings({...settings, audienceType: value})}>
                        <SelectTrigger className="border-2 hover:border-green-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="b2b">👔 B2B Decision Makers</SelectItem>
                          <SelectItem value="b2c">👥 B2C Consumers</SelectItem>
                          <SelectItem value="enterprise">🏢 Enterprise</SelectItem>
                          <SelectItem value="smb">🏪 Small/Medium Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Email Type
                      </Label>
                      <Select value={settings.emailType} onValueChange={(value) => setSettings({...settings, emailType: value})}>
                        <SelectTrigger className="border-2 hover:border-purple-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cold_outreach">❄️ Cold Outreach</SelectItem>
                          <SelectItem value="follow_up">🔄 Follow Up</SelectItem>
                          <SelectItem value="newsletter">📰 Newsletter</SelectItem>
                          <SelectItem value="promotional">🎯 Promotional</SelectItem>
                          <SelectItem value="transactional">💳 Transactional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Primary Timezone
                      </Label>
                      <Select value={settings.targetTimezone} onValueChange={(value) => setSettings({...settings, targetTimezone: value})}>
                        <SelectTrigger className="border-2 hover:border-orange-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map(tz => (
                            <SelectItem key={tz.value} value={tz.value}>
                              🌍 {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Campaign Goal
                      </Label>
                      <Select value={settings.campaignGoal} onValueChange={(value) => setSettings({...settings, campaignGoal: value})}>
                        <SelectTrigger className="border-2 hover:border-red-300 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meetings">📅 Book Meetings</SelectItem>
                          <SelectItem value="sales">💰 Drive Sales</SelectItem>
                          <SelectItem value="leads">📈 Generate Leads</SelectItem>
                          <SelectItem value="engagement">💬 Increase Engagement</SelectItem>
                          <SelectItem value="awareness">📢 Brand Awareness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-3 pt-6 border-t">
                      <Button 
                        onClick={calculateSendTimes}
                        disabled={isAnalyzing}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        size="lg"
                      >
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-2" />
                            Calculate Send Times
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={clearAnalysis} size="lg" className="hover:bg-gray-50">
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2">
                {results ? (
                  <div className="space-y-6">
                    
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            Send Time Analysis
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={downloadResults}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                            <TabsTrigger value="best-times">Best Times</TabsTrigger>
                            <TabsTrigger value="timezones">Timezones</TabsTrigger>
                            <TabsTrigger value="ab-tests">A/B Tests</TabsTrigger>
                          </TabsList>

                          <TabsContent value="heatmap" className="mt-6">
                            <div className="space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                  <h4 className="font-semibold text-lg">Weekly Send Time Heatmap</h4>
                                  <p className="text-sm text-muted-foreground">Click on cells to see detailed metrics</p>
                                </div>
                                <div className="flex items-center gap-6 text-xs">
                                  <span className="font-medium text-muted-foreground">Performance:</span>
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
                                    <span>Poor (0-25)</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                                    <span>Fair (25-50)</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
                                    <span>Good (50-75)</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                    <span>Excellent (75+)</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Heatmap Grid */}
                              <div className="bg-white border border-border rounded-lg p-6 overflow-x-auto shadow-sm">
                                {/* Hours Header */}
                                <div className="flex mb-3">
                                  <div className="w-16 flex-shrink-0"></div>
                                  <div className="flex gap-0.5 flex-1">
                                    {Array.from({length: 24}, (_, i) => (
                                      <div key={i} className="flex-1 min-w-[28px] text-center">
                                        <div className="text-xs font-medium text-muted-foreground pb-1">
                                          {i === 0 ? '12A' : i < 12 ? `${i}A` : i === 12 ? '12P' : `${i-12}P`}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Heatmap Rows */}
                                <div className="space-y-1">
                                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                    <div key={day} className="flex">
                                      <div className="w-16 flex-shrink-0 flex items-center">
                                        <div className="text-sm font-medium text-muted-foreground pr-2">
                                          {day.slice(0, 3)}
                                        </div>
                                      </div>
                                      <div className="flex gap-0.5 flex-1">
                                        {Array.from({length: 24}, (_, hour) => {
                                          const dataPoint = results.heatmapData.find(d => d.day === day && d.hour === hour);
                                          const score = dataPoint?.score || 0;
                                          return (
                                            <div
                                              key={hour}
                                              className={`flex-1 min-w-[28px] h-8 rounded-sm cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md border border-gray-200 ${getHeatmapCellStyle(score)}`}
                                              title={dataPoint?.tooltip}
                                              onClick={() => {
                                                if (dataPoint) {
                                                  toast.info(`${day} ${formatHour(hour)}: ${score}/100 score, ${Math.round(dataPoint.openRate * 100)}% open rate`);
                                                }
                                              }}
                                            />
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                {/* Best Time Indicators */}
                                <div className="mt-6 pt-4 border-t border-border">
                                  <div className="flex items-center gap-4 text-xs">
                                    <span className="font-medium text-muted-foreground">Quick Stats:</span>
                                    <div className="flex items-center gap-1">
                                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                      <span>Peak: {results.bestTimes[0] ? `${results.bestTimes[0].day} ${formatHour(results.bestTimes[0].hour)}` : 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <BarChart3 className="w-3 h-3 text-muted-foreground" />
                                      <span>Avg Score: {Math.round(results.bestTimes.slice(0, 5).reduce((sum, t) => sum + t.score, 0) / 5)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="best-times" className="mt-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold text-lg">Top 10 Send Times</h4>
                                  <p className="text-sm text-muted-foreground">Ranked by performance score and engagement metrics</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  Industry: {settings.industry}
                                </Badge>
                              </div>
                              <div className="grid gap-3">
                                {results.bestTimes.slice(0, 10).map((time, index) => (
                                  <div key={index} className="group">
                                    <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200">
                                      <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-4">
                                            <div className="flex flex-col items-center">
                                              <Badge 
                                                variant={index < 3 ? "default" : "secondary"}
                                                className={`mb-1 ${
                                                  index === 0 ? "bg-gold text-white" : 
                                                  index === 1 ? "bg-gray-400 text-white" : 
                                                  index === 2 ? "bg-amber-600 text-white" : ""
                                                }`}
                                              >
                                                #{index + 1}
                                              </Badge>
                                              <div className={`w-3 h-3 rounded-full ${getScoreColor(time.score)}`}></div>
                                            </div>
                                            <div className="space-y-1">
                                              <div className="font-semibold text-lg flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                {time.day} at {formatHour(time.hour)}
                                              </div>
                                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                  <BarChart3 className="w-3 h-3" />
                                                  <span>Open: {(time.openRate * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                  <Target className="w-3 h-3" />
                                                  <span>Click: {(time.clickRate * 100).toFixed(1)}%</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            <div className="text-right">
                                              <div className="font-bold text-2xl text-blue-600">{time.score}</div>
                                              <div className="text-xs text-muted-foreground">out of 100</div>
                                            </div>
                                            <Button 
                                              size="sm" 
                                              variant="outline"
                                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                                              onClick={() => copyToClipboard(`${time.day} ${formatHour(time.hour)}`, `time-${index}`)}
                                            >
                                              {copied === `time-${index}` ? 
                                                <CheckCircle className="w-3 h-3 text-green-600" /> : 
                                                <Copy className="w-3 h-3" />
                                              }
                                            </Button>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="timezones" className="mt-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg">Timezone Optimization</h4>
                                <p className="text-sm text-muted-foreground">Optimal send times adjusted for different global regions</p>
                              </div>
                              <div className="grid gap-4">
                                {results.timezoneRecommendations.map((tz, index) => (
                                  <Card key={index} className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                                    <CardContent className="p-5">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3 flex-1">
                                          <div className="p-2 bg-green-50 rounded-lg">
                                            <MapPin className="w-5 h-5 text-green-600" />
                                          </div>
                                          <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3">
                                              <h5 className="font-semibold text-base">{tz.timezone}</h5>
                                              <Badge variant="outline" className="text-green-700 border-green-200">
                                                Score: {Math.round(tz.score)}
                                              </Badge>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                                              <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span className="text-muted-foreground">Optimal Time:</span>
                                                <span className="font-medium text-blue-600">{formatHour(tz.bestHour)}</span>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-green-600" />
                                                <span className="text-muted-foreground">Performance:</span>
                                                <span className="font-medium">{Math.round(tz.score)}/100</span>
                                              </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg border-l-2 border-gray-300">
                                              <strong>Strategy:</strong> {tz.reasoning}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="ab-tests" className="mt-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-lg">A/B Testing Schedules</h4>
                                <p className="text-sm text-muted-foreground">Pre-built testing frameworks to validate optimal send times</p>
                              </div>
                              <div className="grid gap-5">
                                {results.abTestSchedules.map((schedule, index) => (
                                  <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                                    <CardContent className="p-5">
                                      <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-50 rounded-lg">
                                              <TestTube2 className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <h5 className="font-semibold text-lg">{schedule.name}</h5>
                                          </div>
                                          <Button 
                                            size="sm" 
                                            variant="outline"
                                            className="hover:bg-purple-50 hover:border-purple-300"
                                            onClick={() => copyToClipboard(
                                              `${schedule.name}\n${schedule.schedule.map(s => `${s.day} ${s.time} ${s.timezone}`).join('\n')}`,
                                              `schedule-${index}`
                                            )}
                                          >
                                            {copied === `schedule-${index}` ? 
                                              <CheckCircle className="w-3 h-3 mr-1 text-green-600" /> : 
                                              <Copy className="w-3 h-3 mr-1" />
                                            }
                                            Copy Schedule
                                          </Button>
                                        </div>
                                        
                                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
                                          <div className="grid gap-2">
                                            {schedule.schedule.map((item, i) => (
                                              <div key={i} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                                <div className="flex items-center gap-3">
                                                  <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                                                    Test {i + 1}
                                                  </Badge>
                                                  <span className="font-medium">{item.day}</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm">
                                                  <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-blue-600" />
                                                    <span className="font-medium text-blue-600">{item.time}</span>
                                                  </div>
                                                  <div className="flex items-center gap-1">
                                                    <Globe className="w-3 h-3 text-green-600" />
                                                    <span className="text-muted-foreground text-xs">{item.timezone}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        
                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                          <div className="flex items-start gap-2">
                                            <Zap className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <div>
                                              <p className="text-sm font-medium text-amber-800 mb-1">Test Rationale</p>
                                              <p className="text-sm text-amber-700">{schedule.rationale}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>

                    {/* Key Insights */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-amber-600" />
                          Key Insights & Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium mb-3">Key Insights</h5>
                            <div className="space-y-2">
                              {results.insights.map((insight, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                  <span>{insight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-3">Recommendations</h5>
                            <div className="space-y-2">
                              {results.recommendations.map((rec, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-blue-50">
                    <CardContent className="flex flex-col items-center justify-center py-20">
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
                        <Clock className="relative w-20 h-20 text-blue-600 animate-bounce" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">Ready to Optimize Send Times</h3>
                      <p className="text-gray-600 text-center mb-8 max-w-lg leading-relaxed">
                        Configure your campaign settings to receive personalized send time recommendations,
                        interactive heatmaps, and data-driven A/B testing schedules.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                          <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                          <span className="text-xs font-medium text-gray-700">Visual Heatmap</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                          <Globe className="w-8 h-8 text-green-600 mb-2" />
                          <span className="text-xs font-medium text-gray-700">Multi-Timezone</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                          <TestTube2 className="w-8 h-8 text-purple-600 mb-2" />
                          <span className="text-xs font-medium text-gray-700">A/B Test Plans</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                          <Target className="w-8 h-8 text-orange-600 mb-2" />
                          <span className="text-xs font-medium text-gray-700">Industry Insights</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button 
                          onClick={calculateSendTimes}
                          size="lg"
                          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          <Clock className="w-5 h-5 mr-2" />
                          Get Started
                        </Button>
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

export default BestSendTimeCalculatorPage;
