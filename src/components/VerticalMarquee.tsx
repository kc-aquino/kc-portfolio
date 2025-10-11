import React from 'react';
import colors from '../style/colorPalette';
import GrainTexture from './GrainTexture';

interface VerticalMarqueeProps {
  text?: string;
  speed?: number;
  darkMode?: boolean;
}

const VerticalMarquee: React.FC<VerticalMarqueeProps> = ({
  text = 'TEXT HERE',
  speed = 12,
  darkMode = false,
}) => {
  const blendMode = darkMode ? 'screen' : 'multiply';
  const topGradient = darkMode
    ? 'linear-gradient(to bottom, #18181b, transparent)'
    : 'linear-gradient(to bottom, #ffffff, transparent)';
  const bottomGradient = darkMode
    ? 'linear-gradient(to top, #18181b, transparent)'
    : 'linear-gradient(to top, #ffffff, transparent)';

  const words = text.split(' ').filter((word) => word.trim());

  return (
    <div
      className={`relative h-screen w-40 flex-shrink-0 overflow-hidden ${
        darkMode ? 'bg-zinc-900' : 'bg-white'
      }`}
    >
      {/* Grainy texture overlay */}
      <GrainTexture opacity={0.5} blendMode={blendMode} />

      {/* Gradient fades */}
      <div
        className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-32"
        style={{ background: topGradient }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32"
        style={{ background: bottomGradient }}
      />

      {/* Scrolling text container */}
      <div
        className="absolute inset-0 z-20 flex flex-col"
        style={{
          animation: `scroll-up ${speed}s linear infinite`,
        }}
      >
        {[...Array(30)].map((_, i) => (
          <React.Fragment key={i}>
            {words.map((word, wordIndex) => (
              <React.Fragment key={`${i}-${wordIndex}`}>
                <div
                  className="bbh-sans-bogle-regular flex items-center justify-center py-8 text-6xl font-bold tracking-wider"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    color: darkMode ? 'white' : colors.pinkAccent,
                    letterSpacing: '0.1em',
                  }}
                >
                  {word.trim()}
                </div>
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
