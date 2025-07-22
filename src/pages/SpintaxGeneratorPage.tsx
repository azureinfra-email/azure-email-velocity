import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { seoConfig, breadcrumbConfig } from "@/config/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Shuffle, 
  Copy, 
  RefreshCw,
  CheckCircle,
  Plus,
  X,
  Zap,
  Eye,
  FileText,
  Lightbulb,
  Wand2,
  RotateCcw,
  Target
} from "lucide-react";
import { toast } from "sonner";

interface SpintaxTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  description: string;
}

const SpintaxGeneratorPage = () => {
  const [inputText, setInputText] = useState("");
  const [spintaxOutput, setSpintaxOutput] = useState("");
  const [generatedVariations, setGeneratedVariations] = useState<string[]>([]);
  const [maxVariations, setMaxVariations] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showPlaceholderDialog, setShowPlaceholderDialog] = useState(false);
  const [detectedPlaceholders, setDetectedPlaceholders] = useState<string[]>([]);
  const [placeholderValues, setPlaceholderValues] = useState<{[key: string]: string}>({});

  const spintaxTemplates: SpintaxTemplate[] = [
    // Openings Category
    {
      id: "greeting",
      name: "Email Greetings",
      category: "Openings",
      template: "{Hi|Hello|Hey} {[first_name]|there},",
      description: "Professional email greetings with name personalization"
    },
    {
      id: "intro",
      name: "Introduction Lines",
      category: "Openings", 
      template: "I hope {this email finds you well|you're having a great day|your week is going smoothly}. I'm {reaching out|contacting you|getting in touch} because {I noticed|I saw|I came across} {your work at [company_name]|your recent [specific_achievement]|your expertise in [industry]}.",
      description: "Warm introduction variations to avoid spam filters"
    },
    {
      id: "connection",
      name: "Connection Opener",
      category: "Openings",
      template: "I came across {your profile on LinkedIn|your company's website|your recent post about [topic]} and was {impressed|intrigued|excited} by {your work in [industry]|your approach to [specific_area]|your recent achievements}.",
      description: "Personal connection-based openings"
    },
    {
      id: "mutual_connection",
      name: "Mutual Connection",
      category: "Openings",
      template: "{[mutual_contact]|A mutual connection} {recommended|suggested|mentioned} that I {reach out to you|get in touch|connect with you} regarding {[topic]|[opportunity]|[project]}.",
      description: "Leverage mutual connections for warm introductions"
    },
    {
      id: "referral_opening",
      name: "Referral Opening",
      category: "Openings",
      template: "{[referrer_name] recommended|I was referred to you by [referrer_name]|[referrer_name] suggested} that I {contact you|reach out|get in touch} about {[opportunity]|[project]|[collaboration]}.",
      description: "Referral-based opening lines"
    },
    {
      id: "industry_news",
      name: "Industry News Hook",
      category: "Openings",
      template: "I saw the {recent news|announcement|article} about {[company_name]'s [achievement]|your expansion into [market]|your new product launch}. {Congratulations|That's exciting|Impressive work}!",
      description: "Current events and industry news hooks"
    },
    {
      id: "compliment_opener",
      name: "Genuine Compliment",
      category: "Openings",
      template: "I've been {following|watching|admiring} {your work at [company_name]|your journey in [industry]|your expertise in [field]} and {really admire|am impressed by|appreciate} {your approach to [topic]|the results you've achieved|your innovative solutions}.",
      description: "Authentic compliment-based openings"
    },
    {
      id: "question_opener",
      name: "Question Hook",
      category: "Openings",
      template: "{Quick question|I'm curious|Wondering if you could help} - {are you currently|have you considered|what's your take on} {[specific_question]|[industry_challenge]|[relevant_topic]}?",
      description: "Engaging question-based openings"
    },
    {
      id: "conference_event",
      name: "Event Reference",
      category: "Openings",
      template: "{Great meeting you at [event_name]|I enjoyed our conversation at [conference]|Following up on our chat from [networking_event]}. As {mentioned|discussed|we talked about}, I wanted to {reach out|follow up|connect} about {[topic]|[opportunity]|[next_steps]}.",
      description: "Post-event follow-up openings"
    },
    {
      id: "timing_opener",
      name: "Timely Opener",
      category: "Openings",
      template: "{Perfect timing|Great timing|Interesting timing} - I noticed that {[company_name] is [current_situation]|you're [current_activity]|there's been [recent_development]} and thought this might be {relevant|helpful|of interest}.",
      description: "Time-sensitive and contextual openings"
    },

    // Body Category
    {
      id: "value_prop",
      name: "Value Proposition",
      category: "Body",
      template: "We {help|assist|enable} {companies like yours|businesses in [industry]|[company_type] organizations} {increase|boost|improve|enhance} their {revenue|sales|conversions|efficiency} by {up to [percentage]%|an average of [amount]|[specific_metric]}.",
      description: "Compelling value propositions with variable metrics"
    },
    {
      id: "social_proof",
      name: "Social Proof",
      category: "Body",
      template: "{We've helped|Our clients include|We work with} {Fortune 500 companies|industry leaders|companies like [competitor_1], [competitor_2], and [competitor_3]|over [number] businesses} {achieve|reach|accomplish} {remarkable results|their goals|significant growth}.",
      description: "Social proof statements with flexible examples"
    },
    {
      id: "urgency",
      name: "Urgency & Scarcity",
      category: "Body",
      template: "{We only have|There are just|Limited to} {[number] spots|a few openings|limited availability} {remaining|left|available} for {this month|Q[quarter]|the next cohort}. {Would you like to|Interested in|Ready to} {secure your spot|learn more|get started}?",
      description: "Creates urgency without being pushy"
    },
    {
      id: "problem_solution",
      name: "Problem-Solution",
      category: "Body",
      template: "Many {[company_type] companies|businesses in [industry]|organizations like yours} {struggle with|face challenges around|find it difficult to} {[specific_problem]|[pain_point]|[common_issue]}. We've {developed|created|built} a {solution|approach|system} that {solves this|addresses this|helps with this} by {[solution_method]|[key_benefit]|[unique_approach]}.",
      description: "Problem-agitation-solution framework"
    },
    {
      id: "case_study",
      name: "Case Study Example",
      category: "Body",
      template: "For example, we recently helped {[client_name]|a [industry] company|a business similar to yours} {achieve|accomplish|reach} {[specific_result]|[measurable_outcome]|[impressive_metric]} in just {[timeframe]|[short_period]|[specific_duration]}.",
      description: "Concrete case study examples"
    },
    {
      id: "roi_focused",
      name: "ROI-Focused",
      category: "Body",
      template: "Our clients typically see {a return on investment|ROI|results} of {[roi_percentage]%|[specific_multiple]x|[dollar_amount]} within {[timeframe]|the first [period]|just [duration]}. The {investment|cost|price} is {quickly recovered|paid for itself|offset} by {[specific_benefit]|increased [metric]|improved [outcome]}.",
      description: "Return on investment focused messaging"
    },
    {
      id: "risk_reversal",
      name: "Risk Reversal",
      category: "Body",
      template: "{We're so confident|I'm confident|We believe so strongly} in {our solution|the results|what we can achieve} that we offer {a full money-back guarantee|a no-risk trial|a satisfaction guarantee}. {No risk on your end|Nothing to lose|Complete peace of mind}.",
      description: "Risk reversal and guarantee statements"
    },
    {
      id: "personalization",
      name: "Personal Relevance",
      category: "Body",
      template: "Given {your role as [job_title]|[company_name]'s focus on [area]|your expertise in [field]}, I thought {you'd be interested|this would be relevant|this might be valuable} because {[specific_reason]|[relevant_connection]|[personal_benefit]}.",
      description: "Highly personalized relevance statements"
    },
    {
      id: "industry_trends",
      name: "Industry Trends",
      category: "Body",
      template: "With {the recent changes in [industry]|new regulations around [topic]|the shift toward [trend]}, {many companies|businesses like yours|industry leaders} are {looking for|seeking|needing} {solutions to [challenge]|ways to [adapt]|strategies for [opportunity]}.",
      description: "Industry trend and market timing"
    },
    {
      id: "comparison",
      name: "Competitive Comparison",
      category: "Body",
      template: "Unlike {traditional solutions|other providers|typical approaches} that {[limitation]|[drawback]|[common_problem]}, our {approach|solution|method} {[unique_advantage]|[key_differentiator]|[superior_benefit]} which means {[specific_outcome]|[better_result]|[improved_experience]} for you.",
      description: "Competitive differentiation without naming competitors"
    },

    // Closing Category
    {
      id: "cta_soft",
      name: "Soft Call-to-Action",
      category: "Closing",
      template: "{Would you be interested in|Are you open to|Could we} {a brief 15-minute call|a quick conversation|learning more about} {how this could work for [company_name]|this opportunity|our approach}?",
      description: "Non-pushy CTAs that encourage engagement"
    },
    {
      id: "cta_strong",
      name: "Direct Call-to-Action",
      category: "Closing",
      template: "{Let's schedule|Book|Set up} a {quick call|brief meeting|15-minute discussion} {this week|in the next few days|at your convenience}. {Click here to book a time|Reply with your availability|What works best for you}?",
      description: "More direct CTAs for warmer prospects"
    },
    {
      id: "curiosity_close",
      name: "Curiosity-Driven",
      category: "Closing",
      template: "I'd love to {show you|share|demonstrate} {how we achieved [specific_result] for [similar_company]|the exact strategy we used|our unique approach}. {Interested in a quick call|Worth a 15-minute conversation|Available for a brief chat}?",
      description: "Curiosity-driven closing statements"
    },
    {
      id: "benefit_close",
      name: "Benefit-Focused Close",
      category: "Closing",
      template: "If you're interested in {[specific_benefit]|achieving [desired_outcome]|solving [pain_point]}, {let's chat|I'd love to discuss|we should talk}. {When works best for you|What's your calendar like|Available this week}?",
      description: "Benefit-focused closing questions"
    },
    {
      id: "question_close",
      name: "Question Close",
      category: "Closing",
      template: "{Does this sound like something you'd want to explore|Is this the kind of result you're looking for|Would this type of solution be valuable}? {Happy to discuss|Let me know if you're interested|Worth a conversation}?",
      description: "Question-based closing techniques"
    },
    {
      id: "alternative_close",
      name: "Alternative Choice",
      category: "Closing",
      template: "Would {Tuesday morning or Wednesday afternoon|a phone call or video chat|15 minutes or 30 minutes} work better for {a quick discussion|our conversation|learning more}?",
      description: "Alternative choice closing technique"
    },
    {
      id: "urgency_close",
      name: "Urgency Close",
      category: "Closing",
      template: "We have {limited spots|a few openings|availability} for {[time_period]|this quarter|new clients}. {Would you like to secure one|Interested in claiming a spot|Ready to get started}?",
      description: "Time-sensitive closing statements"
    },
    {
      id: "assumptive_close",
      name: "Assumptive Close",
      category: "Closing",
      template: "I'll {send over a calendar link|reach out with some times|follow up with next steps}. {Looking forward to our conversation|Excited to discuss this further|Talk soon}!",
      description: "Assumptive closing technique"
    },
    {
      id: "referral_close",
      name: "Referral Request",
      category: "Closing",
      template: "If this isn't {the right fit|a priority right now|something you're interested in}, {do you know someone who might be|could you point me in the right direction|who would be the best person to speak with}?",
      description: "Referral request as alternative close"
    },
    {
      id: "value_stack_close",
      name: "Value Stack Close",
      category: "Closing",
      template: "To recap: {[benefit_1]|[value_point_1]}, {[benefit_2]|[value_point_2]}, and {[benefit_3]|[value_point_3]}. {Worth a conversation|Sound interesting|Ready to learn more}?",
      description: "Value stacking in the close"
    },

    // Follow-ups Category
    {
      id: "follow_up",
      name: "Follow-up Lines",
      category: "Follow-ups",
      template: "{Just following up on|Circling back on|Wanted to touch base about} my {previous email|message from [time_period]|note about [topic]}. {Still interested in|Any thoughts on|Would love to hear your thoughts on} {our conversation|this opportunity|learning more}?",
      description: "Polite follow-up variations to maintain engagement"
    },
    {
      id: "gentle_bump",
      name: "Gentle Bump",
      category: "Follow-ups",
      template: "{I know you're busy|Understanding you have a lot going on|Realize things get hectic}, so {just wanted to bump this up|sending a gentle reminder|keeping this top of mind}. {Any interest in|Still worth exploring|Ready to discuss}?",
      description: "Gentle, understanding follow-up approach"
    },
    {
      id: "value_add_followup",
      name: "Value-Add Follow-up",
      category: "Follow-ups",
      template: "I came across {this article|this resource|this case study} about {[relevant_topic]|[industry_trend]|[solution_area]} and thought {you might find it interesting|it might be relevant|you'd appreciate it}. {Still interested in discussing|Worth a conversation about}?",
      description: "Follow-up with additional value or resources"
    },
    {
      id: "breakup_email",
      name: "Breakup Email",
      category: "Follow-ups",
      template: "I haven't heard back, so I'm assuming {this isn't a priority right now|the timing isn't right|you're not interested}. I'll {stop reaching out|remove you from my follow-up list|leave you be}. If {anything changes|you'd like to reconnect|the timing becomes better}, just let me know!",
      description: "Final breakup email in sequence"
    },
    {
      id: "seasonal_followup",
      name: "Seasonal Follow-up",
      category: "Follow-ups",
      template: "{Happy New Year|Hope you had a great holiday|New quarter, new opportunities}! I wanted to {reconnect|circle back|touch base} about {our previous conversation|[topic]|[opportunity]}. {Might be worth revisiting|Could be relevant now|Perfect timing to discuss}?",
      description: "Seasonal or time-based follow-up hooks"
    },
    {
      id: "trigger_followup",
      name: "Trigger Event Follow-up",
      category: "Follow-ups",
      template: "I saw that {[company_name] just [recent_event]|you recently [achievement]|there was news about [development]}. {Congratulations|That's exciting|Impressive}! This might be {perfect timing|relevant now|worth discussing} for {our conversation|[topic]|[opportunity]}.",
      description: "Follow-up based on trigger events"
    },
    {
      id: "permission_followup",
      name: "Permission-Based",
      category: "Follow-ups",
      template: "I don't want to be {pushy|annoying|a pest}, but I {believe|think|feel} this could be {really valuable|a great opportunity|worth your time}. {Mind if I follow up once more|OK to reach out again|Worth one more conversation}?",
      description: "Permission-based follow-up approach"
    },
    {
      id: "different_angle",
      name: "Different Angle",
      category: "Follow-ups",
      template: "I might not have {explained this clearly|positioned this right|highlighted the key benefit} in my last email. The main thing is {[key_benefit]|[primary_value]|[core_advantage]}. {Does that change things|More relevant now|Worth discussing}?",
      description: "Follow-up with different angle or positioning"
    },
    {
      id: "social_proof_followup",
      name: "Social Proof Follow-up",
      category: "Follow-ups",
      template: "Since my last email, we've {helped [similar_company] achieve [result]|gotten great results for [industry] companies|had some exciting wins}. Thought you'd {find this interesting|want to hear about it|appreciate the update}.",
      description: "Follow-up with fresh social proof"
    },
    {
      id: "last_attempt",
      name: "Final Attempt",
      category: "Follow-ups",
      template: "This is my {last email|final attempt|final reach out} - I don't want to {overwhelm your inbox|be annoying|keep bothering you}. If you're interested, {great|let me know|I'd love to chat}. If not, {no worries|I understand|totally fine} and I'll stop emailing.",
      description: "Clear final attempt communication"
    }
  ];

  const detectPlaceholders = (text: string): string[] => {
    const placeholderRegex = /\[([^\]]+)\]/g;
    const matches = text.match(placeholderRegex);
    return matches ? [...new Set(matches)] : [];
  };

  const replacePlaceholders = (text: string, values: {[key: string]: string}): string => {
    let processedText = text;
    Object.entries(values).forEach(([placeholder, value]) => {
      if (value.trim()) {
        processedText = processedText.replace(new RegExp(placeholder.replace(/[[\]]/g, '\\$&'), 'g'), value);
      }
    });
    return processedText;
  };

  const handlePlaceholderFill = () => {
    const processedText = replacePlaceholders(inputText, placeholderValues);
    setInputText(processedText);
    setShowPlaceholderDialog(false);
    setPlaceholderValues({});
    generateSpintaxFromProcessedText(processedText);
  };

  const skipPlaceholders = () => {
    setShowPlaceholderDialog(false);
    setPlaceholderValues({});
    generateSpintaxFromProcessedText(inputText);
  };

  const generateSpintaxFromText = (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    // Detect placeholders
    const placeholders = detectPlaceholders(text);
    if (placeholders.length > 0) {
      setDetectedPlaceholders(placeholders);
      // Initialize placeholder values
      const initialValues: {[key: string]: string} = {};
      placeholders.forEach(placeholder => {
        initialValues[placeholder] = '';
      });
      setPlaceholderValues(initialValues);
      setShowPlaceholderDialog(true);
      return;
    }

    // No placeholders found, proceed with generation
    generateSpintaxFromProcessedText(text);
  };

  const generateSpintaxFromProcessedText = (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      // Smart spintax suggestions based on common patterns
      let processedText = text;
      
      // Replace common words with spintax variations (order matters - more specific first)
      const replacements = [
        { pattern: /\bI'm reaching out\b/gi, replacement: "{I'm reaching out|I'm contacting you|I wanted to connect}" },
        { pattern: /\bwould you be interested\b/gi, replacement: "{would you be interested|are you open to|might you be curious about}" },
        { pattern: /\blet me know\b/gi, replacement: "{let me know|feel free to reach out|don't hesitate to contact me}" },
        { pattern: /\bhelp you\b/gi, replacement: "{help you|assist you|support you}" },
        { pattern: /\bour company\b/gi, replacement: "{our company|our team|we}" },
        { pattern: /\bI hope\b/gi, replacement: "{I hope|Hope|Trust}" },
        { pattern: /\b(?<![{|])increase(?![|}])\b/gi, replacement: "{increase|boost|improve|enhance}" },
        { pattern: /\b(?<![{|])enhance(?![|}])\b/gi, replacement: "{enhance|improve|boost|strengthen}" },
        { pattern: /\b(?<![{|])improve(?![|}])\b/gi, replacement: "{improve|enhance|boost|optimize}" },
        { pattern: /\b(?<![{|])boost(?![|}])\b/gi, replacement: "{boost|increase|enhance|amplify}" },
        { pattern: /\b(?<![{|])great(?![|}])\b/gi, replacement: "{great|excellent|fantastic|wonderful}" },
        { pattern: /\b(?<![{|])quick(?![|}])\b/gi, replacement: "{quick|brief|short|fast}" },
        { pattern: /\b(?<![{|])call(?![|}])\b/gi, replacement: "{call|chat|conversation|discussion}" }
      ];
      
      // Apply replacements one by one, avoiding double processing
      replacements.forEach(({ pattern, replacement }) => {
        processedText = processedText.replace(pattern, replacement);
      });
      
      // Clean up any malformed spintax (e.g., nested braces)
      processedText = processedText.replace(/\{([^}]*)\{([^}]*)\}([^}]*)\}/g, '{$1$2$3}');
      
      setSpintaxOutput(processedText);
      generateVariations(processedText);
      setIsGenerating(false);
      toast.success("Spintax generated successfully!");
    }, 800);
  };

  const generateVariations = (spintaxText: string) => {
    const variations: string[] = [];
    const maxAttempts = maxVariations * 2; // Generate more attempts to avoid duplicates
    let attempts = 0;
    
    while (variations.length < maxVariations && attempts < maxAttempts) {
      const variation = processSpintax(spintaxText);
      if (!variations.includes(variation)) {
        variations.push(variation);
      }
      attempts++;
    }
    
    setGeneratedVariations(variations);
  };

  const processSpintax = (text: string): string => {
    return text.replace(/\{([^}]+)\}/g, (match, content) => {
      const options = content.split('|');
      return options[Math.floor(Math.random() * options.length)];
    });
  };

  const applyTemplate = (template: SpintaxTemplate) => {
    setInputText(template.template);
    setSelectedTemplate(template.id);
    toast.success(`Applied ${template.name} template`);
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

  const addSpintaxBrackets = (selectedText: string) => {
    if (!selectedText) {
      toast.error("Please select some text first");
      return;
    }
    
    const words = selectedText.split(/\s+/);
    const spintaxVersion = `{${words.join('|')}}`;
    
    // Replace selected text with spintax version
    const newText = inputText.replace(selectedText, spintaxVersion);
    setInputText(newText);
    toast.success("Added spintax brackets");
  };

  const calculateVariations = (spintaxText: string): number => {
    const matches = spintaxText.match(/\{([^}]+)\}/g);
    if (!matches) return 1;
    
    return matches.reduce((total, match) => {
      const options = match.slice(1, -1).split('|').length;
      return total * options;
    }, 1);
  };

  const getByCategoryColor = (category: string) => {
    switch (category) {
      case "Openings":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Body":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Follow-ups":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={seoConfig.spintaxGenerator.title}
        description={seoConfig.spintaxGenerator.description}
        keywords={seoConfig.spintaxGenerator.keywords}
        canonical={seoConfig.spintaxGenerator.canonical}
        schemaType={seoConfig.spintaxGenerator.schemaType}
        breadcrumbs={breadcrumbConfig.toolsChild("Spintax Generator", "/tools/spintax-generator")}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6 border border-purple-200">
              <Wand2 className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 text-sm font-medium">Spintax Generator</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Cold Email Spintax
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Create dynamic email variations with spintax syntax to avoid spam filters, increase deliverability, 
              and personalize your cold email campaigns at scale.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-purple-600" />
                <span>Infinite Variations</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-green-600" />
                <span>Avoid Spam Filters</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-pink-600" />
                <span>Scale Personalization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid lg:grid-cols-4 gap-6">
              
              {/* Templates Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                {/* Templates - Scrollable */}
                <Card className="shadow-lg border-t-4 border-t-orange-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightbulb className="w-4 h-4 text-orange-600" />
                      Templates ({spintaxTemplates.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Tabs defaultValue="Openings" className="w-full">
                      <TabsList className="grid grid-cols-1 w-full h-auto p-1">
                        <TabsTrigger value="Openings" className="text-xs py-2">
                          Openings ({spintaxTemplates.filter(t => t.category === 'Openings').length})
                        </TabsTrigger>
                        <TabsTrigger value="Body" className="text-xs py-2">
                          Body ({spintaxTemplates.filter(t => t.category === 'Body').length})
                        </TabsTrigger>
                        <TabsTrigger value="Closing" className="text-xs py-2">
                          Closing ({spintaxTemplates.filter(t => t.category === 'Closing').length})
                        </TabsTrigger>
                        <TabsTrigger value="Follow-ups" className="text-xs py-2">
                          Follow-ups ({spintaxTemplates.filter(t => t.category === 'Follow-ups').length})
                        </TabsTrigger>
                      </TabsList>
                      
                      {["Openings", "Body", "Closing", "Follow-ups"].map((category) => (
                        <TabsContent key={category} value={category} className="mt-3">
                          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                            {spintaxTemplates
                              .filter(template => template.category === category)
                              .map((template) => (
                                <Card 
                                  key={template.id} 
                                  className={`transition-all hover:shadow-sm cursor-pointer border ${
                                    selectedTemplate === template.id ? 'ring-2 ring-purple-500 border-purple-300' : 'hover:border-orange-300'
                                  }`}
                                  onClick={() => applyTemplate(template)}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-start justify-between gap-1 mb-1">
                                      <h4 className="font-medium text-xs leading-tight">{template.name}</h4>
                                      <Badge 
                                        variant="outline" 
                                        className={`text-xs shrink-0 px-1 py-0 ${getByCategoryColor(template.category)}`}
                                      >
                                        {template.category.slice(0,3)}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                      {template.description}
                                    </p>
                                    <div className="bg-gray-50 p-2 rounded text-xs font-mono leading-tight">
                                      {template.template.slice(0, 60)}
                                      {template.template.length > 60 ? "..." : ""}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Quick Guide - Always Visible */}
                <Card className="shadow-lg border-t-4 border-t-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="w-4 h-4 text-blue-600" />
                      Quick Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="p-2 bg-blue-50 rounded">
                      <h4 className="font-medium text-xs mb-1">Syntax</h4>
                      <code className="text-xs bg-white px-1 py-0.5 rounded">
                        {`{opt1|opt2|opt3}`}
                      </code>
                    </div>
                    
                    <div className="p-2 bg-green-50 rounded">
                      <h4 className="font-medium text-xs mb-1">Variables</h4>
                      <code className="text-xs bg-white px-1 py-0.5 rounded">
                        {`[first_name]`}
                      </code>
                    </div>
                    
                    <div className="p-2 bg-orange-50 rounded">
                      <h4 className="font-medium text-xs mb-1">Tips</h4>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        <li>• 3-5 variations per spin</li>
                        <li>• Keep consistent tone</li>
                        <li>• Test before sending</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Editor */}
              <div className="lg:col-span-3 space-y-4">
                <Card className="shadow-lg border-t-4 border-t-purple-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5 text-purple-600" />
                      Spintax Editor
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Select a template from the left or enter your own text
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid lg:grid-cols-2 gap-4">
                      {/* Input Section */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Input Text
                          </Label>
                          <Textarea
                            placeholder="Enter your email text here, or select a template from the left..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="min-h-32 border-2 hover:border-purple-300 transition-colors resize-none text-sm"
                            rows={8}
                          />
                          <div className="flex items-center justify-between mt-2">
                            {inputText && (
                              <div className="text-xs text-muted-foreground">
                                {inputText.length} chars • {calculateVariations(inputText).toLocaleString()} variations
                              </div>
                            )}
                            <div className="flex items-center gap-2 ml-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => generateSpintaxFromText(inputText)}
                                disabled={isGenerating}
                                className="hover:bg-purple-50"
                              >
                                {isGenerating ? (
                                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                  <Wand2 className="w-4 h-4 mr-2" />
                                )}
                                Generate
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setInputText("");
                                  setSpintaxOutput("");
                                  setGeneratedVariations([]);
                                  setSelectedTemplate("");
                                }}
                                className="hover:bg-gray-50"
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Output Section */}
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Spintax Output
                          </Label>
                          <div className="relative">
                            <Textarea
                              value={spintaxOutput}
                              onChange={(e) => setSpintaxOutput(e.target.value)}
                              className="min-h-32 border-2 border-green-200 bg-green-50 font-mono text-sm resize-none"
                              rows={8}
                              placeholder="Generated spintax will appear here..."
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(spintaxOutput, 'spintax-output')}
                              className="absolute top-2 right-2"
                              disabled={!spintaxOutput}
                            >
                              {copied === 'spintax-output' ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            {spintaxOutput && (
                              <div className="text-xs text-green-600 font-medium">
                                {calculateVariations(spintaxOutput).toLocaleString()} possible variations
                              </div>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateVariations(spintaxOutput)}
                              className="hover:bg-green-50 ml-auto"
                              disabled={!spintaxOutput}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Variations */}
                {generatedVariations.length > 0 && (
                  <Card className="shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Shuffle className="w-5 h-5 text-green-600" />
                          Sample Variations
                          <Badge variant="secondary" className="text-xs">
                            {generatedVariations.length} of {calculateVariations(spintaxOutput).toLocaleString()}
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="max-variations" className="text-sm">Show:</Label>
                          <Input
                            id="max-variations"
                            type="number"
                            min="3"
                            max="20"
                            value={maxVariations}
                            onChange={(e) => setMaxVariations(parseInt(e.target.value) || 10)}
                            className="w-16 h-8"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateVariations(spintaxOutput)}
                            className="hover:bg-blue-50"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid gap-2 max-h-64 overflow-y-auto pr-2">
                        {generatedVariations.map((variation, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded border hover:border-green-300 transition-colors">
                            <Badge variant="outline" className="text-xs shrink-0 mt-0.5">
                              {index + 1}
                            </Badge>
                            <p className="text-sm leading-relaxed flex-1">{variation}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(variation, `variation-${index}`)}
                              className="shrink-0 h-8 w-8 p-0"
                            >
                              {copied === `variation-${index}` ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex gap-2 mt-4 pt-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const allTimes = generatedVariations.join('\n\n');
                            copyToClipboard(allTimes, 'all-variations');
                          }}
                          className="flex-1"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateVariations(spintaxOutput)}
                          className="flex-1"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Generate New
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

      {/* Placeholder Dialog */}
      <Dialog open={showPlaceholderDialog} onOpenChange={setShowPlaceholderDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Fill Placeholders
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Your text contains placeholders. Fill them in or skip to keep them as-is:
            </p>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {detectedPlaceholders.map((placeholder, index) => {
                const cleanPlaceholder = placeholder.replace(/[[\]]/g, '');
                return (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`placeholder-${index}`} className="text-sm font-medium">
                      {placeholder}
                    </Label>
                    <Input
                      id={`placeholder-${index}`}
                      placeholder={`Enter value for ${cleanPlaceholder}`}
                      value={placeholderValues[placeholder] || ''}
                      onChange={(e) => setPlaceholderValues(prev => ({
                        ...prev,
                        [placeholder]: e.target.value
                      }))}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Example: {cleanPlaceholder === 'company_name' ? 'Acme Corp' : 
                               cleanPlaceholder === 'first_name' ? 'John' :
                               cleanPlaceholder === 'industry' ? 'Technology' :
                               cleanPlaceholder === 'percentage' ? '25' :
                               `Your ${cleanPlaceholder.replace(/_/g, ' ')}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={skipPlaceholders}
              className="flex-1"
            >
              Skip & Keep Placeholders
            </Button>
            <Button
              onClick={handlePlaceholderFill}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Fill & Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SpintaxGeneratorPage;
