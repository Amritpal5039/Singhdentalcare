import React from 'react';

interface ChatButtonProps {
  /** The text displayed on the button (e.g., "GET STARTED") */
  text: string;
  /** The URL or link destination when clicked */
  link: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        /* Layout and Constrained Sizing */
        inline-flex items-center gap-3 rounded-full pl-6 pr-1
        h-11 max-h-[44px]
        
        /* Typography and Colors */
        text-[12px] font-bold uppercase tracking-widest text-white
        bg-[#006A7F] border border-[#2D3748]
        
        /* Animation & Hover - Border color updated here */
        transition-all duration-300 ease-in-out
        hover:bg-white hover:text-[#006A7F] hover:border-[#006A7F]
        
        /* Group allows children to react to parent hover */
        group cursor-pointer
      "
    >
      {/* The Text */}
      <span className="leading-none ">{text}</span>

      {/* The Icon Circle */}
      <div className="
        flex h-9 w-9 items-center justify-center 
      ">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="h-4 w-4"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" 
          />
        </svg>
      </div>
    </a>
  );
};

export default ChatButton;