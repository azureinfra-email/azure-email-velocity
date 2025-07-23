// Analytics configuration for Google Analytics and PostHog
// Update these values with your actual tracking IDs

export const analyticsConfig = {
  // Google Analytics 4 Configuration
  googleAnalytics: {
    measurementId: process.env.VITE_GA_MEASUREMENT_ID || "", // e.g., "G-XXXXXXXXXX"
    enabled: Boolean(process.env.VITE_GA_MEASUREMENT_ID),
    
    // Default gtag config
    config: {
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      send_page_view: true,
      allow_enhanced_conversions: true,
      anonymize_ip: true,
    },
    
    // Custom events configuration
    events: {
      // Lead generation events
      lead_captured: "lead_captured",
      contact_form_submit: "contact_form_submit",
      calendly_booking: "calendly_booking",
      
      // Tool usage events  
      tool_used: "tool_used",
      email_validated: "email_validated",
      domain_generated: "domain_generated",
      username_generated: "username_generated",
      spam_analyzed: "spam_analyzed",
      warmup_calculated: "warmup_calculated",
      
      // Engagement events
      cta_click: "cta_click",
      get_started_click: "get_started_click",
      pricing_viewed: "pricing_viewed",
      feature_explored: "feature_explored",
      
      // Download/Export events
      csv_download: "csv_download",
      results_export: "results_export",
      
      // Navigation events
      tool_navigation: "tool_navigation",
      external_link_click: "external_link_click"
    }
  },
  
  // PostHog Configuration
  posthog: {
    apiKey: process.env.VITE_POSTHOG_API_KEY || "", // Your PostHog project API key
    apiHost: process.env.VITE_POSTHOG_API_HOST || "https://app.posthog.com", // PostHog instance URL
    enabled: Boolean(process.env.VITE_POSTHOG_API_KEY),
    
    // PostHog initialization options
    options: {
      api_host: process.env.VITE_POSTHOG_API_HOST || "https://app.posthog.com",
      capture_pageview: true,
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: {
          password: true,
          email: false,
        },
      },
      autocapture: true,
      disable_session_recording: false,
      
      // Privacy settings
      respect_dnt: true,
      opt_out_capturing_by_default: false,
      
      // Performance
      loaded: (posthog: unknown) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (posthog as any).debug();
        }
      }
    },
    
    // Custom PostHog events
    events: {
      // User journey events
      page_view: '$pageview',
      session_start: '$session_start',
      
      // Tool interactions
      tool_opened: 'tool_opened',
      tool_completed: 'tool_completed',
      tool_error: 'tool_error',
      
      // Lead scoring events
      high_intent_action: 'high_intent_action',
      medium_intent_action: 'medium_intent_action',
      low_intent_action: 'low_intent_action',
      
      // Feature usage
      feature_used: 'feature_used',
      feature_abandoned: 'feature_abandoned',
      
      // Business events
      pricing_interest: 'pricing_interest',
      demo_request: 'demo_request',
      support_contact: 'support_contact'
    }
  },
  
  // Environment settings
  environment: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    enableDebug: process.env.VITE_ANALYTICS_DEBUG === 'true' || process.env.NODE_ENV === 'development'
  },
  
  // Cookie consent (if needed for GDPR compliance)
  consent: {
    required: process.env.VITE_COOKIE_CONSENT_REQUIRED === 'true',
    categories: {
      necessary: true,
      analytics: true,
      marketing: false,
      preferences: true
    }
  }
};

// Helper functions
export const isAnalyticsEnabled = () => {
  return analyticsConfig.googleAnalytics.enabled || analyticsConfig.posthog.enabled;
};

export const shouldLoadGoogleAnalytics = () => {
  return analyticsConfig.googleAnalytics.enabled && analyticsConfig.googleAnalytics.measurementId;
};

export const shouldLoadPostHog = () => {
  return analyticsConfig.posthog.enabled && analyticsConfig.posthog.apiKey;
};

export const getGoogleAnalyticsId = () => {
  return analyticsConfig.googleAnalytics.measurementId;
};

export const getPostHogConfig = () => {
  return {
    apiKey: analyticsConfig.posthog.apiKey,
    options: analyticsConfig.posthog.options
  };
};

export default analyticsConfig;
