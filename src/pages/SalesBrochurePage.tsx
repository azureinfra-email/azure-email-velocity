import React from 'react';
import { SalesBrochureContainer } from '../components/SalesBrochure';
import SEO from '../components/SEO';

const SalesBrochurePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="AzureInfra.email - Sales Brochure"
        description="Complete sales training materials and resources for AzureInfra.email - Premium B2B Email Infrastructure for RevOps Teams"
        keywords="sales brochure, email infrastructure, RevOps, cold email, deliverability, Azure"
        canonical="/sales-brochure"
      />
      <SalesBrochureContainer />
    </>
  );
};

export default SalesBrochurePage;
