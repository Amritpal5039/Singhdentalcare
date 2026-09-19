import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Singh Dental Care",
  description: "Explore the wide range of dental services provided by Singh Dental Care including routine check-ups, cosmetic dentistry, and advanced procedures.",
  keywords: ["Singh Dental Care", "dentist", "dental services", "teeth whitening", "cosmetic dentistry", "orthodontics", "dental implants"],
  alternates: {
    canonical: "https://www.singhdentalcare.in/Our-services",
  },
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - Our Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};

import OurTreatments from "../components/actualcomponent/OurTreatments";

export default function ServicesPage() {
    return (
        <div>
            <OurTreatments isHero={true}/> 
        </div>
    );
}