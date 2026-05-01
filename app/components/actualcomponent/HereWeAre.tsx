import ChatButton from "../ui/button";
export default function HereWeAre() {
  return (
    <div className="grid grid-cols-3 grid-rows-1 gap-8 mx-16 mt-15 mb-8">
      <div className="col-span-2 rounded-2xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d103303.53718947462!2d74.881587!3d31.65354!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39196388b63acbd1%3A0xb45a18f0ed83d067!2sSingh%20Dental%20Care!5e1!3m2!1sen!2sin!4v1777621153614!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="col-span-1">
        <h3 className="text-3xl heroDisplayL mb-4">
          Your Smile Journey Starts Here<span className="text-[#006A7F]">.</span>
        </h3>
        <ChatButton text="Get Directions" link="https://maps.app.goo.gl/JTmZ62QsTwWWFYYK9" />
      </div>
    </div>
  );
}