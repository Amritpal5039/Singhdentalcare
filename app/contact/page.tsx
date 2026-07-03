import ContactUs from "@/app/components/actualcomponent/Contact";
import HereWeAre from "@/app/components/actualcomponent/HereWeAre";

export const metadata = {
  title: "Contact Us - Singh Dental Care",
  description: "Get in touch with Singh Dental Care. Visit one of our three clinic locations in Amritsar or contact our expert team.",
};

export default function ContactPage() {
  return (
    <main className="pt-12 md:pt-20 bg-white">
      <ContactUs isHero={true} />
      <HereWeAre />
    </main>
  );
}
