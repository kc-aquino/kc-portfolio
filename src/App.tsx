import { useState, useEffect, useRef, useMemo } from 'react';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import EducationSection from './components/sections/EducationSection';
import ExperienceSection from './components/sections/ExperienceSection';

import ProjectModal from './components/ProjectModal';
import LoadingScreen from './components/LoadingScreen';
import AllProjectsPage from './components/AllProjectsPage';
import projects from './data/projects';
import type { Project } from './data/projects';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllProjectsPage, setShowAllProjectsPage] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // --- Render ---
  return (
    <div
      className={`relative bg-zinc-950 ${
        showAllProjectsPage || isMobile ? 'h-auto overflow-y-auto' : 'h-screen overflow-x-hidden'
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
                    : 'h-screen flex-row overflow-x-auto overflow-y-hidden scroll-smooth'
                }`}
              >
                <div ref={heroRef} className={isMobile ? 'h-screen' : ''}>
                  <HeroSection
                    mousePos={mousePos}
                    onEnter={() => scrollToSection(projectsRef)}
                    scrollToSection={scrollToSection}
                    sections={sections}
                  />
                </div>

                <div ref={aboutRef} className={isMobile ? 'h-screen' : ''}>
                  <AboutSection />
                </div>

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
            </>
          )}

          {isMobile && (
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-zinc-900/30 transition-transform active:scale-95"
            >
              <span className="sr-only">Open menu</span>
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 rounded bg-zinc-900" />
                <span className="block h-0.5 w-6 rounded bg-zinc-900" />
                <span className="block h-0.5 w-6 rounded bg-zinc-900" />
              </div>
            </button>
          )}

          {isMobile && isMobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/30"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed right-4 bottom-24 z-50 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-zinc-950/5">
                <ul className="py-2">
                  {[
                    { label: 'Home', ref: heroRef },
                    { label: 'About', ref: aboutRef },
                    { label: 'Projects', ref: projectsRef },
                    { label: 'Experience', ref: experienceRef },
                    { label: 'Education', ref: educationRef },
                    { label: 'Contact', ref: contactRef },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-left text-zinc-900 hover:bg-zinc-50"
                        onClick={() => {
                          scrollToSection(item.ref);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
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
