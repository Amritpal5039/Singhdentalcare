'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface NetworkInformation {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | '5g';
  downlink: number;
  saveData: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
}

// Optimized Cloudinary video URL for fastest playback
const VIDEO_URL =
  'https://res.cloudinary.com/ddrhe6ojc/video/upload/q_auto:best,vc_h264,so_0/v1777625310/output2_kkrlhv.mp4';

const POSTER_IMAGE =
  'https://res.cloudinary.com/ddrhe6ojc/image/upload/f_auto,q_auto/v1777627548/edited_banner_of_21_size_afwbz7.png';

const STABLE_CONNECTIONS = ['4g', '5g', 'wifi'];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

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
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isLowBandwidth) return;

    const handlePlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn('⚠️ Autoplay blocked or failed:', err);
      }
    };

    if (video.readyState >= 2) {
      handlePlay();
    } else {
      video.addEventListener('loadeddata', handlePlay);
    }

    return () => {
      video.removeEventListener('loadeddata', handlePlay);
    };
  }, [isLowBandwidth]);

  return (
    <section className="bg-white pt-[60px] md:pt-[100px] pb-12">
      <div className="apple-container-narrow text-center mb-12">
        <p className="apple-eyebrow mb-4">Expert Dental Care — 2026</p>
        <h1 className="apple-hero-title mb-6 ">
          Your Smile.<br/><span className="pl-4">Our Passion.</span>
        </h1>
        <p className="apple-subtitle mb-8">
          Experience advanced dental treatments in a comfortable and modern environment.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal'))}
            className="apple-btn-primary"
          >
            Book Appointment
          </button>
          <button className="apple-btn-secondary">Learn more ›</button>
        </div>
      </div>

      <div className="apple-container-wide">
        <div className="relative aspect-video w-full overflow-hidden bg-black rounded-[24px] md:rounded-[40px] shadow-2xl">
          {/* Poster Image - Always rendered, fades out when video plays */}
          <Image
            src={POSTER_IMAGE}
            alt="Hero Background"
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Hero Video - Always rendered if not low bandwidth to ensure Ref attachment */}
          {!isLowBandwidth && (
            <video
              ref={videoRef}
              src={VIDEO_URL}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              muted
              autoPlay
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onEnded={() => setIsPlaying(false)}
            />
          )}
        </div>
      </div>
    </section>
  );
}