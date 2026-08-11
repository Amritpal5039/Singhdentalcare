import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Experts | Singh Dental Care",
  description: "Meet our team of expert dentists at Singh Dental Care who are dedicated to ensuring your smile stays healthy and beautiful.",
  keywords: ["Singh Dental Care", "dentist", "dental experts", "specialist dentists", "orthodontist", "periodontist"],
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - Our Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};

import DoctorGrid from "../components/actualcomponent/DoctorGrid";

export default function ExpertPage() {
    return (
        <div>
            <DoctorGrid isHero={true} />
        </div>
    );
}