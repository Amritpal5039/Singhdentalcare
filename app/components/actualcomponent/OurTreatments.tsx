import React from 'react';

interface TreatmentItem {
  title: string;
  description: string;
  imageUrl?: string;
  key: string;
}

export default function OurTreatments({ isHero = false }: { isHero?: boolean }) {
  const treatments: TreatmentItem[] = [
    {
      key: 'pediatric',
      title: "Pediatric Dentistry",
      description: "We make dental visits enjoyable and stress-free for children, helping them build healthy oral habits that last a lifetime.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884886/Pediatric_dentistry_rlksyo.png" // Insert image link later
    },
    {
      key: 'implants',
      title: "Dental Implants",
      description: "Restore your smile with natural-looking dental implants that bring back both function and beauty, ensuring long-lasting results.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884885/dental_implant_brpy2n.png" // Insert image link later
    },
    {
      key: 'orthodontics',
      title: "Orthodontics",
      description: "From traditional braces to modern clear aligners, our orthodontic treatments are tailored to straighten your teeth and boost your confidence.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884885/orthodontics_psipjn.png" // Insert image link later
    },
    {
      key: 'gum',
      title: "Gum Treatments",
      description: "Healthy gums are the foundation of a healthy smile. Our specialized periodontal care helps prevent, treat, and manage gum disease effectively.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884885/gum_treatment_hqkrpj.png" // Insert image link later
    },
    {
      key: 'root-canal',
      title: "Root Canal Therapy",
      description: "Relieve pain and save your natural tooth with our advanced root canal treatments, performed with precision and modern technology.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884886/Root_canal_f0dqrq.png" // Insert image link later
    },
    {
      key: 'cosmetic',
      title: "Cosmetic Dentistry",
      description: "Transform your smile with customized cosmetic solutions such as teeth whitening, veneers, and smile makeovers, designed to enhance your natural beauty.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884886/cosmatic_dentistry_lkwuku.png" // Insert image link later
    },
    {
      key: 'surgery',
      title: "Oral & Maxillofacial surgery",
      description: "From wisdom tooth extractions to corrective jaw surgery, our specialists provide expert surgical care for the mouth, jaw, and facial structures.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884886/oral_ijhsye.png" // Insert image link later
    },
    {
      key: 'prosthodontics',
      title: "Prosthodontics",
      description: "Enjoy a comfortable, natural-looking smile with custom-made dentures and prosthetic solutions that restore function and aesthetics.",
      imageUrl: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782884886/prosthodontics_m21bfj.png" // Insert image link later
    }
  ];

  // Render inline SVGs matching the icons in the reference image as default fallbacks
  const renderFallbackIcon = (key: string) => {
    const strokeColor = "#00B4D8";
    switch (key) {
      case 'pediatric':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M12 3c-2.8 0-4.5 1.5-4.8 4.2C7 9.5 7.5 11.5 8.5 13c.5.8.5 1.2.5 2 0 1.8-1.5 3-1.5 4.2 0 .5.3.8.8.8h2.2c1.2 0 2-1 2.5-2 .5 1 1.3 2 2.5 2h2.2c.5 0 .8-.3.8-.8 0-1.2-1.5-2.4-1.5-4.2 0-.8 0-1.2.5-2 1-1.5 1.5-3.5.3-5.8C16.5 4.5 14.8 3 12 3z" />
            <circle cx="10" cy="9.5" r="0.75" fill={strokeColor} />
            <circle cx="14" cy="9.5" r="0.75" fill={strokeColor} />
            <path d="M10.5 12.5c.5.8 1.5.8 2 0" />
          </svg>
        );
      case 'implants':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M12 3c-2.8 0-4.5 1.5-4.8 4.2c-.1 1-.1 2 .2 3 .5 1.8 1.6 2.8 2.6 2.8h4c1 0 2.1-1 2.6-2.8.3-1 .3-2 .2-3C16.5 4.5 14.8 3 12 3z" />
            <path d="M10 13h4v1.5h-4z" fill={strokeColor} fillOpacity="0.1" />
            <path d="M12 14.5v6.5" strokeWidth="2" />
            <path d="M10 16.5h4M9.5 18.5h5M11 20.5h2" />
          </svg>
        );
      case 'orthodontics':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M12 3c-2.8 0-4.5 1.5-4.8 4.2C7 9.5 7.5 11.5 8.5 13c.5.8.5 1.2.5 2 0 1.8-1.5 3-1.5 4.2 0 .5.3.8.8.8h2.2c1.2 0 2-1 2.5-2 .5 1 1.3 2 2.5 2h2.2c.5 0 .8-.3.8-.8 0-1.2-1.5-2.4-1.5-4.2 0-.8 0-1.2.5-2 1-1.5 1.5-3.5.3-5.8C16.5 4.5 14.8 3 12 3z" />
            <rect x="9.5" y="8.5" width="5" height="3.5" rx="1" fill={strokeColor} fillOpacity="0.1" />
            <path d="M9.5 10.2h5M12 8.5v3.5" />
            <path d="M5 10.2c3-.7 11-.7 14 0" strokeWidth="1" strokeDasharray="1 1" />
          </svg>
        );
      case 'gum':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M3 18c2-.8 3.5-.8 5 0s3 1.2 5 0 3-1.2 5 0 2 .8 3 0" />
            <path d="M12 5c-1.8 0-3 .8-3.2 2.2-.2 1.3.1 2.5.6 3.2.3.4.3.6.3 1 0 .9-.8 1.5-.8 2.1M12 5c1.8 0 3 .8 3.2 2.2.2 1.3-.1 2.5-.6 3.2-.3.4-.3.6-.3 1 0 .9.8 1.5.8 2.1" />
            <path d="M17 5.5l-2.5 4c-.6.6-1.2 1.5-.8 2.3M13.5 11.5l-1 1M14 10.5c.4.4.6 1 .4 1.5" />
          </svg>
        );
      case 'root-canal':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M12 3c-2.8 0-4.5 1.5-4.8 4.2C7 9.5 7.5 11.5 8.5 13c.5.8.5 1.2.5 2 0 1.8-1.5 3-1.5 4.2 0 .5.3.8.8.8h2.2c1.2 0 2-1 2.5-2 .5 1 1.3 2 2.5 2h2.2c.5 0 .8-.3.8-.8 0-1.2-1.5-2.4-1.5-4.2 0-.8 0-1.2.5-2 1-1.5 1.5-3.5.3-5.8C16.5 4.5 14.8 3 12 3z" />
            <path d="M12 7.5c.2 1 .4 2 0 3s-1 1.8-1 3.2v2.5M12 7.5c-.2 1-.4 2 0 3s1 1.8 1 3.2v2.5" strokeDasharray="1.5 1.5" />
            <circle cx="12" cy="7.5" r="1.2" fill={strokeColor} />
          </svg>
        );
      case 'cosmetic':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M12 3.5c-2.5 0-4 1.3-4.3 3.7-.1.9.1 1.8.8 2.6.4.5.4.8.4 1.3 0 1.2-.9 2.2-.9 3.2 0 .4.2.6.6.6h2c1 0 1.7-.8 2.1-1.6.4.8 1.1 1.6 2.1 1.6h2c.4 0 .6-.2.6-.6 0-1-.9-2-.9-3.2 0-.5 0-.8.4-1.3.7-.8.9-1.7.8-2.6C16 4.8 14.5 3.5 12 3.5z" />
            <path d="M6.5 5.5l.3.7.7.3-.7.3-.3.7-.3-.7-.7-.3.7-.3zM17.5 4.5l.2.5.5.2-.5.2-.2.5-.2-.5-.5-.2.5-.2z" fill={strokeColor} stroke="none" />
          </svg>
        );
      case 'surgery':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M5 11c.8-.8 2.2-1.5 4.5-1.5s3.7.7 4.5 1.5M5 13c.8 1.5 2.2 2.2 4.5 2.2s3.7-.7 4.5-2.2" />
            <path d="M12 19.5c3.5-1.5 5.5-5 5.5-8.5V6L12 4 6.5 6v5c0 3.5 2 7 5.5 8.5z" strokeDasharray="1.5 1.5" />
            <path d="M15 5.5l5.5-1.5-1.5 2L15.5 10" />
          </svg>
        );
      case 'prosthodontics':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#00B4D8]">
            <path d="M4 9c0-1.8.8-2.8 2.5-2.8s2.5.8 2.5 2.8v3.5c0 .8-.8 1.5-1.7 1.5H6.7c-1 0-1.7-.7-1.7-1.5V9z" />
            <path d="M9 9c0-1.8.8-2.8 1.8-2.8s1.8.8 1.8 2.8v2.8c0 .5-.5.9-1 .9H10c-.5 0-1-.4-1-.9V9z" fill={strokeColor} fillOpacity="0.1" />
            <path d="M12.6 9c0-1.8.8-2.8 2.5-2.8s2.5.8 2.5 2.8v3.5c0 .8-.8 1.5-1.7 1.5h-1.6c-1 0-1.7-.7-1.7-1.5V9z" />
            <path d="M5.5 8.5h11.5M10.8 6.2v1" strokeWidth="1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className={`bg-white px-4 sm:px-6 lg:px-8 ${isHero ? 'pt-12 md:pt-20 pb-20' : 'py-20'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className=" font-bold text-xs sm:text-sm tracking-[0.15em] uppercase mb-3">
            Our Treatments
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-800 tracking-tight mb-6">
            Our Dental Treatments & Specialities
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            At our clinic, we provide comprehensive dental care for all ages, ranging from routine check-ups to advanced cosmetic and restorative procedures. Our goal is to deliver personalized treatments that keep your teeth healthy and your smile confident.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mt-16 max-w-6xl mx-auto">
          {treatments.map((item) => (
            <div key={item.key} className="flex flex-col items-center text-center group">
              {/* Circular Icon / Image Container */}
              <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 bg-white shadow-[0_4px_20px_rgba(0,180,216,0.04)] group-hover:shadow-[0_4px_24px_rgba(0,180,216,0.12)]">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain p-3 rounded-full"
                  />
                ) : (
                  renderFallbackIcon(item.key)
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-[#00B4D8] transition-colors duration-200">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-[270px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}