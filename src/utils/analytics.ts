// Analytics utilities for Google Analytics and PostHog integration
import posthog from 'posthog-js';
import { 
  analyticsConfig, 
  shouldLoadGoogleAnalytics, 
  shouldLoadPostHog,
  getGoogleAnalyticsId,
  getPostHogConfig
} from '@/config/analytics';

// Type declarations for analytics
declare global {
  interface Window {
    dataLayer: Array<unknown>;
    gtag: (...args: unknown[]) => void;
  }
}

// Google Analytics gtag function
declare const gtag: (...args: unknown[]) => void;

// Type definitions
export interface AnalyticsEvent {
  event: string;
  parameters?: Record<string, string | number | boolean>;
  user_properties?: Record<string, string | number | boolean>;
}

export interface ToolUsageEvent {
  tool_name: string;
  action: 'opened' | 'completed' | 'error' | 'abandoned';
  parameters?: Record<string, string | number | boolean>;
}

export interface ConversionEvent {
  event_name: string;
  value?: number;
  currency?: string;
  parameters?: Record<string, string | number | boolean>;
}

// Initialize analytics
export const initializeAnalytics = () => {
  // Initialize Google Analytics
  if (shouldLoadGoogleAnalytics()) {
    const measurementId = getGoogleAnalyticsId();
    
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    
    gtag('js', new Date());
    gtag('config', measurementId, analyticsConfig.googleAnalytics.config);
    
    if (analyticsConfig.environment.enableDebug) {
      console.log('🔍 Google Analytics initialized:', measurementId);
    }
  }
  
  // Initialize PostHog
  if (shouldLoadPostHog()) {
    const { apiKey, options } = getPostHogConfig();
    posthog.init(apiKey, options);
    
    if (analyticsConfig.environment.enableDebug) {
      console.log('📊 PostHog initialized:', apiKey);
    }
  }
};

// Track page views
export const trackPageView = (path?: string, title?: string) => {
  const pagePath = path || window.location.pathname;
  const pageTitle = title || document.title;
  
  // Google Analytics page view
  if (shouldLoadGoogleAnalytics()) {
    gtag('config', getGoogleAnalyticsId(), {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
  
  // PostHog page view (automatically tracked if capture_pageview is true)
  if (shouldLoadPostHog()) {
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      $pathname: pagePath,
      $title: pageTitle,
    });
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('📄 Page view tracked:', { path: pagePath, title: pageTitle });
  }
};

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  // Google Analytics event
  if (shouldLoadGoogleAnalytics()) {
    gtag('event', event.event, {
      ...event.parameters,
      custom_parameters: event.user_properties,
    });
  }
  
  // PostHog event
  if (shouldLoadPostHog()) {
    posthog.capture(event.event, {
      ...event.parameters,
      ...event.user_properties,
    });
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('🎯 Event tracked:', event);
  }
};

// Track tool usage
export const trackToolUsage = (toolEvent: ToolUsageEvent) => {
  const event: AnalyticsEvent = {
    event: analyticsConfig.googleAnalytics.events.tool_used,
    parameters: {
      tool_name: toolEvent.tool_name,
      action: toolEvent.action,
      ...toolEvent.parameters,
    },
  };
  
  trackEvent(event);
  
  // Additional PostHog event for detailed analysis
  if (shouldLoadPostHog()) {
    posthog.capture(`tool_${toolEvent.action}`, {
      tool_name: toolEvent.tool_name,
      ...toolEvent.parameters,
    });
  }
};

// Track conversions (leads, signups, etc.)
export const trackConversion = (conversion: ConversionEvent) => {
  const event: AnalyticsEvent = {
    event: conversion.event_name,
    parameters: {
      value: conversion.value || 0,
      currency: conversion.currency || 'USD',
      ...conversion.parameters,
    },
  };
  
  trackEvent(event);
  
  // PostHog conversion tracking
  if (shouldLoadPostHog()) {
    posthog.capture(conversion.event_name, {
      value: conversion.value,
      currency: conversion.currency,
      ...conversion.parameters,
    });
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('💰 Conversion tracked:', conversion);
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string, additionalData?: Record<string, string | number>) => {
  trackEvent({
    event: analyticsConfig.googleAnalytics.events.cta_click,
    parameters: {
      cta_name: ctaName,
      cta_location: location,
      ...additionalData,
    },
  });
};

// Track form submissions
export const trackFormSubmission = (formName: string, formData?: Record<string, string | number>) => {
  trackEvent({
    event: analyticsConfig.googleAnalytics.events.contact_form_submit,
    parameters: {
      form_name: formName,
      ...formData,
    },
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent({
    event: analyticsConfig.googleAnalytics.events.external_link_click,
    parameters: {
      link_url: url,
      link_text: linkText || 'Unknown',
      outbound: true,
    },
  });
};

// Track feature usage
export const trackFeatureUsage = (featureName: string, action: string, value?: string | number) => {
  trackEvent({
    event: analyticsConfig.googleAnalytics.events.feature_explored,
    parameters: {
      feature_name: featureName,
      feature_action: action,
      feature_value: value,
    },
  });
};

// Track downloads/exports
export const trackDownload = (fileName: string, fileType: string, source: string) => {
  trackEvent({
    event: analyticsConfig.googleAnalytics.events.csv_download,
    parameters: {
      file_name: fileName,
      file_type: fileType,
      download_source: source,
    },
  });
};

// User identification (for PostHog)
export const identifyUser = (userId: string, properties?: Record<string, string | number | boolean>) => {
  if (shouldLoadPostHog()) {
    posthog.identify(userId, properties);
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('👤 User identified:', { userId, properties });
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, string | number | boolean>) => {
  // Google Analytics user properties
  if (shouldLoadGoogleAnalytics()) {
    gtag('config', getGoogleAnalyticsId(), {
      custom_map: properties,
    });
  }
  
  // PostHog user properties
  if (shouldLoadPostHog()) {
    posthog.people.set(properties);
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('🔧 User properties set:', properties);
  }
};

// Consent management
export const setAnalyticsConsent = (consentGiven: boolean) => {
  // Google Analytics consent
  if (shouldLoadGoogleAnalytics()) {
    gtag('consent', 'update', {
      analytics_storage: consentGiven ? 'granted' : 'denied',
      ad_storage: consentGiven ? 'granted' : 'denied',
    });
  }
  
  // PostHog consent
  if (shouldLoadPostHog()) {
    if (consentGiven) {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('🍪 Analytics consent updated:', consentGiven);
  }
};

// Debugging utilities
export const getAnalyticsDebugInfo = () => {
  return {
    googleAnalytics: {
      enabled: shouldLoadGoogleAnalytics(),
      measurementId: getGoogleAnalyticsId(),
    },
    posthog: {
      enabled: shouldLoadPostHog(),
      apiKey: shouldLoadPostHog() ? getPostHogConfig().apiKey : null,
    },
    environment: analyticsConfig.environment,
  };
};

// Enhanced ecommerce tracking (for future use)
export const trackPurchase = (transactionId: string, value: number, items: Array<{
  item_id: string;
  item_name: string;
  category: string;
  quantity: number;
  price: number;
}>) => {
  trackEvent({
    event: 'purchase',
    parameters: {
      transaction_id: transactionId,
      value,
      currency: 'USD',
      item_count: items.length,
    },
  });
  
  // Track items separately for detailed analysis
  if (shouldLoadPostHog()) {
    posthog.capture('purchase', {
      transaction_id: transactionId,
      value,
      currency: 'USD',
      items: items,
    });
  }
};
