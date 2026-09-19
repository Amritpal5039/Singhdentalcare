import connectDB from "@/app/lib/db";
import Blog from "@/app/lib/models/Blog";
import Doctor from "@/app/lib/models/Doctor";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar, ChevronRight } from "lucide-react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import { Metadata } from "next";

import ScheduleButton from "../_components/ScheduleButton";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return {
      title: "Blog Not Found | Singh Dental Care",
    };
  }

  const authorName = blog.author && blog.author !== "Singh Dental Care" ? blog.author : "Dr. Bikramjeet Singh";

  return {
    title: `${blog.title} | Singh Dental Care Blogs`,
    description: blog.excerpt,
    alternates: {
      canonical: `https://www.singhdentalcare.in/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://www.singhdentalcare.in/blog/${slug}`,
      images: [blog.coverImage],
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      modifiedTime: blog.updatedAt.toISOString(),
      authors: [authorName],
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

  // Doctor resolution for medical E-E-A-T
  let authorName = blog.author && blog.author !== "Singh Dental Care" ? blog.author : "Dr. Bikramjeet Singh";
  let authorJobTitle = blog.authorSpecialty || "Chief Dental Surgeon & Implantologist";
  let authorCredentials = blog.authorCredentials || "BDS & Fellowship in Implantology";

  if (blog.author && blog.author !== "Singh Dental Care" && (!blog.authorCredentials || !blog.authorSpecialty)) {
    try {
      const cleanAuthor = blog.author.replace(/^Dr\.?\s*/i, "").trim();
      const matchedDoctor = await Doctor.findOne({
        name: { $regex: new RegExp(cleanAuthor, "i") },
      }).lean();

      if (matchedDoctor) {
        authorName = matchedDoctor.name.startsWith("Dr") ? matchedDoctor.name : `Dr. ${matchedDoctor.name}`;
        if (!blog.authorSpecialty) authorJobTitle = matchedDoctor.specialty || authorJobTitle;
        if (!blog.authorCredentials) authorCredentials = matchedDoctor.credentials || authorCredentials;
      }
    } catch (e) {
      console.error("Error matching doctor for schema:", e);
    }
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
      <section className="pt-[160px] pb-[40px] bg-[#f5f5f7]">
        <div className="apple-container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#86868b] mb-12 apple-body overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-[#0071e3] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/blog" className="hover:text-[#0071e3] transition-colors">Journal</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1d1d1f] font-medium truncate">{blog.title}</span>
          </nav>
          
          <div className="max-w-[900px]">
            <h1 className="apple-display mb-8 tracking-tight !leading-[1.1]">{blog.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[#86868b] apple-body text-[16px]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Medically Verified</span>
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
            <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden mb-8 shadow-2xl shadow-black/5 bg-[#f5f5f7]">
              <Image 
                src={blog.coverImage} 
                alt={blog.coverImageAlt || blog.title} 
                fill 
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            {blog.coverImageAlt && (
              <p className="text-center text-sm text-[#86868b] apple-body italic mb-16">
                {blog.coverImageAlt}
              </p>
            )}

            {/* Rich Text Content */}
            <div 
              className="prose prose-lg prose-gray max-w-none prose-p:leading-relaxed prose-p:mb-8 prose-p:text-[20px] prose-p:text-[#1d1d1f] prose-headings:text-[#1d1d1f] prose-headings:tracking-tight prose-headings:font-semibold prose-img:rounded-3xl prose-blockquote:border-[#0071e3] prose-blockquote:bg-[#f5f5f7] prose-blockquote:p-8 prose-blockquote:rounded-2xl prose-blockquote:not-italic prose-blockquote:text-[22px] prose-strong:text-[#1d1d1f] prose-a:text-[#0071e3] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />

            {/* FAQ Accordion Section */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="mt-20 pt-12 border-t border-[#d2d2d7]">
                <h2 className="apple-title-lg mb-8 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {blog.faqs.map((faq: any, idx: number) => (
                    <details 
                      key={idx} 
                      className="group border-b border-[#d2d2d7] last:border-b-0 pb-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex justify-between items-center cursor-pointer list-none outline-none py-2 select-none">
                        <h3 className="apple-title-md !mb-0 !text-[20px] font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors pr-6">
                          {faq.question}
                        </h3>
                        <span className="w-6 h-6 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#86868b] group-hover:bg-[#0071e3] group-hover:text-white transition-all duration-300">
                          <svg 
                            className="w-4 h-4 transform transition-transform duration-300 group-open:rotate-180" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="mt-4 pl-1 pr-6 text-[#86868b] apple-body text-[17px] leading-relaxed max-w-3xl animate-in fade-in slide-in-from-top-2 duration-300">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Post Author / E-E-A-T Reviewer Footer */}
            <div className="mt-20 pt-12 border-t border-[#d2d2d7] space-y-6">
              <div className="bg-[#f5f5f7] p-8 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border border-[#e5e5ea]">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0071e3] text-white flex items-center justify-center text-2xl md:text-3xl font-bold shrink-0">
                  {authorName.replace(/^Dr\.?\s*/i, "").charAt(0) || "D"}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="apple-title-md !mb-0 font-semibold text-[#1d1d1f]">{authorName}</h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3]">
                      {authorCredentials}
                    </span>
                  </div>
                  <p className="text-sm text-[#86868b] mb-2 font-medium">{authorJobTitle} • Singh Dental Care</p>
                  <p className="apple-body text-[#86868b] text-[15px] leading-relaxed">
                    This article has been authored and clinically verified by licensed dental professionals at Singh Dental Care to ensure evidence-based, safe, and accurate oral healthcare guidance.
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
            "description": blog.excerpt,
            "image": [blog.coverImage],
            "datePublished": blog.createdAt.toISOString(),
            "dateModified": blog.updatedAt.toISOString(),
            "inLanguage": "en-IN",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.singhdentalcare.in/blog/${slug}`
            },
            "author": [{
              "@type": "Person",
              "name": authorName,
              "jobTitle": authorJobTitle,
              "url": "https://www.singhdentalcare.in/#dentist",
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "name": authorCredentials
              },
              "worksFor": {
                "@type": "Dentist",
                "name": "Singh Dental Care",
                "url": "https://www.singhdentalcare.in"
              }
            }],
            "reviewedBy": {
              "@type": "Person",
              "name": "Dr. Bikramjeet Singh",
              "jobTitle": "Chief Dental Surgeon & Implantologist",
              "url": "https://www.singhdentalcare.in/#dentist",
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "name": "BDS & Fellowship in Implantology"
              },
              "worksFor": {
                "@type": "Dentist",
                "name": "Singh Dental Care",
                "url": "https://www.singhdentalcare.in"
              }
            },
            "publisher": {
              "@type": "Dentist",
              "name": "Singh Dental Care",
              "url": "https://www.singhdentalcare.in",
              "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
              }
            },
            "about": {
              "@type": "MedicalSpecialty",
              "name": "Dentistry"
            }
          })
        }}
      />

      {/* FAQ Schema for AI SEO */}
      {blog.faqs && blog.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": blog.faqs.map((faq: any) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      )}
    </main>
  );
}
