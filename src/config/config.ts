// Global configuration file for Azure Email Velocity
// Update values here to change them across the entire website

export const siteConfig = {
  // Basic site information
  name: "Azure Email Velocity",
  domain: "azureinfra.email",
  tagline: "Enterprise Email Infrastructure",
  description: "Enterprise-grade Outlook 365 email infrastructure provider offering professional mailboxes with Microsoft Azure backing, enterprise security, and 99.9% uptime guarantee.",
  
  // Pricing
  pricing: {
    price: 1.50,
    currency: "USD",
    period: "per mailbox/month",
    displayPrice: "$1.50"
  },
  
  // Contact information
  contact: {
    email: "support@azureinfra.email",
    responseTime: "< 3 hours",
    responseTimeShort: "< 3h"
  },
  
  // Company details
  company: {
    founded: "2025",
    location: "Global",
    copyright: "© 2025 azureinfra.email. All rights reserved."
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
    privacyPolicy: "/privacy",
    termsOfService: "/terms",
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
      value: "Global",
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
    title: "Azure Email Velocity - Enterprise Outlook 365 Infrastructure Provider",
    metaDescription: "Get enterprise-grade Outlook 365 email infrastructure at $3.33/mailbox. Microsoft Azure-powered, 99.9% uptime, enterprise security, instant activation. No compromise on quality.",
    ogTitle: "Enterprise Email Infrastructure - Azure Email Velocity",
    ogDescription: "Professional Outlook 365 mailboxes with enterprise-grade security and reliability. Built on Microsoft Azure with 99.9% uptime guarantee.",
    ogImage: "/assets/hero-email.jpg",
    keywords: [
      "email infrastructure",
      "outlook 365", 
      "microsoft azure",
      "enterprise email",
      "email hosting",
      "business email",
      "exchange online",
      "email service provider",
      "azure cloud",
      "enterprise security"
    ]
  },
  
  // Navigation sections
  navigation: {
    main: [
      { name: "Features", id: "features" },
      { name: "Pricing", id: "pricing" },
      { name: "Compare", id: "comparison" },
      { name: "Contact", id: "contact" }
    ],
    footer: {
      product: [
        { name: "Features", id: "features" },
        { name: "Pricing", id: "pricing" },
        { name: "Compare", id: "comparison" },
        { name: "Contact", id: "contact" }
      ],
      company: [
        { name: "Support", link: "mailto:support@azureinfra.email" },
        { name: "Get Started", id: "contact" }
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
export const getContactEmail = () => siteConfig.contact.email;
export const getResponseTime = () => siteConfig.contact.responseTime;
export const getResponseTimeShort = () => siteConfig.contact.responseTimeShort;
export const getUptime = () => siteConfig.tech.uptime;
export const getWebsiteUrl = () => siteConfig.links.homepage;

export default siteConfig;
