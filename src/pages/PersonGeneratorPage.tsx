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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCircle, 
  Copy, 
  RefreshCw, 
  Download, 
  Settings, 
  CheckCircle,
  Filter,
  Shuffle,
  Users,
  User,
  Mail
} from "lucide-react";
import { toast } from "sonner";

interface PersonData {
  firstName: string;
  lastName: string;
  email: string;
  gender: "male" | "female";
  nationality: string;
  jobTitle: string;
  company: string;
}

const PersonGeneratorPage = () => {
  const [generatedPersons, setGeneratedPersons] = useState<PersonData[]>([]);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState([15]);
  const [genderFilter, setGenderFilter] = useState<"mixed" | "male" | "female">("mixed");
  const [nationalityFilter, setNationalityFilter] = useState<string>("mixed");
  const [domainInput, setDomainInput] = useState("company.com");
  
  // Options
  const [includeJobTitles, setIncludeJobTitles] = useState(true);
  const [includeCompanies, setIncludeCompanies] = useState(true);
  const [useRealisticCombos, setUseRealisticCombos] = useState(true);
  const [avoidCommonNames, setAvoidCommonNames] = useState(false);
  const [professionalFocus, setProfessionalFocus] = useState(true);

  // Name databases
  const nameData = {
    american: {
      male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Christopher", "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua"],
      female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", "Nancy", "Lisa", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle"]
    },
    european: {
      male: ["Alexander", "Sebastian", "Oliver", "Lucas", "Benjamin", "Felix", "Jonas", "Leon", "Noah", "Elias", "Maximilian", "Luca", "Henri", "Adrian", "Marco", "Niklas", "Vincent", "Andreas", "Stefan", "Christian"],
      female: ["Emma", "Sophie", "Marie", "Anna", "Lea", "Laura", "Julia", "Lena", "Hannah", "Sara", "Elena", "Amelie", "Nora", "Isabella", "Charlotte", "Zoe", "Maja", "Emilia", "Mia", "Alicia"]
    },
    international: {
      male: ["Raj", "Ahmed", "Chen", "Hiroshi", "Carlos", "Giovanni", "Dmitri", "Pierre", "Hans", "Erik", "Pablo", "Ivan", "Marco", "Sergio", "Andre", "Klaus", "Jorge", "Antonio", "Francisco", "Roberto"],
      female: ["Priya", "Fatima", "Li", "Yuki", "Maria", "Giulia", "Natasha", "Claire", "Ingrid", "Astrid", "Carmen", "Olga", "Francesca", "Rosa", "Ana", "Petra", "Lucia", "Isabel", "Elena", "Sofia"]
    }
  };

  const lastNames = {
    american: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"],
    european: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann"],
    international: ["Patel", "Kumar", "Singh", "Chen", "Wang", "Li", "Zhang", "Liu", "Yang", "Wu", "Tanaka", "Yamamoto", "Sato", "Suzuki", "Rossi", "Romano", "Ferrari", "Russo", "Petrov", "Novak"]
  };

  const jobTitles = {
    sales: ["Sales Manager", "Account Executive", "Business Development Rep", "Regional Sales Director", "Sales Coordinator", "Key Account Manager", "Inside Sales Rep", "Sales Specialist"],
    marketing: ["Marketing Manager", "Digital Marketing Specialist", "Content Manager", "Brand Manager", "SEO Specialist", "Social Media Manager", "Marketing Coordinator", "Growth Manager"],
    executive: ["CEO", "COO", "CTO", "VP Sales", "VP Marketing", "General Manager", "Regional Director", "Department Head"],
    support: ["Customer Success Manager", "Account Manager", "Client Relations Manager", "Support Specialist", "Operations Manager", "Project Manager", "Business Analyst", "Consultant"]
  };

  const companies = [
    "TechCorp", "InnovateLab", "GlobalSolutions", "NextGen Systems", "ProActive Group", "Strategic Partners", "Dynamic Enterprises", "FutureTech", "Precision Industries", "Excellence Corp",
    "Premier Solutions", "Advanced Systems", "MetroTech", "Cornerstone Group", "Catalyst Partners", "Momentum Corp", "Optimal Solutions", "Pinnacle Systems", "Spectrum Enterprises", "Velocity Group"
  ];

  const generatePersons = () => {
    const persons: PersonData[] = [];
    
    for (let i = 0; i < quantity[0]; i++) {
      // Determine gender
      let gender: "male" | "female";
      if (genderFilter === "mixed") {
        gender = Math.random() > 0.5 ? "male" : "female";
      } else {
        gender = genderFilter;
      }

      // Determine nationality
      let nationality: string;
      if (nationalityFilter === "mixed") {
        const nationalities = Object.keys(nameData);
        nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
      } else {
        nationality = nationalityFilter;
      }

      // Get names based on nationality and gender
      const firstNames = nameData[nationality as keyof typeof nameData][gender];
      const surnames = lastNames[nationality as keyof typeof lastNames];
      
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = surnames[Math.floor(Math.random() * surnames.length)];
      
      // Generate email
      const emailPrefix = Math.random() > 0.7 ? 
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}` :
        Math.random() > 0.5 ?
          `${firstName.toLowerCase()}${lastName.toLowerCase()}` :
          `${firstName.toLowerCase()}${Math.floor(Math.random() * 99)}`;
      
      const email = `${emailPrefix}@${domainInput}`;
      
      // Generate job title
      let jobTitle = "";
      if (includeJobTitles) {
        const categories = Object.keys(jobTitles);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const titles = jobTitles[category as keyof typeof jobTitles];
        jobTitle = titles[Math.floor(Math.random() * titles.length)];
      }
      
      // Generate company
      let company = "";
      if (includeCompanies) {
        company = companies[Math.floor(Math.random() * companies.length)];
      }

      persons.push({
        firstName,
        lastName,
        email,
        gender,
        nationality,
        jobTitle,
        company
      });
    }
    
    setGeneratedPersons(persons);
    setCopiedItems(new Set());
    toast.success(`Generated ${persons.length} person profiles`);
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

  const copyAllData = async (format: "names" | "emails" | "full") => {
    let text = "";
    
    switch (format) {
      case "names":
        text = generatedPersons.map(p => `${p.firstName} ${p.lastName}`).join('\n');
        break;
      case "emails":
        text = generatedPersons.map(p => p.email).join('\n');
        break;
      case "full":
        text = generatedPersons.map(p => 
          `${p.firstName} ${p.lastName}, ${p.email}${p.jobTitle ? `, ${p.jobTitle}` : ''}${p.company ? `, ${p.company}` : ''}`
        ).join('\n');
        break;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`All ${format} copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadCSV = () => {
    const headers = ["First Name", "Last Name", "Email", "Gender", "Nationality"];
    if (includeJobTitles) headers.push("Job Title");
    if (includeCompanies) headers.push("Company");
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      headers.join(',') + '\n' +
      generatedPersons.map(p => {
        const row = [p.firstName, p.lastName, p.email, p.gender, p.nationality];
        if (includeJobTitles) row.push(p.jobTitle || '');
        if (includeCompanies) row.push(p.company || '');
        return row.map(field => `"${field}"`).join(',');
      }).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `persons_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV downloaded");
  };

  const randomizeSettings = () => {
    const genders: ("mixed" | "male" | "female")[] = ["mixed", "male", "female"];
    setGenderFilter(genders[Math.floor(Math.random() * 3)]);
    setNationalityFilter(["mixed", "american", "european", "international"][Math.floor(Math.random() * 4)]);
    setIncludeJobTitles(Math.random() > 0.3);
    setIncludeCompanies(Math.random() > 0.4);
    setUseRealisticCombos(Math.random() > 0.2);
    setQuantity([Math.floor(Math.random() * 25) + 10]);
    toast.info("Settings randomized");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6 border border-purple-200">
              <UserCircle className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Person Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Realistic
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Person Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate realistic person profiles with names, emails, and professional details. 
              Perfect for testing, demos, and cold email campaign planning.
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
                      <Settings className="w-5 h-5 text-purple-600" />
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

                  {/* Gender Filter */}
                  <div>
                    <Label className="text-sm font-medium">Gender</Label>
                    <Select value={genderFilter} onValueChange={(value: "mixed" | "male" | "female") => setGenderFilter(value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mixed">Mixed</SelectItem>
                        <SelectItem value="male">Male Only</SelectItem>
                        <SelectItem value="female">Female Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Nationality Filter */}
                  <div>
                    <Label className="text-sm font-medium">Names Style</Label>
                    <Select value={nationalityFilter} onValueChange={setNationalityFilter}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mixed">Mixed International</SelectItem>
                        <SelectItem value="american">American</SelectItem>
                        <SelectItem value="european">European</SelectItem>
                        <SelectItem value="international">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Domain Input */}
                  <div>
                    <Label htmlFor="domain" className="text-sm font-medium">Email Domain</Label>
                    <Input 
                      id="domain"
                      placeholder="company.com"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Include Details</Label>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="jobTitles" 
                        checked={includeJobTitles}
                        onCheckedChange={(checked) => setIncludeJobTitles(checked === true)}
                      />
                      <label htmlFor="jobTitles" className="text-sm">Job titles</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="companies" 
                        checked={includeCompanies}
                        onCheckedChange={(checked) => setIncludeCompanies(checked === true)}
                      />
                      <label htmlFor="companies" className="text-sm">Company names</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="realistic" 
                        checked={useRealisticCombos}
                        onCheckedChange={(checked) => setUseRealisticCombos(checked === true)}
                      />
                      <label htmlFor="realistic" className="text-sm">Realistic combinations</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="avoidCommon" 
                        checked={avoidCommonNames}
                        onCheckedChange={(checked) => setAvoidCommonNames(checked === true)}
                      />
                      <label htmlFor="avoidCommon" className="text-sm">Avoid common names</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="professional" 
                        checked={professionalFocus}
                        onCheckedChange={(checked) => setProfessionalFocus(checked === true)}
                      />
                      <label htmlFor="professional" className="text-sm">Professional focus</label>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button 
                    onClick={generatePersons} 
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Persons
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
                      <Users className="w-5 h-5 text-indigo-600" />
                      <CardTitle>Generated Persons</CardTitle>
                      {generatedPersons.length > 0 && (
                        <Badge variant="secondary">{generatedPersons.length}</Badge>
                      )}
                    </div>
                    
                    {generatedPersons.length > 0 && (
                      <div className="flex gap-2">
                        <Select onValueChange={(value: "names" | "emails" | "full") => copyAllData(value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Copy..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="names">Names</SelectItem>
                            <SelectItem value="emails">Emails</SelectItem>
                            <SelectItem value="full">Full Data</SelectItem>
                          </SelectContent>
                        </Select>
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
                  {generatedPersons.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <UserCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Generate Persons" to create realistic person profiles</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {generatedPersons.map((person, index) => (
                        <Card key={index} className="bg-muted/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-purple-600" />
                                    <span className="font-semibold">{person.firstName} {person.lastName}</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(`${person.firstName} ${person.lastName}`)}
                                    className="h-6 w-6 p-0"
                                  >
                                    {copiedItems.has(`${person.firstName} ${person.lastName}`) ? (
                                      <CheckCircle className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </Button>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-mono text-muted-foreground">{person.email}</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(person.email)}
                                    className="h-6 w-6 p-0"
                                  >
                                    {copiedItems.has(person.email) ? (
                                      <CheckCircle className="w-3 h-3 text-green-600" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </Button>
                                </div>
                                
                                {(person.jobTitle || person.company) && (
                                  <div className="text-sm text-muted-foreground">
                                    {person.jobTitle && <span>{person.jobTitle}</span>}
                                    {person.jobTitle && person.company && <span> at </span>}
                                    {person.company && <span className="font-medium">{person.company}</span>}
                                  </div>
                                )}
                                
                                <div className="flex gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {person.gender}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {person.nationality}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonGeneratorPage;
