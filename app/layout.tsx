import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import localFont from 'next/font/local'


export const metadata: Metadata = {
  metadataBase: new URL("https://www.singhdentalcare.in"),
  title: "Singh Dental Care",
  description: "Your trusted best dentist near by you. We provide a wide range of dental services, from routine check-ups to advanced procedures, ensuring your smile stays healthy and beautiful.",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};
// Configure the local font
const sfPro = localFont({
  src: [
    {
      path: './fonts/SFPRODISPLAYREGULAR.woff2',
      weight: '400',
      style: 'normal',
      
    },
    {
      path: './fonts/SFPRODISPLAYMEDIUM.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SFPRODISPLAYBOLD.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SFPRODISPLAYSEMIBOLDITALIC.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-sfpro', // Optional: for use with Tailwind
  display: 'swap',
})
import Navbar from "./components/actualcomponent/Navbar";
import Footer from "./components/actualcomponent/Footer";
import AppointmentModal from "./components/actualcomponent/AppointmentModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`min-h-full flex flex-col overflow-x-hidden w-full ${sfPro.className}`}>
        <Navbar />
        {children}
        <Footer />
        <AppointmentModal />
        <Analytics />
      </body>
    </html>
  );
}
