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
    <div className="flex flex-col bg-[#f5f5f7] rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-[1.02] h-full">
      <div className="p-8 pb-4 flex flex-col flex-grow">
        <h3 className="apple-title-md mb-2 leading-tight">
          {title}
        </h3>
        <p className="apple-caption text-[#6e6e73] mb-6 line-clamp-3">
          {description}
        </p>
        <div className="mt-auto">
          <button className="apple-btn-secondary !text-[14px]">
            {buttonText} ›
          </button>
        </div>
      </div>

      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
};

export default Card;