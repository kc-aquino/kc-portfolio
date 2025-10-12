import React from 'react';
import colors from '../../style/colorPalette';
import GrainTexture from '../GrainTexture';
import CircularText from '../reactbits/CircularText/CircularText';
import TiltedCard from '../reactbits/TiltedCard/TiltedCard';
import projects from '../../data/projects';

// Main ProjectsSection Component
const ProjectsSection = ({ mousePos, onSelect }) => {
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
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className={`group cursor-pointer transition-all duration-300 ${index === 1 ? 'mt-20' : ''}`}
                onClick={() => onSelect(project)}
              >
                <TiltedCard
                  imageSrc={project.thumbnail}
                  altText=""
                  captionText={project.title}
                  containerHeight="300px"
                  containerWidth="500px"
                  imageHeight="230px"
                  imageWidth="500px"
                  rotateAmplitude={20}
                  scaleOnHover={1.2}
                  displayOverlayContent={false}
                />

                {/* Title & Subtitle */}
                <div className="mb-4">
                  <h3 className="mb-2 text-3xl font-bold text-white transition-all duration-300 group-hover:text-[#FAA5B9] group-hover:drop-shadow-[0_0_20px_rgba(250,165,185,0.5)]">
                    {project.title}
                  </h3>
                  <p className="text-base font-light text-zinc-400/90 italic transition-colors duration-300 group-hover:text-zinc-300">
                    {project.subtitle}
                  </p>
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
          <div className="flex items-center justify-center self-center">
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
