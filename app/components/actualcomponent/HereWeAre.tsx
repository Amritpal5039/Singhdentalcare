import ChatButton from "../ui/button";
export default function HereWeAre() {
  return (
    <section className="apple-section bg-white">
      <div className="apple-container">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full rounded-[24px] overflow-hidden shadow-2xl h-[300px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d103303.53718947462!2d74.881587!3d31.65354!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39196388b63acbd1%3A0xb45a18f0ed83d067!2sSingh%20Dental%20Care!5e1!3m2!1sen!2sin!4v1777621153614!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="apple-eyebrow mb-4">Visit Us.</p>
            <h3 className="apple-title-lg mb-6">
              Your Smile Journey Starts Here.
            </h3>
            <p className="apple-body mb-8 text-[#6e6e73]">
              Experience world-class dental care at our flagship clinic. We are conveniently located and ready to welcome you.
            </p>
            <a 
              href="https://maps.app.goo.gl/JTmZ62QsTwWWFYYK9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="apple-btn-primary"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}