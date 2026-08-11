import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dentist Job Openings in Amritsar | Singh Dental Care Careers",
  description: "Looking for a dentist job near by me? Singh Dental Care has the best dentist job opening in the Amritsar. Join our expert dental team today.",
  keywords: "dentist job near by me, dentist job opening in the amritsar, dental jobs Amritsar, dentist career, Singh Dental Care jobs, dental clinic jobs near me",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care Careers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
