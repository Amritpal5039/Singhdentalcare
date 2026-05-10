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

  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const inactiveWidth = 180;
    const gap = 12;
    const targetScrollLeft = index * (inactiveWidth + gap);
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  }, []);

  const snapToNearestCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container || dentists.length === 0) return;
    const inactiveWidth = 180;
    const gap = 12;
    const scrollPos = container.scrollLeft;
    const closest = Math.round(scrollPos / (inactiveWidth + gap));
    setActiveIndex(Math.max(0, Math.min(closest, dentists.length - 1)));
  }, [dentists.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const supportsScrollEnd = "onscrollend" in window;
    if (supportsScrollEnd) {
      container.addEventListener("scrollend", snapToNearestCard);
      return () => container.removeEventListener("scrollend", snapToNearestCard);
    }
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(snapToNearestCard, 100);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", onScroll);
    };
  }, [snapToNearestCard]);

  const navigate = (dir: "prev" | "next") => {
    const next = dir === "next"
      ? Math.min(activeIndex + 1, dentists.length - 1)
      : Math.max(activeIndex - 1, 0);
    setActiveIndex(next);
    scrollToCard(next);
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
    scrollToCard(index);
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" />
      </div>
    );
  }

  if (dentists.length === 0) return null;

  const active = dentists[activeIndex];

  return (
    <>
      <style>{`
        .dc-card { transition: width 500ms cubic-bezier(0.28, 0.11, 0.32, 1), height 500ms cubic-bezier(0.28, 0.11, 0.32, 1), border-color 300ms ease; }
        .dc-img { transition: filter 450ms ease, transform 600ms ease; }
        .dc-card:not([data-active="true"]):hover .dc-img { transform: scale(1.03); }
        .dc-label { transition: opacity 350ms ease, transform 350ms ease; }
        .dc-track { scrollbar-width: none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; scroll-snap-type: none; padding: 0; scroll-padding: 0; }
        .dc-track::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .dc-track { scroll-snap-type: x proximity; padding: 0 calc(50% - 130px); scroll-padding: 0 calc(50% - 130px); }
          .dc-track > button { scroll-snap-align: center; }
        }
        .dc-info { transition: opacity 250ms ease; }
      `}</style>

      <section className="apple-section bg-white overflow-hidden">
        <div className="apple-container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="apple-title-lg">Meet The Dentists</h2>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => navigate("prev")} disabled={activeIndex === 0} className="w-9 h-9 rounded-full border border-[#d2d2d7] flex items-center justify-center hover:bg-[#f5f5f7] disabled:opacity-25"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={() => navigate("next")} disabled={activeIndex === dentists.length - 1} className="w-9 h-9 rounded-full border border-[#d2d2d7] flex items-center justify-center hover:bg-[#f5f5f7] disabled:opacity-25"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M9 5l7 7-7 7" /></svg></button>
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
                      <img src={dentist.image} alt={dentist.name} draggable={false} className="dc-img w-full h-full object-cover object-top select-none" style={{ filter: isActive ? "grayscale(0%)" : "grayscale(100%)" }} onError={() => setImgErrors(p => ({ ...p, [dentist._id]: true }))} />
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
                <a href="#book" className="apple-btn-secondary !text-[15px] group">
                  Book with {active?.name?.split(" ").slice(1).join(" ") || "Expert"}
                  <span className="inline-block transition-transform duration-150 group-hover:translate-x-1 ml-1">›</span>
                </a>
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
