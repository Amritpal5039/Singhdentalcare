import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Blog from '@/app/lib/models/Blog';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://www.singhdentalcare.in';

  let itemsXml = '';

  try {
    await connectDB();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .select('title slug excerpt createdAt updatedAt author');

    itemsXml = blogs
      .filter((blog) => Boolean(blog?.slug && typeof blog.slug === 'string' && blog.slug.trim()))
      .map((blog) => {
        const pubDate = new Date(blog.createdAt || new Date()).toUTCString();
        const safeTitle = (blog.title || '').replace(/]]>/g, ']]&gt;');
        const safeExcerpt = (blog.excerpt || '').replace(/]]>/g, ']]&gt;');
        const safeAuthor = (blog.author || 'Dr. Bikramjeet Singh').replace(/]]>/g, ']]&gt;');

        return `
    <item>
      <title><![CDATA[${safeTitle}]]></title>
      <link>${baseUrl}/blog/${blog.slug.trim()}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${blog.slug.trim()}</guid>
      <description><![CDATA[${safeExcerpt}]]></description>
      <author><![CDATA[${safeAuthor}]]></author>
      <pubDate>${pubDate}</pubDate>
    </item>`;
      })
      .join('');
  } catch (error) {
    console.error('Error generating RSS feed:', error);
  }

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Singh Dental Care Journal</title>
    <link>${baseUrl}/blog</link>
    <description>Latest oral healthcare insights, clinical guidance, and dental care guides from Singh Dental Care.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
