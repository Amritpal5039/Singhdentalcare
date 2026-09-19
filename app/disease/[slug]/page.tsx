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
import DiseaseCTA from "./_components/DiseaseCTA";

export const revalidate = 3600;
export const dynamicParams = true;

export function getDiseaseMetaDescription(disease: { name: string; seoDescription?: string; description?: any }): string {
  if (disease.seoDescription && disease.seoDescription.trim()) {
    const trimmed = disease.seoDescription.trim();
    return trimmed.length > 160 ? `${trimmed.slice(0, 157)}...` : trimmed;
  }

  // Fallback 1: Extract plain text from Tiptap JSON or string description
  if (typeof disease.description === "string" && disease.description.trim()) {
    const plain = disease.description.replace(/\s+/g, " ").trim();
    if (plain.length > 20) {
      return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
    }
  } else if (typeof disease.description === "object" && disease.description !== null) {
    try {
      const extractText = (node: any): string => {
        if (!node) return "";
        if (node.text) return node.text;
        if (Array.isArray(node.content)) {
          return node.content.map(extractText).join(" ");
        }
        return "";
      };
      const plain = extractText(disease.description).replace(/\s+/g, " ").trim();
      if (plain.length > 20) {
        return plain.length > 160 ? `${plain.slice(0, 157)}...` : plain;
      }
    } catch {
      // Fall through to template
    }
  }

  // Fallback 2: High-converting local dental intent template
  return `Learn about ${disease.name}: symptoms, causes, prevention, and professional dental treatment options available at Singh Dental Care in Amritsar.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const disease = await Disease.findOne({ slug });

  if (!disease) {
    return {
      title: "Condition Not Found | Singh Dental Care",
    };
  }

  const title = `${disease.name}: Symptoms, Causes & Treatments | Singh Dental Care`;
  const description = getDiseaseMetaDescription(disease);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.singhdentalcare.in/disease/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.singhdentalcare.in/disease/${slug}`,
      images: [disease.pictureLink],
      type: "article",
      publishedTime: (disease.createdAt || new Date()).toISOString(),
      modifiedTime: (disease.updatedAt || disease.createdAt || new Date()).toISOString(),
      authors: ["Dr. Bikramjeet Singh"],
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

  const metaDescription = getDiseaseMetaDescription(disease);

  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero Section for Disease */}
      <section className="pt-12 md:pt-20 pb-[80px] bg-[#f5f5f7]">
        <div className="apple-container">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-[#86868b] mb-12 apple-body overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-[#0071e3] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href="/disease" className="hover:text-[#0071e3] transition-colors">Conditions</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1d1d1f] font-medium truncate">{disease.name}</span>
          </nav>
          
          <div className="max-w-[800px]">
            <p className="apple-eyebrow mb-4 text-[#86868b] uppercase tracking-widest">Disease & Condition Directory</p>
            <h1 className="apple-display mb-6 tracking-tight">{disease.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[#86868b] text-sm apple-body">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Medically Verified</span>
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
                    priority
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

              {/* Medical Reviewer / Doctor Verification (E-E-A-T) */}
              <div className="mt-16 pt-10 border-t border-[#d2d2d7] space-y-6">
                <div className="bg-[#f5f5f7] p-8 md:p-10 rounded-[32px] md:rounded-[40px] flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 border border-[#e5e5ea]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0071e3] text-white flex items-center justify-center text-2xl md:text-3xl font-bold shrink-0">
                    D
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="apple-title-md !mb-0 font-semibold text-[#1d1d1f]">Dr. Bikramjeet Singh</h4>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3]">
                        BDS & Fellowship in Implantology
                      </span>
                    </div>
                    <p className="text-sm text-[#86868b] mb-2 font-medium">Chief Dental Surgeon & Implantologist • Singh Dental Care</p>
                    <p className="apple-body text-[#86868b] text-[15px] leading-relaxed">
                      This clinical condition overview has been authored and verified by dental specialists at Singh Dental Care to ensure evidence-based, safe, and accurate oral healthcare guidance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional CTA */}
              <DiseaseCTA diseaseName={disease.name} />
            </div>

          </div>
        </div>
      </section>

      {/* SEO Structured Data - Google Medical E-E-A-T Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "MedicalWebPage",
                "@id": `https://www.singhdentalcare.in/disease/${slug}#webpage`,
                "url": `https://www.singhdentalcare.in/disease/${slug}`,
                "name": `${disease.name}: Symptoms, Causes & Dental Treatments`,
                "description": metaDescription,
                "inLanguage": "en-IN",
                "datePublished": (disease.createdAt || new Date()).toISOString(),
                "dateModified": (disease.updatedAt || disease.createdAt || new Date()).toISOString(),
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://www.singhdentalcare.in/disease/${slug}`
                },
                "breadcrumb": {
                  "@id": `https://www.singhdentalcare.in/disease/${slug}#breadcrumb`
                },
                "about": {
                  "@id": `https://www.singhdentalcare.in/disease/${slug}#condition`
                },
                "author": {
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
                }
              },
              {
                "@type": "MedicalCondition",
                "@id": `https://www.singhdentalcare.in/disease/${slug}#condition`,
                "name": disease.name,
                "description": metaDescription,
                "image": [disease.pictureLink],
                "associatedAnatomy": {
                  "@type": "AnatomicalStructure",
                  "name": "Teeth and Gums"
                },
                "relevantSpecialty": {
                  "@type": "MedicalSpecialty",
                  "name": "Dentistry"
                },
                "possibleTreatment": [
                  {
                    "@type": "MedicalTherapy",
                    "name": "Clinical Dental Diagnosis and Treatment at Singh Dental Care"
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "@id": `https://www.singhdentalcare.in/disease/${slug}#breadcrumb`,
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.singhdentalcare.in"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Conditions",
                    "item": "https://www.singhdentalcare.in/disease"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": disease.name,
                    "item": `https://www.singhdentalcare.in/disease/${slug}`
                  }
                ]
              }
            ]
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
