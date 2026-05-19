"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Dentist {
  _id: string;
  name: string;
  credentials: string;
  specialty: string;
  experience: string;
  image: string;
  order: number;
}

interface MeetTheDentistsProps {
  initialDoctors?: Dentist[];
}

function DentistPlaceholder({ active }: { active: boolean }) {
  return (
    <div
      className="w-full h-full flex items-end justify-center"
      style={{ background: active ? "#e2e8f0" : "#d2d2d7", transition: "background 400ms ease" }}
    >
      <svg viewBox="0 0 100 120" width="68" fill={active ? "#94a3b8" : "#aeaeb2"} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="38" rx="22" ry="24" />
        <path d="M10 120 C10 78 90 78 90 120Z" />
      </svg>
    </div>
  );
}

export default function MeetTheDentists({ initialDoctors }: MeetTheDentistsProps) {
  const [dentists, setDentists] = useState<Dentist[]>(initialDoctors || []);
  const [isLoading, setIsLoading] = useState(!initialDoctors);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInternalScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initialDoctors && initialDoctors.length > 0) {
      setDentists(initialDoctors);
      setIsLoading(false);
      return;
    }

    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        if (res.ok) {
          setDentists(data.doctors);
        }
      } catch (err) {
        console.error("Failed to fetch doctors");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, [initialDoctors]);

  const snapToNearestCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container || dentists.length === 0 || isInternalScroll.current) return;
    
    const inactiveWidth = 180;
    const gap = 12;
    const scrollPos = container.scrollLeft;
    const closest = Math.round(scrollPos / (inactiveWidth + gap));
    const newIndex = Math.max(0, Math.min(closest, dentists.length - 1));
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [dentists.length, activeIndex]);

  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    
    isInternalScroll.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const inactiveWidth = 180;
    const gap = 12;
    const targetScrollLeft = index * (inactiveWidth + gap);

    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    
    // Lock snapping for enough time to complete the smooth scroll
    scrollTimeout.current = setTimeout(() => {
      isInternalScroll.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const onScroll = () => {
      if (isInternalScroll.current) return;
      
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(snapToNearestCard, 150);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      container.removeEventListener("scroll", onScroll);
    };
  }, [snapToNearestCard]);

  const navigate = (dir: "prev" | "next") => {
    const next = dir === "next"
      ? Math.min(activeIndex + 1, dentists.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    if (next !== activeIndex) {
      setActiveIndex(next);
      scrollToCard(next);
    }
  };

  const selectCard = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      scrollToCard(index);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#006A7F]" />
      </div>
    );
  }

  if (dentists.length === 0) return null;

  const active = dentists[activeIndex];

  return (
    <>
      <style>{`
        .dc-card { transition: width 400ms cubic-bezier(0.28, 0.11, 0.32, 1), height 400ms cubic-bezier(0.28, 0.11, 0.32, 1), border-color 300ms ease; will-change: width, height; }
        .dc-img { transition: filter 400ms ease, transform 500ms ease; will-change: transform, filter; }
        .dc-card:not([data-active="true"]):hover .dc-img { transform: scale(1.03); }
        .dc-label { transition: opacity 300ms ease, transform 300ms ease; }
        .dc-track { scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; scroll-snap-type: none; padding: 0; scroll-padding: 0; }
        .dc-track::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .dc-track { padding: 0 calc(50% - 130px); }
        }
        .dc-info { transition: opacity 200ms ease; }
      `}</style>

      <section className="apple-section !pt-12 !pb-12 bg-white overflow-hidden">
        <div className="apple-container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="apple-title-lg">Meet The Dentists</h2>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => navigate("prev")} disabled={activeIndex === 0} className="w-9 h-9 rounded-full border border-[#d2d2d7] flex items-center justify-center hover:bg-[#f5f5f7] disabled:opacity-25 transition-opacity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={() => navigate("next")} disabled={activeIndex === dentists.length - 1} className="w-9 h-9 rounded-full border border-[#d2d2d7] flex items-center justify-center hover:bg-[#f5f5f7] disabled:opacity-25 transition-opacity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>

          <div ref={scrollRef} className="dc-track flex gap-3 overflow-x-auto h-[380px] items-end">
            {dentists.map((dentist, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={dentist._id}
                  data-active={isActive}
                  onClick={() => selectCard(index)}
                  className={`dc-card relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer focus:outline-none ${isActive ? "border border-[#d2d2d7] bg-white shadow-lg" : "border border-transparent bg-[#f5f5f7] hover:border-[#d2d2d7]"}`}
                  style={{ width: isActive ? "260px" : "180px", height: isActive ? "360px" : "280px" }}
                >
                  <div className="dc-label absolute top-0 left-0 right-0 z-10 px-4 pt-4 pb-2" style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0px)" : "translateY(-8px)", pointerEvents: "none" }}>
                    <p className="apple-nav-text font-semibold text-[#1d1d1f] truncate">{dentist.name}</p>
                    <p className="apple-caption !text-[11px] mt-0.5">{dentist.credentials}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl" style={{ top: isActive ? "60px" : "0", transition: "top 500ms cubic-bezier(0.28, 0.11, 0.32, 1)" }}>
                    {imgErrors[dentist._id] ? <DentistPlaceholder active={isActive} /> : (
                      <img 
                        src={dentist.image} 
                        alt={dentist.name} 
                        draggable={false} 
                        className="dc-img w-full h-full object-cover object-top select-none" 
                        style={{ filter: isActive ? "grayscale(0%)" : "grayscale(100%)" }}
                        onError={() => setImgErrors(p => ({ ...p, [dentist._id]: true }))} 
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-7 pt-6 border-t border-[#d2d2d7]">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
              <div className="dc-info min-w-[140px]" key={`s-${activeIndex}`}>
                <p className="apple-eyebrow text-[#86868b] mb-1">Specialty</p>
                <p className="apple-body !font-semibold">{active?.specialty || ""}</p>
              </div>
              <div className="dc-info min-w-[140px]" key={`e-${activeIndex}`}>
                <p className="apple-eyebrow text-[#86868b] mb-1">Experience</p>
                <p className="apple-body !font-semibold">{active?.experience || ""}</p>
              </div>
              <div className="ml-auto">
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal'))}
                  className="apple-btn-secondary !text-[15px] group"
                >
                  Book Appointment
                  <span className="inline-block transition-transform duration-150 group-hover:translate-x-1 ml-1">›</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-10">
            {dentists.map((_, i) => (
              <button key={i} onClick={() => selectCard(i)} className="rounded-full transition-all duration-300" style={{ width: i === activeIndex ? "16px" : "6px", height: "6px", background: i === activeIndex ? "#1d1d1f" : "#d2d2d7" }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
