import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Signature, 
  Copy, 
  Download, 
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  CheckCircle,
  Eye,
  Code,
  Palette
} from "lucide-react";
import { toast } from "sonner";

interface SignatureData {
  fullName: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedinUrl: string;
  twitterUrl: string;
  profileImage: string;
  companyLogo: string;
  tagline: string;
  disclaimer: string;
}

interface SignatureSettings {
  template: "modern" | "classic" | "minimal" | "corporate";
  includePhoto: boolean;
  includeLogo: boolean;
  includeSocial: boolean;
  includeAddress: boolean;
  includeDisclaimer: boolean;
  colorScheme: "blue" | "green" | "purple" | "orange" | "gray";
  fontSize: "small" | "medium" | "large";
}

interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
}

const EmailSignatureGeneratorPage = () => {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    linkedinUrl: "",
    twitterUrl: "",
    profileImage: "",
    companyLogo: "",
    tagline: "",
    disclaimer: ""
  });

  const [settings, setSettings] = useState<SignatureSettings>({
    template: "modern",
    includePhoto: false,
    includeLogo: true,
    includeSocial: true,
    includeAddress: true,
    includeDisclaimer: false,
    colorScheme: "blue",
    fontSize: "medium"
  });

  const [generatedSignature, setGeneratedSignature] = useState("");
  const [previewMode, setPreviewMode] = useState<"html" | "preview">("preview");
  const [copied, setCopied] = useState(false);

  const colorSchemes = {
    blue: { primary: "#3B82F6", secondary: "#1E40AF", text: "#1F2937" },
    green: { primary: "#10B981", secondary: "#047857", text: "#1F2937" },
    purple: { primary: "#8B5CF6", secondary: "#7C3AED", text: "#1F2937" },
    orange: { primary: "#F97316", secondary: "#EA580C", text: "#1F2937" },
    gray: { primary: "#6B7280", secondary: "#374151", text: "#1F2937" }
  };

  const generateSignature = () => {
    if (!signatureData.fullName || !signatureData.email) {
      toast.error("Please enter at least your name and email");
      return;
    }

    const colors = colorSchemes[settings.colorScheme];
    let html = "";

    switch (settings.template) {
      case "modern":
        html = generateModernTemplate(colors);
        break;
      case "classic":
        html = generateClassicTemplate(colors);
        break;
      case "minimal":
        html = generateMinimalTemplate(colors);
        break;
      case "corporate":
        html = generateCorporateTemplate(colors);
        break;
    }

    setGeneratedSignature(html);
    toast.success("Email signature generated successfully!");
  };

  const generateModernTemplate = (colors: ColorScheme) => {
    const fontSize = settings.fontSize === "small" ? "12px" : settings.fontSize === "large" ? "16px" : "14px";
    
    return `
<table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: ${fontSize}; line-height: 1.4; color: ${colors.text};">
  <tr>
    <td style="padding: 20px 0; border-left: 4px solid ${colors.primary}; padding-left: 20px;">
      <table style="border-collapse: collapse;">
        ${settings.includePhoto && signatureData.profileImage ? `
        <tr>
          <td style="padding-right: 20px; vertical-align: top;">
            <img src="${signatureData.profileImage}" alt="${signatureData.fullName}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
          </td>
          <td style="vertical-align: top;">
        ` : '<tr><td>'}
            <div style="margin-bottom: 5px;">
              <strong style="font-size: ${fontSize === "12px" ? "16px" : fontSize === "16px" ? "20px" : "18px"}; color: ${colors.primary};">${signatureData.fullName}</strong>
            </div>
            <div style="margin-bottom: 3px; color: ${colors.secondary}; font-weight: 600;">${signatureData.jobTitle}</div>
            <div style="margin-bottom: 10px; color: ${colors.text};">${signatureData.company}</div>
            ${signatureData.tagline ? `<div style="margin-bottom: 10px; font-style: italic; color: ${colors.text};">${signatureData.tagline}</div>` : ''}
            
            <div style="margin-bottom: 3px;">
              <a href="mailto:${signatureData.email}" style="color: ${colors.text}; text-decoration: none;">📧 ${signatureData.email}</a>
            </div>
            ${signatureData.phone ? `<div style="margin-bottom: 3px;"><span style="color: ${colors.text};">📞 ${signatureData.phone}</span></div>` : ''}
            ${signatureData.website ? `<div style="margin-bottom: 3px;"><a href="${signatureData.website}" style="color: ${colors.primary}; text-decoration: none;">🌐 ${signatureData.website}</a></div>` : ''}
            ${settings.includeAddress && signatureData.address ? `<div style="margin-bottom: 10px; color: ${colors.text};">📍 ${signatureData.address}</div>` : ''}
            
            ${settings.includeSocial && (signatureData.linkedinUrl || signatureData.twitterUrl) ? `
            <div style="margin-top: 10px;">
              ${signatureData.linkedinUrl ? `<a href="${signatureData.linkedinUrl}" style="margin-right: 10px; text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 20px; height: 20px;"></a>` : ''}
              ${signatureData.twitterUrl ? `<a href="${signatureData.twitterUrl}" style="text-decoration: none;"><img src="https://cdn-icons-png.flaticon.com/512/124/124021.png" alt="Twitter" style="width: 20px; height: 20px;"></a>` : ''}
            </div>
            ` : ''}
            
        ${settings.includePhoto && signatureData.profileImage ? '</td></tr>' : '</td></tr>'}
      </table>
      
      ${settings.includeLogo && signatureData.companyLogo ? `
      <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #E5E7EB;">
        <img src="${signatureData.companyLogo}" alt="${signatureData.company}" style="max-height: 40px;">
      </div>
      ` : ''}
      
      ${settings.includeDisclaimer && signatureData.disclaimer ? `
      <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #E5E7EB; font-size: 11px; color: #9CA3AF;">
        ${signatureData.disclaimer}
      </div>
      ` : ''}
    </td>
  </tr>
</table>`;
  };

  const generateClassicTemplate = (colors: ColorScheme) => {
    const fontSize = settings.fontSize === "small" ? "12px" : settings.fontSize === "large" ? "16px" : "14px";
    
    return `
<table style="border-collapse: collapse; font-family: Times, serif; font-size: ${fontSize}; line-height: 1.6; color: ${colors.text};">
  <tr>
    <td style="padding: 15px; border: 2px solid ${colors.primary};">
      <div style="text-align: center; margin-bottom: 15px;">
        <strong style="font-size: ${fontSize === "12px" ? "18px" : fontSize === "16px" ? "22px" : "20px"}; color: ${colors.primary};">${signatureData.fullName}</strong>
      </div>
      <div style="text-align: center; margin-bottom: 10px; color: ${colors.secondary}; font-weight: bold;">${signatureData.jobTitle}</div>
      <div style="text-align: center; margin-bottom: 15px;">${signatureData.company}</div>
      
      <hr style="border: none; border-top: 1px solid ${colors.primary}; margin: 15px 0;">
      
      <div style="text-align: center;">
        <div style="margin-bottom: 5px;">Email: <a href="mailto:${signatureData.email}" style="color: ${colors.primary};">${signatureData.email}</a></div>
        ${signatureData.phone ? `<div style="margin-bottom: 5px;">Phone: ${signatureData.phone}</div>` : ''}
        ${signatureData.website ? `<div style="margin-bottom: 5px;">Web: <a href="${signatureData.website}" style="color: ${colors.primary};">${signatureData.website}</a></div>` : ''}
      </div>
    </td>
  </tr>
</table>`;
  };

  const generateMinimalTemplate = (colors: ColorScheme) => {
    const fontSize = settings.fontSize === "small" ? "12px" : settings.fontSize === "large" ? "16px" : "14px";
    
    return `
<div style="font-family: Arial, sans-serif; font-size: ${fontSize}; line-height: 1.5; color: ${colors.text};">
  <div style="margin-bottom: 5px;">
    <strong style="color: ${colors.primary};">${signatureData.fullName}</strong>
  </div>
  <div style="margin-bottom: 2px; color: ${colors.secondary};">${signatureData.jobTitle}</div>
  <div style="margin-bottom: 10px;">${signatureData.company}</div>
  <div style="margin-bottom: 2px;"><a href="mailto:${signatureData.email}" style="color: ${colors.text}; text-decoration: none;">${signatureData.email}</a></div>
  ${signatureData.phone ? `<div style="margin-bottom: 2px;">${signatureData.phone}</div>` : ''}
  ${signatureData.website ? `<div><a href="${signatureData.website}" style="color: ${colors.primary}; text-decoration: none;">${signatureData.website}</a></div>` : ''}
</div>`;
  };

  const generateCorporateTemplate = (colors: ColorScheme) => {
    const fontSize = settings.fontSize === "small" ? "12px" : settings.fontSize === "large" ? "16px" : "14px";
    
    return `
<table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: ${fontSize}; line-height: 1.4; color: ${colors.text}; background-color: #F9FAFB;">
  <tr>
    <td style="padding: 20px;">
      <table style="border-collapse: collapse; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <tr>
          <td style="background-color: ${colors.primary}; padding: 15px; color: white;">
            <div style="font-size: ${fontSize === "12px" ? "18px" : fontSize === "16px" ? "22px" : "20px"}; font-weight: bold; margin-bottom: 5px;">${signatureData.fullName}</div>
            <div style="font-size: ${fontSize === "12px" ? "14px" : fontSize === "16px" ? "18px" : "16px"};">${signatureData.jobTitle}</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 15px;">
            <div style="margin-bottom: 10px; font-weight: bold; color: ${colors.secondary};">${signatureData.company}</div>
            <div style="margin-bottom: 5px;"><a href="mailto:${signatureData.email}" style="color: ${colors.text}; text-decoration: none;">✉️ ${signatureData.email}</a></div>
            ${signatureData.phone ? `<div style="margin-bottom: 5px;">📱 ${signatureData.phone}</div>` : ''}
            ${signatureData.website ? `<div><a href="${signatureData.website}" style="color: ${colors.primary}; text-decoration: none;">🌐 ${signatureData.website}</a></div>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedSignature);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Signature copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy signature");
    }
  };

  const downloadSignature = () => {
    if (!generatedSignature) {
      toast.error("No signature to download");
      return;
    }

    const blob = new Blob([generatedSignature], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email_signature_${signatureData.fullName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Signature downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6 border border-purple-200">
              <Signature className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Email Signature Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Professional Email
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Signature Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create professional, responsive email signatures in minutes. Choose from multiple templates, 
              customize colors, and include your social media links and company branding.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <span>Multiple Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Client Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-600" />
                <span>Social Media Links</span>
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
                      <Signature className="w-5 h-5 text-purple-600" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName"
                        placeholder="John Doe"
                        value={signatureData.fullName}
                        onChange={(e) => setSignatureData({...signatureData, fullName: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input 
                        id="jobTitle"
                        placeholder="Marketing Manager"
                        value={signatureData.jobTitle}
                        onChange={(e) => setSignatureData({...signatureData, jobTitle: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company"
                        placeholder="Company Name"
                        value={signatureData.company}
                        onChange={(e) => setSignatureData({...signatureData, company: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={signatureData.email}
                        onChange={(e) => setSignatureData({...signatureData, email: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={signatureData.phone}
                        onChange={(e) => setSignatureData({...signatureData, phone: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website"
                        placeholder="https://company.com"
                        value={signatureData.website}
                        onChange={(e) => setSignatureData({...signatureData, website: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address"
                        placeholder="123 Main St, City, State"
                        value={signatureData.address}
                        onChange={(e) => setSignatureData({...signatureData, address: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input 
                        id="tagline"
                        placeholder="Your professional tagline"
                        value={signatureData.tagline}
                        onChange={(e) => setSignatureData({...signatureData, tagline: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <Input 
                        id="linkedinUrl"
                        placeholder="https://linkedin.com/in/johndoe"
                        value={signatureData.linkedinUrl}
                        onChange={(e) => setSignatureData({...signatureData, linkedinUrl: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="twitterUrl">Twitter URL</Label>
                      <Input 
                        id="twitterUrl"
                        placeholder="https://twitter.com/johndoe"
                        value={signatureData.twitterUrl}
                        onChange={(e) => setSignatureData({...signatureData, twitterUrl: e.target.value})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Design Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Template</Label>
                      <Select value={settings.template} onValueChange={(value) => setSettings({...settings, template: value as SignatureSettings['template']})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Color Scheme</Label>
                      <Select value={settings.colorScheme} onValueChange={(value) => setSettings({...settings, colorScheme: value as SignatureSettings['colorScheme']})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="orange">Orange</SelectItem>
                          <SelectItem value="gray">Gray</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Font Size</Label>
                      <Select value={settings.fontSize} onValueChange={(value) => setSettings({...settings, fontSize: value as SignatureSettings['fontSize']})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeSocial" 
                          checked={settings.includeSocial}
                          onCheckedChange={(checked) => setSettings({...settings, includeSocial: checked === true})}
                        />
                        <label htmlFor="includeSocial" className="text-sm">Include social media</label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeAddress" 
                          checked={settings.includeAddress}
                          onCheckedChange={(checked) => setSettings({...settings, includeAddress: checked === true})}
                        />
                        <label htmlFor="includeAddress" className="text-sm">Include address</label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="includeLogo" 
                          checked={settings.includeLogo}
                          onCheckedChange={(checked) => setSettings({...settings, includeLogo: checked === true})}
                        />
                        <label htmlFor="includeLogo" className="text-sm">Include company logo</label>
                      </div>
                    </div>

                    <Button 
                      onClick={generateSignature}
                      disabled={!signatureData.fullName || !signatureData.email}
                      className="w-full"
                    >
                      <Signature className="w-4 h-4 mr-2" />
                      Generate Signature
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Panel */}
              <div className="lg:col-span-2">
                {generatedSignature ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Eye className="w-5 h-5 text-green-600" />
                            Email Signature Preview
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button 
                              variant={previewMode === "preview" ? "default" : "outline"} 
                              size="sm" 
                              onClick={() => setPreviewMode("preview")}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button 
                              variant={previewMode === "html" ? "default" : "outline"} 
                              size="sm" 
                              onClick={() => setPreviewMode("html")}
                            >
                              <Code className="w-4 h-4 mr-1" />
                              HTML
                            </Button>
                            <Button variant="outline" size="sm" onClick={copyToClipboard}>
                              {copied ? (
                                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 mr-1" />
                              )}
                              Copy
                            </Button>
                            <Button variant="outline" size="sm" onClick={downloadSignature}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {previewMode === "preview" ? (
                          <div 
                            className="border rounded-lg p-4 bg-white"
                            dangerouslySetInnerHTML={{ __html: generatedSignature }}
                          />
                        ) : (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <pre className="text-sm overflow-x-auto">{generatedSignature}</pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>How to Use</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3 text-sm">
                          <div className="flex gap-3">
                            <Badge variant="outline" className="text-xs">1</Badge>
                            <span>Copy the HTML code above</span>
                          </div>
                          <div className="flex gap-3">
                            <Badge variant="outline" className="text-xs">2</Badge>
                            <span>Open your email client settings (Gmail, Outlook, etc.)</span>
                          </div>
                          <div className="flex gap-3">
                            <Badge variant="outline" className="text-xs">3</Badge>
                            <span>Find the signature settings and paste the HTML</span>
                          </div>
                          <div className="flex gap-3">
                            <Badge variant="outline" className="text-xs">4</Badge>
                            <span>Save and test by sending yourself an email</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                      <Signature className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Create Your Signature</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Fill in your information on the left and generate a professional email signature 
                        that works across all email clients.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">Professional Design</Badge>
                        <Badge variant="outline">Mobile Responsive</Badge>
                        <Badge variant="outline">Copy & Paste Ready</Badge>
                        <Badge variant="outline">Multiple Templates</Badge>
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

export default EmailSignatureGeneratorPage;
