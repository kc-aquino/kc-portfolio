import { Mail, Github, Facebook, Linkedin, FileText } from 'lucide-react';
import colors from '../../style/colorPalette';
import Waves from '../reactbits/Waves/Waves';

const ContactSection = () => (
  <section className="relative flex h-screen min-w-screen flex-shrink-0 items-center justify-center bg-zinc-950 px-20">
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
    <div className="relative z-10 max-w-3xl rounded-3xl border border-white/10 bg-white/2 p-12 text-center backdrop-blur-md">
      <div className="border-zink-500 mb-6 inline-block border px-4 py-2 text-xs tracking-widest text-zinc-500">
        GET IN TOUCH
      </div>
      <h2 className="mb-8 text-7xl leading-tight font-light text-white">
        Let’s create something{' '}
        <span
          style={{
            color: colors.pinkAccent,
            textShadow: `0
  0 8px ${colors.peachLight}`,
          }}
        >
          amazing
        </span>{' '}
        together
      </h2>
      <p className="mb-10 text-lg text-zinc-400">
        Whether you want to collaborate, have a question, or just say hi <br /> I’d love to hear
        from you.
      </p>

      <div className="flex flex-col items-center justify-center gap-6">
        {/* Top row */}
        <div className="flex items-center justify-center gap-8">
          <a
            href="https://github.com/kc-aquino"
            target="_blank"
            className="flex items-center gap-3 text-zinc-300 transition hover:text-pink-200"
          >
            <Github size={20} />
            GitHub
          </a>

          <a
            href="https://web.facebook.com/Kaycee86/"
            target="_blank"
            className="flex items-center gap-3 text-zinc-300 transition hover:text-pink-200"
          >
            <Facebook size={20} />
            Facebook
          </a>

          <a
            href="https://www.linkedin.com/in/crystal-kate-aquino-a692b0260/"
            target="_blank"
            className="flex items-center gap-3 text-zinc-300 transition hover:text-pink-200"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-center gap-8">
          <a
            href="mailto:crystalaquino86@gmail.com"
            className="flex items-center gap-3 text-zinc-300 transition hover:text-pink-200"
          >
            <Mail size={20} />
            Email Me
          </a>

          <a
            href="/kc-portfolio/assets/Aquino_CrystalKate-Resume-Oct2025.pdf"
            target="_blank"
            className="flex items-center gap-3 text-zinc-300 transition hover:text-pink-200"
          >
            <FileText size={20} />
            Resume
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
