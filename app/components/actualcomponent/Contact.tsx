import Image from "next/image";
import ChatButton from "../ui/button"; 
export default function ContactUs() {
  return (
    <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 sm:px-4 mt-20 mb-16">
      <div className="col-span-1 flex flex-col">
        <h3 className="text-2xl heroDisplayL">
          Let’s Design Your Healthy Smile <br />
          <span className="italic text-[#006A7F] text-xs">
            – Connect with Us
          </span>
        </h3>
        <div className="flex flex-col items-start mt-6 gap-2">
          <ChatButton text="Talk With Our Expert" link="/onboarding" />
          <ChatButton text="Whatsapp us" link="/onboarding" />
          <ChatButton text="Mail us" link="/onboarding" />
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
