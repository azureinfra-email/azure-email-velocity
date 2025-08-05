import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/config";
import { usePricing } from "@/hooks/usePricing";

// GTM dataLayer type declaration
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

interface GetStartedButtonProps extends Omit<ButtonProps, 'onClick' | 'variant'> {
  /**
   * Text to display on the button
   */
  text?: string;
  /**
   * Custom onClick handler. If not provided, redirects to order page
   */
  onClick?: () => void;
  /**
   * Button variant style
   */
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link" | "hero";
  /**
   * Use compact text for smaller spaces
   */
  compact?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Pricing plan to pass to order page
   */
  plan?: 'monthly' | 'quarterly' | 'annual';
  /**
   * Location identifier for GTM tracking
   */
  location?: string;
}

const GetStartedButton = ({ 
  text, 
  onClick, 
  compact = false, 
  className,
  variant = "default",
  size = "default",
  plan, // Optional override for specific plan
  location = 'unknown',
  ...props 
}: GetStartedButtonProps) => {
  
  const { selectedPlan } = usePricing();
  const effectivePlan = plan || selectedPlan; // Use prop plan or context plan
  
  const defaultText = compact ? "Get Started" : "Get Started Today";
  const buttonText = text || defaultText;
  
  const handleClick = () => {
    // GTM tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      const pricingInfo = siteConfig.pricing[effectivePlan];
      
      window.dataLayer.push({
        event: 'get_started_click',
        button_location: location,
        pricing_plan: effectivePlan,
        pricing_amount: pricingInfo.price,
        pricing_display: pricingInfo.displayPrice,
        pricing_period: pricingInfo.period,
        monthly_equivalent: pricingInfo.monthlyEquivalent || pricingInfo.displayPrice,
        savings: pricingInfo.savings || '0%',
        button_text: buttonText,
        timestamp: new Date().toISOString()
      });
    }
    
    if (onClick) {
      onClick();
    } else {
      // Default behavior: redirect to order page with plan parameter
      let orderUrl = siteConfig.links.start;
      orderUrl += `?plan=${effectivePlan}`;
      window.open(orderUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn("font-semibold", className)}
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export default GetStartedButton;
