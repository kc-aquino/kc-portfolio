import React from 'react';
import { Layout, Layers } from 'lucide-react';
import GrainTexture from '../GrainTexture';
import Lanyard from '../reactbits/Lanyard/Lanyard';

interface AboutProps {
  mousePos: { x: number; y: number };
}

const AboutSection: React.FC<AboutProps> = ({ mousePos }) => (
  <section
    id="about"
    className="relative flex h-screen w-screen flex-shrink-0 border-l-4 border-zinc-200 bg-white"
  >
    <GrainTexture />

    {/* Left Side — About Me Text */}
    <div className="flex w-1/2 flex-col justify-center px-16">
      <h2 className="mb-6 text-5xl font-bold text-zinc-800">About Me</h2>
      <p className="max-w-md text-lg leading-relaxed text-zinc-600">
        I’m a passionate <b>Frontend Developer</b> and <b>UI/UX Designer</b> who enjoys turning
        ideas into interactive, human-centered digital experiences.
      </p>

      <div className="mt-8 flex gap-4 text-zinc-500">
        <Layout />
        <Layers />
      </div>
    </div>

    {/* Right Side — Lanyard */}
    <div className="flex w-1/2 items-center justify-center">
      <Lanyard />
    </div>
  </section>
);

export default AboutSection;
