"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function BecomeAMember() {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/membership-plans");
        const data = await res.json();
        if (res.ok) setPlans(data);
      } catch (err) {
        console.error("Failed to fetch membership plans");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const whyChooseFeatures = [
    {
      title: "Led by Dr. Bikram",
      description: "Renowned for advanced dentistry and patient-first care, ensuring every treatment is handled with world-class expertise."
    },
    {
      title: "Significant Savings",
      description: "Designed to provide huge savings compared to regular dental visits without compromising on the quality of care."
    },
    {
      title: "Full Accessibility",
      description: "Enjoy year-round accessibility for you and your family, making dental health a consistent part of your lifestyle."
    },
    {
      title: "Advanced Diagnostics",
      description: "Get accurate diagnostics with state-of-the-art digital scanning and unlimited X-rays included in your plan."
    },
    {
      title: "Preventive Focus",
      description: "We prioritize preventive care to help you avoid future dental problems and maintain a healthy smile for life."
    },
    {
      title: "Comfort-First",
      description: "Our stress-free dental visits are built around a comfort-first approach, ensuring a relaxed experience every time."
    }
  ];

  return (
    <main className="bg-white selection:bg-apple-blue selection:text-white">
      {/* 1. Hero: Pure Typography */}
      <section className="apple-hero relative overflow-hidden pt-12 md:pt-20">
        <div className="apple-container flex flex-col items-center text-center">
          <div className="max-w-[800px] animate-enter">
            <p className="apple-eyebrow text-apple-blue font-medium mb-6 tracking-[0.2em]">Membership Experience</p>
            <h1 className="apple-hero-title mb-8">
              Your Smile. <br className="hidden md:block" />
              Your Budget. Your Choice.
            </h1>
            <p className="apple-subtitle max-w-[600px] mx-auto text-apple-text-secondary">
              At Singh Dental Care, we believe quality dental care should be accessible to everyone. 
              Thoughtfully designed dental plans—crafted to fit every smile and every need.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Plans: Visual Posters only */}
      <section className="apple-section pt-0">
        <div className="apple-container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-apple-blue" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
              {plans.map((plan, idx) => (
                <div key={plan._id || idx} className="flex flex-col items-center">
                  <div className="apple-image-wrap bg-[#fbfbfd] rounded-[32px] overflow-hidden aspect-[4/5] relative w-full border border-black/[0.03] shadow-sm mb-8">
                    <Image 
                      src={plan.image} 
                      alt={`Membership Plan ${idx + 1}`} 
                      fill 
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <a 
                    href={plan.buyNowLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="apple-btn-primary px-12 py-4 w-full md:w-auto text-center"
                  >
                    Buy Now
                  </a>
                </div>
              ))}
              
              {!isLoading && plans.length === 0 && (
                <div className="col-span-full text-center py-20 border border-dashed border-gray-200 rounded-[32px]">
                  <p className="apple-body text-apple-text-secondary">Our new membership plans are coming soon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. Why Us: Refined Grid */}
      <section className="apple-section bg-[#f5f5f7]">
        <div className="apple-container">
          <div className="max-w-[692px] mb-20">
            <h2 className="apple-title-xl">Why Choose a <br/>Singh Dental Care Plan?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {whyChooseFeatures.map((feature, idx) => (
              <div key={idx} className="flex flex-col border-t border-black/[0.1] pt-8">
                <h4 className="apple-title-md mb-4 text-[21px]">{feature.title}</h4>
                <p className="apple-body text-apple-text-secondary text-[16px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
