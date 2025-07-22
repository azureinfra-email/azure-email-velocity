// Simple SEO solution that works with SSG by setting document title
import { useEffect } from 'react';

interface SimpleSEOProps {
  title: string;
  description?: string;
}

export default function SimpleSEO({ title, description }: SimpleSEOProps) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      document.title = title;
      
      // Update description meta tag if provided
      if (description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', description);
        }
      }
    }
  }, [title, description]);

  // Return null - this component doesn't render anything
  return null;
}
