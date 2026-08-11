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
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
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
          <p className="apple-eyebrow apple-hero-eyebrow mt-16">Join Our Team</p>
          <h1 className="apple-hero-title">
            Careers.
          </h1>
          <p className="apple-subtitle mt-4 mb-10">
            What makes Singh dental Care different?<br/> Hear it from Dr. Bikram, our Founder &amp; CEO.
          </p>

          <div className="w-full max-w-4xl mx-auto mb-12 aspect-video rounded-[20px] overflow-hidden shadow-xl">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/vvayRz30q6Q?autoplay=1&mute=1&controls=1" 
              title="Join Our Team" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen>
            </iframe>
          </div>
          
          <div className="w-full max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search by title or branch..."
              className="w-full px-6 py-4 rounded-full border-none bg-[#f5f5f7] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none transition-all duration-300 apple-body shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {!loading && (
              <p className="apple-body text-[--apple-text-secondary] mt-4">
                {jobs.length} {jobs.length === 1 ? 'open position' : 'open positions'} available
              </p>
            )}
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
            <>
              <div className="flex flex-col gap-4">
                {jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((job, index) => {
                  return (
                    <div key={job._id} className="apple-card">
                      <div className="apple-card-spacer"></div>
                      <p className="apple-card-eyebrow">{job.branch} &middot; {job.type}</p>
                      <h3 className="apple-card-title">{job.title}</h3>
                      <p className="apple-card-desc line-clamp-2 mb-3">{job.description}</p>
                      <p className="apple-caption opacity-70 mb-5">
                        {job.openings} Opening{job.openings !== 1 ? 's' : ''} &middot; By {new Date(job.deadline).toLocaleDateString()}
                      </p>
                      <div className="flex gap-4 items-center">
                        <Link href={`/careers/${job._id}`} className="apple-card-link flex-1">
                          View Details ›
                        </Link>
                        <Link href={`/careers/${job._id}?apply=true`} className="apple-btn-primary py-2 px-4 text-sm rounded-full bg-[#0071e3] text-white hover:bg-[#0077ED] transition-colors whitespace-nowrap text-center">
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              {Math.ceil(jobs.length / jobsPerPage) > 1 && (
                <div className="flex justify-center items-center mt-12 gap-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="apple-btn-secondary px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &larr; Previous
                  </button>
                  <span className="apple-body font-medium">
                    Page {currentPage} of {Math.ceil(jobs.length / jobsPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(jobs.length / jobsPerPage)))}
                    disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
                    className="apple-btn-secondary px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
