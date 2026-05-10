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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Autoplay when card is 60% visible
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          setIsLoaded(true);
        }
      },
      {
        threshold: [0, 0.6, 1.0],
        rootMargin: '0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`;

  return (
    <div 
      ref={cardRef}
      className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
    >
      <div 
        className="apple-card relative overflow-hidden group cursor-pointer h-full"
        style={{ aspectRatio: '9/16', padding: 0 }}
        onClick={() => setIsLoaded(true)}
      >
        {!isLoaded ? (
          <>
            <img 
              src={thumbnailUrl} 
              alt={testimonial.title || "Patient Testimonial"} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${testimonial.videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                <Play className="text-apple-blue fill-apple-blue ml-1" size={32} />
              </div>
            </div>
            {/* Title removed from UI for SEO alt-only approach */}
          </>
        ) : (
          <div className="relative w-full h-full bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&mute=1&loop=1&playlist=${testimonial.videoId}&controls=0&modestbranding=1&rel=0`}
              title={testimonial.title || "Best dental care Patient Testimonial"}
              className="w-full h-full border-0 pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute top-4 right-4 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full text-white">
                <VolumeX size={16} />
            </div>
            {/* Title removed from UI for SEO alt-only approach */}
          </div>
        )}
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section className="apple-section !pb-24">
      <div className="apple-container">
        <div className="apple-heading-group mb-12">
          <p className="apple-eyebrow">Real Stories.</p>
          <h2 className="apple-title-xl">Smiles that speak for themselves.</h2>
          <p className="apple-subtitle mt-4">
            Hear directly from our patients about their journey to a perfect smile.
          </p>
        </div>
      </div>

      {/* Horizontal Shelf Layout */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-[max(22px,calc((100%-980px)/2))] pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
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
