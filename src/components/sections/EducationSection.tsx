import React, { useState, useEffect } from 'react';
import GrainTexture from '../GrainTexture';
import InfiniteScroll from '../InfiniteScroll';
import { education } from '../../data/education';
import colors from '../../style/colorPalette';
import useIsMobile from '../../hook/useIsMobile';

interface EducationProps {
  mousePos: { x: number; y: number };
}

const EducationSection: React.FC<EducationProps> = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setImageLoading(true);
  }, [hoveredIndex]);

  return (
    <section
      className={`relative flex flex-shrink-0 overflow-hidden bg-white ${
        isMobile
          ? 'h-auto min-h-screen flex-col justify-start'
          : 'h-screen items-center justify-center'
      }`}
    >
      {/* Custom Cursor (desktop only) */}
      {!isMobile && hoveredIndex !== null && education[hoveredIndex].logo && (
        <div
          className="pointer-events-none fixed z-50 transition-opacity duration-200"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {imageLoading && (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 shadow-2xl">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-400 border-t-pink-400"></div>
            </div>
          )}

          <img
            src={education[hoveredIndex].logo}
            alt={`${education[hoveredIndex].alt}`}
            className={`h-16 w-16 rounded-full object-cover shadow-2xl transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </div>
      )}

      <div
        className="relative z-20 flex h-full w-full max-w-6xl flex-col"
        style={{ cursor: !isMobile && hoveredIndex !== null ? 'none' : 'default' }}
      >
        {/* Top scrolling text (desktop only) */}
        {!isMobile && (
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
        )}

        {/* Header */}
        <div className="bg-zinc-900 px-8 py-6">
          <GrainTexture opacity={0.3} blendMode="screen" />
          <h2 className="bbh-sans-bogle-regular text-4xl font-bold text-white md:text-5xl">
            STUDY
          </h2>
        </div>

        {/* Education List */}
        <div className="flex flex-1 flex-col bg-white">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group relative flex flex-1 border-b border-zinc-200 transition-all duration-300 last:border-b-0 hover:bg-zinc-50"
              onMouseEnter={() => !isMobile && setHoveredIndex(index)}
              onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            >
              <div className="flex w-full flex-col justify-center px-6 py-6 md:flex-row md:justify-between md:gap-12">
                {/* Left */}
                <div className="flex w-full flex-col md:w-2/5">
                  <p
                    className="mb-3 text-base font-medium tracking-wide md:text-lg"
                    style={{ color: colors.pinkAccent }}
                  >
                    {edu.period}
                  </p>
                  <div className="flex flex-col">
                    <h3 className="mb-1 text-2xl font-bold text-zinc-900">{edu.school}</h3>
                    <p className="flex items-center gap-2 text-sm font-semibold text-zinc-500 md:text-base">
                      <span>—</span> {edu.location}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="mt-4 flex w-full md:mt-0 md:w-3/5">
                  <p className="mt-10 text-sm leading-relaxed text-zinc-600 md:text-base md:leading-relaxed">
                    {edu.degree}
                  </p>
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
