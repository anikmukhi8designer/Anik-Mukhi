
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { EASING } from '../constants';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASING, delay: index * 0.1 }}
      className="group relative w-full mb-32 md:mb-64"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div 
          onClick={() => onClick(project.id)}
          className="md:col-span-7 overflow-hidden rounded-sm bg-neutral-900 aspect-[4/3] md:aspect-video relative cursor-pointer"
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
        </div>
        
        <div className="md:col-span-5 md:pl-12 pt-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-neutral-500">{project.id}</span>
              <div className="h-[1px] w-8 bg-neutral-700" />
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{project.category}</span>
            </div>
            
            <h3 
              onClick={() => onClick(project.id)}
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 group-hover:text-white transition-all duration-500 cursor-pointer group-hover:translate-x-2 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {project.title}
            </h3>
            <p className="text-neutral-400 text-lg md:text-xl max-w-md leading-relaxed mb-8 transition-opacity duration-500 group-hover:text-neutral-300">
              {project.description}
            </p>
          </div>
          
          <div className="flex justify-between items-end border-t border-neutral-900 pt-8">
             <span className="font-mono text-xs text-neutral-500">{project.year}</span>
             <button 
              onClick={() => onClick(project.id)}
              className="group/btn relative overflow-hidden px-6 py-3 border border-neutral-800 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
             >
                <div className="absolute inset-0 bg-white translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <div className="relative flex items-center gap-2 z-10 transition-colors duration-500 group-hover/btn:text-black">
                  <span className="text-sm uppercase tracking-tighter font-medium">View Project</span>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">
                    <path d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM11 4.5C11 4.22386 10.7761 4 10.5 4L6 4C5.72386 4 5.5 4.22386 5.5 4.5C5.5 4.77614 5.72386 5 6 5L10 5L10 9C10 9.27614 10.2239 9.5 10.5 9.5C10.7761 9.5 11 9.27614 11 9L11 4.5ZM4.35355 12.0607L10.8536 5.56066L10.1464 4.85355L3.64645 11.3536L4.35355 12.0607Z" fill="currentColor" />
                  </svg>
                </div>
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
