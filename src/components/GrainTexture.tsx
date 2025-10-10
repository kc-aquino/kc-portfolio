import React from 'react';

interface GrainTextureProps {
  opacity?: number;
  baseFrequency?: number;
  numOctaves?: number;
  backgroundSize?: string;
  className?: string;
}

const GrainTexture: React.FC<GrainTextureProps> = ({
  opacity = 0.5,
  baseFrequency = 3.5,
  numOctaves = 6,
  backgroundSize = '100px 100px',
  className = '',
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize,
        mixBlendMode: 'multiply',
      }}
    />
  );
};

export default GrainTexture;
