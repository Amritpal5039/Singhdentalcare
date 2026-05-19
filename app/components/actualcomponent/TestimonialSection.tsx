'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Play, VolumeX } from 'lucide-react';

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

  const thumbnailUrl = `https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`;

  return (
    <div 
      ref={cardRef}
      className={`flex-shrink-0 w-[240px] md:w-[280px] snap-start perspective-2000 transition-all duration-500 ease-in-out ${isHovered ? 'z-50' : 'z-10'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full will-change-transform">
        <div 
          className={`apple-card relative overflow-hidden group cursor-pointer h-full transition-[transform,box-shadow] duration-500 ease-in-out ${isHovered ? 'shadow-[0_40px_80px_rgba(0,106,127,0.35)] -translate-y-8 scale-[1.08] rotate-x-[4deg] rotate-y-[-2deg]' : 'shadow-xl'}`}
          style={{ aspectRatio: '9/16', padding: 0 }}
          onClick={() => setIsLoaded(true)}
        >
          {/* Always show thumbnail as background for instant visuals */}
          <div className="absolute inset-0 z-0">
            <img 
              src={thumbnailUrl} 
              alt={testimonial.title || "Patient Testimonial"} 
              className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${isHovered ? 'scale-110' : 'scale-100'} ${iframeReady ? 'opacity-0' : 'opacity-100'}`}
              loading="lazy"
              onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`;
              }}
            />
          </div>

          {!isLoaded ? (
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 ease-in-out flex items-center justify-center z-10">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:translate-z-20">
                <Play className="text-[#006A7F] fill-[#006A7F] ml-1" size={32} />
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full bg-black z-10">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${testimonial.videoId}?autoplay=1&mute=1&loop=1&playlist=${testimonial.videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
                title={testimonial.title || "Best dental care Patient Testimonial"}
                className="w-full h-full border-0 pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIframeReady(true)}
              ></iframe>
              <div className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full text-white">
                  <VolumeX size={16} />
              </div>
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
