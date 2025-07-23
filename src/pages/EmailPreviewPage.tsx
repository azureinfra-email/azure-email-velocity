import { useState } from "react";
import SEO from "@/components/SEO";
import { seoConfig, breadcrumbConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Eye,
  Mail,
  Sun,
  Moon,
  Copy,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

interface EmailPreview {
  subject: string;
  from: string;
  content: string;
  preheader?: string;
}

const EmailPreviewPage = () => {
  const [emailData, setEmailData] = useState<EmailPreview>({
    subject: "Quick question about [company_name]",
    from: "john@yourcompany.com",
    content: `Hi [first_name],

I hope this email finds you well. I came across [company_name] and was impressed by your work in the [industry] space.

We help companies like yours increase their sales by up to 40% through targeted outreach strategies.

Would you be interested in a quick 15-minute call to discuss how this could work for [company_name]?

Best regards,
John Smith`,
    preheader: "Helping [company_name] grow sales by 40%"
  });

  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "mobile" | "tablet">("desktop");
  const [selectedClient, setSelectedClient] = useState<"gmail" | "outlook" | "apple">("gmail");
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState("");
  const [showSpamAnalysis, setShowSpamAnalysis] = useState(false);

  // Spam score analysis (simplified)
  const analyzeSpamScore = () => {
    const { subject, content } = emailData;
    let score = 0;
    const issues: string[] = [];

    // Subject line analysis
    if (subject.includes('!')) score += 1;
    if (subject.toUpperCase() === subject) score += 2;
    if (subject.includes('FREE') || subject.includes('URGENT')) score += 2;
    if (subject.length > 50) {
      score += 1;
      issues.push("Subject line too long (>50 chars)");
    }

    // Content analysis
    if (content.includes('$$$') || content.includes('!!!')) score += 2;
    if (content.split('\n\n').length < 2) {
      score += 1;
      issues.push("Needs more paragraph breaks");
    }
    if (!content.includes('unsubscribe')) {
      score += 1;
      issues.push("Missing unsubscribe link");
    }

    // Line length analysis
    const lines = content.split('\n');
    const longLines = lines.filter(line => line.length > 70);
    if (longLines.length > 0) {
      score += 1;
      issues.push(`${longLines.length} lines exceed 70 characters`);
    }

    return {
      score: Math.min(score, 10),
      level: score <= 2 ? 'good' : score <= 5 ? 'medium' : 'high',
      issues
    };
  };

  const spamAnalysis = analyzeSpamScore();

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

  const getDeviceStyles = () => {
    switch (selectedDevice) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-2xl mx-auto";
      default:
        return "max-w-4xl mx-auto";
    }
  };

  const getClientStyles = () => {
    const baseStyles = darkMode 
      ? "bg-gray-900 text-white" 
      : "bg-white text-gray-900";
    
    switch (selectedClient) {
      case "outlook":
        return `${baseStyles} font-mono border-2 border-blue-200`;
      case "apple":
        return `${baseStyles} font-serif border border-gray-300 rounded-lg`;
      default: // gmail
        return `${baseStyles} font-sans border border-gray-200 rounded`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.emailPreview.title}
        description={seoConfig.emailPreview.description}
        keywords={seoConfig.emailPreview.keywords}
        canonical={seoConfig.emailPreview.canonical}
        schemaType={seoConfig.emailPreview.schemaType}
        breadcrumbs={breadcrumbConfig.toolsChild("Email Preview Tool", "/tools/email-preview")}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-cyan-100 rounded-full px-4 py-2 mb-6 border border-cyan-200">
              <Eye className="w-4 h-4 text-cyan-600" />
              <span className="text-cyan-700 text-sm font-medium">Email Preview Tool</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Email Preview
              <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Across Clients
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Preview your cold emails across different email clients and devices to ensure perfect 
              formatting and deliverability before sending your campaigns.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-cyan-600" />
                <span>Multi-Device</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>Spam Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Email Editor */}
              <div className="lg:col-span-1 space-y-4">
                <Card className="shadow-lg border-t-4 border-t-cyan-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Mail className="w-4 h-4 text-cyan-600" />
                      Email Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">From</Label>
                      <Input
                        value={emailData.from}
                        onChange={(e) => setEmailData(prev => ({ ...prev, from: e.target.value }))}
                        placeholder="sender@company.com"
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Subject Line</Label>
                      <Input
                        value={emailData.subject}
                        onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Enter subject line..."
                        className="text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {emailData.subject.length}/50 characters
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Preheader Text</Label>
                      <Input
                        value={emailData.preheader}
                        onChange={(e) => setEmailData(prev => ({ ...prev, preheader: e.target.value }))}
                        placeholder="Preview text that appears after subject..."
                        className="text-sm"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Optional - Shows in inbox preview
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Email Body</Label>
                      <Textarea
                        value={emailData.content}
                        onChange={(e) => setEmailData(prev => ({ ...prev, content: e.target.value }))}
                        className="min-h-48 text-sm font-mono"
                        placeholder="Enter your email content..."
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {emailData.content.length} characters • {emailData.content.split('\n').length} lines
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Spam Analysis */}
                <Card className="shadow-lg border-t-4 border-t-orange-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="w-4 h-4 text-orange-600" />
                        Spam Analysis
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          spamAnalysis.level === 'good' ? 'bg-green-100 text-green-800 border-green-200' :
                          spamAnalysis.level === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        {spamAnalysis.score}/10
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className={`p-3 rounded ${
                      spamAnalysis.level === 'good' ? 'bg-green-50 border border-green-200' :
                      spamAnalysis.level === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {spamAnalysis.level === 'good' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        )}
                        <span className="text-sm font-medium">
                          {spamAnalysis.level === 'good' ? 'Low Risk' :
                           spamAnalysis.level === 'medium' ? 'Medium Risk' : 'High Risk'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {spamAnalysis.level === 'good' 
                          ? 'Good deliverability potential'
                          : 'May trigger spam filters'
                        }
                      </p>
                    </div>

                    {spamAnalysis.issues.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Issues to Address:</h4>
                        {spamAnalysis.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5 shrink-0" />
                            {issue}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Preview Section */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* Preview Controls */}
                <Card className="shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      
                      {/* Device Selection */}
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold">Device:</Label>
                        <div className="flex rounded-lg border overflow-hidden">
                          <Button
                            variant={selectedDevice === "desktop" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedDevice("desktop")}
                            className="rounded-none px-3"
                          >
                            <Monitor className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={selectedDevice === "tablet" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedDevice("tablet")}
                            className="rounded-none px-3 border-l"
                          >
                            <Tablet className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={selectedDevice === "mobile" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedDevice("mobile")}
                            className="rounded-none px-3 border-l"
                          >
                            <Smartphone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Client Selection */}
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold">Client:</Label>
                        <Tabs value={selectedClient} onValueChange={(value: string) => setSelectedClient(value as "gmail" | "outlook" | "apple")}>
                          <TabsList className="grid grid-cols-3 w-48">
                            <TabsTrigger value="gmail" className="text-xs">Gmail</TabsTrigger>
                            <TabsTrigger value="outlook" className="text-xs">Outlook</TabsTrigger>
                            <TabsTrigger value="apple" className="text-xs">Apple</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>

                      {/* Dark Mode Toggle */}
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        <Switch
                          checked={darkMode}
                          onCheckedChange={setDarkMode}
                        />
                        <Moon className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email Preview */}
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Eye className="w-5 h-5 text-cyan-600" />
                        Email Preview
                        <Badge variant="secondary" className="text-xs">
                          {selectedClient.charAt(0).toUpperCase() + selectedClient.slice(1)} • {selectedDevice}
                        </Badge>
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(emailData.content, 'email-content')}
                      >
                        {copied === 'email-content' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    
                    {/* Email Preview Container */}
                    <div className={`${getDeviceStyles()} border rounded-lg overflow-hidden`}>
                      
                      {/* Email Header */}
                      <div className={`${getClientStyles()} border-b p-4`}>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{emailData.from}</span>
                            <span className="text-xs text-muted-foreground">now</span>
                          </div>
                          <div className="text-sm font-semibold">{emailData.subject}</div>
                          {emailData.preheader && (
                            <div className="text-xs text-muted-foreground">{emailData.preheader}</div>
                          )}
                        </div>
                      </div>

                      {/* Email Body */}
                      <div className={`${getClientStyles()} p-4`}>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {emailData.content}
                        </div>
                        
                        {/* Unsubscribe footer */}
                        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-muted-foreground">
                          <p>This email was sent to recipient@email.com</p>
                          <p className="mt-1">
                            <a href="#" className="underline">Unsubscribe</a> | 
                            <a href="#" className="underline ml-1">Update preferences</a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Preview Stats */}
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-sm font-semibold">{emailData.subject.length}</div>
                        <div className="text-xs text-muted-foreground">Subject Chars</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-sm font-semibold">{emailData.content.split('\n').length}</div>
                        <div className="text-xs text-muted-foreground">Lines</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <div className="text-sm font-semibold">{Math.ceil(emailData.content.split(' ').length / 200)}</div>
                        <div className="text-xs text-muted-foreground">Min Read</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailPreviewPage;
