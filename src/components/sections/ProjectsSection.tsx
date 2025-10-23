import React from 'react';
import GrainTexture from '../GrainTexture';
import CircularText from '../reactbits/CircularText/CircularText';
import TiltedCard from '../reactbits/TiltedCard/TiltedCard';
import projects from '../../data/projects';
import useIsMobile from '../../hook/useIsMobile';
import VerticalMarquee from '../VerticalMarquee';
import InfiniteScroll from '../InfiniteScroll';

type ProjectsSectionProps = {
  onShowAllProjects: () => void;
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onShowAllProjects }) => {
  const isMobile = useIsMobile();

  // Show only 3 projects on both mobile and desktop
  const visibleProjects = projects.slice(0, 3);

  return (
    <section
      id="projects"
      className={`relative flex bg-zinc-900 ${
        isMobile
          ? 'min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-4 pb-8'
          : 'h-screen w-[150vw] flex-shrink-0 flex-row items-center justify-start overflow-visible pr-[8vw] pl-0'
      }`}
    >
      <GrainTexture opacity={0.3} blendMode="screen" />

      {/* Header — InfiniteScroll (mobile) or VerticalMarquee (desktop) */}
      {isMobile ? (
        <div className="absolute top-0 w-full shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
          <InfiniteScroll
            text="PROJECTS  "
            baseVelocity={2}
            direction="left"
            textClassName="text-3xl font-bold tracking-[0.3em] px-3"
            textColor="pink"
            textVariant="mixed"
            strokeColor="pink"
            solidColor="white"
            containerStyle={{
              backgroundColor: 'transparent',
              height: '45px',
            }}
          />
        </div>
      ) : (
        <VerticalMarquee text="PROJECTS " speed={4} darkMode={true} />
      )}

      {/* Projects container */}
      <div
        className={`relative z-10 mx-auto w-full ${
          isMobile ? 'mt-[70px] flex flex-col items-center justify-start' : 'max-w-[1800px]'
        }`}
      >
        <div
          className={`flex ${
            isMobile
              ? 'flex-col items-center justify-start gap-4'
              : 'items-start justify-between gap-8'
          }`}
        >
          {/* Projects Grid */}
          <div
            className={`flex ${
              isMobile
                ? 'w-full flex-col items-center justify-start gap-8'
                : 'flex-1 items-start justify-center gap-12'
            }`}
          >
            {visibleProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group w-full cursor-pointer transition-all duration-300 ${
                  !isMobile && index === 1 ? 'mt-20' : ''
                } ${isMobile ? 'max-w-[min(85vw,380px)]' : ''}`}
                onClick={() => window.open(project.link, '_blank')}
              >
                <TiltedCard
                  imageSrc={project.thumbnail}
                  altText=""
                  captionText={(project.techStack || []).join(' ♦ ')}
                  containerHeight={isMobile ? '200px' : '300px'}
                  containerWidth={isMobile ? '100%' : '500px'}
                  imageHeight={isMobile ? '160px' : '230px'}
                  imageWidth={isMobile ? '100%' : '500px'}
                  rotateAmplitude={isMobile ? 3 : 20}
                  scaleOnHover={isMobile ? 1.03 : 1.2}
                  displayOverlayContent={false}
                />

                {/* Title & Subtitle */}
                <div
                  className={`mt-2 ${
                    isMobile ? 'flex flex-col items-center px-2 text-center' : 'text-left'
                  }`}
                >
                  <h3 className="fjalla-one-regular mb-0.5 text-lg font-bold text-white transition-all duration-300 group-hover:text-[#FAA5B9] group-hover:drop-shadow-[0_0_20px_rgba(250,165,185,0.5)] sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="fjalla-one-regular text-xs font-light text-zinc-400/90 italic transition-colors duration-300 group-hover:text-zinc-300 sm:text-sm">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Circular "See More" Button */}
          <div
            className={`flex cursor-pointer items-center justify-center ${
              isMobile ? 'mt-2' : 'self-center'
            }`}
            onClick={onShowAllProjects}
          >
            <CircularText
              text="S e e  M o r e   •   S e e  M o r e   •  "
              onHover="speedUp"
              spinDuration={12}
              className={`${isMobile ? 'scale-75' : 'scale-100'} transition-transform duration-300`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
