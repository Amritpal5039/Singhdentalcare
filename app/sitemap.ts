import { MetadataRoute } from 'next';
import connectDB from './lib/db';
import Blog from './lib/models/Blog';
import Disease from './lib/models/Disease';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const baseUrl = 'https://singhdentalcare.com';

  // Fetch all blogs
  const blogs = await Blog.find({}).select('slug updatedAt');
  const blogEntries = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch all diseases
  const diseases = await Disease.find({}).select('slug updatedAt');
  const diseaseEntries = diseases.map((disease) => ({
    url: `${baseUrl}/disease/${disease.slug}`,
    lastModified: disease.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/expert',
    '/locations',
    '/Our-services',
    '/become-a-member',
    '/sdc-league',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }));

  return [...staticPages, ...blogEntries, ...diseaseEntries];
}
