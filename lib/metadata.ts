import { Metadata } from 'next';
import { config } from '@/lib/config';

interface CreateMetadataParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Creates standardized metadata for pages
 * Includes Open Graph and Twitter Card metadata
 */
export function createMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png',
  noIndex = false,
}: CreateMetadataParams): Metadata {
  const url = `${config.app.url}${path}`;
  const imageUrl = `${config.app.url}${image}`;

  return {
    title,
    description,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title,
      description,
      url,
      siteName: 'SubscribeMeForAI',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
