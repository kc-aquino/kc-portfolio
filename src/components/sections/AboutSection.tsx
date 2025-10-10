import React from 'react';
import { Layout, Layers } from 'lucide-react';
import GrainTexture from '../GrainTexture';

interface AboutProps {
  mousePos: { x: number; y: number };
}

const AboutSection: React.FC<AboutProps> = ({ mousePos }) => (
  <section
    id="about"
    className="relative flex h-screen min-w-screen flex-shrink-0 items-center justify-center border-l-4 border-zinc-200 bg-white px-10"
  >
    <GrainTexture />
  </section>
);

export default AboutSection;
