import { useState } from "react";
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
import { 
  Server, 
  Copy, 
  Download, 
  Globe,
  Shield,
  Mail,
  Zap,
  CheckCircle,
  AlertTriangle,
  Settings
} from "lucide-react";
import { toast } from "sonner";

interface DNSRecord {
  id: string;
  type: string;
  name: string;
  value: string;
  ttl: number;
  priority?: number;
  description: string;
}

interface EmailSetup {
  domain: string;
  provider: string;
  customSettings?: {
    mxRecords?: string[];
    spfRecord?: string;
    dkimSelector?: string;
    dmarcPolicy?: string;
  };
}

const DNSRecordGeneratorPage = () => {
  const [domain, setDomain] = useState("example.com");
  const [emailProvider, setEmailProvider] = useState("google");
  const [customMX, setCustomMX] = useState("");
  const [customSPF, setCustomSPF] = useState("");
  const [dkimSelector, setDkimSelector] = useState("default");
  const [dmarcPolicy, setDmarcPolicy] = useState("quarantine");
  const [includeWarmup, setIncludeWarmup] = useState(false);
  const [generatedRecords, setGeneratedRecords] = useState<DNSRecord[]>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const emailProviders = {
    google: {
      name: "Google Workspace",
      mx: [
        { priority: 1, value: "aspmx.l.google.com." },
        { priority: 5, value: "alt1.aspmx.l.google.com." },
        { priority: 5, value: "alt2.aspmx.l.google.com." },
        { priority: 10, value: "alt3.aspmx.l.google.com." },
        { priority: 10, value: "alt4.aspmx.l.google.com." }
      ],
      spf: "v=spf1 include:_spf.google.com ~all",
      dkim: {
        selector: "google",
        instruction: "Get DKIM record from Google Admin Console"
      }
    },
    microsoft: {
      name: "Microsoft 365",
      mx: [
        { priority: 0, value: "{{domain}}-com.mail.protection.outlook.com." }
      ],
      spf: "v=spf1 include:spf.protection.outlook.com -all",
      dkim: {
        selector: "selector1",
        instruction: "Get CNAME records from Microsoft 365 admin center"
      }
    },
    sendgrid: {
      name: "SendGrid",
      mx: [],
      spf: "v=spf1 include:sendgrid.net ~all",
      dkim: {
        selector: "s1",
        instruction: "Configure in SendGrid dashboard"
      }
    },
    mailgun: {
      name: "Mailgun",
      mx: [
        { priority: 10, value: "mxa.mailgun.org." },
        { priority: 10, value: "mxb.mailgun.org." }
      ],
      spf: "v=spf1 include:mailgun.org ~all",
      dkim: {
        selector: "mailo",
        instruction: "Get from Mailgun control panel"
      }
    },
    custom: {
      name: "Custom Setup",
      mx: [],
      spf: "",
      dkim: {
        selector: "default",
        instruction: "Configure based on your email service provider"
      }
    }
  };

  const generateDNSRecords = () => {
    if (!domain.trim()) {
      toast.error("Please enter a domain name");
      return;
    }

    const records: DNSRecord[] = [];
    const provider = emailProviders[emailProvider as keyof typeof emailProviders];

    // Generate MX Records
    if (emailProvider === "custom" && customMX.trim()) {
      const mxEntries = customMX.split('\n').filter(mx => mx.trim());
      mxEntries.forEach((mx, index) => {
        const [priority, value] = mx.trim().split(' ');
        records.push({
          id: `mx-${index}`,
          type: "MX",
          name: domain,
          value: value || mx.trim(),
          ttl: 3600,
          priority: parseInt(priority) || 10,
          description: `Mail exchange record ${index + 1}`
        });
      });
    } else if (provider.mx.length > 0) {
      provider.mx.forEach((mx, index) => {
        records.push({
          id: `mx-${index}`,
          type: "MX",
          name: domain,
          value: mx.value.replace('{{domain}}', domain.replace('.', '-')),
          ttl: 3600,
          priority: mx.priority,
          description: `${provider.name} mail server ${index + 1}`
        });
      });
    }

    // Generate SPF Record
    const spfValue = emailProvider === "custom" && customSPF.trim() ? 
      customSPF : 
      provider.spf;
    
    if (spfValue) {
      records.push({
        id: "spf",
        type: "TXT",
        name: domain,
        value: spfValue,
        ttl: 3600,
        description: "Sender Policy Framework - prevents email spoofing"
      });
    }

    // Generate DKIM Record placeholder
    records.push({
      id: "dkim",
      type: "TXT",
      name: `${dkimSelector}._domainkey.${domain}`,
      value: `[Get DKIM public key from ${provider.name}]`,
      ttl: 3600,
      description: "DKIM public key for email authentication"
    });

    // Generate DMARC Record
    const dmarcValue = `v=DMARC1; p=${dmarcPolicy}; rua=mailto:dmarc@${domain}; ruf=mailto:dmarc@${domain}; rf=afrf; pct=100; ri=86400`;
    records.push({
      id: "dmarc",
      type: "TXT", 
      name: `_dmarc.${domain}`,
      value: dmarcValue,
      ttl: 3600,
      description: "DMARC policy for email authentication and reporting"
    });

    // Add warmup subdomain if selected
    if (includeWarmup) {
      records.push({
        id: "warmup-a",
        type: "A",
        name: `warmup.${domain}`,
        value: "192.168.1.1",
        ttl: 3600,
        description: "A record for warmup subdomain (update IP as needed)"
      });

      records.push({
        id: "warmup-mx",
        type: "MX",
        name: `warmup.${domain}`,
        value: `mail.warmup.${domain}.`,
        ttl: 3600,
        priority: 10,
        description: "MX record for warmup subdomain"
      });
    }

    // Add common email security records
    records.push({
      id: "autoconfig",
      type: "CNAME",
      name: `autoconfig.${domain}`,
      value: `autoconfig.${emailProvider === 'google' ? 'gmail.com.' : 'outlook.com.'}`,
      ttl: 3600,
      description: "Email client auto-configuration"
    });

    records.push({
      id: "autodiscover",
      type: "CNAME", 
      name: `autodiscover.${domain}`,
      value: `autodiscover.${emailProvider === 'microsoft' ? 'outlook.com.' : 'gmail.com.'}`,
      ttl: 3600,
      description: "Email client auto-discovery"
    });

    setGeneratedRecords(records);
    toast.success(`Generated ${records.length} DNS records`);
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

  const downloadRecords = () => {
    if (generatedRecords.length === 0) {
      toast.error("No records to download");
      return;
    }

    const content = generatedRecords.map(record => {
      let line = `${record.name}\t${record.ttl}\tIN\t${record.type}\t`;
      if (record.priority) {
        line += `${record.priority} `;
      }
      line += `${record.value}`;
      return line;
    }).join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dns_records_${domain}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("DNS records downloaded");
  };

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case "MX": return "bg-blue-100 text-blue-800 border-blue-200";
      case "TXT": return "bg-green-100 text-green-800 border-green-200";
      case "CNAME": return "bg-purple-100 text-purple-800 border-purple-200";
      case "A": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.dnsRecordGenerator.title}
        description={seoConfig.dnsRecordGenerator.description}
        keywords={seoConfig.dnsRecordGenerator.keywords}
        canonical={seoConfig.dnsRecordGenerator.canonical}
        schemaType={seoConfig.dnsRecordGenerator.schemaType}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6 border border-blue-200">
              <Server className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">DNS Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              DNS Record
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate complete DNS records for email setup including MX, SPF, DKIM, and DMARC records 
              for major email providers with security best practices.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-600" />
                <span>Deliverability</span>
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
              
              {/* Configuration Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      DNS Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="domain">Domain Name *</Label>
                      <Input 
                        id="domain"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Email Provider</Label>
                      <Select value={emailProvider} onValueChange={setEmailProvider}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Workspace</SelectItem>
                          <SelectItem value="microsoft">Microsoft 365</SelectItem>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="custom">Custom Setup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {emailProvider === "custom" && (
                      <>
                        <div>
                          <Label htmlFor="customMX">MX Records (one per line)</Label>
                          <Textarea 
                            id="customMX"
                            placeholder="10 mail.example.com&#10;20 mail2.example.com"
                            value={customMX}
                            onChange={(e) => setCustomMX(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="customSPF">SPF Record</Label>
                          <Input 
                            id="customSPF"
                            placeholder="v=spf1 include:_spf.example.com ~all"
                            value={customSPF}
                            onChange={(e) => setCustomSPF(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <Label htmlFor="dkimSelector">DKIM Selector</Label>
                      <Input 
                        id="dkimSelector"
                        placeholder="default"
                        value={dkimSelector}
                        onChange={(e) => setDkimSelector(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>DMARC Policy</Label>
                      <Select value={dmarcPolicy} onValueChange={setDmarcPolicy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (monitoring only)</SelectItem>
                          <SelectItem value="quarantine">Quarantine</SelectItem>
                          <SelectItem value="reject">Reject</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="includeWarmup"
                        checked={includeWarmup}
                        onChange={(e) => setIncludeWarmup(e.target.checked)}
                        className="rounded border-border"
                      />
                      <label htmlFor="includeWarmup" className="text-sm">Include warmup subdomain</label>
                    </div>

                    <Button 
                      onClick={generateDNSRecords}
                      disabled={!domain.trim()}
                      className="w-full"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Generate DNS Records
                    </Button>
                  </CardContent>
                </Card>

                {/* Provider Info */}
                {emailProvider !== "custom" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Provider Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">PROVIDER</Label>
                          <p className="font-medium">{emailProviders[emailProvider as keyof typeof emailProviders].name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">MX RECORDS</Label>
                          <p className="font-medium">{emailProviders[emailProvider as keyof typeof emailProviders].mx.length} records</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">AUTHENTICATION</Label>
                          <div className="flex gap-1">
                            <Badge variant="outline" className="text-xs">SPF</Badge>
                            <Badge variant="outline" className="text-xs">DKIM</Badge>
                            <Badge variant="outline" className="text-xs">DMARC</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Records Display */}
              <div className="lg:col-span-2">
                {generatedRecords.length > 0 ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Server className="w-5 h-5 text-green-600" />
                            DNS Records ({generatedRecords.length})
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedRecords.map(r => `${r.name} ${r.ttl} IN ${r.type} ${r.priority || ''} ${r.value}`).join('\n'))}>
                              <Copy className="w-4 h-4 mr-1" />
                              Copy All
                            </Button>
                            <Button variant="outline" size="sm" onClick={downloadRecords}>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {generatedRecords.map((record) => (
                            <Card key={record.id} className="bg-muted/20">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <Badge className={getRecordTypeColor(record.type)}>
                                      {record.type}
                                    </Badge>
                                    <div>
                                      <p className="font-medium">{record.name}</p>
                                      <p className="text-xs text-muted-foreground">{record.description}</p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(`${record.name} ${record.ttl} IN ${record.type} ${record.priority ? `${record.priority} ` : ''}${record.value}`, record.id)}
                                  >
                                    {copiedItems.has(record.id) ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>

                                <div className="space-y-2">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <Label className="text-xs text-muted-foreground">NAME</Label>
                                      <p className="font-mono break-all">{record.name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-xs text-muted-foreground">TTL</Label>
                                      <p className="font-mono">{record.ttl}</p>
                                    </div>
                                  </div>

                                  {record.priority && (
                                    <div>
                                      <Label className="text-xs text-muted-foreground">PRIORITY</Label>
                                      <p className="font-mono">{record.priority}</p>
                                    </div>
                                  )}

                                  <div>
                                    <Label className="text-xs text-muted-foreground">VALUE</Label>
                                    <div className="mt-1 p-2 bg-background rounded border">
                                      <p className="font-mono text-sm break-all">{record.value}</p>
                                    </div>
                                  </div>

                                  {record.value.includes('[Get') && (
                                    <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                      <p className="text-xs text-yellow-800">
                                        This record requires additional configuration in your email provider's dashboard.
                                      </p>
                                    </div>
                                  )}
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
                      <Server className="w-16 h-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Ready to Generate DNS Records</h3>
                      <p className="text-muted-foreground text-center mb-6 max-w-md">
                        Enter your domain and select an email provider to generate the complete 
                        DNS record set with authentication and security best practices.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline">MX Records</Badge>
                        <Badge variant="outline">SPF Authentication</Badge>
                        <Badge variant="outline">DKIM Signing</Badge>
                        <Badge variant="outline">DMARC Policy</Badge>
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

export default DNSRecordGeneratorPage;
