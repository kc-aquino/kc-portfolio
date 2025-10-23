import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isLoading) {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
      }, 400);

      return () => {
        clearInterval(progressInterval);
        clearInterval(dotsInterval);
      };
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 h-40 w-40 animate-pulse rounded-full opacity-20 mix-blend-screen blur-3xl filter sm:-top-40 sm:-left-40 sm:h-80 sm:w-80"
          style={{ backgroundColor: '#FAA5B9' }}
        />
        <div
          className="absolute -right-20 -bottom-20 h-40 w-40 animate-pulse rounded-full opacity-20 mix-blend-screen blur-3xl filter sm:-right-40 sm:-bottom-40 sm:h-80 sm:w-80"
          style={{ backgroundColor: '#FFCFB5', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-white opacity-5 mix-blend-screen blur-3xl filter sm:h-96 sm:w-96"
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 sm:gap-8">
        {/* Animated logo/spinner */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24">
          {/* Outer rotating ring */}
          <div
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
            style={{ borderTopColor: '#FAA5B9', borderRightColor: '#FAA5B9' }}
          />

          {/* Middle ring */}
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-white border-l-white"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          />

          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-6 w-6 animate-pulse rounded-full sm:h-8 sm:w-8"
              style={{ background: `linear-gradient(to bottom right, #FAA5B9, #FFCFB5)` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <h2 className="mb-2 text-xl font-light tracking-wider text-white sm:text-2xl">
            Loading{dots}
          </h2>
          <p className="text-xs font-light text-gray-400 sm:text-sm">Preparing your experience</p>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-zinc-900 sm:w-64">
          <div
            className="relative h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: `linear-gradient(to right, #FAA5B9, #FFCFB5)`,
            }}
          >
            {/* Shimmer effect */}
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
          </div>
        </div>

        {/* Progress percentage */}
        <div className="font-mono text-xs text-gray-500">
          {Math.floor(Math.min(progress, 100))}%
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
