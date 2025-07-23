// Intercom integration component
import { useEffect } from 'react';
import { siteConfig } from '@/config/config';

declare global {
  interface Window {
    Intercom: (action: string, data?: Record<string, unknown>) => void;
    intercomSettings?: Record<string, unknown>;
    attachEvent?: (event: string, callback: () => void) => void;
  }
}

interface IntercomProviderProps {
  children: React.ReactNode;
}

export const IntercomProvider: React.FC<IntercomProviderProps> = ({ children }) => {
  useEffect(() => {
    // Only load Intercom if we have the app ID configured
    if (!siteConfig.intercom.appId) {
      return;
    }

    // Load Intercom script
    const loadIntercom = () => {
      const w = window;
      const ic = w.Intercom;
      
      if (typeof ic === "function") {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        const d = document;
        const i = function(...args: unknown[]) {
          (i as any).c(args);
        };
        (i as any).q = [];
        (i as any).c = function(args: unknown) {
          (i as any).q.push(args);
        };
        w.Intercom = i;
        
        const l = function() {
          const s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = `https://widget.intercom.io/widget/${siteConfig.intercom.widgetId}`;
          const x = d.getElementsByTagName('script')[0];
          if (x && x.parentNode) {
            x.parentNode.insertBefore(s, x);
          }
        };
        
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    };

    // Initialize Intercom
    loadIntercom();
    
    // Boot Intercom
    if (window.Intercom) {
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: siteConfig.intercom.appId
      });
    }

    // Cleanup function
    return () => {
      if (window.Intercom) {
        window.Intercom('shutdown');
      }
    };
  }, []);

  return <>{children}</>;
};

export default IntercomProvider;
