import Image from "next/image";

export default function Aboutus() {
  const features = [
    {
      label: "Clinical Excellence",
      desc: "Our specialists bring over 12 years of expertise in advanced dental procedures and patient care."
    },
    {
      label: "Advanced Technology",
      desc: "Utilizing the latest digital diagnostics and pain-free treatment methods for precision results."
    },
    {
      label: "Patient Comfort",
      desc: "A thoughtfully designed environment focused on making your dental journey peaceful and stress-free."
    }
  ];

  return (
    <section className="apple-section bg-white">
      <div className="apple-container-narrow">
        <h2 className="apple-title-xl text-center mb-6">
          Why Singh Dental Care.
        </h2>
        <p className="apple-subtitle text-center mb-12">
          Our team of experienced doctors utilise advanced methods and the latest equipment to deliver personalized care that keeps your smile healthy and strong.
        </p>
      </div>
      
      <div className="apple-container-wide mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Section */}
          <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-[#f5f5f7]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/AWGwDr80MpE?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Group Photo Section */}
          <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-[#f5f5f7] relative">
            <Image 
              src="https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778407682/chnage_the_background_to_this_202605101535_v6v5fd.webp" 
              alt="Singh Dental Care Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Trust Grid / Feature Grid */}
      <div className="apple-container mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="bg-[#f5f5f7] p-10 rounded-[28px] flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            >
              <h3 className="apple-title-md mb-4">
                {feature.label}
              </h3>
              <p className="apple-body !text-[#6e6e73]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
