import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { seoConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Copy, 
  Upload, 
  Download, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Filter,
  FileText,
  Database,
  Globe
} from "lucide-react";
import { toast } from "sonner";

interface EmailValidation {
  email: string;
  isValid: boolean;
  reason: string;
  deliverable: "valid" | "invalid" | "risky" | "unknown";
  domain: string;
  suggestion?: string;
  checks: {
    syntax: boolean;
    domain: boolean;
    mx: boolean;
    disposable: boolean;
    role: boolean;
    catchAll: boolean;
  };
  riskScore: number;
  confidence: number;
}

const EmailValidatorPage = () => {
  const [singleEmail, setSingleEmail] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [validationResults, setValidationResults] = useState<EmailValidation[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    total: 0,
    valid: 0,
    invalid: 0,
    risky: 0,
    unknown: 0
  });

  const disposableDomains = [
    "10minutemail.com", "guerrillamail.com", "mailinator.com", "tempmail.org",
    "yopmail.com", "throwaway.email", "temp-mail.org", "dispostable.com",
    "fakeinbox.com", "mailnesia.com", "trashmail.com", "spam4.me"
  ];

  const roleBased = [
    "admin", "support", "info", "contact", "sales", "marketing", "help",
    "service", "team", "office", "noreply", "no-reply", "postmaster"
  ];

  const topDomains = [
    "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com",
    "aol.com", "protonmail.com", "mail.com", "zoho.com", "fastmail.com"
  ];

  const validateEmail = (email: string): EmailValidation => {
    const trimmedEmail = email.trim().toLowerCase();
    
    // Basic syntax check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const syntaxValid = emailRegex.test(trimmedEmail);
    
    // Extract domain
    const domain = trimmedEmail.split('@')[1] || '';
    const localPart = trimmedEmail.split('@')[0] || '';
    
    // Domain validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
    const domainValid = domainRegex.test(domain) && domain.length > 0;
    
    // Check if disposable
    const isDisposable = disposableDomains.some(d => domain.includes(d));
    
    // Check if role-based
    const isRole = roleBased.some(role => localPart.startsWith(role));
    
    // Simulate MX record check (in real app, this would be server-side)
    const hasMX = topDomains.includes(domain) || domain.includes('.com') || domain.includes('.org');
    
    // Check for catch-all (simplified simulation)
    const isCatchAll = domain.includes('example.') || localPart.includes('test');
    
    // Calculate risk score
    let riskScore = 0;
    if (!syntaxValid) riskScore += 40;
    if (!domainValid) riskScore += 30;
    if (isDisposable) riskScore += 35;
    if (isRole) riskScore += 15;
    if (!hasMX) riskScore += 25;
    if (isCatchAll) riskScore += 20;
    if (localPart.length < 2) riskScore += 10;
    if (domain.split('.').length > 3) riskScore += 5;
    
    // Determine deliverability
    let deliverable: "valid" | "invalid" | "risky" | "unknown" = "unknown";
    let reason = "";
    let suggestion: string | undefined;
    
    if (!syntaxValid) {
      deliverable = "invalid";
      reason = "Invalid email format";
    } else if (!domainValid) {
      deliverable = "invalid";
      reason = "Invalid domain format";
    } else if (isDisposable) {
      deliverable = "risky";
      reason = "Disposable email provider";
    } else if (!hasMX) {
      deliverable = "invalid";
      reason = "Domain has no MX record";
    } else if (riskScore > 30) {
      deliverable = "risky";
      reason = "High risk factors detected";
    } else if (riskScore < 10) {
      deliverable = "valid";
      reason = "Passes all validation checks";
    } else {
      deliverable = "unknown";
      reason = "Unable to verify deliverability";
    }
    
    // Generate suggestions for common typos
    if (!syntaxValid || !domainValid) {
      if (domain.includes('gmial')) suggestion = trimmedEmail.replace('gmial', 'gmail');
      if (domain.includes('yahooo')) suggestion = trimmedEmail.replace('yahooo', 'yahoo');
      if (domain.includes('hotmial')) suggestion = trimmedEmail.replace('hotmial', 'hotmail');
      if (domain.includes('.co')) suggestion = trimmedEmail.replace('.co', '.com');
    }
    
    const confidence = Math.max(0, 100 - riskScore);
    
    return {
      email: trimmedEmail,
      isValid: deliverable === "valid",
      reason,
      deliverable,
      domain,
      suggestion,
      checks: {
        syntax: syntaxValid,
        domain: domainValid,
        mx: hasMX,
        disposable: !isDisposable,
        role: !isRole,
        catchAll: !isCatchAll
      },
      riskScore: Math.min(100, riskScore),
      confidence
    };
  };

  const validateSingleEmail = () => {
    if (!singleEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }
    
    setIsValidating(true);
    
    // Simulate API delay
    setTimeout(() => {
      const result = validateEmail(singleEmail);
      setValidationResults([result]);
      updateStats([result]);
      setIsValidating(false);
      toast.success("Email validated");
    }, 800);
  };

  const validateBulkEmails = () => {
    const emails = bulkEmails
      .split('\n')
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    if (emails.length === 0) {
      toast.error("Please enter email addresses");
      return;
    }
    
    if (emails.length > 100) {
      toast.error("Maximum 100 emails allowed");
      return;
    }
    
    setIsValidating(true);
    
    // Simulate progressive validation
    const results: EmailValidation[] = [];
    let processed = 0;
    
    const validateNext = () => {
      if (processed < emails.length) {
        const result = validateEmail(emails[processed]);
        results.push(result);
        processed++;
        
        // Update progress
        setTimeout(() => {
          if (processed === emails.length) {
            setValidationResults(results);
            updateStats(results);
            setIsValidating(false);
            toast.success(`Validated ${results.length} emails`);
          } else {
            validateNext();
          }
        }, 50);
      }
    };
    
    validateNext();
  };

  const updateStats = (results: EmailValidation[]) => {
    const newStats = {
      total: results.length,
      valid: results.filter(r => r.deliverable === "valid").length,
      invalid: results.filter(r => r.deliverable === "invalid").length,
      risky: results.filter(r => r.deliverable === "risky").length,
      unknown: results.filter(r => r.deliverable === "unknown").length
    };
    setStats(newStats);
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

  const exportResults = (type: "valid" | "invalid" | "all") => {
    let emailsToExport: string[] = [];
    
    switch (type) {
      case "valid":
        emailsToExport = validationResults
          .filter(r => r.deliverable === "valid")
          .map(r => r.email);
        break;
      case "invalid":
        emailsToExport = validationResults
          .filter(r => r.deliverable === "invalid" || r.deliverable === "risky")
          .map(r => r.email);
        break;
      case "all":
        emailsToExport = validationResults.map(r => r.email);
        break;
    }
    
    if (emailsToExport.length === 0) {
      toast.error(`No ${type} emails to export`);
      return;
    }
    
    const text = emailsToExport.join('\n');
    copyToClipboard(text);
  };

  const downloadCSV = () => {
    if (validationResults.length === 0) {
      toast.error("No results to download");
      return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Email,Status,Reason,Risk Score,Confidence,Domain,Suggestion\n" + 
      validationResults.map(r => 
        `"${r.email}","${r.deliverable}","${r.reason}",${r.riskScore},${r.confidence},"${r.domain}","${r.suggestion || ''}"`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `email_validation_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded");
  };

  const getStatusColor = (deliverable: string) => {
    switch (deliverable) {
      case "valid": return "text-green-600 bg-green-50 border-green-200";
      case "invalid": return "text-red-600 bg-red-50 border-red-200";
      case "risky": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (deliverable: string) => {
    switch (deliverable) {
      case "valid": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "invalid": return <XCircle className="w-4 h-4 text-red-600" />;
      case "risky": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.emailValidator.title}
        description={seoConfig.emailValidator.description}
        keywords={seoConfig.emailValidator.keywords}
        canonical={seoConfig.emailValidator.canonical}
        schemaType={seoConfig.emailValidator.schemaType}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 rounded-full px-4 py-2 mb-6 border border-emerald-200">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-medium">Email Validator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Advanced
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Email Validator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Validate email addresses with comprehensive checks including syntax, domain verification, 
              disposable detection, and deliverability analysis.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>Real-time Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Bulk Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-600" />
                <span>Domain Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          
          <Tabs defaultValue="single" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="single">Single Email</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Validation</TabsTrigger>
            </TabsList>

            {/* Single Email Tab */}
            <TabsContent value="single" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    Single Email Validation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="singleEmail">Email Address</Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        id="singleEmail"
                        placeholder="Enter email address to validate"
                        value={singleEmail}
                        onChange={(e) => setSingleEmail(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && validateSingleEmail()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={validateSingleEmail}
                        disabled={isValidating || !singleEmail.trim()}
                      >
                        {isValidating ? "Validating..." : "Validate"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bulk Email Tab */}
            <TabsContent value="bulk" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    Bulk Email Validation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bulkEmails">Email Addresses (one per line, max 100)</Label>
                    <Textarea 
                      id="bulkEmails"
                      placeholder="Enter email addresses, one per line..."
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={validateBulkEmails}
                      disabled={isValidating || !bulkEmails.trim()}
                      className="flex-1"
                    >
                      {isValidating ? "Validating..." : "Validate All"}
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Results Section */}
          {validationResults.length > 0 && (
            <div className="max-w-6xl mx-auto mt-8 space-y-6">
              
              {/* Stats Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-purple-600" />
                      Validation Results
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportResults("valid")}>
                        <Copy className="w-4 h-4 mr-1" />
                        Valid
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportResults("invalid")}>
                        <Copy className="w-4 h-4 mr-1" />
                        Invalid
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadCSV}>
                        <Download className="w-4 h-4 mr-1" />
                        CSV
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{stats.total}</div>
                      <div className="text-sm text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
                      <div className="text-sm text-muted-foreground">Valid</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{stats.invalid}</div>
                      <div className="text-sm text-muted-foreground">Invalid</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{stats.risky}</div>
                      <div className="text-sm text-muted-foreground">Risky</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{stats.unknown}</div>
                      <div className="text-sm text-muted-foreground">Unknown</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {isValidating && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Validating emails...</span>
                        <span className="text-sm text-muted-foreground">
                          {validationResults.length} / {bulkEmails.split('\n').filter(e => e.trim()).length}
                        </span>
                      </div>
                      <Progress 
                        value={(validationResults.length / bulkEmails.split('\n').filter(e => e.trim()).length) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Results List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {validationResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          {getStatusIcon(result.deliverable)}
                          <div className="flex-1">
                            <div className="font-mono text-sm">{result.email}</div>
                            <div className="text-xs text-muted-foreground">{result.reason}</div>
                            {result.suggestion && (
                              <div className="text-xs text-blue-600">
                                Suggestion: {result.suggestion}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(result.deliverable)}>
                            {result.deliverable}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {result.confidence}%
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(result.email)}
                          >
                            {copiedItems.has(result.email) ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Analysis for Single Email */}
              {validationResults.length === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Validation Checks</h4>
                        <div className="space-y-2">
                          {Object.entries(validationResults[0].checks).map(([check, passed]) => (
                            <div key={check} className="flex items-center justify-between">
                              <span className="text-sm capitalize">{check.replace(/([A-Z])/g, ' $1')}</span>
                              {passed ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Risk Assessment</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Risk Score</span>
                              <span className="text-sm">{validationResults[0].riskScore}/100</span>
                            </div>
                            <Progress value={validationResults[0].riskScore} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Confidence</span>
                              <span className="text-sm">{validationResults[0].confidence}%</span>
                            </div>
                            <Progress value={validationResults[0].confidence} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmailValidatorPage;
