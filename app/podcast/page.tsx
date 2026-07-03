"use client";

import { useEffect, useState } from "react";

// Paste your image link in this variable to automatically update the left box image
const healthHourImage = "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783071134/sir_imahe_nigb7w.webp";

// Paste your logo link in this variable to automatically update the top logo
const healthHourLogo = "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1782996367/health_hour_logo-01_v9was1.png";

export default function PodcastPage() {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await fetch("/api/podcasts");
        const data = await res.json();
        if (res.ok) setPodcasts(data);
      } catch (err) {
        console.error("Failed to fetch podcasts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  const mainVideo = podcasts[0];
  const otherVideos = podcasts.slice(1);

  return (
    <main className="min-h-screen bg-white">
      
      <section className="apple-section !pt-12 md:!pt-20 pb-20">
        <div className="apple-container">
          <div className="apple-heading-group mb-16 text-center flex flex-col items-center justify-center">
            <p className="apple-eyebrow tracking-widest text-[#006A7F] font-bold uppercase mb-2">SDC Presents</p>
            <div className="relative mt-2">
              <img
                src={healthHourLogo}
                alt="Health Hour"
                className="h-36 md:h-48 object-contain"
              />
            </div>
          </div>

          {/* Why The Health Hour Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center bg-gradient-to-br from-white to-[#f5f5f7] p-8 md:p-12 lg:p-16 rounded-[32px] shadow-[0_15px_45px_rgba(0,0,0,0.03)] mb-20">
            {/* Left Box: Full length image container */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[3/4] md:aspect-[2/3] max-w-[400px] rounded-[24px] overflow-hidden bg-white border border-[#e5e5e7] flex items-center justify-center p-2 shadow-inner group transition-all duration-300 hover:shadow-md">
                <img
                  src={healthHourImage}
                  alt="Why The Health Hour"
                  className="w-full h-full object-cover object-top rounded-[20px] transition-all duration-500 group-hover:scale-102"
                />
              </div>
            </div>

            {/* Right Content: Description */}
            <div className="lg:col-span-7 space-y-6">
              
              <h2 className="text-3xl md:text-[36px] font-bold tracking-tight text-[#1d1d1f] leading-tight">
                Why The Health Hour?
              </h2>
              
              <div className="space-y-4 text-[16px] md:text-[17px] text-[#515154] leading-relaxed font-normal">
                <p>
                  In today's digital world, health information is everywhere—but not all of it is accurate. Misinformation often creates confusion, fear, and poor health decisions.
                </p>
                <p>
                  <span className="font-semibold text-[#1d1d1f]">The Health Hour</span> was created to bridge that gap by bringing authentic, evidence-based health conversations directly to the public. Hosted by <span className="font-semibold text-[#006A7F]">Dr. Bikram</span>, each episode features qualified medical professionals and specialists who share practical, trustworthy insights based on science and real clinical experience—not myths, trends, or sensational headlines.
                </p>
                <p className="border-l-4 border-[#006A7F]/40 pl-4 py-1 text-[#1d1d1f] italic font-medium bg-[#006A7F]/5 rounded-r-lg pr-4">
                  Our mission is simple: to empower people with reliable health knowledge so they can make informed decisions for themselves and their families. Because when it comes to health, the right information can change lives.
                </p>
              </div>
            </div>
          </div>

          {/* Our Podcast Section Header */}
          <div className="apple-heading-group mb-16 text-center mt-24">
            <h2 className="apple-title-xl">Our Podcast</h2>
            <p className="apple-body text-[#6e6e73] max-w-2xl mx-auto">
              Dive deep into the world of dentistry with our experts. Watch our latest talks, 
              patient stories, and educational series.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-20">
              {/* Main Video Skeleton */}
              <div className="max-w-5xl mx-auto">
                <div className="relative w-full aspect-video rounded-[32px] bg-[#e8e8ed] animate-pulse shadow-md border-4 border-[#f5f5f7]" />
                <div className="h-6 w-1/3 bg-[#e8e8ed] rounded-md mx-auto mt-8 animate-pulse" />
              </div>

              {/* Other Videos Grid Skeleton */}
              <div className="space-y-12">
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="h-[1px] flex-1 bg-[#e8e8ed]"></div>
                  <div className="h-4 w-32 bg-[#e8e8ed] rounded-full"></div>
                  <div className="h-[1px] flex-1 bg-[#e8e8ed]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[1, 2].map((n) => (
                    <div key={n} className="space-y-4">
                      <div className="relative w-full aspect-video rounded-2xl bg-[#e8e8ed] animate-pulse border border-[#e8e8ed]" />
                      <div className="h-5 w-2/3 bg-[#e8e8ed] rounded-md animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : podcasts.length > 0 ? (
            <div className="space-y-20">
              {/* Main Video */}
              <div className="max-w-5xl mx-auto">
                <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#f5f5f7]">
                  <iframe
                    src={`https://www.youtube.com/embed/${mainVideo.videoId}?autoplay=1&mute=1&controls=1&rel=0`}
                    title={mainVideo.title || "Main Podcast Video"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {mainVideo.title && (
                  <h2 className="apple-title-md mt-8 text-center">{mainVideo.title}</h2>
                )}
              </div>

              {/* Other Videos Grid */}
              {otherVideos.length > 0 && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-[#d2d2d7]"></div>
                    <h3 className="apple-title-sm !mb-0 text-[#6e6e73] uppercase tracking-widest">More Episodes</h3>
                    <div className="h-[1px] flex-1 bg-[#d2d2d7]"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {otherVideos.map((p) => (
                      <div key={p._id} className="group">
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#d2d2d7] bg-[#f5f5f7] transition-transform duration-500 group-hover:scale-[1.02]">
                          <iframe
                            src={`https://www.youtube.com/embed/${p.videoId}?autoplay=0&mute=0&controls=1&rel=0`}
                            title={p.title || "Podcast Video"}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        {p.title && (
                          <h4 className="apple-body font-semibold mt-4 line-clamp-2">{p.title}</h4>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#f5f5f7] rounded-[32px] border-2 border-dashed border-[#d2d2d7]">
              <p className="apple-body text-[#6e6e73]">Our podcasts are coming soon. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
