import { useState, useEffect, useMemo } from "react";
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
import { 
  Clock, 
  Copy, 
  Globe,
  MapPin,
  Calendar,
  RefreshCw,
  CheckCircle,
  Plus,
  X,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Search
} from "lucide-react";
import { toast } from "sonner";

interface Timezone {
  value: string;
  label: string;
  offset: number;
  city: string;
  country: string;
  abbreviation: string;
}

interface ConvertedTime {
  timezone: Timezone;
  dateTime: Date;
  formatted12h: string;
  formatted24h: string;
  date: string;
  dayOfWeek: string;
  isDST: boolean;
  offsetHours: string;
  businessStatus: string;
  icon: typeof Clock;
}

const TimezoneConverterPage = () => {
  const [sourceDate, setSourceDate] = useState("");
  const [sourceTime, setSourceTime] = useState("");
  const [sourceTimezone, setSourceTimezone] = useState("UTC"); // Temporary default
  const [targetTimezones, setTargetTimezones] = useState<string[]>([
    "Europe/London",        // London
    "America/New_York",     // USA (New York) 
    "Europe/Berlin"         // Germany (Berlin)
  ]);
  const [convertedTimes, setConvertedTimes] = useState<ConvertedTime[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState("");
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");
  const [targetSearchQuery, setTargetSearchQuery] = useState("");
  const [showSourceTimezones, setShowSourceTimezones] = useState(false);
  const [showTargetTimezones, setShowTargetTimezones] = useState(false);
  const [isTimezoneAutoDetected, setIsTimezoneAutoDetected] = useState(false);

  const timezones: Timezone[] = [
    { value: "America/New_York", label: "New York (EST/EDT)", offset: -5, city: "New York", country: "USA", abbreviation: "EST" },
    { value: "America/Chicago", label: "Chicago (CST/CDT)", offset: -6, city: "Chicago", country: "USA", abbreviation: "CST" },
    { value: "America/Denver", label: "Denver (MST/MDT)", offset: -7, city: "Denver", country: "USA", abbreviation: "MST" },
    { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)", offset: -8, city: "Los Angeles", country: "USA", abbreviation: "PST" },
    { value: "America/Toronto", label: "Toronto (EST/EDT)", offset: -5, city: "Toronto", country: "Canada", abbreviation: "EST" },
    { value: "America/Sao_Paulo", label: "São Paulo (BRT)", offset: -3, city: "São Paulo", country: "Brazil", abbreviation: "BRT" },
    { value: "America/Mexico_City", label: "Mexico City (CST)", offset: -6, city: "Mexico City", country: "Mexico", abbreviation: "CST" },
    
    { value: "Europe/London", label: "London (GMT/BST)", offset: 0, city: "London", country: "UK", abbreviation: "GMT" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)", offset: 1, city: "Paris", country: "France", abbreviation: "CET" },
    { value: "Europe/Berlin", label: "Berlin (CET/CEST)", offset: 1, city: "Berlin", country: "Germany", abbreviation: "CET" },
    { value: "Europe/Rome", label: "Rome (CET/CEST)", offset: 1, city: "Rome", country: "Italy", abbreviation: "CET" },
    { value: "Europe/Madrid", label: "Madrid (CET/CEST)", offset: 1, city: "Madrid", country: "Spain", abbreviation: "CET" },
    { value: "Europe/Amsterdam", label: "Amsterdam (CET/CEST)", offset: 1, city: "Amsterdam", country: "Netherlands", abbreviation: "CET" },
    { value: "Europe/Stockholm", label: "Stockholm (CET/CEST)", offset: 1, city: "Stockholm", country: "Sweden", abbreviation: "CET" },
    { value: "Europe/Moscow", label: "Moscow (MSK)", offset: 3, city: "Moscow", country: "Russia", abbreviation: "MSK" },
    
    { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: 9, city: "Tokyo", country: "Japan", abbreviation: "JST" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: 8, city: "Shanghai", country: "China", abbreviation: "CST" },
    { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", offset: 8, city: "Hong Kong", country: "China", abbreviation: "HKT" },
    { value: "Asia/Seoul", label: "Seoul (KST)", offset: 9, city: "Seoul", country: "South Korea", abbreviation: "KST" },
    { value: "Asia/Singapore", label: "Singapore (SGT)", offset: 8, city: "Singapore", country: "Singapore", abbreviation: "SGT" },
    { value: "Asia/Bangkok", label: "Bangkok (ICT)", offset: 7, city: "Bangkok", country: "Thailand", abbreviation: "ICT" },
    { value: "Asia/Kolkata", label: "Mumbai (IST)", offset: 5.5, city: "Mumbai", country: "India", abbreviation: "IST" },
    { value: "Asia/Dubai", label: "Dubai (GST)", offset: 4, city: "Dubai", country: "UAE", abbreviation: "GST" },
    
    { value: "Australia/Sydney", label: "Sydney (AEST/AEDT)", offset: 10, city: "Sydney", country: "Australia", abbreviation: "AEST" },
    { value: "Australia/Melbourne", label: "Melbourne (AEST/AEDT)", offset: 10, city: "Melbourne", country: "Australia", abbreviation: "AEST" },
    { value: "Pacific/Auckland", label: "Auckland (NZST/NZDT)", offset: 12, city: "Auckland", country: "New Zealand", abbreviation: "NZST" },
    
    { value: "Africa/Cairo", label: "Cairo (EET)", offset: 2, city: "Cairo", country: "Egypt", abbreviation: "EET" },
    { value: "Africa/Lagos", label: "Lagos (WAT)", offset: 1, city: "Lagos", country: "Nigeria", abbreviation: "WAT" },
    { value: "Africa/Johannesburg", label: "Johannesburg (SAST)", offset: 2, city: "Johannesburg", country: "South Africa", abbreviation: "SAST" }
  ];

  // Filter timezones based on search query
  const filteredSourceTimezones = useMemo(() => {
    if (!sourceSearchQuery.trim()) return timezones;
    
    const query = sourceSearchQuery.toLowerCase();
    return timezones.filter(tz => 
      tz.label.toLowerCase().includes(query) ||
      tz.city.toLowerCase().includes(query) ||
      tz.country.toLowerCase().includes(query) ||
      tz.abbreviation.toLowerCase().includes(query) ||
      tz.offset.toString().includes(query) ||
      `utc${tz.offset >= 0 ? '+' : ''}${tz.offset}`.includes(query)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceSearchQuery]);

  const filteredTargetTimezones = useMemo(() => {
    if (!targetSearchQuery.trim()) return timezones;
    
    const query = targetSearchQuery.toLowerCase();
    return timezones.filter(tz => 
      tz.label.toLowerCase().includes(query) ||
      tz.city.toLowerCase().includes(query) ||
      tz.country.toLowerCase().includes(query) ||
      tz.abbreviation.toLowerCase().includes(query) ||
      tz.offset.toString().includes(query) ||
      `utc${tz.offset >= 0 ? '+' : ''}${tz.offset}`.includes(query)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSearchQuery]);

  // Initialize with current time
  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    
    setSourceDate(today);
    setSourceTime(currentTime);
  }, []);

  // Detect user's browser timezone and set as default
  useEffect(() => {
    const detectUserTimezone = () => {
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Check if browser timezone exists in our list
      const matchingTimezone = timezones.find(tz => tz.value === browserTimezone);
      if (matchingTimezone) {
        console.log(`Auto-detected timezone: ${browserTimezone} (exact match)`);
        return browserTimezone;
      }
      
      // If exact match not found, try to find a close match based on offset
      const now = new Date();
      const browserOffset = -now.getTimezoneOffset() / 60; // Convert to hours, flip sign
      const closeMatch = timezones.find(tz => tz.offset === browserOffset);
      
      const result = closeMatch ? closeMatch.value : "UTC";
      console.log(`Auto-detected timezone: ${browserTimezone} -> ${result} (${closeMatch ? 'offset match' : 'fallback to UTC'})`);
      return result;
    };

    const userTimezone = detectUserTimezone();
    setSourceTimezone(userTimezone);
    setIsTimezoneAutoDetected(true);
    
    // Update target timezones to exclude user's timezone if it's already in the list
    if (userTimezone === "Europe/London" || userTimezone === "America/New_York" || userTimezone === "Europe/Berlin") {
      const defaultTargets = ["Europe/London", "America/New_York", "Europe/Berlin"];
      const filteredTargets = defaultTargets.filter(tz => tz !== userTimezone);
      
      // Add a fourth timezone to maintain 3 targets
      const additionalTimezone = timezones.find(tz => 
        !filteredTargets.includes(tz.value) && 
        tz.value !== userTimezone &&
        !["Europe/London", "America/New_York", "Europe/Berlin"].includes(tz.value)
      );
      
      if (additionalTimezone && filteredTargets.length < 3) {
        filteredTargets.push(additionalTimezone.value);
      }
      
      setTargetTimezones(filteredTargets.slice(0, 3));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-convert when inputs change
  useEffect(() => {
    if (sourceDate && sourceTime) {
      convertTimes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDate, sourceTime, sourceTimezone, targetTimezones]);

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.timezone-dropdown')) {
        setShowSourceTimezones(false);
        setShowTargetTimezones(false);
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSourceTimezones(false);
        setShowTargetTimezones(false);
        setSourceSearchQuery("");
        setTargetSearchQuery("");
      } else if (event.key === 'Enter' && (showSourceTimezones || showTargetTimezones)) {
        event.preventDefault();
        
        if (showSourceTimezones && filteredSourceTimezones.length > 0) {
          setSourceTimezone(filteredSourceTimezones[0].value);
          setShowSourceTimezones(false);
          setSourceSearchQuery("");
          setIsTimezoneAutoDetected(false); // Clear auto-detected flag
        } else if (showTargetTimezones) {
          const availableTimezones = filteredTargetTimezones.filter(tz => 
            !targetTimezones.includes(tz.value) && tz.value !== sourceTimezone
          );
          if (availableTimezones.length > 0) {
            setTargetTimezones([...targetTimezones, availableTimezones[0].value]);
            setShowTargetTimezones(false);
            setTargetSearchQuery("");
            toast.success(`${availableTimezones[0].city} timezone added`);
          }
        }
      }
    };

    if (showSourceTimezones || showTargetTimezones) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [showSourceTimezones, showTargetTimezones, filteredSourceTimezones, filteredTargetTimezones, targetTimezones, sourceTimezone]);

  const convertTimes = () => {
    if (!sourceDate || !sourceTime) return;

    setIsConverting(true);

    setTimeout(() => {
      const sourceDateTime = new Date(`${sourceDate}T${sourceTime}`);
      const converted: ConvertedTime[] = [];

      // Add source timezone first
      const sourceTimezoneData = timezones.find(tz => tz.value === sourceTimezone);
      if (sourceTimezoneData) {
        const sourceConverted = convertToTimezone(sourceDateTime, sourceTimezoneData, true);
        converted.push(sourceConverted);
      }

      // Convert to target timezones
      targetTimezones.forEach(tzValue => {
        const timezone = timezones.find(tz => tz.value === tzValue);
        if (timezone && tzValue !== sourceTimezone) {
          const convertedTime = convertToTimezone(sourceDateTime, timezone, false);
          converted.push(convertedTime);
        }
      });

      setConvertedTimes(converted);
      setIsConverting(false);
    }, 500);
  };

  const convertToTimezone = (sourceDateTime: Date, timezone: Timezone, isSource: boolean): ConvertedTime => {
    // Simple timezone conversion (in real app, use libraries like date-fns-tz or moment-timezone)
    const offsetDiff = timezone.offset * 60 * 60 * 1000;
    const utc = sourceDateTime.getTime() + (sourceDateTime.getTimezoneOffset() * 60 * 1000);
    const targetTime = new Date(utc + offsetDiff);

    const formatted12h = targetTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const formatted24h = targetTime.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const date = targetTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const dayOfWeek = targetTime.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    const hour = targetTime.getHours();
    let businessStatus = "";
    let icon = Clock;

    if (hour >= 5 && hour < 9) {
      businessStatus = "Early Morning";
      icon = Sunrise;
    } else if (hour >= 9 && hour < 12) {
      businessStatus = "Morning Hours";
      icon = Sun;
    } else if (hour >= 12 && hour < 17) {
      businessStatus = "Business Hours";
      icon = Sun;
    } else if (hour >= 17 && hour < 20) {
      businessStatus = "Evening";
      icon = Sunset;
    } else if (hour >= 20 && hour < 23) {
      businessStatus = "Night";
      icon = Moon;
    } else {
      businessStatus = "Late Night";
      icon = Moon;
    }

    const offsetHours = timezone.offset >= 0 ? `+${timezone.offset}` : `${timezone.offset}`;

    return {
      timezone,
      dateTime: targetTime,
      formatted12h,
      formatted24h,
      date,
      dayOfWeek,
      isDST: false, // Simplified - would need proper DST calculation
      offsetHours,
      businessStatus,
      icon
    };
  };

  const addTimezone = () => {
    // Find a timezone not already in the list
    const availableTimezone = timezones.find(tz => 
      !targetTimezones.includes(tz.value) && tz.value !== sourceTimezone
    );
    
    if (availableTimezone) {
      setTargetTimezones([...targetTimezones, availableTimezone.value]);
      toast.success("Timezone added");
    } else {
      toast.error("No more timezones available");
    }
  };

  const removeTimezone = (timezoneToRemove: string) => {
    if (targetTimezones.length > 1) {
      setTargetTimezones(targetTimezones.filter(tz => tz !== timezoneToRemove));
      toast.success("Timezone removed");
    } else {
      toast.error("Must have at least one target timezone");
    }
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

  const setCurrentTime = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);
    
    setSourceDate(today);
    setSourceTime(currentTime);
    toast.success("Set to current time");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Business Hours":
        return "bg-green-100 text-green-800 border-green-200";
      case "Morning Hours":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Evening":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Night":
      case "Late Night":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.timezoneConverter.title}
        description={seoConfig.timezoneConverter.description}
        keywords={seoConfig.timezoneConverter.keywords}
        canonical={seoConfig.timezoneConverter.canonical}
        schemaType={seoConfig.timezoneConverter.schemaType}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2 mb-6 border border-indigo-200">
              <Globe className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-700 text-sm font-medium">Timezone Converter</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Global Timezone
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Converter
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Convert dates and times across multiple timezones with visual indicators for business hours,
              day/night status, and international scheduling optimization.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Real-time Conversion</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>50+ Global Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>Date & Time</span>
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
              
              {/* Input Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-lg border-t-4 border-t-indigo-500">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      Source Time
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Set the original date, time, and timezone</p>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        Date
                      </Label>
                      <Input
                        type="date"
                        value={sourceDate}
                        onChange={(e) => setSourceDate(e.target.value)}
                        className="border-2 hover:border-indigo-300 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Time
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="time"
                          value={sourceTime}
                          onChange={(e) => setSourceTime(e.target.value)}
                          className="border-2 hover:border-purple-300 transition-colors flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={setCurrentTime}
                          className="hover:bg-purple-50"
                        >
                          Now
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Source Timezone
                        {isTimezoneAutoDetected && (
                          <Badge variant="secondary" className="text-xs ml-auto">
                            Auto-detected
                          </Badge>
                        )}
                      </Label>
                      <div className="relative timezone-dropdown">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setShowSourceTimezones(!showSourceTimezones)}
                            className="flex-1 justify-between border-2 hover:border-green-300 transition-colors h-10"
                          >
                            <div className="flex items-center gap-2">
                              <span>🌍</span>
                              <div className="text-left">
                                {(() => {
                                  const tz = timezones.find(t => t.value === sourceTimezone);
                                  return tz ? (
                                    <>
                                      <div className="font-medium">{tz.city}</div>
                                      <div className="text-xs text-muted-foreground">{tz.country} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})</div>
                                    </>
                                  ) : 'Select timezone';
                                })()}
                              </div>
                            </div>
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {showSourceTimezones && (
                          <div className="absolute z-50 w-full mt-1 bg-white border-2 rounded-md shadow-lg max-h-80 overflow-hidden">
                            <div className="p-2 border-b bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-gray-600">Select Source Timezone</span>
                                <Badge variant="secondary" className="text-xs">
                                  {filteredSourceTimezones.length} available
                                </Badge>
                              </div>
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                  placeholder="Search by name, city, country, or UTC offset..."
                                  value={sourceSearchQuery}
                                  onChange={(e) => setSourceSearchQuery(e.target.value)}
                                  className="pl-8 pr-16 h-8"
                                />
                                {sourceSearchQuery && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSourceSearchQuery("")}
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs"
                                  >
                                    Clear
                                  </Button>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Search examples: "tokyo", "utc+9", "est", "london", "australia"
                                <br />
                                <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> to select first result • <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to close
                              </div>
                            </div>
                            <div className="overflow-y-auto max-h-64">
                              {filteredSourceTimezones.length > 0 ? (
                                filteredSourceTimezones.map(tz => (
                                  <div
                                    key={tz.value}
                                    className={`p-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 ${sourceTimezone === tz.value ? 'bg-blue-100' : ''}`}
                                    onClick={() => {
                                      setSourceTimezone(tz.value);
                                      setShowSourceTimezones(false);
                                      setSourceSearchQuery("");
                                      setIsTimezoneAutoDetected(false); // Clear auto-detected flag
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>🌍</span>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="font-medium">{tz.city}</div>
                                          <Badge variant="outline" className="text-xs">
                                            UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}
                                          </Badge>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {tz.country} • {tz.abbreviation} • {tz.label.includes('(') ? tz.label.split('(')[1].split(')')[0] : tz.abbreviation}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-center text-gray-500">
                                  <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                  <div>No timezones found</div>
                                  <div className="text-xs">Try searching by city, country, or UTC offset</div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {isTimezoneAutoDetected && (
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          Detected from your browser. You can change it by clicking above.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-purple-600" />
                          Target Timezones
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Add multiple timezones for global comparison</p>
                      </div>
                      {targetTimezones.length > 2 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTargetTimezones(["Europe/London", "America/New_York", "Europe/Berlin"]);
                            toast.success("Reset to default timezones");
                          }}
                          className="text-xs"
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                      {targetTimezones.map((tzValue, index) => {
                        const timezone = timezones.find(tz => tz.value === tzValue);
                        return (
                          <div key={tzValue} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium text-sm">{timezone?.city}</div>
                              <div className="text-xs text-muted-foreground">{timezone?.country}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTimezone(tzValue)}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="relative timezone-dropdown">
                      <Button
                        variant="outline"
                        onClick={() => setShowTargetTimezones(!showTargetTimezones)}
                        className="w-full justify-between"
                      >
                        <div className="flex items-center">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Timezone ({targetTimezones.length})
                        </div>
                        <Search className="h-4 w-4" />
                      </Button>

                      {showTargetTimezones && (
                        <div className="absolute z-50 w-full mt-1 bg-white border-2 rounded-md shadow-lg max-h-80 overflow-hidden">
                          <div className="p-2 border-b bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-gray-600">Add Target Timezone</span>
                              <Badge variant="secondary" className="text-xs">
                                {filteredTargetTimezones.filter(tz => 
                                  !targetTimezones.includes(tz.value) && tz.value !== sourceTimezone
                                ).length} available
                              </Badge>
                            </div>
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Search by name, city, country, or UTC offset..."
                                value={targetSearchQuery}
                                onChange={(e) => setTargetSearchQuery(e.target.value)}
                                className="pl-8 pr-16 h-8"
                              />
                              {targetSearchQuery && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setTargetSearchQuery("")}
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs"
                                >
                                  Clear
                                </Button>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Search examples: "tokyo", "utc+9", "est", "london", "australia"
                              <br />
                              <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> to select first result • <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Esc</kbd> to close
                            </div>
                          </div>
                          <div className="overflow-y-auto max-h-64">
                            {filteredTargetTimezones.filter(tz => 
                              !targetTimezones.includes(tz.value) && tz.value !== sourceTimezone
                            ).length > 0 ? (
                              filteredTargetTimezones
                                .filter(tz => !targetTimezones.includes(tz.value) && tz.value !== sourceTimezone)
                                .map(tz => (
                                  <div
                                    key={tz.value}
                                    className="p-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                                    onClick={() => {
                                      setTargetTimezones([...targetTimezones, tz.value]);
                                      setShowTargetTimezones(false);
                                      setTargetSearchQuery("");
                                      toast.success(`${tz.city} timezone added`);
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>🌍</span>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <div className="font-medium">{tz.city}</div>
                                          <Badge variant="outline" className="text-xs">
                                            UTC{tz.offset >= 0 ? '+' : ''}{tz.offset}
                                          </Badge>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                          {tz.country} • {tz.abbreviation} • {tz.label.includes('(') ? tz.label.split('(')[1].split(')')[0] : tz.abbreviation}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                                <div>
                                  {filteredTargetTimezones.length === 0
                                    ? "No timezones found"
                                    : "All available timezones already added"
                                  }
                                </div>
                                <div className="text-xs">
                                  {filteredTargetTimezones.length === 0
                                    ? "Try searching by city, country, or UTC offset"
                                    : "Remove some timezones to add different ones"
                                  }
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-green-600" />
                        Converted Times
                        {convertedTimes.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {convertedTimes.length} timezones
                          </Badge>
                        )}
                      </CardTitle>
                      {isConverting && (
                        <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {convertedTimes.length > 0 ? (
                      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                        {convertedTimes.map((converted, index) => {
                          const IconComponent = converted.icon;
                          const isSource = index === 0;
                          return (
                            <Card 
                              key={`${converted.timezone.value}-${index}`} 
                              className={`transition-all duration-200 hover:shadow-md ${
                                isSource ? 'border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50' : 
                                'border-l-4 border-l-gray-300 hover:border-l-blue-400'
                              }`}
                            >
                              <CardContent className="p-5">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={`p-2 rounded-lg ${
                                        isSource ? 'bg-indigo-100' : 'bg-gray-100'
                                      }`}>
                                        <IconComponent className={`w-5 h-5 ${
                                          isSource ? 'text-indigo-600' : 'text-gray-600'
                                        }`} />
                                      </div>
                                      <div>
                                        <h3 className="font-bold text-lg flex items-center gap-2">
                                          {converted.timezone.city}
                                          {isSource && <Badge variant="default" className="text-xs">Source</Badge>}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                          {converted.timezone.country} • {converted.timezone.abbreviation} (UTC{converted.offsetHours})
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyToClipboard(
                                        `${converted.timezone.city}: ${converted.formatted12h} (${converted.date})`,
                                        `${converted.timezone.value}-${index}`
                                      )}
                                    >
                                      {copied === `${converted.timezone.value}-${index}` ? 
                                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                                        <Copy className="w-4 h-4" />
                                      }
                                    </Button>
                                  </div>

                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-indigo-600 mb-1">
                                        {converted.formatted12h}
                                      </div>
                                      <div className="text-xs text-muted-foreground">12-hour</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-purple-600 mb-1">
                                        {converted.formatted24h}
                                      </div>
                                      <div className="text-xs text-muted-foreground">24-hour</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-semibold text-green-600 mb-1">
                                        {converted.date}
                                      </div>
                                      <div className="text-xs text-muted-foreground">Date</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-semibold text-orange-600 mb-1">
                                        {converted.dayOfWeek}
                                      </div>
                                      <div className="text-xs text-muted-foreground">Day</div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-center">
                                    <Badge 
                                      variant="outline" 
                                      className={`px-3 py-1 ${getStatusColor(converted.businessStatus)}`}
                                    >
                                      {converted.businessStatus}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                        
                        {/* Quick Actions */}
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const allTimes = convertedTimes.map(ct => 
                                    `${ct.timezone.city}: ${ct.formatted12h} (${ct.date})`
                                  ).join('\n');
                                  copyToClipboard(allTimes, 'all-times');
                                }}
                                className="flex-1"
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy All Times
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const meetingTimes = convertedTimes
                                    .filter(ct => ct.businessStatus === 'Business Hours')
                                    .map(ct => `${ct.timezone.city}: ${ct.formatted12h}`)
                                    .join(', ');
                                  if (meetingTimes) {
                                    copyToClipboard(`Good meeting times: ${meetingTimes}`, 'meeting-times');
                                  } else {
                                    toast.info('No business hours found in selected timezones');
                                  }
                                }}
                                className="flex-1"
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                Copy Business Hours
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse"></div>
                          <Globe className="relative w-16 h-16 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Ready to Convert</h3>
                        <p className="text-muted-foreground text-center mb-6 max-w-md">
                          Select a date, time, and timezone to see conversions across multiple global regions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <Badge variant="outline">50+ Timezones</Badge>
                          <Badge variant="outline">Business Hours</Badge>
                          <Badge variant="outline">Day/Night Status</Badge>
                          <Badge variant="outline">Real-time Updates</Badge>
                        </div>
                      </div>
                    )}
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

export default TimezoneConverterPage;
