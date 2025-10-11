import React from 'react';
import { Layout, Layers } from 'lucide-react';
import GrainTexture from '../GrainTexture';
import Lanyard from '../reactbits/Lanyard/Lanyard';
import SplitText from '../reactbits/SplitText/SplitText';

interface AboutProps {
  mousePos: { x: number; y: number };
}

const AboutSection: React.FC<AboutProps> = ({ mousePos }) => (
  <section
    id="about"
    className="relative flex h-screen w-screen flex-shrink-0 border-l-4 border-zinc-200 bg-white"
  >
    <GrainTexture opacity={0.5} blendMode="multiply" />

    {/* Left Side — About Me Text */}
    <div className="flex w-3/4 flex-col justify-center px-20">
      <div className="max-w-3xl space-y-12">
        <div className="space-y-12">
          <div className="flex flex-wrap items-baseline gap-4">
            <h1
              className="text-5xl font-semibold whitespace-nowrap"
              style={{
                WebkitTextStroke: '2px black',
                textStroke: '4px black',
                paintOrder: 'stroke fill',
              }}
            >
              Based in
            </h1>
            <h1
              className="text-5xl font-semibold whitespace-nowrap text-white"
              style={{
                WebkitTextStroke: '2px black',
                textStroke: '4px black',
                paintOrder: 'stroke fill',
              }}
            >
              Navotas, Metro Manila
            </h1>
          </div>

          <h2 className="text-6xl leading-tight font-light text-zinc-900">
            Creating visually captivating UI and immersive digital experiences
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-zinc-600">
          Blending the art of design with the precision of coding, I create digital experiences that
          are visually stunning and functionally robust. I'm passionate about turning ideas into
          interactive, human-centered products.
        </p>
      </div>
    </div>

    {/* Right Side — Lanyard */}
    <div className="flex w-1/2 items-center justify-center">
      <Lanyard />
    </div>
  </section>
);

export default AboutSection;
