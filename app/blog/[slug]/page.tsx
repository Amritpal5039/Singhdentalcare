import connectDB from "@/app/lib/db";
import Blog from "@/app/lib/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import { Metadata } from "next";

import ScheduleButton from "../_components/ScheduleButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return {
      title: "Blog Not Found | Singh Dental Care",
    };
  }

  return {
    title: `${blog.title} | Singh Dental Care Blogs`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export async function generateStaticParams() {
  await connectDB();
  const blogs = await Blog.find({}).select("slug");
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    notFound();
  }

  let contentHtml = "";
  try {
    contentHtml = generateHTML(blog.content, [
      StarterKit,
      ImageResize.configure({
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full h-auto my-8 mx-auto block shadow-sm border border-[#d2d2d7]',
        },
      }),
    ]);
  } catch (e) {
    console.error("Error generating Tiptap HTML:", e);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Blog Hero Section */}
      <section className="pt-[100px] pb-[40px] bg-[#f5f5f7]">
        <div className="apple-container">
          <Link 
            href="/blog"
            className="inline-flex items-center text-[#0071e3] hover:underline mb-10 font-medium apple-body"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Link>
          
          <div className="max-w-[900px]">
            <h1 className="apple-display mb-8 tracking-tight !leading-[1.1]">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[#86868b] apple-body text-[16px]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    {blog.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 bg-white rounded border border-[#d2d2d7] text-[12px] font-semibold text-[#1d1d1f]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-[80px]">
        <div className="apple-container">
          <div className="max-w-[800px] mx-auto">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden mb-16 shadow-2xl shadow-black/5 bg-[#f5f5f7]">
              <Image 
                src={blog.coverImage} 
                alt={blog.title} 
                fill 
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Rich Text Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none prose-p:leading-relaxed prose-p:mb-8 prose-p:text-[20px] prose-p:text-[#1d1d1f] prose-headings:text-[#1d1d1f] prose-headings:tracking-tight prose-headings:font-semibold prose-img:rounded-3xl prose-blockquote:border-[#0071e3] prose-blockquote:bg-[#f5f5f7] prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:text-[22px] prose-strong:text-[#1d1d1f] prose-a:text-[#0071e3] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />

            {/* Post Footer */}
            <div className="mt-20 pt-12 border-t border-[#d2d2d7]">
              <div className="bg-[#f5f5f7] p-10 rounded-[40px] flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-full bg-[#0071e3] text-white flex items-center justify-center text-3xl font-bold shrink-0">
                  S
                </div>
                <div>
                  <h4 className="apple-title-md !mb-2">About Singh Dental Care</h4>
                  <p className="apple-body text-[#86868b]">
                    Singh Dental Care is a premier dental clinic dedicated to providing world-class oral healthcare with a focus on patient comfort and advanced technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Related CTA */}
            <div className="mt-16 text-center">
               <h3 className="apple-title-lg mb-6">Inspired to improve your smile?</h3>
               <ScheduleButton />
            </div>
          </div>
        </div>
      </article>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "image": [blog.coverImage],
            "datePublished": blog.createdAt.toISOString(),
            "dateModified": blog.updatedAt.toISOString(),
            "author": [{
              "@type": "Organization",
              "name": "Singh Dental Care",
              "url": "https://singhdentalcare.com"
            }]
          })
        }}
      />
    </main>
  );
}
