"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Doctor {
  _id: string;
  name: string;
  credentials: string;
  specialty: string;
  experience: string;
  image: string;
  order: number;
}

interface DoctorGridProps {
  initialDoctors?: Doctor[];
  isHero?: boolean;
}

export default function DoctorGrid({ initialDoctors, isHero = false }: DoctorGridProps) {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors || []);
  const [isLoading, setIsLoading] = useState(!initialDoctors);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialDoctors && initialDoctors.length > 0) {
      setDoctors(initialDoctors);
      setIsLoading(false);
      return;
    }

    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        if (res.ok && data.doctors) {
          setDoctors(data.doctors);
        }
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, [initialDoctors]);

  if (isLoading) {
    return (
      <section className={`apple-section bg-white !pb-24 ${isHero ? '!pt-12 md:!pt-20' : '!pt-16'}`}>
        <div className="apple-container">
          {/* Header section (rendered while loading for layout context) */}
          <div className="mb-16 text-center">
            <div className="h-4 w-24 bg-[#e8e8ed] rounded-full mx-auto animate-pulse mb-3" />
            <div className="h-10 w-64 bg-[#e8e8ed] rounded-md mx-auto animate-pulse mb-4" />
            <div className="h-6 w-96 bg-[#e8e8ed] rounded-md mx-auto animate-pulse" />
          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="flex flex-col bg-[#f5f5f7] rounded-[24px] overflow-hidden border border-transparent animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="relative aspect-[4/5] w-full bg-[#e8e8ed]" />

                {/* Info Container Skeleton */}
                <div className="flex flex-col p-6 space-y-3">
                  <div className="h-5 w-24 bg-[#e8e8ed] rounded-full" />
                  <div className="h-6 w-3/4 bg-[#e8e8ed] rounded-md" />
                  <div className="h-4 w-1/2 bg-[#e8e8ed] rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="py-24 text-center bg-white">
        <p className="apple-body text-[#6e6e73]">No experts found at the moment.</p>
      </div>
    );
  }

  return (
    <section className={`apple-section bg-white !pb-24 ${isHero ? '!pt-12 md:!pt-20' : '!pt-16'}`}>
      <div className="apple-container">
        {/* Header section */}
        <div className="mb-16 text-center">
          <p className="apple-eyebrow text-[#006A7F] font-semibold tracking-wider">Our Team</p>
          <h1 className="apple-title-xl mt-2 text-[#1d1d1f]">Meet Our Experts</h1>
          <p className="apple-subtitle mt-3 max-w-xl mx-auto text-[#6e6e73]">
            Dedicated professionals committed to providing you with the highest standard of dental care.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group relative flex flex-col bg-[#f5f5f7] rounded-[24px] overflow-hidden transition-all duration-300 hover:scale-[1.01] border border-transparent hover:border-[#d2d2d7]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e8e8ed]">
                {imgErrors[doctor._id] ? (
                  <div className="w-full h-full flex items-end justify-center bg-[#e8e8ed]">
                    <svg viewBox="0 0 100 120" className="w-1/3 opacity-30 fill-[#86868b] mb-6" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="50" cy="38" rx="22" ry="24" />
                      <path d="M10 120 C10 78 90 78 90 120Z" />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103 select-none"
                    draggable={false}
                    onError={() => setImgErrors((prev) => ({ ...prev, [doctor._id]: true }))}
                  />
                )}
              </div>

              {/* Info Container */}
              <div className="flex flex-col p-6">
                <div className="mb-2">
                  <span className="text-[11px] font-semibold tracking-wider text-[#006A7F] uppercase bg-[#006A7F]/10 px-2.5 py-1 rounded-full">
                    {doctor.specialty}
                  </span>
                </div>

                <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight mt-1 leading-tight">
                  {doctor.name}
                </h3>

                <p className="text-[13px] text-[#6e6e73] font-medium mt-0.5">
                  {doctor.credentials}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
