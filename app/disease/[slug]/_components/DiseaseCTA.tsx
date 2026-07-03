'use client';

import React from 'react';
import Link from 'next/link';

interface DiseaseCTAProps {
  diseaseName: string;
}

export default function DiseaseCTA({ diseaseName }: DiseaseCTAProps) {
  const handleConsultClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Dispatch global custom event to open the appointment modal
    window.dispatchEvent(new CustomEvent('open-appointment-modal'));
  };

  return (
    <div className="pt-10 border-t border-[#d2d2d7]">
      <h3 className="apple-title-md mb-4">Seek Professional Advice</h3>
      <p className="apple-body text-[#6e6e73] mb-8">
        Our specialists at Singh Dental Care are equipped with advanced technology to diagnose and treat {diseaseName.toLowerCase()} with precision.
      </p>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleConsultClick}
          className="apple-btn-primary cursor-pointer text-center"
        >
          Consult an Expert
        </button>
        <Link href="/locations" className="apple-btn-secondary text-center">
          Find a Clinic ›
        </Link>
      </div>
    </div>
  );
}
