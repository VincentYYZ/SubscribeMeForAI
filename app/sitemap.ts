import { MetadataRoute } from 'next';
import { config } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.app.url;

  const routes = [
    '',
    '/ai-coding',
    '/ai-agent',
    '/ai-model',
    '/robot-xiaoyou',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
