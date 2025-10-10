import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 text-2xl font-light text-white transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      Loading...
    </div>
  );
};

export default LoadingScreen;
