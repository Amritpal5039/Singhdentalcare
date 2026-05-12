"use client";

export default function ScheduleButton() {
  const openModal = () => {
    window.dispatchEvent(new CustomEvent('open-appointment-modal'));
  };

  return (
    <button 
      onClick={openModal}
      className="apple-btn-primary !px-12 !py-5 text-[17px]"
    >
      Schedule a Consultation
    </button>
  );
}
