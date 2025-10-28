import React from 'react';
import { Palette, Code, ChevronRight } from 'lucide-react';
import colors from '../../style/colorPalette';
import bgBW from '../../assets/bgBW.mp4';

interface HeroProps {
  mousePos: { x: number; y: number };
  onEnter: () => void;
  scrollToSection: (ref: React.RefObject<HTMLDivElement | null>) => void;
  sections: { id: string; ref: React.RefObject<HTMLDivElement | null> }[];
}

const HeroSection: React.FC<HeroProps> = ({ mousePos, scrollToSection, sections }) => {
  const aboutRef = sections.find((s) => s.id === 'about')?.ref;
  const projectsRef = sections.find((s) => s.id === 'projects')?.ref;
  const contactRef = sections.find((s) => s.id === 'contact')?.ref;

  return (
    <section className="relative flex h-screen min-w-screen flex-shrink-0 items-center justify-center overflow-hidden">
      {/* Name Button (hidden on mobile) */}
      <div
        onClick={() => aboutRef && scrollToSection(aboutRef)}
        style={{
          transition: 'all 0.3s ease',
        }}
        className="bonheur-royale-regular absolute top-6 left-8 z-20 hidden cursor-pointer text-3xl text-white hover:scale-105 sm:block"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.textShadow = `0 0 8px ${colors.pinkAccent}`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.color = 'white';
          (e.currentTarget as HTMLDivElement).style.textShadow = 'none';
        }}
      >
        Crystal Kate Aquino
      </div>

      {/*  Background Video (fully protected) */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
        src={bgBW}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        preload="auto"
      />
      {/*  Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      {/*  Mouse gradient effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      {/*  Main Content */}
      <div className="relative z-10 max-w-6xl px-8 text-center">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center gap-2 text-[3vw] tracking-wide text-zinc-400 sm:gap-3 sm:text-sm">
            <Palette size={16} className="sm:h-[18px] sm:w-[18px]" />
            <span>UI/UX DESIGNER</span>
          </div>

          <div className="h-6 w-px bg-zinc-700 sm:h-8"></div>

          <div className="flex items-center gap-2 text-[3vw] tracking-wide text-zinc-400 sm:gap-3 sm:text-sm">
            <Code size={16} className="sm:h-[18px] sm:w-[18px]" />
            <span>FULL STACK DEVELOPER</span>
          </div>
        </div>

        {/* Responsive heading */}
        <h1 className="relative my-8 py-4 text-center text-[12vw] leading-none font-light tracking-tight text-white before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent">
          {/* Mobile view → show your name */}
          <span className="block sm:hidden">CRYSTAL KATE AQUINO</span>
          {/* Desktop view → show DEVELOPER */}
          <span className="hidden sm:block">DEVELOPER</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-xl font-light tracking-wide text-zinc-300">
          Designing delightful experiences and bringing them to life through code
        </p>

        <div className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <button
            onClick={() => projectsRef && scrollToSection(projectsRef)}
            className="inline-flex w-[65vw] max-w-[220px] items-center justify-center gap-3 bg-white px-6 py-3 text-xs font-medium tracking-wider text-black transition-all duration-300 hover:bg-zinc-200 sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
          >
            VIEW WORK <ChevronRight size={18} className="shrink-0 text-black" />
          </button>

          <button
            onClick={() => contactRef && scrollToSection(contactRef)}
            className="inline-flex w-[65vw] max-w-[220px] items-center justify-center gap-3 bg-white px-6 py-3 text-xs font-medium tracking-wider text-black transition-all duration-300 hover:bg-zinc-200 sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
          >
            CONTACT ME <ChevronRight size={18} className="shrink-0 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
