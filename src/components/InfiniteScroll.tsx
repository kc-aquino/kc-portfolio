import React, { useRef, useLayoutEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';

interface InfiniteScrollProps {
  text: string;
  baseVelocity?: number;
  direction?: 'left' | 'right';
  textClassName?: string;
  numCopies?: number;
  containerStyle?: React.CSSProperties;
  textColor?: string;
  textVariant?: 'solid' | 'mixed';
  strokeColor?: string;
  strokeWidth?: string;
  solidColor?: string;
}

function useElementWidth(ref: React.RefObject<HTMLElement>) {
  const [width, setWidth] = React.useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  text,
  baseVelocity = 2,
  direction = 'right',
  textClassName = '',
  numCopies = 8,
  containerStyle = {},
  textColor = '',
  textVariant = 'solid',
  strokeColor = 'white',
  strokeWidth = '2px',
  solidColor = 'white',
}) => {
  const baseX = useMotionValue(0);
  const copyRef = useRef<HTMLElement>(null);
  const copyWidth = useElementWidth(copyRef as React.RefObject<HTMLElement>);

  // wrap function keeps motion continuous
  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return '0px';
    const wrapWidth = textVariant === 'mixed' ? copyWidth * 2 : copyWidth;
    return `${wrap(-wrapWidth, 0, v)}px`;
  });

  // motion frame for continuous movement
  useAnimationFrame((_t, delta) => {
    const moveBy = baseVelocity * (delta / 1000) * 100;
    const directionMultiplier = direction === 'left' ? -1 : 1;
    baseX.set(baseX.get() + moveBy * directionMultiplier);
  });

  // style variants
  const getTextStyle = (index: number): React.CSSProperties => {
    if (textVariant === 'mixed') {
      const isOutlined = index % 2 === 0;
      if (isOutlined) {
        return {
          color: 'transparent',
          WebkitTextStroke: `${strokeWidth} ${strokeColor || textColor || solidColor}`,
          paintOrder: 'stroke fill',
        };
      } else {
        return { color: textColor || solidColor };
      }
    }
    return { color: textColor || solidColor };
  };

  // ensure even copies for mixed variant
  const actualCopies = textVariant === 'mixed' ? Math.ceil(numCopies / 2) * 2 : numCopies;

  return (
    <div className="relative overflow-hidden" style={containerStyle}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {[...Array(actualCopies)].map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? copyRef : null}
            className={`flex-shrink-0 ${textClassName}`}
            style={getTextStyle(i)}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
