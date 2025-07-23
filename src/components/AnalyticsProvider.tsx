// Analytics Provider Component
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { initializeAnalytics, setAnalyticsConsent } from '@/utils/analytics';
import { isAnalyticsEnabled } from '@/config/analytics';

interface AnalyticsContextValue {
  isEnabled: boolean;
  consentGiven: boolean;
  giveConsent: () => void;
  revokeConsent: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

// Export the context for use in hook
export { AnalyticsContext };

interface AnalyticsProviderProps {
  children: ReactNode;
  autoConsent?: boolean; // Automatically give consent (for non-GDPR regions)
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ 
  children, 
  autoConsent = true 
}) => {
  const [consentGiven, setConsentGiven] = React.useState(autoConsent);
  const [initialized, setInitialized] = React.useState(false);

  // Initialize analytics when consent is given
  useEffect(() => {
    if (consentGiven && isAnalyticsEnabled() && !initialized) {
      initializeAnalytics();
      setAnalyticsConsent(true);
      setInitialized(true);
      
      // Track initial page load
      if (window.location.pathname !== '/') {
        // Small delay to ensure analytics is loaded
        setTimeout(() => {
          window.dispatchEvent(new Event('analytics-ready'));
        }, 100);
      }
    } else if (!consentGiven && initialized) {
      setAnalyticsConsent(false);
    }
  }, [consentGiven, initialized]);

  const giveConsent = React.useCallback(() => {
    setConsentGiven(true);
    localStorage.setItem('analytics-consent', 'true');
  }, []);

  const revokeConsent = React.useCallback(() => {
    setConsentGiven(false);
    setAnalyticsConsent(false);
    localStorage.setItem('analytics-consent', 'false');
  }, []);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('analytics-consent');
    if (savedConsent !== null) {
      setConsentGiven(savedConsent === 'true');
    }
  }, []);

  const contextValue: AnalyticsContextValue = {
    isEnabled: isAnalyticsEnabled(),
    consentGiven,
    giveConsent,
    revokeConsent,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Cookie consent banner component (optional)
export const CookieConsentBanner: React.FC = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('CookieConsentBanner must be used within an AnalyticsProvider');
  }
  
  const { consentGiven, giveConsent, revokeConsent, isEnabled } = context;
  const [showBanner, setShowBanner] = React.useState(false);

  useEffect(() => {
    // Show banner if analytics is enabled but consent not given
    if (isEnabled && !consentGiven) {
      const hasShownBanner = localStorage.getItem('cookie-banner-shown');
      if (!hasShownBanner) {
        setShowBanner(true);
      }
    }
  }, [isEnabled, consentGiven]);

  const handleAccept = () => {
    giveConsent();
    setShowBanner(false);
    localStorage.setItem('cookie-banner-shown', 'true');
  };

  const handleDecline = () => {
    revokeConsent();
    setShowBanner(false);
    localStorage.setItem('cookie-banner-shown', 'true');
  };

  if (!showBanner || !isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4">
      <div className="container mx-auto flex items-center justify-between gap-4 max-w-4xl">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            We use cookies to improve your experience and analyze site usage. 
            <a 
              href="/privacy" 
              className="text-primary hover:underline ml-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsProvider;
