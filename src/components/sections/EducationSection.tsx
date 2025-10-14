import React, { useState, useEffect } from 'react';
import GrainTexture from '../GrainTexture';
import InfiniteScroll from '../InfiniteScroll';
import { education } from '../../data/education';
import colors from '../../style/colorPalette';

interface EducationProps {
  mousePos: { x: number; y: number };
}

const EducationSection: React.FC<EducationProps> = () => {
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
      {hoveredIndex !== null && education[hoveredIndex].logo && (
        <div
          className="pointer-events-none fixed z-50 transition-opacity duration-200"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src={education[hoveredIndex].logo}
            alt={`${education[hoveredIndex].school} logo`}
            className="h-16 w-16 rounded-full object-cover shadow-2xl"
          />
        </div>
      )}

      <div
        className="relative z-20 flex h-full w-full max-w-6xl flex-col"
        style={{ cursor: hoveredIndex !== null ? 'none' : 'default' }}
      >
        {/* Top scrolling text */}
        <div className="relative py-6" style={{ backgroundColor: colors.pinkAccent }}>
          <InfiniteScroll
            text="EDUCATION"
            baseVelocity={1.5}
            textClassName="px-8 text-[5vw] font-bold leading-none"
            textVariant="mixed"
            numCopies={6}
          />
          <InfiniteScroll
            text="EDUCATION"
            baseVelocity={1.5}
            textClassName="px-8 text-[5vw] font-bold leading-none"
            textVariant="mixed"
            numCopies={8}
            direction="left"
          />
          <InfiniteScroll
            text="EDUCATION"
            baseVelocity={1.5}
            textClassName="px-8 text-[5vw] font-bold leading-none"
            textVariant="mixed"
            numCopies={6}
          />
        </div>

        {/* Header */}
        <div className="bg-zinc-900 px-8 py-6">
          <GrainTexture opacity={0.3} blendMode="screen" />
          <h2 className="bbh-sans-bogle-regular text-4xl font-bold text-white md:text-5xl">
            EDUCATION
          </h2>
        </div>

        {/* Education List */}
        <div className="flex flex-1 flex-col bg-white">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative flex flex-1 border-b border-zinc-200 transition-all duration-300 last:border-b-0 hover:bg-zinc-50"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex w-full flex-col justify-center px-6">
                {/* Period */}
                <p
                  className="mb-4 text-base font-medium tracking-wide md:text-lg"
                  style={{ color: colors.pinkAccent }}
                >
                  {edu.period}
                </p>

                {/* School and Degree Row */}
                <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  {/* Left - School */}
                  <div className="flex-shrink-0">
                    <h3 className="mb-2 text-2xl font-bold text-zinc-900">{edu.school}</h3>
                    <p className="flex items-center gap-2 text-sm text-zinc-400">
                      <span>—</span>
                      <span>{edu.location}</span>
                    </p>
                  </div>

                  {/* Right - Degree */}
                  <div className="md:text-right">
                    <h4 className="text-lg font-normal text-zinc-400">{edu.degree}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
