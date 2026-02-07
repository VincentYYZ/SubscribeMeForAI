/**
 * Image Optimization Utilities
 *
 * Provides utilities for optimizing images and generating responsive image URLs.
 * Works with Next.js Image Optimization API and external CDN providers.
 */

export const IMAGE_SIZES = {
  thumbnail: 150,
  small: 300,
  medium: 600,
  large: 1200,
  full: 2048,
} as const;

export type ImageSize = keyof typeof IMAGE_SIZES;

interface GetOptimizedImageUrlOptions {
  src: string;
  size?: ImageSize;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Generate an optimized image URL using Next.js Image Optimization API
 *
 * @param options - Image optimization options
 * @returns Optimized image URL
 *
 * @example
 * ```ts
 * const url = getOptimizedImageUrl({
 *   src: '/images/hero.jpg',
 *   size: 'large',
 *   quality: 85,
 *   format: 'webp'
 * });
 * ```
 */
export function getOptimizedImageUrl({
  src,
  size = 'medium',
  quality = 75,
  format = 'webp',
}: GetOptimizedImageUrlOptions): string {
  // If src is already a full URL (external image), return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const width = IMAGE_SIZES[size];
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: quality.toString(),
  });

  // Add format parameter if specified
  if (format) {
    params.append('f', format);
  }

  return `/_next/image?${params.toString()}`;
}

/**
 * Generate srcset attribute for responsive images
 *
 * @param src - Image source path
 * @param sizes - Array of image sizes to include in srcset
 * @param quality - Image quality (1-100)
 * @returns srcset string for img or Image component
 *
 * @example
 * ```ts
 * const srcset = getImageSrcSet('/images/hero.jpg', ['small', 'medium', 'large']);
 * // Returns: "/_next/image?url=/images/hero.jpg&w=300&q=75 300w, /_next/image?url=/images/hero.jpg&w=600&q=75 600w, ..."
 * ```
 */
export function getImageSrcSet(
  src: string,
  sizes: ImageSize[] = ['small', 'medium', 'large'],
  quality = 75
): string {
  return sizes
    .map((size) => {
      const url = getOptimizedImageUrl({ src, size, quality });
      const width = IMAGE_SIZES[size];
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Validate image file extension
 *
 * @param filename - File name to validate
 * @returns true if file has a valid image extension
 */
export function isValidImageFile(filename: string): boolean {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return validExtensions.includes(extension);
}
