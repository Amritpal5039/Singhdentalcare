"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface Dentist {
  id: number;
  name: string;
  credentials: string;
  specialty: string;
  experience: string;
  image: string;
  alt: string;
}

const DENTISTS: Dentist[] = [
  {
    id: 1,
    name: "Dr. Bikramjit Singh",
    credentials: "BDS",
    specialty: "BDS & Fellowship in Implantology",
    experience: "12 years",
    image: "https://singhdentalcare.in/wp-content/uploads/2025/11/Untitled-design-40-1.png",
    alt: "Dr. BIKRAM",
  },
  {
    id: 2,
    name: "DR. SHIFALI SHARMA",
    credentials: "BDS",
    specialty: "General Dentist",
    experience: "",
    image: "https://singhdentalcare.in/wp-content/uploads/2025/11/Untitled-design-37.png",
    alt: "DR. SHIFALI SHARMA",
  },
  {
    id: 3,
    name: "Dr. Marcus Lee",
    credentials: "DDS",
    specialty: "Prosthodontist",
    experience: "14 years",
    image: "/dentists/dr-marcus-lee.jpg",
    alt: "Dr. Marcus Lee",
  },
  {
    id: 4,
    name: "Dr. Sarah Mitchell",
    credentials: "DMD",
    specialty: "Cosmetic Dentist",
    experience: "11 years",
    image: "/dentists/dr-sarah-mitchell.jpg",
    alt: "Dr. Sarah Mitchell",
  },
  {
    id: 5,
    name: "Dr. Ryan Park",
    credentials: "BDS, FDSRCS",
    specialty: "Oral Surgeon",
    experience: "16 years",
    image: "/dentists/dr-ryan-park.jpg",
    alt: "Dr. Ryan Park",
  },
  {
    id: 6,
    name: "Dr. Priya Sharma",
    credentials: "MDS, PhD",
    specialty: "Periodontist",
    experience: "10 years",
    image: "/dentists/dr-priya-sharma.jpg",
    alt: "Dr. Priya Sharma",
  },
  {
    id: 7,
    name: "Dr. Thomas Wright",
    credentials: "DDS, MS",
    specialty: "Pediatric Dentist",
    experience: "8 years",
    image: "/dentists/dr-thomas-wright.jpg",
    alt: "Dr. Thomas Wright",
  },
  {
    id: 8,
    name: "Dr. Aisha Patel",
    credentials: "BDS, MClinDent",
    specialty: "Restorative Dentist",
    experience: "7 years",
    image: "/dentists/dr-aisha-patel.jpg",
    alt: "Dr. Aisha Patel",
  },
  {
    id: 9,
    name: "Dr. Kevin Tanaka",
    credentials: "DMD, MSD",
    specialty: "Implantologist",
    experience: "13 years",
    image: "/dentists/dr-kevin-tanaka.jpg",
    alt: "Dr. Kevin Tanaka",
  },
  {
    id: 10,
    name: "Dr. Laura Novak",
    credentials: "DDS, FAGD",
    specialty: "General Dentist",
    experience: "15 years",
    image: "/dentists/dr-laura-novak.jpg",
    alt: "Dr. Laura Novak",
  },
];

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

export default function MeetTheDentists() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);

  // Center a card inside the scroll track
  const scrollToCard = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    
    const inactiveWidth = 180;
    const gap = 12;
    
    // For mobile (centered): target = index * (inactive + gap)
    // For desktop (left-start): target = index * (inactive + gap)
    // Both work with the same math if the padding is set correctly on the track
    const targetScrollLeft = index * (inactiveWidth + gap);
    
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  }, []);

  // Detect which card is closest to center after touch scroll
  const snapToNearestCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const inactiveWidth = 180;
    const gap = 12;
    const scrollPos = container.scrollLeft;
    
    const closest = Math.round(scrollPos / (inactiveWidth + gap));
    setActiveIndex(Math.max(0, Math.min(closest, DENTISTS.length - 1)));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const supportsScrollEnd = "onscrollend" in window;
    if (supportsScrollEnd) {
      container.addEventListener("scrollend", snapToNearestCard);
      return () => container.removeEventListener("scrollend", snapToNearestCard);
    }
    // Fallback for Safari
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
      ? Math.min(activeIndex + 1, DENTISTS.length - 1)
      : Math.max(activeIndex - 1, 0);
    
    setActiveIndex(next);
    scrollToCard(next);
  };

  const selectCard = (index: number) => {
    setActiveIndex(index);
    scrollToCard(index);
  };

  const active = DENTISTS[activeIndex];

  return (
    <>
      <style>{`
        /* Card size + grayscale animate together */
        .dc-card {
          transition:
            width 500ms cubic-bezier(0.28, 0.11, 0.32, 1),
            height 500ms cubic-bezier(0.28, 0.11, 0.32, 1),
            border-color 300ms ease;
          /* Removed will-change to prevent sub-pixel jitter during simultaneous scroll/resize */
        }
        .dc-img {
          transition: filter 450ms ease, transform 600ms ease;
        }
        .dc-card:not([data-active="true"]):hover .dc-img {
          transform: scale(1.03);
        }
        .dc-label {
          transition: opacity 350ms ease, transform 350ms ease;
        }
        /* Track */
        .dc-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          /* Default (Desktop): No mandatory snap to avoid fighting with button-led smooth scroll */
          scroll-snap-type: none;
          padding: 0;
          scroll-padding: 0;
        }
        .dc-track::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .dc-track {
            /* Mobile: Proximity snap allows smooth programmatic scroll while still assisting touch */
            scroll-snap-type: x proximity;
            /* 130px is half of the active card width (260px) */
            padding: 0 calc(50% - 130px);
            scroll-padding: 0 calc(50% - 130px);
          }
          .dc-track > button { scroll-snap-align: center; }
        }

        /* Info strip fade on dentist change */
        .dc-info {
          transition: opacity 250ms ease;
        }
      `}</style>

      <section className="apple-section bg-white overflow-hidden">
        <div className="apple-container">

          {/* ── Header ── */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="apple-title-lg">
              Meet The Dentists
            </h2>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate("prev")}
                disabled={activeIndex === 0}
                aria-label="Previous"
                className="w-9 h-9 rounded-full border border-[#d2d2d7]
                           flex items-center justify-center text-[#1d1d1f]
                           hover:bg-[#f5f5f7] active:scale-95
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-150"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigate("next")}
                disabled={activeIndex === DENTISTS.length - 1}
                aria-label="Next"
                className="w-9 h-9 rounded-full border border-[#d2d2d7]
                           flex items-center justify-center text-[#1d1d1f]
                           hover:bg-[#f5f5f7] active:scale-95
                           disabled:opacity-25 disabled:cursor-not-allowed
                           transition-all duration-150"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Card Track ── */}
          <div
            ref={scrollRef}
            className="dc-track flex gap-3 overflow-x-auto h-[380px] items-end"
          >
            {DENTISTS.map((dentist, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={dentist.id}
                  data-active={isActive}
                  onClick={() => selectCard(index)}
                  aria-label={`Select ${dentist.name}`}
                  className={`dc-card relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2
                    ${isActive
                      ? "border border-[#d2d2d7] bg-white shadow-lg"
                      : "border border-transparent bg-[#f5f5f7] hover:border-[#d2d2d7]"
                    }
                  `}
                  style={{
                    width:  isActive ? "260px" : "180px",
                    height: isActive ? "360px" : "280px",
                  }}
                >
                  {/* Name + credentials — visible only on active */}
                  <div
                    className="dc-label absolute top-0 left-0 right-0 z-10 px-4 pt-4 pb-2"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? "translateY(0px)" : "translateY(-8px)",
                      pointerEvents: "none",
                    }}
                  >
                    <p className="apple-nav-text font-semibold text-[#1d1d1f] truncate">
                      {dentist.name}
                    </p>
                    <p className="apple-caption !text-[11px] mt-0.5">
                      {dentist.credentials}
                    </p>
                  </div>

                  {/* Photo */}
                  <div
                    className="absolute inset-x-0 bottom-0 overflow-hidden rounded-2xl"
                    style={{
                      top: isActive ? "60px" : "0",
                      transition: "top 500ms cubic-bezier(0.28, 0.11, 0.32, 1)",
                    }}
                  >
                    {imgErrors[dentist.id] ? (
                      <DentistPlaceholder active={isActive} />
                    ) : (
                      <img
                        src={dentist.image}
                        alt={dentist.alt}
                        draggable={false}
                        className="dc-img w-full h-full object-cover object-top select-none"
                        style={{ filter: isActive ? "grayscale(0%)" : "grayscale(100%)" }}
                        onError={() => setImgErrors((p) => ({ ...p, [dentist.id]: true }))}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Info Strip ── */}
          <div className="mt-7 pt-6 border-t border-[#d2d2d7]">
            <div className="flex flex-wrap items-center gap-x-12 gap-y-4">

              <div className="dc-info min-w-[140px]" key={`s-${activeIndex}`}>
                <p className="apple-eyebrow text-[#86868b] mb-1">Specialty</p>
                <p className="apple-body !font-semibold">
                  {active.specialty}
                </p>
              </div>

              <div className="dc-info min-w-[140px]" key={`e-${activeIndex}`}>
                <p className="apple-eyebrow text-[#86868b] mb-1">Experience</p>
                <p className="apple-body !font-semibold">
                  {active.experience}
                </p>
              </div>

              <div className="ml-auto">
                <a
                  href="#book"
                  className="apple-btn-secondary !text-[15px] group"
                >
                  Book with {active.name.split(" ").slice(1).join(" ")}
                  <span className="inline-block transition-transform duration-150 group-hover:translate-x-1 ml-1">›</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center items-center gap-2 mt-10">
            {DENTISTS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to ${DENTISTS[i].name}`}
                onClick={() => selectCard(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === activeIndex ? "16px" : "6px",
                  height: "6px",
                  background: i === activeIndex ? "#1d1d1f" : "#d2d2d7",
                }}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}