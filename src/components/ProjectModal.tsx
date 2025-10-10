import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-900 p-10">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-zinc-400 transition hover:text-white"
      >
        <X size={24} />
      </button>
      <h3 className="mb-4 text-3xl font-medium text-white">{project.title}</h3>
      <p className="mb-6 text-zinc-400">{project.desc}</p>
      <a
        href={project.link}
        target="_blank"
        className="inline-flex items-center gap-2 text-violet-400 transition hover:text-violet-300"
      >
        Visit Project <ExternalLink size={18} />
      </a>
    </div>
  </div>
);

export default ProjectModal;
