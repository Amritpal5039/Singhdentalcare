"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
      
      <section className="apple-section pt-32 pb-20">
        <div className="apple-container">
          <div className="apple-heading-group mb-16 text-center">
            <p className="apple-eyebrow">SDC Presents</p>
            <h1 className="apple-title-xl">Our Podcast</h1>
            <p className="apple-body text-[#6e6e73] max-w-2xl mx-auto">
              Dive deep into the world of dentistry with our experts. Watch our latest talks, 
              patient stories, and educational series.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#0071e3]" />
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
