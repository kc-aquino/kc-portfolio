import React, { useState, useEffect } from 'react';
import GrainTexture from '../GrainTexture';
import InfiniteScroll from '../InfiniteScroll';
import { experience } from '../../data/experience';
import colors from '../../style/colorPalette';

interface ExperienceProps {
  mousePos: { x: number; y: number };
}

const ExperienceSection: React.FC<ExperienceProps> = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative flex h-screen flex-shrink-0 items-center justify-center overflow-hidden bg-white">
      {/* Custom Cursor */}
      {hoveredIndex !== null && (
        <div
          className="pointer-events-none fixed z-50 transition-opacity duration-200"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src={experience[hoveredIndex].logo}
            alt={`${experience[hoveredIndex].company} logo`}
            className="h-16 w-16 rounded-full object-cover shadow-2xl"
          />
        </div>
      )}

      <div
        className="relative z-20 flex h-full w-full max-w-6xl flex-col"
        style={{ cursor: hoveredIndex !== null ? 'none' : 'default' }}
      >
        {/* Header */}
        <div className="bg-zinc-900 px-8 py-6">
          <GrainTexture opacity={0.3} blendMode="screen" />
          <h2 className="bbh-sans-bogle-regular text-4xl font-bold text-white md:text-5xl">WORK</h2>
        </div>

        {/* Experience List - Fixed Layout */}
        <div className="flex flex-1 flex-col bg-white">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="group relative flex flex-1 border-b border-zinc-200 transition-all duration-300 last:border-b-0 hover:bg-zinc-50"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex w-full flex-col justify-center px-6 py-6 md:flex-row md:justify-between md:gap-12">
                {/* Left side — Period, Company, and Title */}
                {/* Changed justify-center to justify-start and removed fixed height to let content define height */}
                <div className="flex w-full flex-col md:w-2/5">
                  <p
                    className="mb-3 text-base font-medium tracking-wide md:text-lg"
                    style={{ color: colors.pinkAccent }}
                  >
                    {exp.period}
                  </p>

                  {/* Removed h-full and justify-center. Changed outer flex to flex-col. */}
                  <div className="flex flex-col">
                    <h3 className="mb-1 text-2xl font-bold text-zinc-900">{exp.company}</h3>
                    <p className="flex items-center gap-2 text-sm font-semibold text-zinc-500 md:text-base">
                      <span>—</span> {exp.title}
                    </p>
                  </div>
                </div>

                {/* Right side — Description aligned with company */}
                <div className="mt-4 flex w-full md:mt-0 md:w-3/5">
                  <p className="mt-10 text-sm leading-relaxed text-zinc-600 md:text-base md:leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom scrolling text */}
        <div className="relative bg-white py-8">
          <InfiniteScroll
            text="EXPERIENCE"
            baseVelocity={1.5}
            textClassName="px-8 text-[5vw] font-bold leading-none"
            textColor={colors.pinkAccent}
            numCopies={8}
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
