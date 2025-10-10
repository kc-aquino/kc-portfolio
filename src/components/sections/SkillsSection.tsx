import React from 'react';
import { designSkills, devSkills } from '../../data/skills';

interface SkillsProps {
  mousePos: { x: number; y: number };
}

const SkillsSection: React.FC<SkillsProps> = ({ mousePos }) => (
  <section className="relative flex h-screen min-w-screen flex-shrink-0 items-center bg-zinc-950 px-20">
    <div className="mx-auto max-w-6xl">
      <div className="mb-16">
        <div className="mb-6 inline-block border border-zinc-800 px-4 py-2 text-xs tracking-widest text-zinc-500">
          MY EXPERTISE
        </div>
        <h2 className="mb-6 text-7xl font-light text-white">Skills</h2>
        <p className="text-lg text-zinc-500">
          Bringing ideas to life with precision and creativity
        </p>
      </div>

      <div className="grid grid-cols-2 gap-16">
        {/* DESIGN SKILLS */}
        <div>
          <h3 className="mb-6 text-xl font-medium text-violet-400">Design</h3>
          <ul className="space-y-3 text-zinc-300">
            {designSkills.map((skill: any, i: number) => (
              <li key={i} className="flex items-center gap-3">
                {/* If skill has an icon, render it */}
                {'icon' in skill && skill.icon ? (
                  <skill.icon size={18} className="text-violet-400" />
                ) : (
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
                {/* Render name or string */}
                <span>{skill.name || skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DEV SKILLS */}
        <div>
          <h3 className="mb-6 text-xl font-medium text-violet-400">Development</h3>
          <ul className="space-y-3 text-zinc-300">
            {devSkills.map((skill: any, i: number) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>{skill.name || skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
