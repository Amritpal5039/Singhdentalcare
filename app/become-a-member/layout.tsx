import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Member | Singh Dental Care",
  description: "Join the Singh Dental Care membership program for exclusive benefits, discounted treatments, and priority appointments.",
  keywords: ["Singh Dental Care", "dentist", "dental membership", "dental plan", "dental care benefits", "discounted dental care"],
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - Become a Member",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}