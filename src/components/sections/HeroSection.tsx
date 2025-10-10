import React from 'react';
import { Palette, Code, ChevronRight } from 'lucide-react';
import colors from '../../style/colorPalette';

interface HeroProps {
  mousePos: { x: number; y: number };
  onEnter: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ mousePos, onEnter }) => {
  return (
    <section className="relative flex h-screen min-w-screen flex-shrink-0 items-center justify-center overflow-hidden">
      {/* 🔹 Name in Upper Left Corner */}
      <div
        onClick={() => {
          const section = document.getElementById('about');
          section?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          transition: 'all 0.3s ease',
        }}
        className="bonheur-royale-regular absolute top-6 left-8 z-20 cursor-pointer text-3xl text-white hover:scale-105"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.color = colors.pinkAccent;
          (e.currentTarget as HTMLDivElement).style.textShadow = `0 0 12px ${colors.pinkAccent}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.color = 'white';
          (e.currentTarget as HTMLDivElement).style.textShadow = 'none';
        }}
      >
        Crystal Kate Aquino
      </div>

      {/* 🔹 Background Video (fully protected) */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        src="src/assets/bgBW.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        preload="auto"
      />

      {/* 🔹 Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />

      {/* 🔹 Mouse gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* 🔹 Main Content */}
      <div className="relative z-10 max-w-6xl px-8 text-center">
        <div className="mb-6 flex items-center justify-center gap-8">
          <div className="flex items-center gap-3 text-sm tracking-wide text-zinc-400">
            <Palette size={18} />
            <span>UI/UX DESIGNER</span>
          </div>
          <div className="h-8 w-px bg-zinc-700"></div>
          <div className="flex items-center gap-3 text-sm tracking-wide text-zinc-400">
            <Code size={18} />
            <span>FRONTEND DEVELOPER</span>
          </div>
        </div>

        <h1 className="relative my-8 py-4 text-center text-[12vw] leading-none font-light tracking-tight text-white before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent">
          DEVELOPER
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-xl font-light tracking-wide text-zinc-300">
          Designing delightful experiences and bringing them to life through code
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => {
              const section = document.getElementById('projects');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex cursor-pointer items-center gap-3 bg-white px-8 py-4 text-sm font-medium tracking-wider text-black transition-all duration-300 hover:bg-zinc-200"
          >
            VIEW WORK <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
