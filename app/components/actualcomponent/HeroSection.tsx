'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroItem {
  _id: string;
  type: 'image' | 'video';
  url: string;
  publicId: string;
}

interface NetworkInformation {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | '5g';
  downlink: number;
  saveData: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

const DEFAULT_ITEMS: HeroItem[] = [
  {
    _id: 'default-1',
    type: 'video',
    url: 'https://res.cloudinary.com/ddrhe6ojc/video/upload/q_auto:best,vc_h264,so_0/v1777625310/output2_kkrlhv.mp4',
    publicId: 'output2_kkrlhv'
  }
];

const POSTER_IMAGE = 'https://res.cloudinary.com/ddrhe6ojc/image/upload/f_auto,q_auto/v1777627548/edited_banner_of_21_size_afwbz7.png';

export default function HeroSection() {
  const [items, setItems] = useState<HeroItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch('/api/hero');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setItems(data);
      } else {
        setItems(DEFAULT_ITEMS);
      }
    } catch (err) {
      console.error('Failed to fetch hero items', err);
      setItems(DEFAULT_ITEMS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection;

    if (connection) {
      const { effectiveType, saveData, downlink } = connection;
      if (
        saveData ||
        ['slow-2g', '2g', '3g'].includes(effectiveType) ||
        downlink < 1.5
      ) {
        setIsLowBandwidth(true);
      }
    }
    fetchItems();
  }, [fetchItems]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;

    const startTimer = () => {
      const currentItem = items[currentIndex];
      // If video, we might want to wait for it to end, but for simplicity we'll use a fixed duration for images
      // and a longer one for videos, or just fixed 6s for all.
      const duration = currentItem.type === 'video' ? 10000 : 5000;
      
      timerRef.current = setTimeout(nextSlide, duration);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, items, nextSlide]);

  useEffect(() => {
    // Play the current video if it's a video
    const currentItem = items[currentIndex];
    if (currentItem?.type === 'video' && !isLowBandwidth) {
      const video = videoRefs.current[currentItem._id];
      if (video) {
        // Reset and play
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            // Ignore AbortError as it's often caused by rapid navigation or power saving
            if (err.name !== 'AbortError') {
              console.warn('Video play blocked:', err);
            }
          });
        }
      }
    }
    
    // Pause other videos
    items.forEach((item, index) => {
      if (index !== currentIndex && item.type === 'video') {
        const video = videoRefs.current[item._id];
        if (video && !video.paused) {
          video.pause();
        }
      }
    });
  }, [currentIndex, items, isLowBandwidth]);

  return (
    <section className="bg-white pt-[20px] md:pt-[100px] pb-12">
      <div className="apple-container-wide">
        <div className="relative aspect-video w-full overflow-hidden bg-black rounded-[24px] md:rounded-[40px] shadow-2xl">
          {/* Slider Items */}
          {isLoaded && items.map((item, index) => (
            <div 
              key={item._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {item.type === 'image' || (item.type === 'video' && isLowBandwidth) ? (
                <Image
                  src={item.type === 'video' ? POSTER_IMAGE : item.url}
                  alt="Hero Slide"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <video
                  ref={(el) => { videoRefs.current[item._id] = el; }}
                  src={item.url}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              )}
            </div>
          ))}

          {/* Fallback/Loading state */}
          {!isLoaded && (
            <Image
              src={POSTER_IMAGE}
              alt="Hero Loading"
              fill
              priority
              className="object-cover"
            />
          )}

          {/* Slider Indicators */}
          {items.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="apple-container-narrow text-center mt-12 mb-12">
        <h1 className="apple-title-lg mb-6 ">
          Experience advanced dental treatments in a comfortable and modern environment.
        </h1>
        <p className="apple-subtitle mb-8">
          Honest | Transparent | Affordable | World Class Treatment
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal'))}
            className="apple-btn-primary "
          >
            Book Appointment
          </button>
          <Link href="/about" className="apple-btn-secondary">About us ›</Link>
        </div>
      </div>
    </section>
  );
}
