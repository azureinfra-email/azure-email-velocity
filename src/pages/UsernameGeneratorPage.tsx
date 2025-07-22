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
import { 
  AtSign, 
  Copy, 
  RefreshCw, 
  Download, 
  Settings, 
  CheckCircle,
  Filter,
  Shuffle
} from "lucide-react";
import { toast } from "sonner";

const UsernameGeneratorPage = () => {
  const [baseWord, setBaseWord] = useState("");
  const [generatedUsernames, setGeneratedUsernames] = useState<string[]>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState([20]);
  const [minLength, setMinLength] = useState([3]);
  const [maxLength, setMaxLength] = useState([25]);
  
  // Options
  const [includePrefixes, setIncludePrefixes] = useState(true);
  const [includeSuffixes, setIncludeSuffixes] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSeparators, setIncludeSeparators] = useState(true);
  const [avoidCommon, setAvoidCommon] = useState(false);

  const prefixes = ["info", "hello", "contact", "support", "sales", "team", "admin", "dev", "get", "my", "the", "pro", "new", "best", "top"];
  const suffixes = ["2024", "2025", "pro", "biz", "hub", "lab", "co", "io", "hq", "tech", "app", "tool", "now", "plus", "max"];
  const separators = ["", ".", "_", "-"];
  const commonWords = ["admin", "info", "support", "contact", "sales"];

  const generateUsernames = () => {
    if (!baseWord.trim()) {
      toast.error("Please enter a base word");
      return;
    }
    
    const usernames = new Set<string>();
    const word = baseWord.toLowerCase().replace(/\s+/g, "");
    
    // Base variations
    usernames.add(word);
    
    // With prefixes
    if (includePrefixes) {
      prefixes.forEach(prefix => {
        if (includeSeparators) {
          separators.forEach(sep => {
            const username = `${prefix}${sep}${word}`;
            if (username.length >= minLength[0] && username.length <= maxLength[0]) {
              if (!avoidCommon || !commonWords.includes(prefix)) {
                usernames.add(username);
              }
            }
          });
        } else {
          const username = `${prefix}${word}`;
          if (username.length >= minLength[0] && username.length <= maxLength[0]) {
            if (!avoidCommon || !commonWords.includes(prefix)) {
              usernames.add(username);
            }
          }
        }
      });
    }
    
    // With suffixes
    if (includeSuffixes) {
      suffixes.forEach(suffix => {
        if (includeSeparators) {
          separators.forEach(sep => {
            const username = `${word}${sep}${suffix}`;
            if (username.length >= minLength[0] && username.length <= maxLength[0]) {
              usernames.add(username);
            }
          });
        } else {
          const username = `${word}${suffix}`;
          if (username.length >= minLength[0] && username.length <= maxLength[0]) {
            usernames.add(username);
          }
        }
      });
    }
    
    // With numbers
    if (includeNumbers) {
      for (let i = 1; i <= 999; i++) {
        const username1 = `${word}${i}`;
        const username2 = i < 100 ? `${word}0${i}` : null;
        
        if (username1.length >= minLength[0] && username1.length <= maxLength[0]) {
          usernames.add(username1);
        }
        if (username2 && username2.length >= minLength[0] && username2.length <= maxLength[0]) {
          usernames.add(username2);
        }
        
        if (usernames.size >= quantity[0] * 2) break;
      }
    }
    
    // Additional creative combinations
    if (includePrefixes && includeSuffixes) {
      prefixes.slice(0, 5).forEach(prefix => {
        suffixes.slice(0, 5).forEach(suffix => {
          if (includeSeparators) {
            separators.forEach(sep => {
              const username = `${prefix}${sep}${word}${sep}${suffix}`;
              if (username.length >= minLength[0] && username.length <= maxLength[0]) {
                usernames.add(username);
              }
            });
          } else {
            const username = `${prefix}${word}${suffix}`;
            if (username.length >= minLength[0] && username.length <= maxLength[0]) {
              usernames.add(username);
            }
          }
        });
      });
    }
    
    const finalUsernames = Array.from(usernames).slice(0, quantity[0]);
    setGeneratedUsernames(finalUsernames);
    setCopiedItems(new Set());
    toast.success(`Generated ${finalUsernames.length} usernames`);
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

  const copyAllUsernames = async () => {
    const text = generatedUsernames.join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast.success("All usernames copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Username\n" + 
      generatedUsernames.join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `usernames_${baseWord}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded");
  };

  const randomizeSettings = () => {
    setIncludePrefixes(Math.random() > 0.3);
    setIncludeSuffixes(Math.random() > 0.3);
    setIncludeNumbers(Math.random() > 0.2);
    setIncludeSeparators(Math.random() > 0.4);
    setAvoidCommon(Math.random() > 0.7);
    setQuantity([Math.floor(Math.random() * 30) + 10]);
    toast.info("Settings randomized");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-6 border border-blue-200">
              <AtSign className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Username Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Professional
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Username Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate professional email usernames with advanced customization options. 
              Perfect for cold email campaigns, testing, and account creation.
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
                      <Settings className="w-5 h-5 text-blue-600" />
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
                  {/* Base Word Input */}
                  <div>
                    <Label htmlFor="baseWord" className="text-sm font-medium">Base Word *</Label>
                    <Input 
                      id="baseWord"
                      placeholder="e.g., marketing, sales, john"
                      value={baseWord}
                      onChange={(e) => setBaseWord(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && generateUsernames()}
                      className="mt-1"
                    />
                  </div>

                  {/* Quantity Slider */}
                  <div>
                    <Label className="text-sm font-medium">Quantity: {quantity[0]}</Label>
                    <Slider
                      value={quantity}
                      onValueChange={setQuantity}
                      max={50}
                      min={5}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Length Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Min Length: {minLength[0]}</Label>
                      <Slider
                        value={minLength}
                        onValueChange={setMinLength}
                        max={15}
                        min={1}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Max Length: {maxLength[0]}</Label>
                      <Slider
                        value={maxLength}
                        onValueChange={setMaxLength}
                        max={50}
                        min={5}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Include Elements</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="prefixes" 
                        checked={includePrefixes}
                        onCheckedChange={(checked) => setIncludePrefixes(checked === true)}
                      />
                      <label htmlFor="prefixes" className="text-sm">Prefixes (info, sales, etc.)</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="suffixes" 
                        checked={includeSuffixes}
                        onCheckedChange={(checked) => setIncludeSuffixes(checked === true)}
                      />
                      <label htmlFor="suffixes" className="text-sm">Suffixes (2024, pro, etc.)</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="numbers" 
                        checked={includeNumbers}
                        onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                      />
                      <label htmlFor="numbers" className="text-sm">Numbers (1-999)</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="separators" 
                        checked={includeSeparators}
                        onCheckedChange={(checked) => setIncludeSeparators(checked === true)}
                      />
                      <label htmlFor="separators" className="text-sm">Separators (., _, -)</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="avoidCommon" 
                        checked={avoidCommon}
                        onCheckedChange={(checked) => setAvoidCommon(checked === true)}
                      />
                      <label htmlFor="avoidCommon" className="text-sm">Avoid common words</label>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={generateUsernames} 
                    className="w-full"
                    disabled={!baseWord.trim()}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Usernames
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
                      <Filter className="w-5 h-5 text-green-600" />
                      <CardTitle>Generated Usernames</CardTitle>
                      {generatedUsernames.length > 0 && (
                        <Badge variant="secondary">{generatedUsernames.length}</Badge>
                      )}
                    </div>
                    
                    {generatedUsernames.length > 0 && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyAllUsernames}
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
                  {generatedUsernames.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <AtSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Enter a base word and click "Generate Usernames" to get started</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {generatedUsernames.map((username, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
                        >
                          <span className="text-sm font-mono flex-1 mr-2">{username}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(username)}
                            className="h-6 w-6 p-0 hover:bg-green-100"
                          >
                            {copiedItems.has(username) ? (
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </Button>
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

export default UsernameGeneratorPage;
