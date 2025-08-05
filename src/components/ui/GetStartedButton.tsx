import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/config";

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
}

const GetStartedButton = ({ 
  text, 
  onClick, 
  compact = false, 
  className,
  variant = "default",
  size = "default",
  plan,
  ...props 
}: GetStartedButtonProps) => {
  
  const defaultText = compact ? "Get Started" : "Get Started Today";
  const buttonText = text || defaultText;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: redirect to order page with plan parameter
      let orderUrl = siteConfig.links.start;
      if (plan) {
        orderUrl += `?plan=${plan}`;
      }
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
