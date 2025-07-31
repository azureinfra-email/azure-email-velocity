import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '../lib/utils';
import { Mail, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/config';

interface GetStartedButtonProps extends ButtonProps {
  compact?: boolean;
  showIcon?: boolean;
  text?: string;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ 
  compact = false, 
  showIcon = true,
  text,
  className, 
  onClick,
  ...props 
}) => {
  const defaultOnClick = () => {
    window.open(siteConfig.links.start, '_blank', 'noopener,noreferrer');
  };

  const buttonText = text || (compact ? 'Get Started' : 'Get Started - Land in Inboxes');

  return (
    <Button 
      className={cn(
        'group transition-all duration-300 font-semibold',
        !className?.includes('bg-') && 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600',
        className
      )}
      onClick={onClick || defaultOnClick}
      {...props}
    >
      {showIcon && <Mail className="w-5 h-5 group-hover:scale-110 transition-transform mr-2" />}
      {buttonText}
      {showIcon && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
    </Button>
  );
};

export default GetStartedButton;
