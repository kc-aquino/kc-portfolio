import React from 'react';
import colors from '../../style/colorPalette';
import GrainTexture from '../GrainTexture';
import CircularText from '../reactbits/CircularText/CircularText';
import TiltedCard from '../reactbits/TiltedCard/TiltedCard';

// Main ProjectsSection Component
const ProjectsSection = ({ mousePos, onSelect }) => {
  const projects = [
    {
      id: 1,
      title: 'USAT.io',
      subtitle: 'Landing Page',
      techStack: ['React', 'TypeScript', 'Tailwind CSS'],
      thumbnail:
        'https://verpex.com/assets/uploads/images/blog/Business-Website-Verpex.webp?v=1706620702',
    },
    {
      id: 2,
      title: 'Twenty One (XXI)',
      subtitle: 'Landing Page',
      techStack: ['Next.js', 'GSAP', 'Framer Motion'],
      thumbnail:
        'https://verpex.com/assets/uploads/images/blog/Business-Website-Verpex.webp?v=1706620702',
    },
    {
      id: 3,
      title: 'Hong Kong Space Museum',
      subtitle: 'Exhibition Interactive Panel',
      techStack: ['Electron', 'Three.js', 'WebGL'],
      thumbnail:
        'https://verpex.com/assets/uploads/images/blog/Business-Website-Verpex.webp?v=1706620702',
    },
  ];

  return (
    <section
      id="projects"
      className="relative flex h-screen min-w-screen flex-shrink-0 items-center bg-zinc-900 px-20"
    >
      <GrainTexture opacity={0.3} blendMode="screen" />

      <div className="relative z-10 mx-auto w-full max-w-[1800px]">
        <div className="flex items-start justify-between gap-8">
          {/* Projects Grid */}
          <div className="flex flex-1 items-start justify-center gap-12">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-300 ${index === 1 ? 'mt-20' : ''}`}
                onClick={() => onSelect(project)}
              >
                <TiltedCard
                  imageSrc={project.thumbnail}
                  altText={project.title}
                  captionText=""
                  containerHeight="400px"
                  containerWidth="480px"
                  imageHeight="280px"
                  imageWidth="480px"
                  rotateAmplitude={20}
                  scaleOnHover={1.2}
                  displayOverlayContent={false}
                />

                {/* Title & Subtitle */}
                <div className="mb-3">
                  <h3 className="mb-1 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-pink-500">
                    {project.title}
                  </h3>
                  <p className="text-base font-light text-zinc-400">{project.subtitle}</p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full border border-zinc-600 bg-zinc-800/80 px-4 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/50 hover:bg-zinc-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Circular "See More" Button  */}
          <div className="ml-10 flex items-center justify-center self-center">
            <CircularText
              text="S e e  M o r e   •   S e e  M o r e   •  "
              onHover="goBonkers"
              spinDuration={20}
              className="custom-class"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
