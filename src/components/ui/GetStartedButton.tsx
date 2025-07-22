import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GetStartedButtonProps extends Omit<ButtonProps, 'onClick' | 'variant'> {
  /**
   * Text to display on the button
   */
  text?: string;
  /**
   * Custom onClick handler. If not provided, scrolls to contact section
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
}

const GetStartedButton = ({ 
  text, 
  onClick, 
  compact = false, 
  className,
  variant = "default",
  size = "default",
  ...props 
}: GetStartedButtonProps) => {
  
  const defaultText = compact ? "Get Started" : "Get Started Today";
  const buttonText = text || defaultText;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
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
