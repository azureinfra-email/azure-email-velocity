// Hook to use analytics context
import { useContext } from 'react';
import { AnalyticsContext } from '@/components/AnalyticsProvider';

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};
