import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/inbox/', '/crm/', '/settings/', '/outreach/', '/api/'],
    },
    sitemap: 'https://getinvestr.com/sitemap.xml',
  };
}
