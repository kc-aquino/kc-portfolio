import React, { useRef, useLayoutEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'motion/react';

function useElementWidth(ref) {
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

const InfiniteScroll = ({
  text,
  baseVelocity = 2,
  direction = 'right', // 'left' or 'right'
  textClassName = '',
  numCopies = 8,
  containerStyle = {},
  textColor = '',
  textVariant = 'solid', // 'solid' | 'mixed'
  strokeColor = 'white',
  strokeWidth = '2px',
  solidColor = 'white',
}) => {
  const baseX = useMotionValue(0);
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  // wrap function keeps motion continuous
  function wrap(min, max, v) {
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
  useAnimationFrame((t, delta) => {
    const moveBy = baseVelocity * (delta / 1000) * 100;
    // ✅ reverse direction when scrolling left
    const directionMultiplier = direction === 'left' ? -1 : 1;
    baseX.set(baseX.get() + moveBy * directionMultiplier);
  });

  // style variants
  const getTextStyle = (index) => {
    if (textVariant === 'mixed') {
      const isOutlined = index % 2 === 0;
      if (isOutlined) {
        return {
          color: 'transparent',
          WebkitTextStroke: `${strokeWidth} ${strokeColor || textColor || solidColor}`,
          textStroke: `${strokeWidth} ${strokeColor || textColor || solidColor}`,
          paintOrder: 'stroke fill',
        };
      } else {
        return { color: textColor || solidColor };
      }
    }
    // solid variant
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
