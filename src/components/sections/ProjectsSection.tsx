import React from 'react';
import { ExternalLink } from 'lucide-react';
import { projects } from '../../data/projects';

interface ProjectsProps {
  mousePos: { x: number; y: number };
  onSelect: (p: any) => void;
}

const ProjectsSection: React.FC<ProjectsProps> = ({ mousePos, onSelect }) => (
  <section
    id="projects"
    className="relative flex h-screen min-w-screen flex-shrink-0 items-center bg-zinc-950 px-20"
  >
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-16">
        <div className="mb-6 inline-block border border-zinc-800 px-4 py-2 text-xs tracking-widest text-zinc-500">
          SELECTED WORK
        </div>
        <h2 className="mb-6 text-7xl font-light text-white">Projects</h2>
        <p className="text-lg text-zinc-500">Design and development in perfect harmony</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group cursor-pointer"
            onClick={() => onSelect(project)}
            style={{
              transform: `translateY(${mousePos.y * (8 + i * 4)}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <div
              className={`relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br ${project.color}`}
            >
              <div className="absolute inset-0 bg-black/40 transition-all duration-300 group-hover:bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <h3 className="mb-3 text-2xl font-medium">{project.title}</h3>
                <p className="mb-2 text-sm text-zinc-200">{project.tech}</p>
                <p className="text-sm text-zinc-300">{project.role}</p>
                <ExternalLink
                  size={20}
                  className="mt-4 opacity-0 transition group-hover:opacity-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
