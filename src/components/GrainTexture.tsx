import React from 'react';

interface GrainTextureProps {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  backgroundSize?: string;
  blendMode?: 'multiply' | 'overlay' | 'screen' | 'soft-light';
  speed?: number; // controls smooth movement speed
  className?: string;
}

const GrainTexture: React.FC<GrainTextureProps> = ({
  opacity = 0.5,
  baseFrequency = 3.5,
  numOctaves = 6,
  backgroundSize = '100px 100px',
  blendMode = 'overlay',
  speed = 25, // slower = smoother
  className = '',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize,
          animation: `grainDrift ${speed}s linear infinite`,
        }}
      />
      <style>
        {`
          @keyframes grainDrift {
            0% { background-position: 0 0; }
            50% { background-position: 50px 50px; }
            100% { background-position: 0 0; }
          }
        `}
      </style>
    </div>
  );
};

export default GrainTexture;
