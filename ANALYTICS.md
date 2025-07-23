# Analytics Implementation Guide

This guide shows how to use the Google Analytics and PostHog integration in your React application.

## Setup

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# PostHog Configuration
VITE_POSTHOG_API_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_POSTHOG_API_HOST=https://app.posthog.com

# Optional: Enable analytics debugging
VITE_ANALYTICS_DEBUG=true

# Optional: Enable cookie consent (for GDPR compliance)
VITE_COOKIE_CONSENT_REQUIRED=false
```

### 2. Application Wrapper

The analytics provider is already integrated in `App.tsx`. It automatically initializes analytics when the app loads.

## Usage Examples

### Basic Tool Analytics

```tsx
import { useToolAnalytics } from '@/hooks/useAnalytics';

const EmailValidatorPage = () => {
  const { trackToolCompleted, trackToolError, trackToolFeature } = useToolAnalytics('email_validator');

  const handleEmailValidation = async (email: string) => {
    try {
      const result = await validateEmail(email);
      
      // Track successful completion
      trackToolCompleted({
        email_count: 1,
        validation_result: result.status,
        confidence_score: result.confidence,
      });

      return result;
    } catch (error) {
      // Track errors
      trackToolError(error.message, {
        email_provided: Boolean(email),
      });
      throw error;
    }
  };

  const handleCSVExport = () => {
    trackToolFeature('csv_export', 'clicked');
    // Your export logic here
  };

  return (
    // Your component JSX
  );
};
```

### Conversion Tracking

```tsx
import { useConversionTracking } from '@/hooks/useAnalytics';

const ContactForm = () => {
  const { trackContact, trackGetStarted, trackLead } = useConversionTracking();

  const handleFormSubmit = (formData: FormData) => {
    // Track form submission and lead
    trackContact({
      form_type: 'contact_form',
      mailbox_count: formData.mailboxCount,
      use_case: formData.useCase,
    });
  };

  const handleGetStartedClick = () => {
    trackGetStarted('hero_section');
    // Your navigation logic
  };

  return (
    // Your form JSX
  );
};
```

### Custom Event Tracking

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const CustomComponent = () => {
  const { trackEvent, trackCTAClick, trackDownload } = useAnalytics();

  const handleCustomAction = () => {
    trackEvent({
      event: 'custom_action',
      parameters: {
        action_type: 'special_feature',
        user_segment: 'premium',
        value: 100,
      },
    });
  };

  const handleCTAClick = () => {
    trackCTAClick('upgrade_now', 'pricing_section', {
      plan_name: 'premium',
      discount_applied: true,
    });
  };

  const handleDownload = () => {
    trackDownload('email_template.html', 'html', 'template_generator');
  };

  return (
    // Your component JSX
  );
};
```

### User Behavior Tracking

```tsx
import { useUserBehavior } from '@/hooks/useAnalytics';
import { useEffect } from 'react';

const LandingPage = () => {
  const { trackScrollDepth, trackTimeOnPage } = useUserBehavior();

  useEffect(() => {
    let startTime = Date.now();

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > 0 && scrollPercent % 25 === 0) {
        trackScrollDepth(scrollPercent, window.location.pathname);
      }
    };

    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeSpent, window.location.pathname);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackScrollDepth, trackTimeOnPage]);

  return (
    // Your component JSX
  );
};
```

## Tool-Specific Implementation Examples

### Username Generator
```tsx
const { trackToolCompleted } = useToolAnalytics('username_generator');

// Track when usernames are generated
trackToolCompleted({
  username_count: 5,
  variation_types: 'firstname_lastname,firstname_initial',
  company_included: true,
});
```

### Spam Analyzer
```tsx
const { trackToolCompleted } = useToolAnalytics('spam_analyzer');

// Track spam analysis results
trackToolCompleted({
  spam_score: 75,
  trigger_count: 3,
  risk_level: 'high',
  email_length: 250,
});
```

### Domain Generator
```tsx
const { trackToolCompleted } = useToolAnalytics('domain_generator');

// Track domain generation
trackToolCompleted({
  domain_count: 10,
  keyword_included: true,
  tld_types: '.com,.net,.org',
});
```

## Advanced Features

### User Identification
```tsx
import { identifyUser, setUserProperties } from '@/utils/analytics';

// Identify user after signup/login
identifyUser('user123', {
  email: 'user@example.com',
  plan: 'premium',
  signup_date: '2025-01-15',
});

// Update user properties
setUserProperties({
  last_active: new Date().toISOString(),
  tools_used: 5,
  conversion_status: 'qualified_lead',
});
```

### Consent Management
```tsx
import { useAnalyticsContext } from '@/hooks/useAnalyticsContext';

const PrivacySettings = () => {
  const { consentGiven, giveConsent, revokeConsent, isEnabled } = useAnalyticsContext();

  return (
    <div>
      <p>Analytics enabled: {isEnabled ? 'Yes' : 'No'}</p>
      <p>Consent given: {consentGiven ? 'Yes' : 'No'}</p>
      
      <button onClick={giveConsent}>Enable Analytics</button>
      <button onClick={revokeConsent}>Disable Analytics</button>
    </div>
  );
};
```

## Event Categories

### Google Analytics Events
- `tool_used` - When a tool is completed successfully
- `cta_click` - Call-to-action button clicks
- `contact_form_submit` - Form submissions
- `csv_download` - File downloads/exports
- `feature_explored` - Feature usage tracking

### PostHog Events
- `tool_opened` - When a tool page is accessed
- `tool_completed` - Successful tool completion
- `tool_error` - Tool errors or failures
- `high_intent_action` - High-value user actions
- `pricing_interest` - Pricing page interactions

## Debugging

Enable debug mode by setting `VITE_ANALYTICS_DEBUG=true` in your environment variables. This will log all analytics events to the browser console.

```tsx
import { getAnalyticsDebugInfo } from '@/utils/analytics';

// Get current analytics configuration
console.log(getAnalyticsDebugInfo());
```

## Configuration Files

- `src/config/analytics.ts` - Main analytics configuration
- `src/utils/analytics.ts` - Analytics utility functions
- `src/hooks/useAnalytics.ts` - React hooks for analytics
- `src/components/AnalyticsProvider.tsx` - Analytics context provider
- `src/types/analytics.d.ts` - TypeScript declarations
