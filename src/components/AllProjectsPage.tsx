import React from 'react';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import useIsMobile from '../hook/useIsMobile';

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
}

const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ projects, onBack }) => {
  const [_hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

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
        <div
          className={`sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm ${isMobile ? 'px-4 py-6' : 'px-8 py-8'}`}
        >
          <div className={`mx-auto ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
            <button
              onClick={onBack}
              className={`group mb-6 flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-pink-400 ${isMobile ? 'mb-4' : ''}`}
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back to Portfolio</span>
            </button>
            <div>
              <h1
                className={`fjalla-one-regular font-bold text-white ${isMobile ? 'text-4xl' : 'text-6xl'}`}
              >
                All Projects
              </h1>
              <p className={`mt-3 text-zinc-400 ${isMobile ? 'text-base' : 'text-lg'}`}>
                A comprehensive collection of {projects.length}{' '}
                {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`mx-auto ${isMobile ? 'max-w-full px-4 py-8' : 'max-w-7xl px-8 py-12'}`}>
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 hover:border-pink-500/40 hover:bg-zinc-800/60 hover:shadow-2xl hover:shadow-pink-500/10 ${
                  isMobile ? 'p-4' : 'p-8'
                }`}
                onClick={() => {
                  // Only open link or modal if there is a link
                  if (project.link) {
                    window.open(project.link, '_blank');
                  }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'gap-8'}`}>
                  {/* Thumbnail */}
                  {project.thumbnail && (
                    <div className="flex-shrink-0">
                      <div
                        className={`relative overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg ${
                          isMobile ? 'h-48 w-full' : 'h-48 w-80'
                        }`}
                      >
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
                      <div
                        className={`mb-4 flex items-start justify-between ${isMobile ? 'flex-col gap-2' : ''}`}
                      >
                        <div className="flex-1">
                          <div
                            className={`mb-2 flex items-center gap-3 ${isMobile ? 'flex-col items-start gap-2' : ''}`}
                          >
                            <h2
                              className={`fjalla-one-regular font-bold text-white transition-all duration-300 group-hover:text-[#FAA5B9] group-hover:drop-shadow-[0_0_20px_rgba(250,165,185,0.5)] ${
                                isMobile ? 'text-2xl' : 'text-4xl'
                              }`}
                            >
                              {project.title}
                            </h2>
                            <span
                              className={`flex-shrink-0 rounded-full bg-zinc-800/80 px-4 py-1.5 font-medium text-zinc-400 transition-all duration-300 group-hover:bg-pink-500/20 group-hover:text-pink-300 ${
                                isMobile ? 'text-xs' : 'text-sm'
                              }`}
                            >
                              #{String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          {project.subtitle && (
                            <p
                              className={`fjalla-one-regular font-light text-zinc-400/90 italic transition-colors duration-300 group-hover:text-zinc-300 ${
                                isMobile ? 'text-sm' : 'text-base'
                              }`}
                            >
                              {project.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {project.description && (
                        <p
                          className={`mb-6 leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300 ${
                            isMobile ? 'text-sm' : 'text-base'
                          }`}
                        >
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
                            className={`rounded-full border border-zinc-600 bg-zinc-800/80 font-medium text-zinc-200 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-500/50 group-hover:bg-zinc-700/80 group-hover:text-pink-200 ${
                              isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
                            }`}
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
          <div className={`text-center ${isMobile ? 'mt-12' : 'mt-16'}`}>
            <p className="text-sm text-zinc-500">End of projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsPage;
