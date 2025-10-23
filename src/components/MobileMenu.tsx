import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (ref: React.RefObject<HTMLDivElement | null>) => void;
  sections: { label: string; ref: React.RefObject<HTMLDivElement> }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle, onSelect, sections }) => {
  const handleSelect = (ref: React.RefObject<HTMLDivElement | null>) => {
    // Close menu first for better UX
    onToggle();
    // Small delay to let menu close animation complete before scrolling
    setTimeout(() => {
      onSelect(ref);
    }, 150);
  };

  return (
    <>
      {/* Floating Burger Button */}
      <button
        type="button"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        onClick={onToggle}
        className="fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl shadow-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <div className="relative h-6 w-6">
          <span
            className={`absolute left-0 block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'top-2.5 rotate-45' : 'top-0'
            }`}
          />
          <span
            className={`absolute top-2.5 left-0 block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
              isOpen ? 'top-2.5 -rotate-45' : 'top-5'
            }`}
          />
        </div>
      </button>

      {/* Overlay + Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onToggle}
        aria-hidden="true"
      />

      <div
        className={`fixed right-6 bottom-28 z-50 w-64 rounded-3xl bg-gradient-to-b from-white to-zinc-50 shadow-2xl ring-1 shadow-zinc-900/30 ring-zinc-900/5 backdrop-blur-xl transition-all duration-300 ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
      >
        <ul className="py-3">
          {sections.map((item, index) => (
            <li
              key={item.label}
              className={`transition-all duration-300 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
            >
              <button
                type="button"
                className="group relative w-full px-6 py-3.5 text-left text-base font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-900"
                onClick={() => handleSelect(item.ref)}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-zinc-100 to-zinc-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
