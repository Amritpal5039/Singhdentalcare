import connectDB from "@/app/lib/db";
import Disease from "@/app/lib/models/Disease";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, Stethoscope } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dental Diseases & Oral Conditions Directory | Singh Dental Care Amritsar",
  description: "Browse our comprehensive A-Z dental disease directory. Understand symptoms, causes, and advanced treatments from specialist dentists at Singh Dental Care.",
  alternates: {
    canonical: "https://www.singhdentalcare.in/disease",
  },
  openGraph: {
    title: "Oral Health & Dental Conditions Directory | Singh Dental Care",
    description: "Expert dental condition directory, symptoms, and treatment guides by Singh Dental Care.",
    url: "https://www.singhdentalcare.in/disease",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Diseases & Oral Conditions Directory | Singh Dental Care",
    description: "Browse our comprehensive A-Z dental disease directory. Understand symptoms, causes, and advanced treatments.",
  },
};

const ALPHABET = [
  "ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "#"
];

async function getDiseases(search?: string, letter?: string, page: number = 1) {
  await connectDB();
  const limit = 12;
  const skip = (page - 1) * limit;

  let query: any = {};

  if (letter && letter !== "ALL") {
    if (letter === "#") {
      query.startsWithLetter = { $not: /^[A-Z]$/i };
    } else {
      query.startsWithLetter = letter.toUpperCase();
    }
  }

  if (search && search.trim()) {
    query.$or = [
      { name: { $regex: search.trim(), $options: "i" } },
      { seoDescription: { $regex: search.trim(), $options: "i" } },
    ];
  }

  const total = await Disease.countDocuments(query);
  const diseases = await Disease.find(query)
    .sort({ name: 1 })
    .skip(skip)
    .limit(limit)
    .select("name slug pictureLink coverImageAlt seoDescription startsWithLetter createdAt updatedAt");

  return {
    diseases: JSON.parse(JSON.stringify(diseases)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

export default async function DiseaseDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; letter?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const letter = resolvedParams.letter || "ALL";
  const page = parseInt(resolvedParams.page || "1", 10);

  const { diseases, pagination } = await getDiseases(search, letter, page);

  // Helper to build URL queries
  const buildQuery = (newLetter?: string, newPage?: number) => {
    const params = new URLSearchParams();
    const l = newLetter !== undefined ? newLetter : letter;
    if (l && l !== "ALL") params.set("letter", l);
    if (search) params.set("search", search);
    const p = newPage !== undefined ? newPage : page;
    if (p > 1) params.set("page", p.toString());
    const qs = params.toString();
    return qs ? `/disease?${qs}` : "/disease";
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-[140px] pb-[60px] bg-[#f5f5f7]">
        <div className="apple-container text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-[#86868b] mb-8 apple-body">
            <Link href="/" className="hover:text-[#0071e3] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1d1d1f] font-medium">Conditions Directory</span>
          </nav>

          <p className="apple-eyebrow mb-3 text-[#86868b] uppercase tracking-widest">
            A-Z Oral Health Guide
          </p>
          <h1 className="apple-display mb-6 tracking-tight">
            Dental Diseases & Conditions Directory
          </h1>
          <p className="apple-body text-[#86868b] max-w-2xl mx-auto mb-10 text-[18px]">
            Clinically verified information on oral symptoms, causes, prevention, and advanced treatment options at Singh Dental Care.
          </p>

          {/* Search Bar */}
          <form action="/disease" className="max-w-xl mx-auto relative group mb-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868b] group-focus-within:text-[#0071e3] transition-colors" />
            {letter && letter !== "ALL" && (
              <input type="hidden" name="letter" value={letter} />
            )}
            <input
              id="disease-search-input"
              aria-label="Search conditions"
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search conditions (e.g., Gingivitis, Cavities)..."
              className="w-full pl-16 pr-8 py-4 rounded-full bg-white border border-[#d2d2d7] outline-none focus:ring-4 focus:ring-[#0071e3]/10 focus:border-[#0071e3] transition-all apple-body text-[16px] shadow-sm"
            />
          </form>

          {/* Alphabet Index */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto pt-2">
            {ALPHABET.map((item) => {
              const isActive = letter === item;
              return (
                <Link
                  key={item}
                  href={buildQuery(item, 1)}
                  className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all ${
                    isActive
                      ? "bg-[#0071e3] text-white shadow-sm"
                      : "bg-white text-[#1d1d1f] border border-[#d2d2d7] hover:bg-[#f0f0f2]"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disease Grid Section */}
      <section className="py-[80px]">
        <div className="apple-container">
          {/* Active Filter Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e5e5ea]">
            <p className="text-sm text-[#86868b] font-medium">
              Showing {pagination.total} {pagination.total === 1 ? "condition" : "conditions"}
              {letter !== "ALL" ? ` under letter "${letter}"` : ""}
              {search ? ` matching "${search}"` : ""}
            </p>
            {(search || letter !== "ALL") && (
              <Link
                href="/disease"
                className="text-xs text-[#0071e3] hover:underline font-medium"
              >
                Clear all filters
              </Link>
            )}
          </div>

          {diseases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {diseases.map((item: any) => (
                <Link
                  key={item._id}
                  href={`/disease/${item.slug}`}
                  className="group flex flex-col bg-white rounded-[28px] overflow-hidden border border-[#d2d2d7] hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Condition Image */}
                  <div className="aspect-[16/10] relative overflow-hidden bg-[#f5f5f7]">
                    {item.pictureLink ? (
                      <Image
                        src={item.pictureLink}
                        alt={item.coverImageAlt || item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                        🦷
                      </div>
                    )}
                  </div>

                  {/* Condition Content */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-medium text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Medically Verified
                      </span>
                    </div>

                    <h2 className="apple-title-md !text-[21px] mb-3 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors line-clamp-2">
                      {item.name}
                    </h2>

                    <p className="apple-body text-[#86868b] text-[15px] line-clamp-3 mb-6 flex-1">
                      {item.seoDescription || `Learn about ${item.name}, clinical symptoms, causes, and expert dental treatments.`}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-[#f5f5f7]">
                      <span className="text-xs text-[#86868b] font-medium">Singh Dental Care</span>
                      <span className="text-[#0071e3] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        Explore condition ›
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#f5f5f7] rounded-[36px] border border-dashed border-[#d2d2d7]">
              <Stethoscope className="w-12 h-12 text-[#86868b] mx-auto mb-4 opacity-50" />
              <p className="apple-title-md text-[#86868b] mb-2">No conditions found</p>
              <p className="apple-body text-sm text-[#86868b] mb-6">
                Try searching for a different condition name or browsing all letters.
              </p>
              <Link
                href="/disease"
                className="inline-block px-6 py-2.5 rounded-full bg-[#0071e3] text-white text-sm font-medium hover:bg-[#005acc] transition-colors"
              >
                View all conditions
              </Link>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-16">
              <Link
                href={buildQuery(undefined, pagination.page - 1)}
                className={`px-6 py-2.5 rounded-full border border-[#d2d2d7] text-sm font-medium transition-all ${
                  pagination.page === 1
                    ? "pointer-events-none opacity-30"
                    : "hover:bg-[#f5f5f7]"
                }`}
              >
                Previous
              </Link>
              <span className="apple-body text-sm font-semibold">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Link
                href={buildQuery(undefined, pagination.page + 1)}
                className={`px-6 py-2.5 rounded-full border border-[#d2d2d7] text-sm font-medium transition-all ${
                  pagination.page === pagination.totalPages
                    ? "pointer-events-none opacity-30"
                    : "hover:bg-[#f5f5f7]"
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[100px] bg-[#000000] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0071e3] opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full" />
        <div className="apple-container relative z-10 text-center max-w-3xl mx-auto">
          <p className="apple-eyebrow mb-4 text-[#86868b] uppercase tracking-widest">Expert Dental Consultation</p>
          <h2 className="apple-display !text-white mb-6">Experiencing Oral Discomfort?</h2>
          <p className="apple-body !text-[#86868b] mb-10 text-[19px]">
            Schedule an appointment with our specialist dental surgeons for precise diagnostics and comfortable, gentle treatment.
          </p>
          <a
            href="tel:+919056190567"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-[17px] transition-all shadow-lg hover:shadow-[#0071e3]/20"
          >
            Call Us: +91 9056190567
          </a>
        </div>
      </section>

      {/* Structured Data: CollectionPage & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://www.singhdentalcare.in/disease#collection",
                "url": "https://www.singhdentalcare.in/disease",
                "name": "Oral Diseases & Dental Conditions Directory | Singh Dental Care",
                "description": "Comprehensive directory of oral diseases and dental conditions with clinical guidance from dentists at Singh Dental Care.",
                "inLanguage": "en-IN",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "Singh Dental Care",
                  "url": "https://www.singhdentalcare.in"
                },
                "breadcrumb": {
                  "@id": "https://www.singhdentalcare.in/disease#breadcrumb"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.singhdentalcare.in/disease#breadcrumb",
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
                  }
                ]
              },
              {
                "@type": "Dentist",
                "name": "Singh Dental Care",
                "url": "https://www.singhdentalcare.in",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
                },
                "telephone": "+91 9056190567"
              }
            ]
          }),
        }}
      />
    </main>
  );
}
