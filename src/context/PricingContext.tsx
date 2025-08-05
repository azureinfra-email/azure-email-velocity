import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

type PricingPlan = 'monthly' | 'quarterly' | 'annual';

interface PricingContextType {
  selectedPlan: PricingPlan;
  setSelectedPlan: (plan: PricingPlan) => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export { PricingContext };

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlanState] = useState<PricingPlan>('monthly'); // Default to monthly as requested
  
  // Initialize selected plan from URL params or default to monthly
  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam && ['monthly', 'quarterly', 'annual'].includes(planParam)) {
      setSelectedPlanState(planParam as PricingPlan);
    }
  }, [searchParams]);
  
  // Update URL when plan changes
  const setSelectedPlan = (plan: PricingPlan) => {
    setSelectedPlanState(plan);
    
    // Update URL search params
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('plan', plan);
    setSearchParams(newSearchParams, { replace: true });
  };

  const value = {
    selectedPlan,
    setSelectedPlan
  };

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
};
