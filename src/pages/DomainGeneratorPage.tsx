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
import { 
  Globe, 
  Copy, 
  RefreshCw, 
  Download, 
  Settings, 
  CheckCircle,
  Filter,
  Shuffle,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

const DomainGeneratorPage = () => {
  const [keyword, setKeyword] = useState("");
  const [generatedDomains, setGeneratedDomains] = useState<Array<{domain: string, available: boolean | null, checked: boolean}>>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState([25]);
  const [minLength, setMinLength] = useState([5]);
  const [maxLength, setMaxLength] = useState([20]);
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>([".com", ".io", ".co"]);
  const [domainType, setDomainType] = useState<"business" | "tech" | "creative" | "all">("business");
  
  // Options
  const [includePrefixes, setIncludePrefixes] = useState(true);
  const [includeSuffixes, setIncludeSuffixes] = useState(true);
  const [includeHyphens, setIncludeHyphens] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [avoidTrademark, setAvoidTrademark] = useState(true);

  const allExtensions = [
    ".com", ".io", ".co", ".net", ".org", ".biz", ".info", ".app", ".dev", ".tech", 
    ".ai", ".ly", ".me", ".us", ".uk", ".ca", ".de", ".fr", ".it", ".es"
  ];

  const businessPrefixes = ["get", "try", "use", "go", "my", "the", "pro", "best", "top", "smart"];
  const techPrefixes = ["dev", "code", "tech", "data", "cloud", "api", "app", "web", "digital"];
  const creativePrefixes = ["create", "design", "make", "build", "craft", "studio", "lab", "works"];

  const businessSuffixes = ["hub", "pro", "hq", "center", "base", "zone", "point", "plus", "max", "group"];
  const techSuffixes = ["tech", "dev", "code", "app", "lab", "api", "cloud", "data", "sys", "net"];
  const creativeSuffixes = ["studio", "works", "lab", "space", "house", "shop", "co", "collective"];

  const trademarkWords = ["google", "facebook", "amazon", "apple", "microsoft", "twitter", "youtube", "instagram"];

  const getPrefixes = () => {
    switch (domainType) {
      case "business": return businessPrefixes;
      case "tech": return techPrefixes;
      case "creative": return creativePrefixes;
      default: return [...businessPrefixes, ...techPrefixes, ...creativePrefixes];
    }
  };

  const getSuffixes = () => {
    switch (domainType) {
      case "business": return businessSuffixes;
      case "tech": return techSuffixes;
      case "creative": return creativeSuffixes;
      default: return [...businessSuffixes, ...techSuffixes, ...creativeSuffixes];
    }
  };

  const generateDomains = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a keyword");
      return;
    }
    
    const domains = new Set<string>();
    const word = keyword.toLowerCase().replace(/\s+/g, "");
    
    if (avoidTrademark && trademarkWords.some(tm => word.includes(tm) || tm.includes(word))) {
      toast.warning("Keyword may contain trademarked terms");
    }
    
    const prefixes = getPrefixes();
    const suffixes = getSuffixes();
    
    // Base domain with extensions
    selectedExtensions.forEach(ext => {
      const domain = `${word}${ext}`;
      if (domain.length >= minLength[0] && domain.length <= maxLength[0]) {
        domains.add(domain);
      }
    });
    
    // With prefixes
    if (includePrefixes) {
      prefixes.forEach(prefix => {
        selectedExtensions.forEach(ext => {
          const domain = `${prefix}${word}${ext}`;
          if (domain.length >= minLength[0] && domain.length <= maxLength[0]) {
            domains.add(domain);
          }
          
          if (includeHyphens) {
            const hyphenDomain = `${prefix}-${word}${ext}`;
            if (hyphenDomain.length >= minLength[0] && hyphenDomain.length <= maxLength[0]) {
              domains.add(hyphenDomain);
            }
          }
        });
      });
    }
    
    // With suffixes
    if (includeSuffixes) {
      suffixes.forEach(suffix => {
        selectedExtensions.forEach(ext => {
          const domain = `${word}${suffix}${ext}`;
          if (domain.length >= minLength[0] && domain.length <= maxLength[0]) {
            domains.add(domain);
          }
          
          if (includeHyphens) {
            const hyphenDomain = `${word}-${suffix}${ext}`;
            if (hyphenDomain.length >= minLength[0] && hyphenDomain.length <= maxLength[0]) {
              domains.add(hyphenDomain);
            }
          }
        });
      });
    }
    
    // With numbers
    if (includeNumbers) {
      for (let i = 1; i <= 99; i++) {
        selectedExtensions.forEach(ext => {
          const domain1 = `${word}${i}${ext}`;
          const domain2 = i < 10 ? `${word}0${i}${ext}` : null;
          
          if (domain1.length >= minLength[0] && domain1.length <= maxLength[0]) {
            domains.add(domain1);
          }
          if (domain2 && domain2.length >= minLength[0] && domain2.length <= maxLength[0]) {
            domains.add(domain2);
          }
        });
        
        if (domains.size >= quantity[0] * 2) break;
      }
    }
    
    // Creative combinations
    if (includePrefixes && includeSuffixes) {
      prefixes.slice(0, 3).forEach(prefix => {
        suffixes.slice(0, 3).forEach(suffix => {
          selectedExtensions.forEach(ext => {
            const domain = `${prefix}${word}${suffix}${ext}`;
            if (domain.length >= minLength[0] && domain.length <= maxLength[0]) {
              domains.add(domain);
            }
          });
        });
      });
    }
    
    const finalDomains = Array.from(domains)
      .slice(0, quantity[0])
      .map(domain => ({ domain, available: null, checked: false }));
    
    setGeneratedDomains(finalDomains);
    setCopiedItems(new Set());
    toast.success(`Generated ${finalDomains.length} domain suggestions`);
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

  const copyAllDomains = async () => {
    const text = generatedDomains.map(d => d.domain).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success("All domains copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Domain,Type,Extension\n" + 
      generatedDomains.map(d => {
        const domain = d.domain;
        const ext = domain.substring(domain.lastIndexOf('.'));
        const name = domain.substring(0, domain.lastIndexOf('.'));
        return `${domain},${domainType},${ext}`;
      }).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `domains_${keyword}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded");
  };

  const openDomainChecker = (domain: string) => {
    const domainName = domain.replace(/\./g, '');
    window.open(`https://whois.net/whois/${domainName}`, '_blank');
  };

  const toggleExtension = (ext: string) => {
    setSelectedExtensions(prev => 
      prev.includes(ext) 
        ? prev.filter(e => e !== ext)
        : [...prev, ext]
    );
  };

  const randomizeSettings = () => {
    const randomExts = allExtensions.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 2);
    setSelectedExtensions(randomExts);
    setIncludePrefixes(Math.random() > 0.3);
    setIncludeSuffixes(Math.random() > 0.3);
    setIncludeHyphens(Math.random() > 0.7);
    setIncludeNumbers(Math.random() > 0.6);
    setQuantity([Math.floor(Math.random() * 30) + 15]);
    toast.info("Settings randomized");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-6 border border-green-200">
              <Globe className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Domain Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Smart
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Domain Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate professional domain names with advanced filtering and categorization. 
              Perfect for email infrastructure, brand creation, and online presence.
            </p>
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
                      <Settings className="w-5 h-5 text-green-600" />
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
                  {/* Keyword Input */}
                  <div>
                    <Label htmlFor="keyword" className="text-sm font-medium">Keyword *</Label>
                    <Input 
                      id="keyword"
                      placeholder="e.g., marketing, agency, solutions"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && generateDomains()}
                      className="mt-1"
                    />
                  </div>

                  {/* Domain Type */}
                  <div>
                    <Label className="text-sm font-medium">Domain Type</Label>
                    <Select value={domainType} onValueChange={(value: "business" | "tech" | "creative" | "all") => setDomainType(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="all">All Types</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity Slider */}
                  <div>
                    <Label className="text-sm font-medium">Quantity: {quantity[0]}</Label>
                    <Slider
                      value={quantity}
                      onValueChange={setQuantity}
                      max={50}
                      min={10}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Length Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Min: {minLength[0]}</Label>
                      <Slider
                        value={minLength}
                        onValueChange={setMinLength}
                        max={15}
                        min={3}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Max: {maxLength[0]}</Label>
                      <Slider
                        value={maxLength}
                        onValueChange={setMaxLength}
                        max={30}
                        min={8}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Extensions */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Extensions ({selectedExtensions.length})</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {allExtensions.map(ext => (
                        <button
                          key={ext}
                          onClick={() => toggleExtension(ext)}
                          className={`text-xs px-2 py-1 rounded border transition-colors ${
                            selectedExtensions.includes(ext)
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {ext}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Options</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="prefixes" 
                        checked={includePrefixes}
                        onCheckedChange={(checked) => setIncludePrefixes(checked === true)}
                      />
                      <label htmlFor="prefixes" className="text-sm">Include prefixes</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="suffixes" 
                        checked={includeSuffixes}
                        onCheckedChange={(checked) => setIncludeSuffixes(checked === true)}
                      />
                      <label htmlFor="suffixes" className="text-sm">Include suffixes</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="hyphens" 
                        checked={includeHyphens}
                        onCheckedChange={(checked) => setIncludeHyphens(checked === true)}
                      />
                      <label htmlFor="hyphens" className="text-sm">Include hyphens</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="numbers" 
                        checked={includeNumbers}
                        onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                      />
                      <label htmlFor="numbers" className="text-sm">Include numbers</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="trademark" 
                        checked={avoidTrademark}
                        onCheckedChange={(checked) => setAvoidTrademark(checked === true)}
                      />
                      <label htmlFor="trademark" className="text-sm">Avoid trademarks</label>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={generateDomains} 
                    className="w-full"
                    disabled={!keyword.trim() || selectedExtensions.length === 0}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Domains
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
                      <Filter className="w-5 h-5 text-blue-600" />
                      <CardTitle>Generated Domains</CardTitle>
                      {generatedDomains.length > 0 && (
                        <Badge variant="secondary">{generatedDomains.length}</Badge>
                      )}
                    </div>
                    
                    {generatedDomains.length > 0 && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyAllDomains}
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
                  {generatedDomains.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a keyword and click "Generate Domains" to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {generatedDomains.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-muted/30 rounded-lg px-4 py-3 hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm font-mono flex-1 mr-4">{item.domain}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openDomainChecker(item.domain)}
                              className="h-7 px-2"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(item.domain)}
                              className="h-7 w-7 p-0 hover:bg-green-100"
                            >
                              {copiedItems.has(item.domain) ? (
                                <CheckCircle className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DomainGeneratorPage;
