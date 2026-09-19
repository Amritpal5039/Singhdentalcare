import { MetadataRoute } from 'next';
import connectDB from './lib/db';
import Blog from './lib/models/Blog';
import Disease from './lib/models/Disease';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.singhdentalcare.in';

  let blogEntries: MetadataRoute.Sitemap = [];
  let diseaseEntries: MetadataRoute.Sitemap = [];

  try {
    await connectDB();

    // Fetch all published blogs dynamically
    const blogs = await Blog.find({}).select('slug updatedAt');
    blogEntries = blogs
      .filter((blog) => Boolean(blog?.slug && typeof blog.slug === 'string' && blog.slug.trim()))
      .map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug.trim()}`,
        lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

    // Fetch all diseases and conditions dynamically
    const diseases = await Disease.find({}).select('slug updatedAt');
    diseaseEntries = diseases
      .filter((disease) => Boolean(disease?.slug && typeof disease.slug === 'string' && disease.slug.trim()))
      .map((disease) => ({
        url: `${baseUrl}/disease/${disease.slug.trim()}`,
        lastModified: disease.updatedAt ? new Date(disease.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.error('Error generating dynamic entries for sitemap:', error);
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/blog',
    '/disease',
    '/contact',
    '/expert',
    '/locations',
    '/Our-services',
    '/become-a-member',
    '/sdc-league',
    '/careers',
    '/podcast',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...staticPages, ...blogEntries, ...diseaseEntries];
}
