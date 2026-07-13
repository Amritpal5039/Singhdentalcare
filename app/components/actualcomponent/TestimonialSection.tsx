'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Play, VolumeX, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  _id: string;
  title: string;
  videoId: string;
  order: number;
}

const YouTubeShortCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Preload sound effect
    audioRef.current = new Audio('https://www.soundjay.com/buttons/sounds/button-37a.mp3');
    audioRef.current.volume = 0.1;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Start loading when card is 10% visible for "instant" feel
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          setIsLoaded(true);
        }
      },
      {
        threshold: [0, 0.1, 1.0],
        rootMargin: '100px' // Start loading even before it enters the viewport
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsHovered(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const func = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: [] }), '*');
      setIsMuted(!isMuted);
    }
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`;

  return (
    <div 
      ref={cardRef}
      className={`flex-shrink-0 w-[240px] md:w-[280px] snap-start testimonial-card-wrapper ${isHovered ? 'z-50' : 'z-10'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full will-change-transform">
        <div 
          className={`apple-card relative overflow-hidden group cursor-pointer h-full testimonial-card ${isHovered ? 'hovered' : 'shadow-xl'}`}
          style={{ aspectRatio: '9/16', padding: 0 }}
          onClick={() => setIsLoaded(true)}
        >
          {/* Always show thumbnail as background for instant visuals */}
          <div className="absolute inset-0 z-0">
            <img 
              src={thumbnailUrl} 
              alt={testimonial.title || "Patient Testimonial"} 
              className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'} ${iframeReady ? 'opacity-0' : 'opacity-100'}`}
              loading="lazy"
              onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`;
              }}
            />
          </div>

          {!isLoaded ? (
            <div className={`absolute inset-0 bg-black/10 transition-colors duration-500 ease-in-out flex items-center justify-center z-10 ${isHovered ? 'bg-black/20' : ''}`}>
              <div className={`w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl testimonial-card-play ${isHovered ? 'hovered' : ''}`}>
                <Play className="text-[#006A7F] fill-[#006A7F] ml-1" size={32} />
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full bg-black z-10">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube-nocookie.com/embed/${testimonial.videoId}?autoplay=1&mute=1&loop=1&playlist=${testimonial.videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
                title={testimonial.title || "Best dental care Patient Testimonial"}
                className="w-full h-full border-0 pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIframeReady(true)}
              ></iframe>
              <button 
                onClick={toggleMute}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full text-white transition-colors cursor-pointer"
              >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          )}
        </div>
        
        {/* Hover Popup - Refined with ease-in-out */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 z-[60] pointer-events-none transition-all duration-500 ease-in-out ${isHovered && !isLoaded ? 'opacity-100 -translate-y-20 scale-110' : 'opacity-0 -translate-y-8 scale-90'}`}>
          <div className="bg-[#006A7F] text-white px-8 py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,106,127,0.45)] border border-white/20 backdrop-blur-xl">
            <p className="font-bold text-sm whitespace-nowrap tracking-wide">Watch Success Story</p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#006A7F] rotate-45 border-r border-b border-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector('.testimonial-card-wrapper');
      const cardWidth = card ? card.clientWidth : 280;
      const gap = 32; // gap-8 is 32px
      const scrollAmount = cardWidth + gap;
      
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    // Add preconnect hints for faster YouTube loading
    const preconnectYT = document.createElement('link');
    preconnectYT.rel = 'preconnect';
    preconnectYT.href = 'https://www.youtube-nocookie.com';
    
    const preconnectGG = document.createElement('link');
    preconnectGG.rel = 'preconnect';
    preconnectGG.href = 'https://www.google.com';

    document.head.appendChild(preconnectYT);
    document.head.appendChild(preconnectGG);

    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();

    return () => {
      document.head.removeChild(preconnectYT);
      document.head.removeChild(preconnectGG);
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Run once initially and after rendering to set initial state
      const timer = setTimeout(checkScroll, 100);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        clearTimeout(timer);
      };
    }
  }, [testimonials]);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="apple-section !pt-20 !pb-24 overflow-visible">
      <div className="apple-container">
        <div className="apple-heading-group mb-8">
          <p className="apple-eyebrow">Real Stories.</p>
          <h2 className="apple-title-xl">Smiles that speak for themselves.</h2>
          <p className="apple-subtitle mt-4">
            Hear directly from our patients about their journey to a perfect smile.
          </p>
        </div>
      </div>

      {/* Relative wrapper for the shelf and floating buttons */}
      <div className="relative overflow-visible group/shelf">
        {/* Left Scroll Button */}
        <button 
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 rounded-full border border-gray-200 bg-white/80 hover:bg-white active:scale-95 flex items-center justify-center text-[#1d1d1f] hover:text-[#006A7F] shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md hidden md:flex ${
            !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-80 hover:opacity-100'
          }`}
          style={{ transform: 'translateY(-50%)' }}
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Scroll Button */}
        <button 
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 rounded-full border border-gray-200 bg-white/80 hover:bg-white active:scale-95 flex items-center justify-center text-[#1d1d1f] hover:text-[#006A7F] shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-md hidden md:flex ${
            !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-80 hover:opacity-100'
          }`}
          style={{ transform: 'translateY(-50%)' }}
          aria-label="Next testimonials"
        >
          <ChevronRight size={24} />
        </button>

        {/* Horizontal Shelf Layout - Added pt-24 and -mt-16 to provide space for 3D hover effects */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-y-visible gap-8 px-[max(22px,calc((100%-980px)/2))] pt-24 pb-12 scrollbar-hide snap-x snap-mandatory scroll-smooth -mt-16"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[320px] apple-card animate-pulse bg-apple-surface" style={{ aspectRatio: '9/16' }}></div>
            ))
          ) : (
            testimonials.map((t) => (
              <YouTubeShortCard key={t._id} testimonial={t} />
            ))
          )}
          
          {/* Spacer for right padding in flex-scroll */}
          <div className="flex-shrink-0 w-4 md:w-8"></div>
        </div>
      </div>

      {/* Google Maps Rating Section */}
      <div className="apple-container mt-12 md:mt-16">
        <div className="bg-[#f5f5f7] rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:scale-[1.01] transition-transform duration-500 ease-in-out">
          {/* Left: Google maps info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-semibold text-[13px] text-[#1d1d1f] tracking-wide uppercase opacity-80">Google Maps Rating</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">4.9</span>
                <span className="text-base text-[#6e6e73] font-medium">/ 5</span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((star) => (
                    <svg key={star} className="w-5 h-5 text-[#FBBC05] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                  {/* Fractional 5th Star (4.9 rating) */}
                  <div className="relative w-5 h-5">
                    <svg className="absolute top-0 left-0 w-5 h-5 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    <div className="absolute top-0 left-0 w-[90%] overflow-hidden">
                      <svg className="w-5 h-5 text-[#FBBC05] fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#6e6e73] font-medium tracking-tight">Based on 500+ patient reviews</span>
              </div>
            </div>
          </div>
          
          {/* Right: CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto justify-center">
            <a 
              href="https://maps.app.goo.gl/JTmZ62QsTwWWFYYK9"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-primary w-full sm:w-auto text-center !text-[15px] !py-3.5 !px-8 hover:shadow-md transition-all duration-300 transform active:scale-95"
            >
              Read Reviews
            </a>
            <a 
              href="https://maps.app.goo.gl/JTmZ62QsTwWWFYYK9"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-secondary w-full sm:w-auto text-center !text-[15px] font-medium flex items-center justify-center gap-1 group/btn"
            >
              Write a review 
              <span className="inline-block transform transition-transform group-hover/btn:translate-x-1 duration-300">›</span>
            </a>
          </div>
        </div>
      </div>


      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .testimonial-card-wrapper {
          perspective: 2000px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .testimonial-card {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        
        .testimonial-card.hovered {
          transform: translateY(-16px) scale(1.05) rotateX(4deg) rotateY(-2deg);
          box-shadow: 0 30px 60px rgba(0, 106, 127, 0.25);
        }

        .testimonial-card-play {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .testimonial-card-play.hovered {
          transform: scale(1.1) translateZ(20px);
        }
      `}</style>
    </section>
  );
}
