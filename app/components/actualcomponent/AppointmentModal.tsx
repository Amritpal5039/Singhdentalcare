'use client';

import React, { useState, useEffect } from 'react';
import { X, Phone, Loader2, MessageCircle, Globe } from 'lucide-react';
import Image from 'next/image';

const TREATMENTS = [
  "Dental Implants & TMJ",
  "Orthodontic Treatment",
  "Oral Cancer Screenings",
  "Dental Crowns",
  "Root Canal Treatment (RCT)",
  "Teeth Whitening",
  "Cosmetic Dentistry",
  "Periodontal Therapy",
  "Other"
];

const COUNTRIES = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Russia", code: "+7", flag: "🇷🇺" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Ireland", code: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "+972", flag: "🇮🇱" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Chile", code: "+56", flag: "🇨🇱" },
  { name: "Colombia", code: "+57", flag: "🇨🇴" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
];

export default function AppointmentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phoneNumber: '',
    location: '',
    country: 'India',
    medicalHistory: '',
    medication: '',
    treatment: 'Dental Implants & TMJ',
    otherTreatment: ''
  });

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-appointment-modal', handleOpenModal);
    return () => window.removeEventListener('open-appointment-modal', handleOpenModal);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 15) {
      setFormData({ ...formData, phoneNumber: value });
      if (phoneError) setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Phone validation
    if (formData.countryCode === '+91' && formData.phoneNumber.length !== 10) {
      setPhoneError('Please enter a valid 10-digit number');
      return;
    }
    if (formData.phoneNumber.length < 7) {
      setPhoneError('Number is too short');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        phoneNumber: `${formData.countryCode}${formData.phoneNumber}`,
        treatment: formData.treatment === 'Other' ? formData.otherTreatment : formData.treatment
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    // Small timeout to reset states after animation finishes
    setTimeout(() => {
      setIsSubmitted(false);
      setPhoneError('');
      setFormData({
        name: '',
        countryCode: '+91',
        phoneNumber: '',
        location: '',
        country: 'India',
        medicalHistory: '',
        medication: '',
        treatment: 'Dental Implants & TMJ',
        otherTreatment: ''
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={closeModal}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[540px] max-h-[90vh] bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <button 
          onClick={closeModal}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-20 bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide px-8 py-10 md:px-12 md:py-12">
          {!isSubmitted ? (
            <>
              <div className="mb-10">
                {/* <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0071e3] text-[12px] font-semibold uppercase tracking-wider mb-4">
                  Appointment Request
                </div> */}
                <h2 className="apple-title-lg !mb-2 tracking-tight">Request Appointment</h2>
                <p className="apple-body text-[#6e6e73] !leading-snug">Expert dental services tailored to your schedule.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body text-[16px]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1">Phone Number</label>
                  <div className="flex gap-2.5">
                    <div className="relative min-w-[100px]">
                      <select 
                        className="w-full pl-3 pr-8 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body appearance-none cursor-pointer text-[15px]"
                        value={formData.countryCode}
                        onChange={(e) => {
                          const selected = COUNTRIES.find(c => c.code === e.target.value);
                          setFormData({
                            ...formData, 
                            countryCode: e.target.value,
                            country: selected ? selected.name : formData.country
                          });
                          if (phoneError) setPhoneError('');
                        }}
                      >
                        {COUNTRIES.map(c => (
                          <option key={`${c.name}-${c.code}`} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    <input
                      required
                      type="tel"
                      placeholder="Number"
                      className={`flex-1 min-w-0 px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 outline-none transition-all apple-body text-[16px] ${
                        phoneError ? 'ring-2 ring-red-500' : 'focus:ring-[#0071e3]'
                      }`}
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-500 text-[12px] font-medium ml-1 animate-in fade-in slide-in-from-top-1">
                      {phoneError}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1">Location</label>
                  <input
                    required
                    type="text"
                    placeholder="City / Area"
                    className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body text-[16px]"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Country
                  </label>
                  <div className="relative">
                    <select 
                      className="w-full pl-5 pr-10 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body appearance-none cursor-pointer text-[16px]"
                      value={formData.country}
                      onChange={(e) => {
                        const selected = COUNTRIES.find(c => c.name === e.target.value);
                        setFormData({
                          ...formData, 
                          country: e.target.value,
                          countryCode: selected ? selected.code : formData.countryCode
                        });
                      }}
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1">Medical History</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body text-[16px]"
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1">Medication</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body text-[16px]"
                      value={formData.medication}
                      onChange={(e) => setFormData({...formData, medication: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="apple-eyebrow text-[#1d1d1f] font-semibold ml-1">Treatment Required</label>
                  <div className="relative">
                    <select 
                      className="w-full pl-5 pr-10 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body appearance-none cursor-pointer text-[16px]"
                      value={formData.treatment}
                      onChange={(e) => setFormData({...formData, treatment: e.target.value})}
                    >
                      {TREATMENTS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {formData.treatment === 'Other' && (
                  <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
                    <input
                      required
                      type="text"
                      placeholder="Please specify treatment"
                      className="w-full px-5 py-4 bg-[#f5f5f7] border-none rounded-2xl focus:ring-2 focus:ring-[#0071e3] outline-none transition-all apple-body text-[16px]"
                      value={formData.otherTreatment}
                      onChange={(e) => setFormData({...formData, otherTreatment: e.target.value})}
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0071e3] !text-white py-3.5 rounded-full font-semibold apple-body hover:bg-[#0077ed] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : "Book Appointment Now"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-in fade-in zoom-in duration-500 py-4">
              <div className="mb-10 flex justify-center">
                <div className="relative w-28 h-14">
                   <Image
                      src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
                      alt="Singh Dental Care logo"
                      fill
                      className="object-contain"
                    />
                </div>
              </div>
              
              {/* <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              </div> */}
              
              <h2 className="apple-title-lg mb-2 tracking-tight">Request Received.</h2>
              <p className="apple-body text-[#6e6e73] mb-12 max-w-[320px] mx-auto">Our patient coordinator will contact you shortly to finalize your visit.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://wa.me/919056190567" 
                  target="_blank"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a 
                  href="tel:+919056190567" 
                  className="flex items-center justify-center gap-2.5 bg-[#1d1d1f] text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>

              <button 
                onClick={closeModal}
                className="mt-12 text-[14px] font-medium  hover:underline transition-colors"
              >
                Back to Website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
