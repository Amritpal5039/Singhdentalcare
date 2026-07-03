import Image from "next/image";

export default function Aboutus() {
  return (
    <section className="apple-section !pb-8 bg-white">
      <div className="apple-container-narrow">
        <h2 className="text-3xl md:text-[40px] lg:text-[48px] font-semibold tracking-[-0.015em] lg:tracking-[-0.02em] text-[#1d1d1f] leading-[1.10] text-center mb-6">
          Why Singh Dental Care.
        </h2>
        <p className="text-[19px] md:text-[21px] font-normal text-[#6e6e73] leading-[1.35] text-center mb-12">
          Amritsar's leading super-specialty dental chain, dedicated to providing world-class dental care by experienced specialists with complete transparency, honesty, and affordable pricing.
        </p>
      </div>
      
      <div className="apple-container-wide mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Section */}
          <div>
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
            <p className="apple-body text-center mt-6 font-medium text-[#1d1d1f]">
              <span className="font-bold">Calm & Premium:</span>
              Where healing begins before the chair.
            </p>
          </div>

          {/* Group Photo Section */}
          <div>
            <div className="aspect-video w-full rounded-[32px] overflow-hidden bg-[#f5f5f7] relative">
              <Image 
                src="https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782998044/PHOTO_POHOTS_png_yd2btc.webp"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Singh Dental Care Team: Experts in 8 Specialities"
              />
            </div>
            <p className="apple-body text-center mt-6 font-medium text-[#1d1d1f]">
              <span className="font-bold">8 Specialities, 8 Experts:</span> Every treatment is handled by a dedicated specialist, ensuring precision and excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Shark Tank Featured Section */}
      <div className="apple-container-wide mt-16 lg:mt-24">
        <div className="bg-[#f5f5f7] rounded-[32px] p-8 md:p-12 lg:p-16 transition-all duration-500 hover:shadow-xl hover:shadow-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-[#e8e8ed] relative group">
                <Image
                  src="https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782990485/a2_mx28go.webp"
                  alt="Dr. Bikram’s Vision: Singh Dental on Shark Tank India"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl lg:text-[36px] font-semibold tracking-tight text-[#1d1d1f] leading-[1.15] mb-6">
                Dr. Bikram’s Vision: Singh Dental on Shark Tank India
              </h3>
              <p className="text-[17px] md:text-[19px] font-normal text-[#6e6e73] leading-[1.5]">
                Dr. Bikram, a passionate dentist and visionary entrepreneur, took Singh Dental Care to Shark Tank India with an ambitious goal—establishing 100 clinics in the next 5 years. His mission is to provide world-class dental treatment at affordable costs, offering multi-specialty care under one roof. With this vision, Singh Dental Care is set to transform oral healthcare accessibility across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
