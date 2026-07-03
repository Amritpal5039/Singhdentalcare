import Image from "next/image";
import Aboutus from "../components/actualcomponent/Aboutus";
import MeetTheDentists from "../components/actualcomponent/MeetTheDentist";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="apple-section pt-12 md:pt-20 pb-20">
        <div className="apple-container-narrow text-center">
          <p className="apple-eyebrow mb-4">About Singh Dental Care</p>
          <h1 className="apple-hero-title mb-6">
            Spreading Smiles.
          </h1>
          <p className="apple-subtitle text-[#6e6e73] max-w-2xl mx-auto">
            At Singh Dental Care, dentistry goes beyond treatment—it’s about care, comfort, and confidence.
          </p>
        </div>
      </section>

      {/* Dr. Bikram Section */}
      <section className="apple-section py-24 bg-white">
        <div className="apple-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-[3/4] rounded-[32px] overflow-hidden bg-[#f5f5f7]">
               {/* Placeholder for Dr. Bikram's portrait - using the same team image for now as a fallback or a specific one if found */}
              <Image 
                src="https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778328324/su6evjehufcgpyhlxv29.webp" 
                alt="Dr. Bikram"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="apple-eyebrow mb-2">The Magician Behind Smiles</p>
              <h2 className="apple-title-xl mb-6">Meet Dr. Bikram.</h2>
              <p className="apple-body mb-6 text-[#1d1d1f]">
                Dr. Bikram is a highly respected dentist with years of experience in cosmetic, restorative, and advanced dental procedures. Known for his clinical expertise and patient-first approach, he leads Singh Dental Care with a vision of excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2" />
                  <p className="apple-body !text-[15px]">Expert in Advanced Restorative Procedures</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2" />
                  <p className="apple-body !text-[15px]">Specialized in Smile Makeovers & Cosmetic Dentistry</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3] mt-2" />
                  <p className="apple-body !text-[15px]">Committed to Pain-Free Patient Experiences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="apple-section-surface py-24">
        <div className="apple-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="apple-title-xl mb-6">Our Philosophy.</h2>
              <div className="space-y-6">
                <p className="apple-body text-[#1d1d1f]">
                  We believe that every smile is unique. Our mission is to provide personalized treatments that help every smile become confident and unforgettable.
                </p>
                <p className="apple-body text-[#6e6e73]">
                  Dr. Bikram’s dedication to staying updated with global advancements in dentistry ensures that our patients always receive the highest quality of care. Whether it’s a simple check-up or a complete smile makeover, we make every visit comfortable.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-[#f5f5f7]">
              <Image 
                src="https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782998044/PHOTO_POHOTS_png_yd2btc.webp"
                fill
                className="object-cover"
                alt="Singh Dental Care Team: Experts in 8 Specialities"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business Model / Audit Checklist Infographic */}
      <section className="apple-section py-8 bg-white">
        <div className="apple-container-wide">
          <div className="relative aspect-[1920/650] w-full rounded-[32px] overflow-hidden bg-none">
            <Image 
              src="https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778421077/Modern-Business-Audit-Checklist-Infographic-Presentation-1920-x-650-px-3-1_dl5ny0.webp" 
              alt="Singh Dental Care Business Audit Checklist"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features & Video Section (Reusing Aboutus) */}
      {/* <Aboutus /> */}

      {/* The Team Section */}
      <MeetTheDentists />

    </main>
  );
}
