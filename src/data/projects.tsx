// src/data/projects.ts
import cinepopThumbnail from '@/assets/projects/cinepop-home.png';
import nxiThumbnail from '@/assets/projects/nxi-portal.png';
import cimThumbnail from '@/assets/projects/cim-platform.png';

export interface Project {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  thumbnail?: string;
  link?: string;
  techStack?: string[];
  role?: string;
  award?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'CinePop Web Platform',
    subtitle:
      'Front-end development for a Next.js-based streaming platform with responsive UI and video playback features',
    techStack: [
      'ReactJS',
      'Next.js',
      'TailwindCSS',
      'Framer Motion',
      'Redux Toolkit',
      'Shaka Player',
      'Firebase',
      'Google OAuth',
    ],
    thumbnail: cinepopThumbnail,
    link: 'https://cinepop.film/',
    role: 'UI/UX Design & Frontend Development',
  },
  {
    id: 2,
    title: 'NXI Frontend Portal',
    subtitle:
      'Freelance front-end development for an enterprise game project management system built with React and TypeScript',
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'TailwindCSS',
      'React Router',
      'Axios',
      'React Hot Toast',
      'React Dropzone',
    ],
    thumbnail: nxiThumbnail,
    link: 'https://nxi.xyz/',
    role: 'UI Design & Frontend Development',
  },
  {
    id: 3,
    title: 'CIM Platform',
    subtitle: 'Social media platform with AI integration and real-time features',
    techStack: ['React Native', 'MongoDB', 'Firebase'],
    thumbnail: cimThumbnail,
    link: 'https://thesis-cim-23.onrender.com/',
    role: 'Full Product Design & Development',
    award: true,
  },
  {
    id: 4,
    title: 'Adspace',
    subtitle: 'Digital signage platform with role-based access control',
    techStack: ['React Native', 'Laravel'],
    thumbnail: '/thumbnails/adspace.png',
    role: 'UX Design & Mobile Development',
  },
  {
    id: 5,
    title: 'SMS System',
    subtitle: 'Student Management System with MVC architecture',
    techStack: ['Java', 'MySQL', 'PHP'],
    thumbnail: '/thumbnails/sms.png',
    role: 'Interface Design & Backend Integration',
  },
];

export default projects;
