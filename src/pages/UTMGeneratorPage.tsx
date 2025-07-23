import { useState } from "react";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Link,
  Copy, 
  Download, 
  BarChart3,
  Target,
  Globe,
  Mail,
  Zap,
  CheckCircle,
  Plus,
  Trash2,
  QrCode,
  Share2
} from "lucide-react";
import { toast } from "sonner";

interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

interface GeneratedUTM {
  id: string;
  baseUrl: string;
  params: UTMParams;
  fullUrl: string;
  description: string;
  category: string;
}

interface UTMTemplate {
  name: string;
  category: string;
  source: string;
  medium: string;
  campaign: string;
  description: string;
}

const UTMGeneratorPage = () => {
  const [baseUrl, setBaseUrl] = useState("https://example.com");
  const [utmParams, setUtmParams] = useState<UTMParams>({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: ""
  });
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("email");
  const [generatedUrls, setGeneratedUrls] = useState<GeneratedUTM[]>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [bulkUrls, setBulkUrls] = useState("");
  const [bulkSource, setBulkSource] = useState("");
  const [bulkMedium, setBulkMedium] = useState("");
  const [bulkCampaign, setBulkCampaign] = useState("");

  const predefinedTemplates: UTMTemplate[] = [
    {
      name: "Email Newsletter",
      category: "email",
      source: "newsletter",
      medium: "email",
      campaign: "monthly_newsletter",
      description: "Monthly newsletter campaign"
    },
    {
      name: "Cold Email Outreach",
      category: "email",
      source: "cold_email",
      medium: "email",
      campaign: "outreach_q1",
      description: "Cold email outreach campaign"
    },
    {
      name: "Facebook Ads",
      category: "social",
      source: "facebook",
      medium: "cpc",
      campaign: "brand_awareness",
      description: "Facebook advertising campaign"
    },
    {
      name: "Google Ads",
      category: "ads",
      source: "google",
      medium: "cpc",
      campaign: "search_campaign",
      description: "Google search advertising"
    },
    {
      name: "LinkedIn Sponsored",
      category: "social",
      source: "linkedin",
      medium: "cpc",
      campaign: "b2b_leads",
      description: "LinkedIn sponsored content"
    },
    {
      name: "Twitter Organic",
      category: "social",
      source: "twitter",
      medium: "social",
      campaign: "content_promotion",
      description: "Organic Twitter posts"
    },
    {
      name: "Blog Post CTA",
      category: "content",
      source: "blog",
      medium: "referral",
      campaign: "content_marketing",
      description: "Blog post call-to-action"
    },
    {
      name: "YouTube Video",
      category: "video",
      source: "youtube",
      medium: "video",
      campaign: "video_marketing",
      description: "YouTube video description"
    }
  ];

  const mediumOptions = [
    { value: "email", label: "Email" },
    { value: "cpc", label: "Cost Per Click (CPC)" },
    { value: "social", label: "Social Media" },
    { value: "referral", label: "Referral" },
    { value: "organic", label: "Organic Search" },
    { value: "display", label: "Display Advertising" },
    { value: "video", label: "Video" },
    { value: "affiliate", label: "Affiliate" },
    { value: "direct", label: "Direct" },
    { value: "partnership", label: "Partnership" }
  ];

  const sourceOptions = [
    { value: "google", label: "Google" },
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "newsletter", label: "Newsletter" },
    { value: "blog", label: "Blog" },
    { value: "cold_email", label: "Cold Email" },
    { value: "partner", label: "Partner" }
  ];

  const generateUTMUrl = () => {
    if (!baseUrl.trim() || !utmParams.source.trim() || !utmParams.medium.trim() || !utmParams.campaign.trim()) {
      toast.error("Please fill in required fields (URL, Source, Medium, Campaign)");
      return;
    }

    const url = new URL(baseUrl);
    
    // Add UTM parameters
    url.searchParams.set('utm_source', utmParams.source);
    url.searchParams.set('utm_medium', utmParams.medium);
    url.searchParams.set('utm_campaign', utmParams.campaign);
    
    if (utmParams.term?.trim()) {
      url.searchParams.set('utm_term', utmParams.term);
    }
    
    if (utmParams.content?.trim()) {
      url.searchParams.set('utm_content', utmParams.content);
    }

    const newUTM: GeneratedUTM = {
      id: Math.random().toString(36).substr(2, 9),
      baseUrl,
      params: { ...utmParams },
      fullUrl: url.toString(),
      description: description || `${utmParams.source} - ${utmParams.campaign}`,
      category
    };

    setGeneratedUrls(prev => [newUTM, ...prev]);
    
    // Reset form
    setUtmParams({
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: ""
    });
    setDescription("");
    
    toast.success("UTM URL generated successfully");
  };

  const generateBulkUTMs = () => {
    if (!bulkUrls.trim() || !bulkSource.trim() || !bulkMedium.trim() || !bulkCampaign.trim()) {
      toast.error("Please fill in all bulk generation fields");
      return;
    }

    const urls = bulkUrls.split('\n').filter(url => url.trim());
    const newUTMs: GeneratedUTM[] = [];

    urls.forEach((url, index) => {
      try {
        const urlObj = new URL(url.trim());
        
        urlObj.searchParams.set('utm_source', bulkSource);
        urlObj.searchParams.set('utm_medium', bulkMedium);
        urlObj.searchParams.set('utm_campaign', bulkCampaign);

        newUTMs.push({
          id: Math.random().toString(36).substr(2, 9),
          baseUrl: url.trim(),
          params: {
            source: bulkSource,
            medium: bulkMedium,
            campaign: bulkCampaign
          },
          fullUrl: urlObj.toString(),
          description: `Bulk #${index + 1} - ${bulkCampaign}`,
          category: "bulk"
        });
      } catch (error) {
        console.error(`Invalid URL: ${url}`);
      }
    });

    setGeneratedUrls(prev => [...newUTMs, ...prev]);
    
    // Reset bulk form
    setBulkUrls("");
    setBulkSource("");
    setBulkMedium("");
    setBulkCampaign("");
    
    toast.success(`Generated ${newUTMs.length} UTM URLs`);
  };

  const applyTemplate = (template: UTMTemplate) => {
    setUtmParams({
      source: template.source,
      medium: template.medium,
      campaign: template.campaign,
      term: "",
      content: ""
    });
    setDescription(template.description);
    setCategory(template.category);
    toast.success(`Applied ${template.name} template`);
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

  const deleteUTM = (id: string) => {
    setGeneratedUrls(prev => prev.filter(utm => utm.id !== id));
    toast.success("UTM URL deleted");
  };

  const downloadCSV = () => {
    if (generatedUrls.length === 0) {
      toast.error("No UTM URLs to download");
      return;
    }

    const headers = ['Description', 'Category', 'Base URL', 'Source', 'Medium', 'Campaign', 'Term', 'Content', 'Full URL'];
    const csvContent = [
      headers.join(','),
      ...generatedUrls.map(utm => [
        `"${utm.description}"`,
        utm.category,
        `"${utm.baseUrl}"`,
        utm.params.source,
        utm.params.medium,
        utm.params.campaign,
        utm.params.term || '',
        utm.params.content || '',
        `"${utm.fullUrl}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `utm_urls_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("CSV downloaded");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "email": return "bg-blue-100 text-blue-800 border-blue-200";
      case "social": return "bg-purple-100 text-purple-800 border-purple-200";
      case "ads": return "bg-green-100 text-green-800 border-green-200";
      case "content": return "bg-orange-100 text-orange-800 border-orange-200";
      case "video": return "bg-red-100 text-red-800 border-red-200";
      case "bulk": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.utmGenerator.title}
        description={seoConfig.utmGenerator.description}
        keywords={seoConfig.utmGenerator.keywords}
        canonical={seoConfig.utmGenerator.canonical}
        schemaType={seoConfig.utmGenerator.schemaType}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6 border border-green-200">
              <Link className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">UTM Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              UTM Parameter
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create trackable URLs with UTM parameters for precise campaign tracking. 
              Monitor your marketing performance across all channels and sources.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                <span>Campaign Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Attribution Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>Multi-Channel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <Tabs defaultValue="single" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="single">Single URL</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Generator</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              {/* Single URL Generator */}
              <TabsContent value="single" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Link className="w-5 h-5 text-green-600" />
                        Generate UTM URL
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="baseUrl">Base URL *</Label>
                        <Input 
                          id="baseUrl"
                          placeholder="https://example.com"
                          value={baseUrl}
                          onChange={(e) => setBaseUrl(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Source * <span className="text-xs text-muted-foreground">(utm_source)</span></Label>
                          <Select value={utmParams.source} onValueChange={(value) => setUtmParams({...utmParams, source: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              {sourceOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Medium * <span className="text-xs text-muted-foreground">(utm_medium)</span></Label>
                          <Select value={utmParams.medium} onValueChange={(value) => setUtmParams({...utmParams, medium: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select medium" />
                            </SelectTrigger>
                            <SelectContent>
                              {mediumOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="campaign">Campaign * <span className="text-xs text-muted-foreground">(utm_campaign)</span></Label>
                        <Input 
                          id="campaign"
                          placeholder="campaign_name"
                          value={utmParams.campaign}
                          onChange={(e) => setUtmParams({...utmParams, campaign: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="term">Term <span className="text-xs text-muted-foreground">(utm_term)</span></Label>
                          <Input 
                            id="term"
                            placeholder="keyword"
                            value={utmParams.term}
                            onChange={(e) => setUtmParams({...utmParams, term: e.target.value})}
                          />
                        </div>

                        <div>
                          <Label htmlFor="content">Content <span className="text-xs text-muted-foreground">(utm_content)</span></Label>
                          <Input 
                            id="content"
                            placeholder="content_id"
                            value={utmParams.content}
                            onChange={(e) => setUtmParams({...utmParams, content: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input 
                          id="description"
                          placeholder="Campaign description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="ads">Advertising</SelectItem>
                            <SelectItem value="content">Content</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        onClick={generateUTMUrl}
                        disabled={!baseUrl.trim() || !utmParams.source.trim() || !utmParams.medium.trim() || !utmParams.campaign.trim()}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Generate UTM URL
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {baseUrl && utmParams.source && utmParams.medium && utmParams.campaign ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">GENERATED URL</Label>
                            <div className="mt-1 p-3 bg-muted rounded border break-all text-sm">
                              {(() => {
                                const url = new URL(baseUrl);
                                url.searchParams.set('utm_source', utmParams.source);
                                url.searchParams.set('utm_medium', utmParams.medium);
                                url.searchParams.set('utm_campaign', utmParams.campaign);
                                if (utmParams.term?.trim()) url.searchParams.set('utm_term', utmParams.term);
                                if (utmParams.content?.trim()) url.searchParams.set('utm_content', utmParams.content);
                                return url.toString();
                              })()}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label className="text-xs text-muted-foreground">SOURCE</Label>
                              <p className="font-medium">{utmParams.source}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">MEDIUM</Label>
                              <p className="font-medium">{utmParams.medium}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">CAMPAIGN</Label>
                              <p className="font-medium">{utmParams.campaign}</p>
                            </div>
                            <div>
                              <Label className="text-xs text-muted-foreground">CATEGORY</Label>
                              <Badge className={getCategoryColor(category)}>
                                {category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Link className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>Fill in the required fields to see preview</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Bulk Generator */}
              <TabsContent value="bulk" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      Bulk UTM Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bulkUrls">URLs (one per line) *</Label>
                      <Textarea 
                        id="bulkUrls"
                        placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                        value={bulkUrls}
                        onChange={(e) => setBulkUrls(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="bulkSource">Source *</Label>
                        <Input 
                          id="bulkSource"
                          placeholder="email"
                          value={bulkSource}
                          onChange={(e) => setBulkSource(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="bulkMedium">Medium *</Label>
                        <Input 
                          id="bulkMedium"
                          placeholder="email"
                          value={bulkMedium}
                          onChange={(e) => setBulkMedium(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="bulkCampaign">Campaign *</Label>
                        <Input 
                          id="bulkCampaign"
                          placeholder="newsletter_q1"
                          value={bulkCampaign}
                          onChange={(e) => setBulkCampaign(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={generateBulkUTMs}
                      disabled={!bulkUrls.trim() || !bulkSource.trim() || !bulkMedium.trim() || !bulkCampaign.trim()}
                      className="w-full"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Bulk UTMs
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates */}
              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      UTM Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {predefinedTemplates.map((template, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-medium">{template.name}</h3>
                              <Badge className={getCategoryColor(template.category)}>
                                {template.category}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                              <div className="flex justify-between">
                                <span>Source:</span>
                                <span className="font-medium">{template.source}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Medium:</span>
                                <span className="font-medium">{template.medium}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Campaign:</span>
                                <span className="font-medium">{template.campaign}</span>
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground mb-3">{template.description}</p>

                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => applyTemplate(template)}
                            >
                              Use Template
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Generated URLs */}
            {generatedUrls.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      Generated UTM URLs ({generatedUrls.length})
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedUrls.map(utm => utm.fullUrl).join('\n'))}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy All
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadCSV}>
                        <Download className="w-4 h-4 mr-1" />
                        Export CSV
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedUrls.map((utm) => (
                      <Card key={utm.id} className="bg-muted/20">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge className={getCategoryColor(utm.category)}>
                                {utm.category}
                              </Badge>
                              <span className="font-medium">{utm.description}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(utm.fullUrl, utm.id)}
                              >
                                {copiedItems.has(utm.id) ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteUTM(utm.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs text-muted-foreground">BASE URL</Label>
                              <p className="text-sm font-mono break-all">{utm.baseUrl}</p>
                            </div>
                            
                            <div>
                              <Label className="text-xs text-muted-foreground">FULL UTM URL</Label>
                              <div className="mt-1 p-2 bg-background rounded border">
                                <p className="text-sm font-mono break-all">{utm.fullUrl}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-2 border-t border-border/50">
                              <div className="text-xs">
                                <span className="text-muted-foreground">Source:</span>
                                <p className="font-medium">{utm.params.source}</p>
                              </div>
                              <div className="text-xs">
                                <span className="text-muted-foreground">Medium:</span>
                                <p className="font-medium">{utm.params.medium}</p>
                              </div>
                              <div className="text-xs">
                                <span className="text-muted-foreground">Campaign:</span>
                                <p className="font-medium">{utm.params.campaign}</p>
                              </div>
                              {utm.params.term && (
                                <div className="text-xs">
                                  <span className="text-muted-foreground">Term:</span>
                                  <p className="font-medium">{utm.params.term}</p>
                                </div>
                              )}
                              {utm.params.content && (
                                <div className="text-xs">
                                  <span className="text-muted-foreground">Content:</span>
                                  <p className="font-medium">{utm.params.content}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UTMGeneratorPage;
