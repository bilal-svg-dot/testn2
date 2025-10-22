import React from 'react';
import CodeIcon from './icons/CodeIcon';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm border border-slate-700/50 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-cyan-500/10 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <p className="text-xs font-semibold tracking-wider uppercase text-slate-500 mb-2">{project.owner}</p>
      <h3 className="text-2xl font-bold text-cyan-400 mb-2">{project.title}</h3>
      <p className="text-slate-400 italic mb-4">{project.tagline}</p>
      <p className="text-slate-300 mb-6 whitespace-pre-line">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="flex items-center gap-2 bg-slate-700 text-cyan-300 text-xs font-medium px-3 py-1 rounded-full"
          >
            <CodeIcon className="w-4 h-4" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;