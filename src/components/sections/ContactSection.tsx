import React from 'react';
import { Mail, Github } from 'lucide-react';

interface ContactProps {
  mousePos: { x: number; y: number };
}

const ContactSection: React.FC<ContactProps> = ({ mousePos }) => (
  <section className="relative flex h-screen min-w-screen flex-shrink-0 items-center justify-center bg-zinc-950 px-20">
    <div className="max-w-3xl text-center">
      <div className="mb-6 inline-block border border-zinc-800 px-4 py-2 text-xs tracking-widest text-zinc-500">
        GET IN TOUCH
      </div>
      <h2 className="mb-8 text-7xl leading-tight font-light text-white">
        Let’s create something <span className="text-violet-400">amazing</span> together
      </h2>
      <p className="mb-10 text-lg text-zinc-400">
        Whether you want to collaborate, have a question, or just say hi — I’d love to hear from
        you.
      </p>

      <div className="flex items-center justify-center gap-8">
        <a
          href="mailto:youremail@example.com"
          className="flex items-center gap-3 text-zinc-300 transition hover:text-violet-400"
        >
          <Mail size={20} />
          Email Me
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          className="flex items-center gap-3 text-zinc-300 transition hover:text-violet-400"
        >
          <Github size={20} />
          GitHub
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
