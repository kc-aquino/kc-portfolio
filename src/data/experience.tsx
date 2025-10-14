export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  desc: string;
  logo: string;
}

export const experience: Experience[] = [
  {
    title: 'Junior Software Developer',
    company: 'Go8 Technology Inc.',
    period: 'Apr 2025 - Present',
    location: 'Your Location',
    desc: 'Designing and developing responsive UIs for streaming platforms with focus on user experience',
    logo: '/src/assets/icons/go8_logo.jpg',
  },
  {
    title: 'Intern Software Developer',
    company: 'Go8 Technology Inc.',
    period: 'Mar - May 2025',
    location: 'Your Location',
    desc: 'Full-stack development with ReactJS, React Native, Flutter with emphasis on UI implementation',
    logo: '/src/assets/icons/go8_logo.jpg',
  },
  {
    title: 'Graphic Designer Intern',
    company: 'Joysis TVI - Ollopa Corporation',
    period: 'Nov - Dec 2024',
    location: 'Your Location',
    desc: 'Java NC III certification internship focusing on visual design and user interfaces',
    logo: '/src/assets/icons/joysis-ollopa_logo.png',
  },
];
