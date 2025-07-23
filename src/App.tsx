import type { RouteRecord } from 'vite-react-ssg'
import React from 'react'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import Header from './components/Header';
import Footer from './components/Footer';
import { AnalyticsProvider, CookieConsentBanner } from './components/AnalyticsProvider';
import { IntercomProvider } from './components/IntercomProvider';

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AnalyticsProvider autoConsent={true}>
        <IntercomProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <Header />
              <Outlet />
              <Footer />
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <CookieConsentBanner />
            </div>
          </TooltipProvider>
        </IntercomProvider>
      </AnalyticsProvider>
    </QueryClientProvider>
  );
};

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/Index')),
      },
      {
        path: 'privacy',
        Component: React.lazy(() => import('./pages/PrivacyPolicy')),
      },
      {
        path: 'terms',
        Component: React.lazy(() => import('./pages/TermsOfService')),
      },
      {
        path: 'warmup-guide',
        Component: React.lazy(() => import('./pages/WarmupGuide')),
      },
      {
        path: 'warmup-calculator',
        Component: React.lazy(() => import('./pages/WarmupCalculatorPage')),
      },
      {
        path: 'tools',
        Component: React.lazy(() => import('./pages/ToolsPage')),
      },
      {
        path: 'tools/username-generator',
        Component: React.lazy(() => import('./pages/UsernameGeneratorPage')),
      },
      {
        path: 'tools/domain-generator',
        Component: React.lazy(() => import('./pages/DomainGeneratorPage')),
      },
      {
        path: 'tools/person-generator',
        Component: React.lazy(() => import('./pages/PersonGeneratorPage')),
      },
      {
        path: 'tools/subject-line-generator',
        Component: React.lazy(() => import('./pages/SubjectLineGeneratorPage')),
      },
      {
        path: 'tools/email-validator',
        Component: React.lazy(() => import('./pages/EmailValidatorPage')),
      },
      {
        path: 'tools/spam-analyzer',
        Component: React.lazy(() => import('./pages/SpamAnalyzerPage')),
      },
      {
        path: 'tools/sequence-planner',
        Component: React.lazy(() => import('./pages/SequencePlannerPage')),
      },
      {
        path: 'tools/utm-generator',
        Component: React.lazy(() => import('./pages/UTMGeneratorPage')),
      },
      {
        path: 'tools/email-signature-generator',
        Component: React.lazy(() => import('./pages/EmailSignatureGeneratorPage')),
      },
      {
        path: 'tools/spintax-generator',
        Component: React.lazy(() => import('./pages/SpintaxGeneratorPage')),
      },
      {
        path: 'tools/email-preview',
        Component: React.lazy(() => import('./pages/EmailPreviewPage')),
      },
      {
        path: 'tools/ab-subject-line-tester',
        Component: React.lazy(() => import('./pages/ABSubjectLineTesterPage')),
      },
      {
        path: 'tools/best-send-time-calculator',
        Component: React.lazy(() => import('./pages/BestSendTimeCalculatorPage')),
      },
      {
        path: 'tools/timezone-converter',
        Component: React.lazy(() => import('./pages/TimezoneConverterPage')),
      },
      {
        path: 'tools/dns-record-generator',
        Component: React.lazy(() => import('./pages/DNSRecordGeneratorPage')),
      },
      {
        path: 'tools/template-generator',
        Component: React.lazy(() => import('./pages/TemplateGeneratorPage')),
      },
      {
        path: '*',
        Component: React.lazy(() => import('./pages/NotFound')),
      },
    ],
  },
]