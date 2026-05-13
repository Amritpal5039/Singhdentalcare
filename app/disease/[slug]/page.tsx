import connectDB from "@/app/lib/db";
import Disease from "@/app/lib/models/Disease";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Calendar, Clock } from "lucide-react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const disease = await Disease.findOne({ slug });

  if (!disease) {
    return {
      title: "Condition Not Found | Singh Dental Care",
    };
  }

  const title = `${disease.name} | Dental Conditions & Treatments | Singh Dental Care`;
  const description = disease.seoDescription || `Learn about ${disease.name}, its symptoms, causes, and professional dental treatment options available at Singh Dental Care.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://singhdentalcare.com/disease/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [disease.pictureLink],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [disease.pictureLink],
    },
  };
}

export async function generateStaticParams() {
  await connectDB();
  const diseases = await Disease.find({}).select("slug");
  return diseases.map((disease) => ({
    slug: disease.slug,
  }));
}

export default async function DiseasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const disease = await Disease.findOne({ slug });

  if (!disease) {
    notFound();
  }

  // Handle Tiptap JSON content or legacy string content
  let descriptionHtml = "";
  let isTiptap = false;

  if (typeof disease.description === 'object' && disease.description !== null) {
    try {
      descriptionHtml = generateHTML(disease.description, [
        StarterKit,
        ImageResize.configure({
          HTMLAttributes: {
            class: 'rounded-2xl max-w-full h-auto my-8 mx-auto block shadow-sm border border-[#d2d2d7]',
          },
        }),
      ]);
      isTiptap = true;
    } catch (e) {
      console.error("Error generating Tiptap HTML:", e);
    }
  }

  const lastUpdated = new Date(disease.updatedAt || disease.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero Section for Disease */}
      <section className="pt-[160px] pb-[80px] bg-[#f5f5f7]">
        <div className="apple-container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#86868b] mb-12 apple-body overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-[#0071e3] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/" className="hover:text-[#0071e3] transition-colors">Conditions</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1d1d1f] font-medium truncate">{disease.name}</span>
          </nav>
          
          <div className="max-w-[800px]">
            <p className="apple-eyebrow mb-4 text-[#86868b] uppercase tracking-widest">Disease & Condition Directory</p>
            <h1 className="apple-display mb-6 tracking-tight">{disease.name}</h1>
            <div className="flex items-center gap-4 text-[#86868b] text-sm apple-body">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-[120px]">
        <div className="apple-container">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Image Container - Floating style */}
            <div className="flex-1 w-full lg:sticky lg:top-[100px]">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-[#f5f5f7] shadow-sm">
                {disease.pictureLink ? (
                  <Image 
                    src={disease.pictureLink} 
                    alt={disease.coverImageAlt || disease.name} 
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                    🦷
                  </div>
                )}
              </div>
              {disease.coverImageAlt && (
                <p className="mt-4 text-center text-xs text-[#86868b] apple-body italic">
                  {disease.coverImageAlt}
                </p>
              )}
            </div>

            {/* Description Text */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="apple-title-lg mb-6 text-[#1d1d1f]">Understanding {disease.name}</h2>
                <div className="apple-body text-[#1d1d1f] leading-relaxed text-[19px]">
                  {isTiptap ? (
                    <div 
                      className="prose prose-gray max-w-none prose-p:leading-relaxed prose-p:mb-6 prose-headings:text-[#1d1d1f] prose-img:rounded-2xl"
                      dangerouslySetInnerHTML={{ __html: descriptionHtml }} 
                    />
                  ) : (
                    <div className="space-y-6">
                      {disease.description.split('\n').filter((p: any) => p.trim()).map((paragraph: any, i: number) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Professional CTA */}
              <div className="pt-10 border-t border-[#d2d2d7]">
                 <h3 className="apple-title-md mb-4">Seek Professional Advice</h3>
                 <p className="apple-body text-[#6e6e73] mb-8">
                   Our specialists at Singh Dental Care are equipped with advanced technology to diagnose and treat {disease.name.toLowerCase()} with precision.
                 </p>
                 <div className="flex flex-wrap gap-4">
                    <Link href="/contact" className="apple-btn-primary">
                      Consult an Expert
                    </Link>
                    <Link href="/locations" className="apple-btn-secondary">
                      Find a Clinic ›
                    </Link>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalCondition",
            "name": disease.name,
            "description": disease.seoDescription || disease.name,
            "associatedAnatomy": {
              "@type": "AnatomicalStructure",
              "name": "Teeth and Gums"
            },
            "lastReviewed": (disease.updatedAt || disease.createdAt).toISOString()
          })
        }}
      />

      {/* Divider */}
      <div className="apple-container">
        <div className="h-[1px] bg-[#d2d2d7]" />
      </div>

      {/* Footer Disclaimer */}
      <section className="py-12 bg-white">
        <div className="apple-container-narrow text-center">
          <p className="text-[13px] text-[#86868b] leading-relaxed">
            Disclaimer: The information provided above is for educational purposes only and should not be considered as medical advice. Please consult with a qualified dental professional for diagnosis and treatment options.
          </p>
        </div>
      </section>
    </main>
  );
}
