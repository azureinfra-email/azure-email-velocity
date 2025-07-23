// Generate sitemap.xml content
const generateSitemap = () => {
  const baseUrl = 'https://azureinfra.email';
  const currentDate = new Date().toISOString();
  
  const routes = [
    // Main pages
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/tools', priority: '0.9', changefreq: 'weekly' },
    { url: '/warmup-calculator', priority: '0.9', changefreq: 'monthly' },
    { url: '/warmup-guide', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    
    // Tools pages
    { url: '/tools/username-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/domain-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/person-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/subject-line-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/email-validator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/spam-analyzer', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/sequence-planner', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/utm-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/email-signature-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/spintax-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/email-preview', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/ab-subject-line-tester', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/best-send-time-calculator', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools/timezone-converter', priority: '0.8', changefreq: 'monthly' }
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapContent;
};

// Generate robots.txt content
const generateRobotsTxt = () => {
  const baseUrl = 'https://azureinfra.email';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Optimize crawling
Crawl-delay: 1

# Block unnecessary paths (if any)
# Disallow: /api/
# Disallow: /_next/`;
};

export { generateSitemap, generateRobotsTxt };
