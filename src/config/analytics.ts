// Analytics configuration using the 'analytics' package with GTM and PostHog
import Analytics from 'analytics'
import googleTagManager from '@analytics/google-tag-manager'

export const analyticsConfig = {
  // Google Tag Manager Configuration (via analytics package)
  googleTagManager: {
    containerId: import.meta.env.VITE_GTM_CONTAINER_ID || "", // e.g., "GTM-XXXXXXX" or GA measurement ID "G-XXXXXXXXXX"
    enabled: Boolean(import.meta.env.VITE_GTM_CONTAINER_ID),
    
    // GTM configuration options
    config: {
      // Enable enhanced ecommerce
      dataLayerName: 'dataLayer',
      customScriptSrc: false,
      preview: import.meta.env.MODE === 'development' ? false : undefined,
      auth: undefined
    }
  },

  // Fallback Google Analytics Configuration
  googleAnalytics: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || "", // e.g., "G-XXXXXXXXXX"
    enabled: Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID),
    
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
    apiKey: import.meta.env.VITE_POSTHOG_API_KEY || "", // Your PostHog project API key
    apiHost: import.meta.env.VITE_POSTHOG_API_HOST || "https://app.posthog.com", // PostHog instance URL
    enabled: Boolean(import.meta.env.VITE_POSTHOG_API_KEY),
    
    // PostHog initialization options
    options: {
      api_host: import.meta.env.VITE_POSTHOG_API_HOST || "https://app.posthog.com",
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
        if (import.meta.env.MODE === 'development') {
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
    isDevelopment: import.meta.env.MODE === 'development',
    isProduction: import.meta.env.MODE === 'production',
    enableDebug: import.meta.env.VITE_ANALYTICS_DEBUG === 'true' || import.meta.env.MODE === 'development'
  },
  
  // Cookie consent (if needed for GDPR compliance)
  consent: {
    required: import.meta.env.VITE_COOKIE_CONSENT_REQUIRED === 'true',
    categories: {
      necessary: true,
      analytics: true,
      marketing: false,
      preferences: true
    }
  }
};

// Initialize the analytics instance (client-side only)
export const createAnalyticsInstance = () => {
  if (typeof window === 'undefined') {
    return null; // Return null on server-side
  }
  
  return Analytics({
    app: 'sending-ac-landing',
    version: '1.0.0',
    debug: analyticsConfig.environment.enableDebug,
    plugins: [
      // Google Tag Manager plugin
      ...(analyticsConfig.googleTagManager.enabled ? [
        googleTagManager({
          containerId: analyticsConfig.googleTagManager.containerId,
          ...analyticsConfig.googleTagManager.config
        })
      ] : [])
    ]
  });
};

// Analytics instance (lazy-loaded)
let analyticsInstance: ReturnType<typeof Analytics> | null = null;

export const getAnalyticsInstance = () => {
  if (typeof window === 'undefined') {
    return null; // Return null on server-side
  }
  
  if (!analyticsInstance) {
    analyticsInstance = createAnalyticsInstance();
  }
  
  return analyticsInstance;
};

// Helper functions
export const isAnalyticsEnabled = () => {
  return analyticsConfig.googleTagManager.enabled || analyticsConfig.posthog.enabled;
};

export const shouldLoadGoogleTagManager = () => {
  return analyticsConfig.googleTagManager.enabled && analyticsConfig.googleTagManager.containerId;
};

export const shouldLoadGoogleAnalytics = () => {
  return analyticsConfig.googleAnalytics.enabled && analyticsConfig.googleAnalytics.measurementId;
};

export const shouldLoadPostHog = () => {
  return analyticsConfig.posthog.enabled && analyticsConfig.posthog.apiKey;
};

export const getGoogleTagManagerId = () => {
  return analyticsConfig.googleTagManager.containerId;
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
