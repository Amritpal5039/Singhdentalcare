"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  type: string;
  branch: string;
  deadline: string;
  openings: number;
  description: string;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [search]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/jobs${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="apple-hero">
        <div className="apple-container-narrow flex flex-col items-center text-center">
          <p className="apple-eyebrow apple-hero-eyebrow">Join Our Team</p>
          <h1 className="apple-hero-title">
            Careers.
          </h1>
          <p className="apple-subtitle mt-4 mb-10">
            Help us create beautiful smiles.
          </p>
          
          <div className="w-full max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search by title or branch..."
              className="w-full px-6 py-4 rounded-full border-none bg-[#f5f5f7] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none transition-all duration-300 apple-body shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>



      <section className="apple-section">
        <div className="apple-container">
          

          {loading ? (
            <div className="text-center py-20 apple-subtitle">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20 bg-[#f5f5f7] rounded-[20px]">
              <p className="apple-subtitle">No open positions found. Please check back later!</p>
            </div>
          ) : (
            <div className="apple-card-grid">
              {jobs.map((job, index) => {
                const isDark = index % 3 === 2;
                const isBlue = index % 4 === 3;

                let cardClass = "apple-card";
                if (isDark) cardClass += " apple-card-dark";
                if (isBlue && !isDark) cardClass += " apple-card-blue";

                return (
                  <div key={job._id} className={cardClass}>
                    <div className="apple-card-spacer"></div>
                    <p className="apple-card-eyebrow">{job.branch} &middot; {job.type}</p>
                    <h3 className="apple-card-title">{job.title}</h3>
                    <p className="apple-card-desc line-clamp-2 mb-3">{job.description}</p>
                    <p className="apple-caption opacity-70 mb-5">
                      {job.openings} Opening{job.openings !== 1 ? 's' : ''} &middot; By {new Date(job.deadline).toLocaleDateString()}
                    </p>
                    <Link href={`/careers/${job._id}`} className="apple-card-link">
                      View Details ›
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
