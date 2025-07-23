// SEO Configuration for all pages
export const seoConfig = {
  // Homepage
  home: {
    title: "AzureInfra.email - Premium Cold Email Infrastructure",
    description: "Premium Azure-powered cold email infrastructure at $1.50/mailbox. 99.9% inbox rates, dedicated IPs, domain isolation, instant setup for high-volume marketers.",
    keywords: "cold email infrastructure, azure email, dedicated IPs, email deliverability, outlook 365, cold email service, email hosting, domain isolation",
    canonical: "/",
    schemaType: "WebPage" as const
  },

  // Tools
  tools: {
    title: "Email Marketing Tools - Cold Email Generators & Optimizers",
    description: "Complete collection of email marketing tools including username generators, domain checkers, spam analyzers, and sequence planners. Everything you need for successful cold email campaigns.",
    keywords: "email tools, cold email tools, email generators, spam analyzer, sequence planner, email marketing software",
    canonical: "/tools",
    schemaType: "WebPage" as const
  },

  // Individual Tools
  warmupCalculator: {
    title: "Email Warmup Calculator - Optimize Email Deliverability",
    description: "Calculate optimal email warmup schedules to improve deliverability and avoid spam folders. Free tool with domain age analysis and custom warmup plans.",
    keywords: "email warmup, email deliverability, spam folder, email warmup calculator, inbox placement",
    canonical: "/warmup-calculator",
    schemaType: "WebApplication" as const
  },

  usernameGenerator: {
    title: "Professional Email Username Generator",
    description: "Generate professional email usernames for cold email campaigns. Create variations with company names, roles, and avoid common spam patterns.",
    keywords: "username generator, email username, professional email, cold email username",
    canonical: "/tools/username-generator",
    schemaType: "WebApplication" as const
  },

  domainGenerator: {
    title: "Domain Name Generator for Email Marketing",
    description: "Generate brandable domain names for email marketing campaigns. Check availability and find perfect domains for your cold email infrastructure.",
    keywords: "domain generator, domain names, email domain, cold email domain, domain availability",
    canonical: "/tools/domain-generator",
    schemaType: "WebApplication" as const
  },

  personGenerator: {
    title: "Fake Person Generator for Email Testing",
    description: "Generate realistic person profiles for email testing and A/B campaigns. Complete with names, companies, and professional details.",
    keywords: "person generator, fake person, email testing, test personas, email campaign testing",
    canonical: "/tools/person-generator",
    schemaType: "WebApplication" as const
  },

  subjectLineGenerator: {
    title: "Cold Email Subject Line Generator",
    description: "Generate high-converting cold email subject lines with AI assistance. Improve open rates with tested subject line templates and variations.",
    keywords: "subject line generator, email subject lines, cold email subject, open rate optimization",
    canonical: "/tools/subject-line-generator",
    schemaType: "WebApplication" as const
  },

  emailValidator: {
    title: "Email Address Validator & Verifier",
    description: "Validate email addresses in bulk to improve deliverability. Check syntax, domain validity, and reduce bounce rates.",
    keywords: "email validator, email verification, email checker, bounce rate, email deliverability",
    canonical: "/tools/email-validator",
    schemaType: "WebApplication" as const
  },

  spamAnalyzer: {
    title: "Email Spam Score Analyzer & Checker",
    description: "Analyze your emails for spam triggers and improve deliverability. Get detailed spam score reports and optimization recommendations.",
    keywords: "spam analyzer, spam score, email deliverability, spam checker, inbox placement",
    canonical: "/tools/spam-analyzer",
    schemaType: "WebApplication" as const
  },

  sequencePlanner: {
    title: "Cold Email Sequence Planner & Builder",
    description: "Plan and organize your cold email sequences with visual timeline builder. Optimize follow-up timing and improve response rates.",
    keywords: "email sequence, cold email sequence, follow-up emails, email automation, sequence planner",
    canonical: "/tools/sequence-planner",
    schemaType: "WebApplication" as const
  },

  utmGenerator: {
    title: "UTM Parameter Generator for Email Campaigns",
    description: "Generate UTM tracking codes for email campaigns to measure performance in Google Analytics. Track opens, clicks, and conversions.",
    keywords: "UTM generator, email tracking, Google Analytics, campaign tracking, email metrics",
    canonical: "/tools/utm-generator",
    schemaType: "WebApplication" as const
  },

  emailSignatureGenerator: {
    title: "Professional Email Signature Generator",
    description: "Create professional email signatures with contact information, social links, and branding. Multiple templates and customization options.",
    keywords: "email signature, professional signature, email branding, contact signature",
    canonical: "/tools/email-signature-generator",
    schemaType: "WebApplication" as const
  },

  spintaxGenerator: {
    title: "Spintax Generator for Cold Email Campaigns",
    description: "Generate spintax variations to avoid spam filters and personalize cold emails at scale. 40+ professional templates included.",
    keywords: "spintax generator, email variations, spam filter, email personalization, cold email spintax",
    canonical: "/tools/spintax-generator",
    schemaType: "WebApplication" as const
  },

  emailPreview: {
    title: "Email Preview Tool - Multi-Client Email Tester",
    description: "Preview your emails across Gmail, Outlook, and Apple Mail on desktop and mobile. Includes spam analysis and formatting optimization.",
    keywords: "email preview, email testing, Gmail preview, Outlook preview, email client testing",
    canonical: "/tools/email-preview",
    schemaType: "WebApplication" as const
  },

  abSubjectLineTester: {
    title: "A/B Subject Line Tester & Optimizer",
    description: "Compare subject lines head-to-head with predictive open rates and psychology analysis. Optimize your email subject lines for maximum engagement.",
    keywords: "A/B testing, subject line testing, open rate optimization, email subject line, A/B test email",
    canonical: "/tools/ab-subject-line-tester",
    schemaType: "WebApplication" as const
  },

  bestSendTimeCalculator: {
    title: "Best Email Send Time Calculator & Optimizer",
    description: "Find optimal email send times with visual heatmaps, timezone optimization, and A/B testing schedules for maximum engagement.",
    keywords: "email send time, best time to send email, email timing, send time optimization",
    canonical: "/tools/best-send-time-calculator",
    schemaType: "WebApplication" as const
  },

  timezoneConverter: {
    title: "Email Campaign Timezone Converter",
    description: "Convert email send times across multiple timezones for global campaigns. Optimize timing for international audiences.",
    keywords: "timezone converter, global email campaigns, email timing, international email marketing",
    canonical: "/tools/timezone-converter",
    schemaType: "WebApplication" as const
  },

  // Static Pages
  warmupGuide: {
    title: "Complete Email Warmup Guide - Improve Deliverability",
    description: "Step-by-step guide to warming up email accounts for better deliverability. Learn best practices, timelines, and common mistakes to avoid.",
    keywords: "email warmup guide, email deliverability guide, inbox placement, email reputation",
    canonical: "/warmup-guide",
    schemaType: "Article" as const
  },

  privacy: {
    title: "Privacy Policy - AzureInfra.email",
    description: "Privacy policy for AzureInfra.email cold email infrastructure. Learn how we protect your data and what information we collect.",
    keywords: "privacy policy, data protection, privacy, email marketing privacy",
    canonical: "/privacy",
    schemaType: "WebPage" as const
  },

  terms: {
    title: "Terms of Service - AzureInfra.email",
    description: "Terms of service for AzureInfra.email cold email infrastructure and services. Usage guidelines and service agreements.",
    keywords: "terms of service, terms and conditions, service agreement, email marketing terms",
    canonical: "/terms",
    schemaType: "WebPage" as const
  }
};

// Breadcrumb configurations
export const breadcrumbConfig = {
  tools: [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' }
  ],
  toolsChild: (toolName: string, toolPath: string) => [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools' },
    { name: toolName, url: toolPath }
  ]
};
