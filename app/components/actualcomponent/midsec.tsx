import Image from "next/image";

export default function Midsec() {
  return (
    <section className="apple-section bg-[#f5f5f7] overflow-hidden">
      <div className="apple-container">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <p className="apple-eyebrow mb-4">Innovation in Orthodontics.</p>
            <h2 className="apple-display mb-6">
              Advanced Clear <span className="text-[#0071e3]">Aligners.</span>
            </h2>
            <p className="apple-subtitle mb-12">
              A modern approach that improves comfort, precision, and real-life results through digital planning.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <p className="apple-display !text-4xl mb-1">98%</p>
                <p className="apple-caption uppercase">Accuracy</p>
              </div>
              <div>
                <p className="apple-display !text-4xl mb-1">1200+</p>
                <p className="apple-caption uppercase">Smiles Designed</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <button className="apple-btn-primary">Get Started</button>
              <button className="apple-btn-secondary">Learn about Aligners ›</button>
            </div>
          </div>

          <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px]">
            <Image
              src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777284467/Untitled_design_20260427_132202_0000_amip0r.png"
              alt="Singh Dental Aligner"
              fill
              className="object-contain transition-transform duration-1000 hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}