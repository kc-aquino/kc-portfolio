import React, { useState, useEffect, useRef, useMemo } from 'react';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';

import ProjectModal from './components/ProjectModal';
import LoadingScreen from './components/LoadingScreen';
import SectionDots from './components/SectionDots';
import VerticalMarquee from './components/VerticalMarquee';

const App = () => {
  const [scrollX, setScrollX] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sections = useMemo(
    () => [
      { id: 'hero', ref: heroRef },
      { id: 'about', ref: aboutRef },
      { id: 'projects', ref: projectsRef },
      { id: 'skills', ref: skillsRef },
      { id: 'contact', ref: contactRef },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;

    if (containerRef.current && !isMobile) {
      containerRef.current.scrollTo({
        left: ref.current.offsetLeft,
        behavior: 'smooth',
      });
    } else {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Track visible section for horizontal scroll
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const handleScroll = () => {
      const scrollLeft = containerRef.current!.scrollLeft;
      setScrollX(scrollLeft);

      const containerWidth = containerRef.current!.offsetWidth;
      let currentIndex = 0;
      sections.forEach((section, index) => {
        const el = section.ref.current;
        if (el) {
          const sectionLeft = el.offsetLeft;
          const sectionWidth = el.offsetWidth;
          const center = sectionLeft + sectionWidth / 2;

          if (scrollLeft + containerWidth / 2 >= center) {
            currentIndex = index;
          }
        }
      });
      setActiveIndex(currentIndex);
    };

    const ref = containerRef.current;
    ref.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => ref.removeEventListener('scroll', handleScroll);
  }, [sections, isMobile]);

  return (
    <div className="relative h-screen overflow-hidden bg-zinc-950">
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <>
          <div
            ref={containerRef}
            className={`flex ${
              isMobile
                ? 'h-auto flex-col overflow-y-auto'
                : 'h-full flex-row overflow-x-auto scroll-smooth'
            }`}
          >
            <div ref={heroRef}>
              <HeroSection mousePos={mousePos} onEnter={() => scrollToSection(projectsRef)} />
            </div>

            {!isMobile && <VerticalMarquee text="ABOUT " speed={6} />}

            <div ref={aboutRef}>
              <AboutSection mousePos={mousePos} />
            </div>

            <div ref={projectsRef}>
              <ProjectsSection mousePos={mousePos} onSelect={setSelectedProject} />
            </div>

            <div ref={skillsRef}>
              <SkillsSection mousePos={mousePos} />
            </div>

            <div ref={contactRef}>
              <ContactSection mousePos={mousePos} />
            </div>
          </div>
          {!isMobile && (
            <>
              <SectionDots
                sections={sections}
                activeIndex={activeIndex}
                onDotClick={scrollToSection}
              />
            </>
          )}

          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
