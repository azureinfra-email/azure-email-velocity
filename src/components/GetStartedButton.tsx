import React from 'react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '../lib/utils';

interface GetStartedButtonProps extends ButtonProps {
  compact?: boolean;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ 
  compact = false, 
  className, 
  onClick,
  ...props 
}) => {
  const defaultOnClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button 
      className={cn(className)}
      onClick={onClick || defaultOnClick}
      {...props}
    >
      {compact ? 'Get Started' : 'Get Started Today'}
    </Button>
  );
};

export default GetStartedButton;
