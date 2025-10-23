import { Mail, Github, Facebook, Linkedin, FileText } from 'lucide-react';
import colors from '../../style/colorPalette';
import Waves from '../reactbits/Waves/Waves';
import resumePdf from '../../assets/Aquino_CrystalKate-Resume-Oct2025.pdf';

const ContactSection = () => (
  <section className="relative flex min-w-screen flex-shrink-0 items-center justify-center bg-zinc-950 px-6 py-16 md:h-screen md:px-20">
    <Waves
      lineColor="#fff"
      backgroundColor="rgba(255, 255, 255, 0.2)"
      waveSpeedX={0.02}
      waveSpeedY={0.01}
      waveAmpX={40}
      waveAmpY={20}
      friction={0.9}
      tension={0.01}
      maxCursorMove={120}
      xGap={12}
      yGap={36}
    />

    <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-white/2 p-6 text-center backdrop-blur-md md:p-12">
      {/* Label */}
      <div className="mb-6 inline-block border border-zinc-500 px-3 py-1 text-[10px] tracking-widest text-zinc-500 md:px-4 md:py-2 md:text-xs">
        GET IN TOUCH
      </div>

      {/* Heading */}
      <h2 className="mb-6 text-4xl leading-snug font-light text-white md:mb-8 md:text-7xl md:leading-tight">
        Let’s create something{' '}
        <span
          style={{
            color: colors.pinkAccent,
            textShadow: `0 0 8px ${colors.peachLight}`,
          }}
        >
          amazing
        </span>{' '}
        together
      </h2>

      {/* Subtext */}
      <p className="mb-8 text-base text-zinc-400 md:mb-10 md:text-lg">
        Whether you want to collaborate, have a question, or just say hi{' '}
        <br className="hidden md:block" />
        I’d love to hear from you.
      </p>

      {/* Social Links */}
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:flex-nowrap md:gap-8">
          <a
            href="https://github.com/kc-aquino"
            target="_blank"
            className="flex items-center gap-2 text-zinc-300 transition hover:text-pink-200 md:gap-3"
          >
            <Github size={20} />
            <span className="text-sm md:text-base">GitHub</span>
          </a>

          <a
            href="https://web.facebook.com/Kaycee86/"
            target="_blank"
            className="flex items-center gap-2 text-zinc-300 transition hover:text-pink-200 md:gap-3"
          >
            <Facebook size={20} />
            <span className="text-sm md:text-base">Facebook</span>
          </a>

          <a
            href="https://www.linkedin.com/in/crystal-kate-aquino-a692b0260/"
            target="_blank"
            className="flex items-center gap-2 text-zinc-300 transition hover:text-pink-200 md:gap-3"
          >
            <Linkedin size={20} />
            <span className="text-sm md:text-base">LinkedIn</span>
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:flex-nowrap md:gap-8">
          <a
            href="mailto:crystalaquino86@gmail.com"
            className="flex items-center gap-2 text-zinc-300 transition hover:text-pink-200 md:gap-3"
          >
            <Mail size={20} />
            <span className="text-sm md:text-base">Email Me</span>
          </a>

          <a
            href={resumePdf}
            target="_blank"
            className="flex items-center gap-2 text-zinc-300 transition hover:text-pink-200 md:gap-3"
          >
            <FileText size={20} />
            <span className="text-sm md:text-base">Resume</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
