import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


export const metadata: Metadata = {
  title: "Singh Dental Care",
  description: "Singh dental care",
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
      </body>
    </html>
  );
}
