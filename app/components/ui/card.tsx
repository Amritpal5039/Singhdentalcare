import React from 'react';

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
}

/*
 * MANUAL: How to use this Card component
 * 
 * 1. Ensure your project has Tailwind CSS and Next.js (with TypeScript) configured.
 * 2. Save this file as `card.tsx` in your component directory.
 * 3. Import and use the Card component in your page or parent component.
 * 
 * --- Usage Example (in a page.tsx file) ---
 * 
 * import Card from './path/to/card'; // adjust path
 * 
 * function DentalServicePage() {
 *   return (
 *     // Adjusted grid for 8 cards (e.g., 4 columns on large screens, 2 on medium)
 *     <div className="min-h-screen bg-neutral-100 p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
 *      
 * }
 * 
 * export default DentalServicePage;
 * 
 * --- SEO Note ---
 * The component automatically generates an optimized alt text for the image
 * in the format: "get treatment of [Title] from best dentist near me".
 */

const Card: React.FC<CardProps> = ({ title, description, buttonText, imageUrl }) => {
  const altText = `get treatment of ${title} from best dentist near me`;

  return (
    // Scaled max-width to ~250px (approx 65% of the original 384px) and reduced border radius slightly
    <div className="max-w-[250px] w-full rounded-2xl overflow-hidden shadow-xl border border-neutral-200 bg-white/80 backdrop-blur-xl transition-all flex flex-col group">
      
      {/* Reduced outer padding from p-4 to p-3 */}
      <div className="p-3 text-center flex flex-col items-center flex-grow">
        
        {/* Title: Scaled from 24px down to 16px */}
        <h2 className="text-[16px] font-medium leading-tight text-black mb-2">
          {title}
        </h2>
        
        {/* Description: Scaled from 14px to 11px (going below 11px harms readability) */}
        <p className="text-[11px] font-normal leading-relaxed text-black/70">
          {description}
        </p>
        
        {/* Button: Reduced margin top (mt-4), smaller padding, and scaled text (text-xs) */}
        <button className="w-full mt-4 bg-neutral-800 hover:bg-neutral-700 text-white font-medium py-2 px-2 rounded-full transition-all duration-300 ease-in-out text-xs shadow-inner hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95">
          {buttonText}
        </button>
      </div>

      {/* Image Section: Maintained aspect ratio */}
      <div className="w-full aspect-[4/3] mt-auto overflow-hidden bg-neutral-100">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Card;