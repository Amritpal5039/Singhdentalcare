"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from '@/app/components/ui/FileUploader';

interface Job {
  _id: string;
  title: string;
  type: string;
  branch: string;
  deadline: string;
  openings: number;
  description: string;
  questions: string[];
}

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = React.use(params);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formStep, setFormStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [answerObj, setAnswerObj] = useState<Record<string, 'Yes' | 'No'>>({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${unwrappedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setJob(data.job);
        } else {
          router.push('/careers');
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [unwrappedParams.id, router]);

  const handleApplyClick = () => {
    if (job?.questions && job.questions.length > 0) {
      setFormStep(1);
    } else {
      setFormStep(2);
    }
    setTimeout(() => scrollToForm(), 100);
  };

  const handleNextClick = () => {
    const allAnswered = job?.questions.every(q => answerObj[q]);
    if (!allAnswered) {
      alert("Please answer all questions before proceeding.");
      return;
    }
    setFormStep(2);
  };

  const handleRadioChange = (question: string, value: 'Yes' | 'No') => {
    setAnswerObj(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeUrl) {
      alert("Please upload your resume.");
      return;
    }
    setSubmitting(true);
    
    const formattedAnswers = Object.entries(answerObj).map(([q, a]) => `${q}: ${a}`);
    
    try {
      const res = await fetch(`/api/jobs/${unwrappedParams.id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          resumeUrl,
          answers: formattedAnswers
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center apple-subtitle">Loading...</div>;
  }

  if (!job) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {formStep === 0 ? (
        <>
          <section className="apple-hero" style={{ paddingTop: '60px', paddingBottom: '30px' }}>
            <div className="apple-container-narrow flex flex-col md:flex-row items-start md:items-center justify-between text-left">
              <div className="mb-6 md:mb-0">
                <p className="apple-eyebrow apple-hero-eyebrow mb-2">{job.branch} &middot; {job.type}</p>
                <h1 className="apple-hero-title mb-4" style={{ fontSize: '3rem', lineHeight: '1.1' }}>
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 apple-body text-[--apple-text-secondary]">
                  <span>{job.openings} Opening{job.openings !== 1 ? 's' : ''}</span>
                  <span>&middot;</span>
                  <span>Closes {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="apple-hero-cta shrink-0 md:ml-8">
                <button onClick={handleApplyClick} className="apple-btn-primary">Apply Job</button>
              </div>
            </div>
          </section>



          <section className="apple-section flex-grow" style={{ paddingTop: '20px' }}>
            <div className="apple-container-narrow">
              <div className="prose prose-lg max-w-none apple-body text-[--apple-text-primary]">
                <h2 className="apple-title-lg mb-6">About the Role</h2>
                <p className="whitespace-pre-wrap">{job.description}</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="flex-grow bg-[#f5f5f7] py-12 md:py-24 px-4 flex justify-center items-start md:items-center" ref={formRef}>
          <div className="apple-container-narrow w-full max-w-3xl">
            <div className="bg-white rounded-[20px] shadow-sm p-8 md:p-14">
              {success ? (
                <div className="text-center py-10">
                  <h3 className="apple-title-lg mb-4 text-green-600">Application Submitted</h3>
                  <p className="apple-subtitle mb-8">Thank you for applying. We will get back to you soon.</p>
                  <button 
                    onClick={() => router.push('/careers')}
                    className="apple-btn-primary"
                  >
                    Return to Careers
                  </button>
                </div>
              ) : formStep === 1 ? (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="apple-title-lg m-0">Pre-screening Questions</h2>
                    <button
                      onClick={() => setFormStep(0)}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="space-y-6">
                    {job.questions.map((q, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="font-medium text-gray-800 mb-3">{q}</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name={`question-${idx}`} 
                              value="Yes"
                              checked={answerObj[q] === 'Yes'}
                              onChange={() => handleRadioChange(q, 'Yes')}
                              className="text-[#0071e3] focus:ring-[#0071e3]"
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="radio" 
                              name={`question-${idx}`} 
                              value="No"
                              checked={answerObj[q] === 'No'}
                              onChange={() => handleRadioChange(q, 'No')}
                              className="text-[#0071e3] focus:ring-[#0071e3]"
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-8 flex justify-end">
                    <button
                      onClick={handleNextClick}
                      className="apple-btn-primary"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="apple-title-lg m-0 text-center flex-grow">Submit your application</h2>
                    <button
                      onClick={() => setFormStep(0)}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium absolute top-8 right-8 md:static"
                    >
                      Cancel
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f5f5f7] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all duration-300 apple-body"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number (10 digits)</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        pattern="\d{10}"
                        title="Please enter a valid 10-digit phone number"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f5f5f7] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all duration-300 apple-body"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF)</label>
                      <FileUploader 
                        onUploadSuccess={(url) => setResumeUrl(url)} 
                      />
                      {!resumeUrl && submitting && (
                        <p className="mt-2 text-xs text-red-500">Resume is required</p>
                      )}
                    </div>

                    <div className="pt-8 flex items-center justify-between gap-4">
                      {job.questions && job.questions.length > 0 ? (
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="apple-btn-secondary"
                        >
                          Back
                        </button>
                      ) : (
                        <div></div> // Spacer to keep submit button on right
                      )}
                      <button
                        type="submit"
                        disabled={submitting || !resumeUrl}
                        className="apple-btn-primary disabled:opacity-50"
                      >
                        {submitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
