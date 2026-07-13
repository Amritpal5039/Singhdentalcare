import type { Metadata } from "next";
import SharkTank from "./components/actualcomponent/SharkTank";
import About from "./components/actualcomponent/Aboutus";
import ContactUs from "./components/actualcomponent/Contact";
import HereWeAre from "./components/actualcomponent/HereWeAre";
import HeroSection from "./components/actualcomponent/HeroSection";
import MeetTheDentists from "./components/actualcomponent/MeetTheDentist";
import Search from "./components/actualcomponent/search";
import TestimonialSection from "./components/actualcomponent/TestimonialSection";
import OurTreatments from "./components/actualcomponent/OurTreatments";
import connectDB from "./lib/db";
import Doctor from "./lib/models/Doctor";
import HeroItem from "./lib/models/HeroItem";

export const metadata: Metadata = {
  title: "Singh Dental Care | Best Dentist in Amritsar, Punjab",
  description: "Singh Dental Care is the leading super-specialty dental clinic chain in Amritsar, Punjab. Best dentists for implants, aligners, root canals, and cosmetic dentistry. Book your appointment at our 100 Feet, Circular Road, or Khalsa College Road branches today.",
  keywords: [
    "Singh dental care near me",
    "singh dental care",
    "best dentist near me",
    "dentist near me",
    "best dentist in Amritsar",
    "Best dentist in Punjab",
    "professional dentist near by me",
    "dental clinic in Amritsar",
    "dental care Amritsar",
    "best dental clinic in Punjab"
  ],
  alternates: {
    canonical: "https://singhdentalcare.com",
  },
  openGraph: {
    title: "Singh Dental Care | Best Dentist in Amritsar, Punjab",
    description: "Singh Dental Care is the leading super-specialty dental clinic chain in Amritsar, Punjab. Find the best dentist near you for professional dental care.",
    url: "https://singhdentalcare.com",
    siteName: "Singh Dental Care",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://singhdentalcare.com/smile.png",
        width: 800,
        height: 600,
        alt: "Singh Dental Care Amritsar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Singh Dental Care | Best Dentist in Amritsar, Punjab",
    description: "Singh Dental Care is the leading super-specialty dental clinic chain in Amritsar, Punjab. Find the best dentist near you for professional dental care.",
    images: ["https://singhdentalcare.com/smile.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": "https://singhdentalcare.com/#dentist",
      "name": "Singh Dental Care",
      "alternateName": [
        "Singh dental care near me",
        "singh dental care",
        "best dentist near me",
        "dentist near me",
        "best dentist in Amritsar",
        "Best dentist in Punjab",
        "professional dentist near by me"
      ],
      "url": "https://singhdentalcare.com",
      "logo": "https://singhdentalcare.com/smile.png",
      "image": "https://singhdentalcare.com/smile.png",
      "description": "Amritsar's leading super-specialty dental chain, dedicated to providing world-class dental care by experienced specialists with complete transparency, honesty, and affordable pricing.",
      "telephone": "+91 9056190567",
      "priceRange": "$$",
      "knowsAbout": [
        "Dentistry",
        "Pediatric Dentistry",
        "Dental Implants",
        "Orthodontics",
        "Gum Treatments",
        "Root Canal Therapy",
        "Cosmetic Dentistry",
        "Oral & Maxillofacial surgery",
        "Prosthodontics"
      ],
      "sameAs": [
        "https://www.google.com/maps/place/Singh+Dental+Care/@31.6215178,74.8977264",
        "https://www.google.com/maps/place/Singh+Dental+Care/@31.6538864,74.8816863",
        "https://www.google.com/maps/place/Singh+Dental+Care/@31.6315675,74.8344733"
      ]
    },
    {
      "@type": "Dentist",
      "@id": "https://singhdentalcare.com/#100feet",
      "name": "Singh Dental Care - 100 Feet Road Branch",
      "parentOrganization": {
        "@type": "Dentist",
        "@id": "https://singhdentalcare.com/#dentist"
      },
      "url": "https://singhdentalcare.com/locations",
      "telephone": "+91 9056190567",
      "priceRange": "$$",
      "image": "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778238808/Untitled-1_sbf7hz.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "279, Main, 100 Feet Rd, East Mohan Nagar",
        "addressLocality": "Amritsar",
        "addressRegion": "Punjab",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.6215178,
        "longitude": 74.8977264
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://www.google.com/maps/place/Singh+Dental+Care/@31.6215178,74.8977264"
      ]
    },
    {
      "@type": "Dentist",
      "@id": "https://singhdentalcare.com/#circularroad",
      "name": "Singh Dental Care - Circular Road Branch",
      "parentOrganization": {
        "@type": "Dentist",
        "@id": "https://singhdentalcare.com/#dentist"
      },
      "url": "https://singhdentalcare.com/locations",
      "telephone": "+91 9056190567",
      "priceRange": "$$",
      "image": "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778239149/l2_jusdzp.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "5 AB, First floor, Circular Rd, Opposite print & gift gallery, near Gupta Hospital, Beauty Avenue",
        "addressLocality": "Amritsar",
        "addressRegion": "Punjab",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.6538864,
        "longitude": 74.8816863
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.google.com/maps/place/Singh+Dental+Care/@31.6538864,74.8816863"
      ]
    },
    {
      "@type": "Dentist",
      "@id": "https://singhdentalcare.com/#khalsacollege",
      "name": "Singh Dental Care - Khalsa College Road Branch",
      "parentOrganization": {
        "@type": "Dentist",
        "@id": "https://singhdentalcare.com/#dentist"
      },
      "url": "https://singhdentalcare.com/locations",
      "telephone": "+91 9056190567",
      "priceRange": "$$",
      "image": "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778239528/loc_3_lmsljy.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "48, Dasmesh Avenue Main GT Road, Khalsa College Rd, Opposite Gate no 2, adjoining Indian Oil Petrol Pump",
        "addressLocality": "Amritsar",
        "addressRegion": "Punjab",
        "postalCode": "143001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.6315675,
        "longitude": 74.8344733
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.google.com/maps/place/Singh+Dental+Care/@31.6315675,74.8344733"
      ]
    }
  ]
};

async function getHeroItems() {
  try {
    await connectDB();
    const heroItems = await HeroItem.find({ isActive: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(heroItems));
  } catch (e) {
    console.error("Error fetching hero items on server:", e);
    return [];
  }
}

async function getDoctors() {
  try {
    await connectDB();
    const doctors = await Doctor.find({}).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(doctors));
  } catch (e) {
    console.error("Error fetching doctors on server:", e);
    return [];
  }
}

export default async function Home() {
  const [initialDoctors, initialHeroItems] = await Promise.all([
    getDoctors(),
    getHeroItems(),
  ]);

  return (
    <div className="overflow-x-hidden">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <HeroSection initialHeroItems={initialHeroItems} />
      <Search/>
      <About />
      <OurTreatments />
      <MeetTheDentists initialDoctors={initialDoctors} />
      {/* <Midsec/> */}
      
      {/* <SharkTank /> */}
      <TestimonialSection />
      <ContactUs />
      <HereWeAre/>
    </div>
  );
}

