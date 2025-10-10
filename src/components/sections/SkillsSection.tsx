import React from 'react';
import { designSkills, devSkills } from '../../data/skills';

interface SkillsProps {
  mousePos: { x: number; y: number };
}

const SkillsSection: React.FC<SkillsProps> = ({ mousePos }) => (
  <section className="relative flex h-screen min-w-screen flex-shrink-0 items-center bg-zinc-950 px-20">
    {/* Skills Section Content */}
    <h1 className="text-7xl font-light text-white">Skills</h1>
  </section>
);

export default SkillsSection;
