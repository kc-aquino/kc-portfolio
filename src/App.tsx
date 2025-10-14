import React, { useState, useEffect, useRef, useMemo } from 'react';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import EducationSection from './components/sections/EducationSection';
import ExperienceSection from './components/sections/ExperienceSection';

import ProjectModal from './components/ProjectModal';
import LoadingScreen from './components/LoadingScreen';
import SectionDots from './components/SectionDots';
import VerticalMarquee from './components/VerticalMarquee';
import AllProjectsPage from './components/AllProjectsPage';
import projects from './data/projects';
import type { Project } from './data/projects';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAllProjectsPage, setShowAllProjectsPage] = useState(false);

  // --- Refs ---
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Persistent scroll state
  const scrollLockRef = useRef(false);
  const targetScrollLeftRef = useRef(0);
  const currentScrollLeftRef = useRef(0);

  // --- Section Refs Map ---
  const sections = useMemo(
    () => [
      { id: 'hero', ref: heroRef },
      { id: 'about', ref: aboutRef },
      { id: 'projects', ref: projectsRef },
      { id: 'experience', ref: experienceRef },
      { id: 'education', ref: educationRef },
      { id: 'contact', ref: contactRef },
    ],
    []
  );

  // --- Loading screen delay ---
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Responsive check ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- Mouse position ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- Scroll to section ---
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }

    scrollLockRef.current = true;
    setTimeout(() => (scrollLockRef.current = false), 1500);

    const container = containerRef.current;
    if (container && !isMobile) {
      const targetPosition = ref.current?.offsetLeft ?? 0;

      // Sync scroll values
      targetScrollLeftRef.current = targetPosition;
      currentScrollLeftRef.current = targetPosition;

      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth',
      });

      const sectionIndex = sections.findIndex((s) => s.ref === ref);
      if (sectionIndex !== -1) setActiveIndex(sectionIndex);
    } else {
      ref.current!.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Wheel to horizontal scroll ---
  useEffect(() => {
    if (isMobile || showAllProjectsPage) return;

    let animationFrameId: number;

    const smoothScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      currentScrollLeftRef.current +=
        (targetScrollLeftRef.current - currentScrollLeftRef.current) * 0.1;
      container.scrollLeft = currentScrollLeftRef.current;

      if (Math.abs(targetScrollLeftRef.current - currentScrollLeftRef.current) > 0.5) {
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return;
      if (document.body.hasAttribute('data-modal-open')) return;

      const container = containerRef.current;
      if (!container) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        e.stopPropagation();

        targetScrollLeftRef.current += e.deltaY;
        targetScrollLeftRef.current = Math.max(
          0,
          Math.min(targetScrollLeftRef.current, container.scrollWidth - container.clientWidth)
        );

        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    if (containerRef.current) {
      currentScrollLeftRef.current = containerRef.current.scrollLeft;
      targetScrollLeftRef.current = currentScrollLeftRef.current;
    }

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, showAllProjectsPage]);

  // --- Track visible section ---
  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const container = containerRef.current;

    const updateActiveSection = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;

      let currentIndex = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i].ref.current;
        if (!el) continue;
        const left = el.offsetLeft;
        const right = left + el.offsetWidth;
        const middle = scrollLeft + containerWidth / 2;

        if (middle >= left && middle < right) {
          currentIndex = i;
          break;
        }
      }
      setActiveIndex(currentIndex);
    };

    // Update continuously during scroll animation
    const handleScroll = () => updateActiveSection();
    container.addEventListener('scroll', handleScroll);
    updateActiveSection();

    // Also run it every animation frame to sync with smooth scrolling
    let frameId: number;
    const syncActive = () => {
      updateActiveSection();
      frameId = requestAnimationFrame(syncActive);
    };
    frameId = requestAnimationFrame(syncActive);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [sections, isMobile]);

  // --- Render ---
  return (
    <div
      className={`relative bg-zinc-950 ${
        showAllProjectsPage ? 'h-auto overflow-y-auto' : 'h-screen overflow-hidden'
      }`}
    >
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <>
          {showAllProjectsPage ? (
            <AllProjectsPage
              projects={projects}
              onBack={() => setShowAllProjectsPage(false)}
              onSelectProject={setSelectedProject}
            />
          ) : (
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
                  <HeroSection
                    mousePos={mousePos}
                    onEnter={() => scrollToSection(projectsRef)}
                    scrollToSection={scrollToSection}
                    sections={sections}
                  />
                </div>

                {!isMobile && <VerticalMarquee text="ABOUT" speed={6} />}

                <div ref={aboutRef}>
                  <AboutSection />
                </div>

                {!isMobile && <VerticalMarquee text="PROJECTS" speed={6} darkMode={true} />}

                <div ref={projectsRef}>
                  <ProjectsSection onShowAllProjects={() => setShowAllProjectsPage(true)} />
                </div>

                <div ref={experienceRef}>
                  <ExperienceSection mousePos={mousePos} />
                </div>

                <div ref={educationRef}>
                  <EducationSection mousePos={mousePos} />
                </div>

                <div ref={contactRef}>
                  <ContactSection />
                </div>
              </div>

              {!isMobile && (
                <SectionDots
                  sections={sections}
                  activeIndex={activeIndex}
                  onDotClick={scrollToSection}
                />
              )}
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
