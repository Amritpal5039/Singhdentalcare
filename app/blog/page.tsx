import connectDB from "@/app/lib/db";
import Blog from "@/app/lib/models/Blog";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Metadata } from "next";

import BlogCTA from "./_components/BlogCTA";

export const metadata: Metadata = {
  title: "Insights & Oral Health Blogs | Singh Dental Care",
  description: "Read the latest blogs on dental care, oral hygiene tips, and advanced treatments from the experts at Singh Dental Care.",
  openGraph: {
    title: "Singh Dental Care Blogs",
    description: "Expert dental advice and oral health insights.",
    type: "website",
  },
};

async function getBlogs(search?: string, page: number = 1) {
  await connectDB();
  const limit = 9;
  const skip = (page - 1) * limit;

  let query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { excerpt: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } }
    ];
  }

  const total = await Blog.countDocuments(query);
  const blogs = await Blog.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .select("title slug excerpt coverImage author createdAt");

  return {
    blogs: JSON.parse(JSON.stringify(blogs)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) {
  const query = (await searchParams).search || "";
  const page = parseInt((await searchParams).page || "1");
  const { blogs, pagination } = await getBlogs(query, page);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-[100px] pb-[60px] bg-[#f5f5f7]">
        <div className="apple-container text-center">
          <p className="apple-eyebrow mb-4 text-[#86868b] uppercase tracking-widest">Singh Dental Care Journal</p>
          <h1 className="apple-display mb-8 tracking-tight">Insights for a healthier smile.</h1>
          
          {/* Search Bar */}
          <form action="/blog" className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b] group-focus-within:text-[#0071e3] transition-colors" />
            <input 
              type="text" 
              name="search" 
              defaultValue={query}
              placeholder="Search for topics, treatments, or tips..." 
              className="w-full pl-16 pr-8 py-5 rounded-full bg-white border border-[#d2d2d7] outline-none focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3] transition-all apple-body text-[17px] shadow-sm"
            />
          </form>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-[100px]">
        <div className="apple-container">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((post: any) => (
                <Link 
                  key={post._id} 
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-[#d2d2d7] hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#f5f5f7]">
                    <Image 
                      src={post.coverImage} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#f5f5f7] rounded-full text-[12px] font-semibold text-[#86868b] uppercase tracking-wider">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="apple-title-md !text-[24px] mb-4 group-hover:text-[#0071e3] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="apple-body text-[#86868b] text-[16px] line-clamp-3 mb-8 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-[#f5f5f7]">
                      <span className="text-[14px] font-medium text-[#1d1d1f]">By {post.author}</span>
                      <span className="text-[#0071e3] font-semibold text-[15px] group-hover:translate-x-1 transition-transform">Read more ›</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#f5f5f7] rounded-[40px] border border-dashed border-[#d2d2d7]">
              <p className="apple-title-md text-[#86868b]">No articles found for "{query}"</p>
              <Link href="/blog" className="text-[#0071e3] font-medium hover:underline mt-4 inline-block">View all articles ›</Link>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-20">
              <Link 
                href={`/blog?page=${pagination.page - 1}${query ? `&search=${query}` : ''}`}
                className={`px-8 py-3 rounded-full border border-[#d2d2d7] font-medium transition-all ${pagination.page === 1 ? 'pointer-events-none opacity-30' : 'hover:bg-[#f5f5f7]'}`}
              >
                Previous
              </Link>
              <span className="apple-body font-semibold">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Link 
                href={`/blog?page=${pagination.page + 1}${query ? `&search=${query}` : ''}`}
                className={`px-8 py-3 rounded-full border border-[#d2d2d7] font-medium transition-all ${pagination.page === pagination.totalPages ? 'pointer-events-none opacity-30' : 'hover:bg-[#f5f5f7]'}`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] bg-[#000000] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0071e3] opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="apple-container relative z-10 text-center">
          <h2 className="apple-display !text-white mb-6">Ready for a brighter smile?</h2>
          <p className="apple-body !text-[#86868b] max-w-2xl mx-auto mb-12 text-[21px]">
            Whether it's a routine checkup or a complete smile makeover, our experts are here to help.
          </p>
          <BlogCTA />
        </div>
      </section>
    </main>
  );
}
