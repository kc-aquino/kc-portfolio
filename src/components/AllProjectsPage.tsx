import React from 'react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Project {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  link?: string;
  techStack?: string[];
}

interface AllProjectsPageProps {
  projects: Project[];
  onBack: () => void;
  onSelectProject?: (project: Project) => void;
}

const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ projects, onBack, onSelectProject }) => {
  const [_hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30 mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-8 py-8">
            <button
              onClick={onBack}
              className="group mb-6 flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-pink-400"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </button>
            <div>
              <h1 className="fjalla-one-regular text-6xl font-bold text-white">All Projects</h1>
              <p className="mt-3 text-lg text-zinc-400">
                A comprehensive collection of {projects.length}{' '}
                {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:border-pink-500/40 hover:bg-zinc-800/60 hover:shadow-2xl hover:shadow-pink-500/10"
                onClick={() => {
                  if (project.link) {
                    window.open(project.link, '_blank');
                  } else if (onSelectProject) {
                    onSelectProject(project);
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex gap-8">
                  {/* Thumbnail */}
                  {project.thumbnail && (
                    <div className="flex-shrink-0">
                      <div className="relative h-48 w-80 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h2 className="fjalla-one-regular text-4xl font-bold text-white transition-all duration-300 group-hover:text-[#FAA5B9] group-hover:drop-shadow-[0_0_20px_rgba(250,165,185,0.5)]">
                              {project.title}
                            </h2>
                            <span className="flex-shrink-0 rounded-full bg-zinc-800/80 px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all duration-300 group-hover:bg-pink-500/20 group-hover:text-pink-300">
                              #{String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          {project.subtitle && (
                            <p className="fjalla-one-regular text-base font-light text-zinc-400/90 italic transition-colors duration-300 group-hover:text-zinc-300">
                              {project.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {project.description && (
                        <p className="mb-6 leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2.5">
                        {project.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-full border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-500/50 group-hover:bg-zinc-700/80 group-hover:text-pink-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer spacing */}
          <div className="mt-16 text-center">
            <p className="text-sm text-zinc-500">End of projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
