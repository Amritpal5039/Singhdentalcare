import Image from "next/image";

export default function Midsec() {
  return (
    // We use 'relative' here so the absolute text div knows what to stay inside of
    <div className="relative w-full h-[90vh] bg-white overflow-hidden">
      
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl">
          <Image
            src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777284467/Untitled_design_20260427_132202_0000_amip0r.png"
            alt="Singh Dental Aligner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 2. Text Content Layer (Overlapping) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-16 pointer-events-none">
        
        {/* Top Section */}
        <div className="flex justify-between items-start text-[11px] uppercase tracking-wider text-gray-500">
          <p className="max-w-[240px] leading-relaxed">
            Innovative orthodontics developed through <br /> digital planning
          </p>
          <p className="max-w-[260px] text-right leading-relaxed">
            A modern approach that improves <br /> comfort, precision, and real-life <br /> results.
          </p>
        </div>

        {/* Middle Section: Main Hero Title */}
        <div className="flex flex-col items-center mt-[-5%]">
            <h1 className="text-[70px] md:text-[90px] leading-[0.85] text-[#1a1c3d] tracking-tighter text-center">
                <span className="font-[50] uppercase">Advanced Clear</span><br/>
                <span className="font-bold uppercase">Aligner</span>
            </h1>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-12 items-end w-full">
            {/* Stats - Left side */}
            <div className="col-span-3 space-y-8">
                <div>
                    <div className="text-5xl font-bold text-[#1a1c3d]">98%</div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold">Treatment Accuracy</div>
                </div>
                <div>
                    <div className="text-5xl font-bold text-[#1a1c3d]">1200+</div>
                    <div className="text-[10px] uppercase text-gray-400 font-bold">Smiles Designed</div>
                </div>
            </div>

            {/* Bottom-Right Content */}
            <div className="col-span-9 flex flex-col items-start pl-20">
                <div className="text-[50px] md:text-[65px] font-extralight text-[#1a1c3d] uppercase leading-none mb-6">
                    Orthodontic <br/> 
                    <span className="font-semibold text-[60px] md:text-[75px]">Treatment+</span>
                </div>
                
                <div className="flex justify-between items-end w-full">
                    <p className="text-[12px] text-gray-400 max-w-[300px] leading-relaxed">
                        Created by orthodontic specialists using digital technologies. 
                        A system built for precision, aesthetics, and everyday comfort.
                    </p>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300">
                        Digital Orthodontic
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}