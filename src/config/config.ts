// Global configuration file for AzureInfra.email
// Update values here to change them across the entire website

export const siteConfig = {
  // Basic site information
  name: "AzureInfra.email",
  domain: "azureinfra.email",
  tagline: "Cold Email Infrastructure for Maximum Deliverability",
  description: "Premium Azure-powered cold email infrastructure for marketers who need maximum deliverability potential. Enterprise-grade Outlook 365 mailboxes with dedicated IPs, domain isolation, and optimized infrastructure for high inbox rates.",
  
  // Pricing
  pricing: {
    price: 1.50,
    currency: "USD",
    period: "per mailbox/month",
    displayPrice: "$1.50",
    domain: {
      price: 15.55,
      displayPrice: "$15.55",
      period: "one-time"
    }
  },
  
  // Contact information
  contact: {
    email: "support@azureinfra.email",
    responseTime: "< 3 hours",
    responseTimeShort: "< 3h",
    calendly: "https://calendly.com/dharm-azureinfra/30min"
  },
  
  // Money-back guarantee
  guarantee: {
    period: "30 days",
    title: "30-Day Money-Back Guarantee",
    description: "Try our service risk-free. If you're not completely satisfied with your email deliverability within 30 days, we'll refund your entire first month payment.",
    features: [
      "Full refund if not satisfied",
      "No questions asked policy",
      "Cancel anytime within 30 days",
      "Keep all emails sent during trial"
    ]
  },
  
  // Company details
  company: {
    get founded () {
        return new Date().getFullYear();
    },
    location: "Global",
    get copyright() {
      return `© ${new Date().getFullYear()} ${siteConfig.domain}. All rights reserved.`;
    }
  },
  
  // Social media links (add your actual social media URLs)
  social: {
    twitter: "https://twitter.com/azureinfra",
    linkedin: "https://linkedin.com/company/azureinfra",
    github: "https://github.com/sending-ac",
    facebook: "https://facebook.com/azureinfra"
  },
  
  // External links
  links: {
    homepage: "https://azureinfra.email",
    sitemap: "https://azureinfra.email/sitemap.xml",
    start: "https://app.azureinfra.email/order",
    login: "https://app.azureinfra.email/login",
    privacyPolicy: "/privacy",
    termsOfService: "/terms",
    refundPolicy: "/refund-policy",
    logo: "https://azureinfra.email/logo.png"
  },
  
  // Technical specifications
  tech: {
    platform: "Microsoft Azure",
    emailService: "Outlook 365",
    uptime: "99.9%",
    security: "Enterprise-grade with ATP",
    support: "24/7",
    activation: "Instant"
  },
  
  // Features list
  features: [
    {
      title: "Outlook 365 Infrastructure",
      description: "Enterprise-grade Outlook 365 mailboxes with full Microsoft infrastructure backing, ensuring maximum deliverability and trust.",
      highlight: "Office 365"
    },
    {
      title: "Microsoft Security Standards", 
      description: "Built-in security features including Advanced Threat Protection, encryption, and compliance with enterprise security protocols.",
      highlight: "Enterprise Security"
    },
    {
      title: "Azure Cloud Platform",
      description: "Hosted on Microsoft Azure with 99.9% uptime guarantee, global data centers, and enterprise-level reliability.",
      highlight: "99.9% Uptime"
    },
    {
      title: "Exchange Online Integration",
      description: "Full Exchange Online capabilities with calendar, contacts, and advanced email management features built-in.",
      highlight: "Exchange Online"
    },
    {
      title: "Domain Reputation Management",
      description: "Pre-configured domains with established sender reputation, SPF, DKIM, and DMARC records for optimal deliverability.",
      highlight: "Pre-Configured"
    },
    {
      title: "Instant Activation",
      description: "Ready-to-use mailboxes with immediate access to full Outlook features, mobile sync, and Microsoft ecosystem integration.",
      highlight: "Instant Setup"
    }
  ],
  
  // Mailbox options for contact form
  mailboxOptions: [
    { value: "1-10", label: "1-10 mailboxes" },
    { value: "11-50", label: "11-50 mailboxes" },
    { value: "51-100", label: "51-100 mailboxes" },
    { value: "100+", label: "100+ mailboxes" }
  ],
  
  // Statistics/metrics
  stats: {
    uptime: {
      value: "99.9%",
      label: "Uptime SLA"
    },
    support: {
      value: "24/7", 
      label: "Support"
    },
    network: {
      value: "USA",
      label: "Azure Network"
    },
    responseTime: {
      value: "< 3h",
      label: "Response Time"
    },
    monitoring: {
      value: "24/7",
      label: "Infrastructure Monitoring"
    },
    guarantee: {
      value: "99.9%",
      label: "Uptime Guarantee"
    }
  },
  
  // SEO metadata
  seo: {
    title: "AzureInfra.email - Premium Cold Email Infrastructure for Maximum Deliverability",
    metaDescription: "Premium Azure-powered cold email infrastructure at $1.50/mailbox. Maximum deliverability potential with dedicated IPs, domain isolation, instant setup. Built for high-volume cold email marketers.",
    ogTitle: "Premium Cold Email Infrastructure - AzureInfra.email",
    ogDescription: "Maximum deliverability potential with dedicated Azure infrastructure. Premium cold email infrastructure at $1.50/mailbox with domain isolation and instant setup.",
    ogImage: "/assets/hero-email.jpg",
    keywords: [
      "cold email infrastructure",
      "email deliverability", 
      "azure email",
      "dedicated IPs",
      "cold email marketing",
      "email campaigns",
      "inbox delivery",
      "outlook 365 cold email",
      "domain isolation",
      "high volume email",
      "cold outreach",
      "email reputation"
    ]
  },
  
  // Navigation sections
  navigation: {
    main: [
      { name: "Features", id: "features" },
      { name: "Pricing", id: "pricing" },
      { name: "Compare", id: "comparison" },
      { name: "Calculator", id: "calculator" },
      { name: "Contact", id: "contact" }
    ],
    footer: {
      product: [
        { name: "Features", id: "features" },
        { name: "Pricing", id: "pricing" },
        { name: "Compare", id: "comparison" },
        { name: "Calculator", id: "calculator" },
        { name: "Warmup Guide", link: "/warmup-guide" },
        { name: "Contact", id: "contact" }
      ],
      company: [
        { name: "Support", link: "mailto:support@azureinfra.email" },
        { name: "Sales Brochure", link: "/sales-brochure" },
        { name: "Get Started", link: "https://app.azureinfra.email/order", external: true }
      ]
    }
  },
  
  // Intercom widget ID
  intercom: {
    appId: "hzgdupaj"
  }
};

// Helper functions to get formatted values
export const getFormattedPrice = () => siteConfig.pricing.displayPrice;
export const getFormattedDomainPrice = () => siteConfig.pricing.domain.displayPrice;
export const getContactEmail = () => siteConfig.contact.email;
export const getResponseTime = () => siteConfig.contact.responseTime;
export const getResponseTimeShort = () => siteConfig.contact.responseTimeShort;
export const getUptime = () => siteConfig.tech.uptime;
export const getWebsiteUrl = () => siteConfig.links.homepage;
export const getCalendlyLink = () => siteConfig.contact.calendly;
export const getLoginUrl = () => siteConfig.links.login;
export const getStartUrl = () => siteConfig.links.start;

export default siteConfig;
