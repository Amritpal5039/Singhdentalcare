import Image from "next/image";
import ChatButton from "../ui/button";
export default function ContactUs() {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-0 mx-16 mt-10 mb-8">
      <div className="col-span-1 flex flex-col">
        <h3 className="text-3xl heroDisplayL">
          Let’s Design Your Healthy Smile <br />
          <span className="italic text-[#006A7F] text-sm">
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
