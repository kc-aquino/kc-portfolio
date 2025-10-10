import React from 'react';
import colors from '../style/colorPalette';

interface SectionDotsProps {
  sections: { id: string; ref: React.RefObject<HTMLDivElement> }[];
  activeIndex: number;
  onDotClick: (ref: React.RefObject<HTMLDivElement>) => void;
}

const SectionDots: React.FC<SectionDotsProps> = ({ sections, activeIndex, onDotClick }) => {
  return (
    <div className="fixed top-1/2 right-8 z-50 flex -translate-y-1/2 flex-col gap-4">
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => onDotClick(section.ref)}
          className="h-3 w-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: index === activeIndex ? colors.pinkAccent : '#555',
            boxShadow:
              index === activeIndex
                ? `0 0 10px ${colors.pinkAccent}, 0 0 20px ${colors.pinkAccent}`
                : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default SectionDots;
