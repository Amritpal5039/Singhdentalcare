import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LocationsPage() {
  const branches = [
    {
      name: "100 Feet Branch",
      subtitle: "Our Flagship State-of-the-Art Center",
      address: "279, Main, 100 Feet Rd, East Mohan Nagar, Amritsar, Punjab",
      phone: "+91 9056190567",
      timing: "Mon-Sat: 10:00 AM - 8:00 PM",
      mapUrl: "https://maps.google.com/?q=Sector+11+Rohini+New+Delhi",
      guideUrl: "/locations/100feet/guide",
      images: [
        "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778238808/Untitled-1_sbf7hz.webp",
        "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778238808/loc_1.2_xooxsz.webp",
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      name: "Circular Road Branch",
      subtitle: "Modern Dental Care in the Heart of the City",
      address: "5 AB, First floor, Circular Rd, Opposite print & gift gallery, near Gupta Hospital, Beauty Avenue, Amritsar, Punjab",
      phone: "+91 9056190567",
      timing: "Mon-Sat: 10:00 AM - 7:00 PM",
      mapUrl: "https://maps.google.com/?q=Pitampura+New+Delhi",
      guideUrl: "/locations/CircularRoad/guide",
      images: [
        "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778239149/l2_jusdzp.webp",
        "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778239149/loc_2.2_wzwsgy.webp",
        "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=400&auto=format&fit=crop"
      ]
    },
    {
      name: "Khalsa College Road Branch",
      subtitle: "Personalized Care with Advanced Technology",
      address: "48, Dasmesh Avenue Main GT Road, Khalsa College Rd, Opposite Gate no 2, adjoining Indian Oil Petrol Pump, Amritsar, Punjab 143001",
      phone: "+91 9056190567",
      timing: "Mon-Sat: 10:00 AM - 7:00 PM",
      mapUrl: "https://maps.google.com/?q=Janakpuri+New+Delhi",
      guideUrl: "/locations/janakpuri/guide",
      images: [
        "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778239528/loc_3_lmsljy.webp",
        "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1778239408/loc_3.2-1_fp2rze.webp",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop"
      ]
    }
  ];

  return (
    <main className="bg-[#ffffff]">
      {/* Hero Section - Minimalist & Elegant */}
      <section className="pt-[140px] pb-[80px]">
        <div className="apple-container text-center">
          <p className="apple-eyebrow text-[#1d1d1f] font-semibold tracking-[0.1em] mb-4">Our Presence</p>
          <h1 className="apple-display mb-6 tracking-tight">
            Singh Dental Care's locations
          </h1>
          <p className="apple-subtitle max-w-[600px] mx-auto text-[#86868b]">
            Three world-class facilities. One standard of excellence.
          </p>
        </div>
      </section>

      {/* Locations List */}
      <section className="pb-[120px]">
        <div className="apple-container">
          <div className="flex flex-col gap-[100px]">
            {branches.map((branch, index) => (
              <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h2 className="apple-title-lg mb-2 text-[#1d1d1f]">{branch.name}</h2>
                    {/* <p className="text-[17px] text-[#1d1d1f] font-medium">{branch.subtitle}</p> */}
                  </div>
                  
                  <div className="space-y-4 text-[#1d1d1f] text-[15px] leading-relaxed">
                    <p className="flex items-start gap-3">
                      <span className="font-semibold min-w-[70px] text-[#86868b] uppercase text-[11px] tracking-wider mt-1">Address</span>
                      <span>{branch.address}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="font-semibold min-w-[70px] text-[#86868b] uppercase text-[11px] tracking-wider">Phone</span>
                      <span>{branch.phone}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="font-semibold min-w-[70px] text-[#86868b] uppercase text-[11px] tracking-wider">Hours</span>
                      <span>{branch.timing}</span>
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="apple-btn-primary !py-[10px] !px-[20px] !text-[14px]">
                      Contact Us
                    </a>
                    <Link href={branch.guideUrl} className="apple-btn-secondary !py-[10px] !px-[20px] !text-[14px]">
                      Patient & Visitor Guide
                    </Link>
                    <Link href={branch.mapUrl} target="_blank" className="text-[#0071e3] text-[15px] font-medium hover:underline">
                      Direction ›
                    </Link>
                  </div>
                </div>

                {/* Image Gallery - Smaller & Modular */}
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 grid-rows-2 gap-3 aspect-[4/3]">
                    <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden bg-gray-100 group">
                      <img 
                        src={branch.images[0]} 
                        alt={`${branch.name} interior 1`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-gray-100 group">
                      <img 
                        src={branch.images[1]} 
                        alt={`${branch.name} interior 2`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-gray-100 group">
                      <img 
                        src={branch.images[2]} 
                        alt={`${branch.name} interior 3`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Strip */}
      <section className="bg-[#f5f5f7] py-[100px]">
        <div className="apple-container text-center">
          <h2 className="apple-title-md mb-12 text-[#1d1d1f]">The standard across all locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-semibold mb-2 text-[#1d1d1f] uppercase text-[13px] tracking-widest">Advanced Labs</h3>
              <p className="text-[#6e6e73] text-sm">On-site diagnostics for immediate and accurate results.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[#1d1d1f] uppercase text-[13px] tracking-widest">Specialist Team</h3>
              <p className="text-[#6e6e73] text-sm">Every clinic is staffed by senior consultants and specialists.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-[#1d1d1f] uppercase text-[13px] tracking-widest">Sanitization</h3>
              <p className="text-[#6e6e73] text-sm">Hospital-grade sterilization protocols in every operatory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer CTA */}
      {/* <section className="py-[120px] text-center">
        <div className="apple-container-narrow">
          <h2 className="apple-title-lg mb-8">Ready to experience the best?</h2>
          <div className="flex justify-center gap-4">
            <a href="tel:+919876543210" className="apple-btn-primary">
              Contact Us
            </a>
            <Link href="/locations" className="apple-btn-secondary">
              Find a Location
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
