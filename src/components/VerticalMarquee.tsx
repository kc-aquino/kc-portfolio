import React from 'react';
import colors from '../style/colorPalette';
import GrainTexture from './GrainTexture';

interface VerticalMarqueeProps {
  text?: string;
  speed?: number;
}

const VerticalMarquee: React.FC<VerticalMarqueeProps> = ({ text = 'TEXT HERE', speed = 12 }) => {
  // Split text by space to create spacing between words
  const words = text.split(' ').filter((word) => word.trim());

  return (
    <div className="relative h-screen w-40 flex-shrink-0 overflow-hidden bg-white">
      {/* Grainy texture overlay */}
      <GrainTexture opacity={0.5} blendMode="multiply" />

      {/* Gradient fades */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-32"
        style={{
          background: 'linear-gradient(to bottom, #ffffff, transparent)',
        }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32"
        style={{
          background: 'linear-gradient(to top, #ffffff, transparent)',
        }}
      />

      {/* Scrolling text container */}
      <div
        className="absolute inset-0 z-20 flex flex-col"
        style={{
          animation: `scroll-up ${speed}s linear infinite`,
        }}
      >
        {/* Repeat the pattern multiple times for seamless loop */}
        {[...Array(30)].map((_, i) => (
          <React.Fragment key={i}>
            {words.map((word, wordIndex) => (
              <React.Fragment key={`${i}-${wordIndex}`}>
                <div
                  className="bbh-sans-bogle-regular flex items-center justify-center py-8 text-6xl font-bold tracking-wider"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    color: colors.pinkAccent,
                    letterSpacing: '0.1em',
                  }}
                >
                  {word.trim()}
                </div>
                {/* Decorative diamond separator */}
                <div
                  className="flex items-center justify-center py-4 text-2xl"
                  style={{
                    color: colors.pinkAccent,
                    opacity: 0.6,
                  }}
                >
                  {/* ✦ */}
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VerticalMarquee;
