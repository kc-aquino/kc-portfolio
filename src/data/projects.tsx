// src/data/projects.ts
import cinepopThumbnail from '@/assets/projects/cinepop-home.png';
import nxiThumbnail from '@/assets/projects/nxi-portal.png';
import cimThumbnail from '@/assets/projects/cim-platform.png';

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  techStack: string[];
  thumbnail: string;
  link?: string;
  role?: string;
  award?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'CinePop',
    subtitle: 'Streaming platform with responsive design and content discovery features',
    techStack: ['Next.js', 'React', 'TailwindCSS'],
    thumbnail: cinepopThumbnail,
    link: 'https://cinepop.film/',
    role: 'UI/UX Design & Frontend Development',
  },
  {
    id: 2,
    title: 'NXI Portal',
    subtitle: 'Modern web portal with JWT authentication and interactive dashboards',
    techStack: ['React Vite', 'TypeScript'],
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
