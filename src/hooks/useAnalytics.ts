// React hook for analytics tracking
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  initializeAnalytics,
  trackPageView,
  trackEvent,
  trackToolUsage,
  trackConversion,
  trackCTAClick,
  trackFormSubmission,
  trackExternalLink,
  trackFeatureUsage,
  trackDownload,
  identifyUser,
  setUserProperties,
  setAnalyticsConsent,
  type AnalyticsEvent,
  type ToolUsageEvent,
  type ConversionEvent,
} from '@/utils/analytics';

// Hook for initializing analytics
export const useAnalytics = () => {
  const location = useLocation();

  // Initialize analytics on mount
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return {
    trackEvent,
    trackToolUsage,
    trackConversion,
    trackCTAClick,
    trackFormSubmission,
    trackExternalLink,
    trackFeatureUsage,
    trackDownload,
    identifyUser,
    setUserProperties,
    setAnalyticsConsent,
  };
};

// Hook for tool-specific analytics
export const useToolAnalytics = (toolName: string) => {
  const { trackToolUsage: baseTrackToolUsage, trackFeatureUsage } = useAnalytics();

  const trackToolOpened = useCallback(() => {
    baseTrackToolUsage({
      tool_name: toolName,
      action: 'opened',
    });
  }, [toolName, baseTrackToolUsage]);

  const trackToolCompleted = useCallback((parameters?: Record<string, string | number | boolean>) => {
    baseTrackToolUsage({
      tool_name: toolName,
      action: 'completed',
      parameters,
    });
  }, [toolName, baseTrackToolUsage]);

  const trackToolError = useCallback((error: string, parameters?: Record<string, string | number | boolean>) => {
    baseTrackToolUsage({
      tool_name: toolName,
      action: 'error',
      parameters: {
        error_message: error,
        ...parameters,
      },
    });
  }, [toolName, baseTrackToolUsage]);

  const trackToolAbandoned = useCallback((parameters?: Record<string, string | number | boolean>) => {
    baseTrackToolUsage({
      tool_name: toolName,
      action: 'abandoned',
      parameters,
    });
  }, [toolName, baseTrackToolUsage]);

  const trackToolFeature = useCallback((featureName: string, action: string, value?: string | number) => {
    trackFeatureUsage(`${toolName}_${featureName}`, action, value);
  }, [toolName, trackFeatureUsage]);

  // Track tool opened on mount
  useEffect(() => {
    trackToolOpened();
  }, [trackToolOpened]);

  return {
    trackToolCompleted,
    trackToolError,
    trackToolAbandoned,
    trackToolFeature,
  };
};

// Hook for conversion tracking
export const useConversionTracking = () => {
  const { trackConversion, trackFormSubmission, trackCTAClick } = useAnalytics();

  const trackLead = useCallback((source: string, value?: number) => {
    trackConversion({
      event_name: 'lead_captured',
      value: value || 1,
      parameters: {
        lead_source: source,
        lead_timestamp: new Date().toISOString(),
      },
    });
  }, [trackConversion]);

  const trackDemo = useCallback((source: string) => {
    trackConversion({
      event_name: 'demo_request',
      value: 10, // Assign demo request value
      parameters: {
        demo_source: source,
        demo_timestamp: new Date().toISOString(),
      },
    });
  }, [trackConversion]);

  const trackContact = useCallback((formData: Record<string, string | number>) => {
    trackFormSubmission('contact_form', formData);
    trackLead('contact_form', 5); // Assign contact form lead value
  }, [trackFormSubmission, trackLead]);

  const trackGetStarted = useCallback((location: string) => {
    trackCTAClick('get_started', location);
    trackLead('get_started_cta', 3);
  }, [trackCTAClick, trackLead]);

  const trackPricingInterest = useCallback((plan: string, location: string) => {
    trackEvent({
      event: 'pricing_interest',
      parameters: {
        plan_name: plan,
        plan_location: location,
        interest_timestamp: new Date().toISOString(),
      },
    });
  }, []);

  return {
    trackLead,
    trackDemo,
    trackContact,
    trackGetStarted,
    trackPricingInterest,
  };
};

// Hook for enhanced analytics with user behavior tracking
export const useUserBehavior = () => {
  const { trackEvent } = useAnalytics();

  const trackScrollDepth = useCallback((depth: number, page: string) => {
    trackEvent({
      event: 'scroll_depth',
      parameters: {
        scroll_depth: depth,
        page_path: page,
      },
    });
  }, [trackEvent]);

  const trackTimeOnPage = useCallback((timeSpent: number, page: string) => {
    trackEvent({
      event: 'time_on_page',
      parameters: {
        time_spent_seconds: timeSpent,
        page_path: page,
      },
    });
  }, [trackEvent]);

  const trackInteraction = useCallback((elementType: string, elementId: string, action: string) => {
    trackEvent({
      event: 'user_interaction',
      parameters: {
        element_type: elementType,
        element_id: elementId,
        interaction_action: action,
      },
    });
  }, [trackEvent]);

  return {
    trackScrollDepth,
    trackTimeOnPage,
    trackInteraction,
  };
};

// Export types for usage in components
export type {
  AnalyticsEvent,
  ToolUsageEvent,
  ConversionEvent,
};
