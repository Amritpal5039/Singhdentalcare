import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Singh Dental Care",
  description: "Listen to the Singh Dental Care podcast for tips on oral hygiene, dental health news, and interviews with our experts.",
  keywords: ["Singh Dental Care", "dentist", "dental podcast", "oral health tips", "dentistry news", "dental care audio"],
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - Podcast",
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