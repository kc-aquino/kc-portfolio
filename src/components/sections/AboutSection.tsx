import React from 'react';
import { Layout, Layers } from 'lucide-react';


interface AboutProps {
  mousePos: { x: number; y: number };
}

const AboutSection: React.FC<AboutProps> = ({ mousePos }) => (
  <section
    id="about"
    className="relative flex h-screen min-w-screen flex-shrink-0 items-center justify-center bg-zinc-950 px-20"
  >
    <div className="max-w-6xl">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
          transform: `translate(${mousePos.x * 80}px, ${mousePos.y * 80}px)`,
          transition: 'transform 0.6s ease-out',
        }}
      />

      <div className="relative z-10 grid grid-cols-2 items-center gap-20">
        <div>
          <div className="mb-6 inline-block border border-zinc-800 px-4 py-2 text-xs tracking-widest text-zinc-500">
            ABOUT ME
          </div>
          <h2 className="mb-8 text-7xl leading-tight font-light text-white">
            Blending <span className="text-violet-400">design</span> and{' '}
            <span className="text-violet-400">development</span>
          </h2>
          <p className="text-lg leading-relaxed text-zinc-400">
            I'm passionate about creating intuitive, visually appealing digital experiences. My work
            bridges design thinking with clean, functional code to deliver products that feel
            effortless to use.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Layout className="text-violet-400" size={32} />
            <p className="text-lg text-zinc-300">UI/UX Design Systems</p>
          </div>
          <div className="flex items-center gap-4">
            <Layers className="text-violet-400" size={32} />
            <p className="text-lg text-zinc-300">Frontend Architecture</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
