import Image from "next/image";
import ChatButton from "../ui/button"; 
export default function ContactUs({ isHero = false }: { isHero?: boolean }) {
  return (
    <div className={`max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 sm:px-4 mb-16 ${isHero ? 'mt-0' : 'mt-20'}`}>
      <div className="col-span-1 flex flex-col">
        <h3 className="text-2xl heroDisplayL">
          Let’s Design Your Healthy Smile <br />
          <span className="italic text-[#006A7F] text-xs">
            – Connect with Us
          </span>
        </h3>
        <div className="flex flex-col items-start mt-6 gap-2">
          <ChatButton text="Talk With Our Expert" link="tel:+919056190567" />
          <ChatButton text="Whatsapp us" link="https://wa.me/919056190567??text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." />
          <ChatButton text="Mail us" link="mailto:it@singhdentalcare.in" />
        </div>
      </div>
      <div className="col-span-2">
        <Image
          src={
            "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777615348/bg_removed_kn0ffu.webp"
          }
          alt="dental lab image"
          width={800}
          height={900}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
