import React from 'react';

interface ScrollIndicatorProps {
  scrollX: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ scrollX }) => (
  <div className="fixed bottom-8 left-1/2 h-1 w-48 -translate-x-1/2 overflow-hidden rounded-full bg-zinc-800">
    <div
      className="h-full bg-violet-400 transition-all duration-300"
      style={{ width: `${scrollX}%` }}
    />
  </div>
);

export default ScrollIndicator;
