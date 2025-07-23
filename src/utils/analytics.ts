// Analytics utilities using the 'analytics' package with GTM and PostHog integration
import posthog from 'posthog-js';
import { 
  getAnalyticsInstance,
  analyticsConfig, 
  shouldLoadGoogleTagManager,
  shouldLoadPostHog,
  getGoogleTagManagerId,
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
  // The analytics instance is already configured in the config file
  // Just initialize PostHog separately if enabled
  if (shouldLoadPostHog()) {
    const { apiKey, options } = getPostHogConfig();
    posthog.init(apiKey, options);
    
    if (analyticsConfig.environment.enableDebug) {
      console.log('� PostHog initialized:', apiKey);
    }
  }

  // Analytics package with GTM is already initialized in config
  if (shouldLoadGoogleTagManager()) {
    if (analyticsConfig.environment.enableDebug) {
      console.log('� Google Tag Manager initialized via analytics package:', getGoogleTagManagerId());
    }
  }
};

// Track page views using analytics package
export const trackPageView = (path?: string, title?: string) => {
  const pagePath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
  const pageTitle = title || (typeof document !== 'undefined' ? document.title : '');

  // Use analytics package for GTM tracking
  if (shouldLoadGoogleTagManager()) {
    const analytics = getAnalyticsInstance();
    if (analytics) {
      analytics.page({
        path: pagePath,
        title: pageTitle,
        url: typeof window !== 'undefined' ? window.location.href : ''
      });
    }
  }

  // PostHog page view (automatically tracked if capture_pageview is true)
  if (shouldLoadPostHog()) {
    posthog.capture('$pageview', {
      $current_url: typeof window !== 'undefined' ? window.location.href : '',
      $pathname: pagePath,
      $title: pageTitle,
    });
  }
  
  if (analyticsConfig.environment.enableDebug) {
    console.log('📄 Page view tracked:', { path: pagePath, title: pageTitle });
  }
};

// Track custom events using analytics package
export const trackEvent = (event: AnalyticsEvent) => {
  const { event: eventName, parameters = {}, user_properties = {} } = event;

  // Use analytics package for GTM tracking
  if (shouldLoadGoogleTagManager()) {
    const analytics = getAnalyticsInstance();
    if (analytics) {
      analytics.track(eventName, {
        ...parameters,
        ...user_properties
      });
    }
  }

  // PostHog event tracking
  if (shouldLoadPostHog()) {
    posthog.capture(eventName, {
      ...parameters,
      ...user_properties
    });
  }

  if (analyticsConfig.environment.enableDebug) {
    console.log('📈 Event tracked:', eventName, parameters);
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
  // Use analytics package for GTM
  if (shouldLoadGoogleTagManager()) {
    const analytics = getAnalyticsInstance();
    if (analytics) {
      analytics.identify('anonymous', properties);
    }
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
  // For analytics package with GTM, consent is typically handled by GTM itself
  // But we can track consent events
  if (shouldLoadGoogleTagManager()) {
    const analytics = getAnalyticsInstance();
    if (analytics) {
      analytics.track('consent_updated', {
        analytics_storage: consentGiven ? 'granted' : 'denied',
        ad_storage: consentGiven ? 'granted' : 'denied',
      });
    }
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
    googleTagManager: {
      enabled: shouldLoadGoogleTagManager(),
      containerId: getGoogleTagManagerId(),
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
  // Use analytics package for GTM ecommerce tracking
  if (shouldLoadGoogleTagManager()) {
    const analytics = getAnalyticsInstance();
    if (analytics) {
      analytics.track('purchase', {
        transaction_id: transactionId,
        value,
        currency: 'USD',
        items: items,
      });
    }
  }
  
  // PostHog purchase tracking
  if (shouldLoadPostHog()) {
    posthog.capture('purchase', {
      transaction_id: transactionId,
      value,
      currency: 'USD',
      items: items,
    });
  }

  if (analyticsConfig.environment.enableDebug) {
    console.log('💰 Purchase tracked:', { transactionId, value, items });
  }
};
