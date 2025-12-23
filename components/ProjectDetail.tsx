
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { EASING, PROJECTS } from '../constants';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNavigate: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.id]);

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group mb-12 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO WORK
        </button>

        {/* Hero Section */}
        <header className="mb-24 md:mb-48">
          <motion.h1 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASING }}
            className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] mb-8"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASING, delay: 0.2 }}
            className="text-2xl md:text-4xl text-neutral-400 font-light max-w-4xl"
          >
            {project.tagline || project.description}
          </motion.p>
        </header>

        {/* Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-neutral-900 pt-12 mb-32 md:mb-64">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <MetadataItem label="YEAR" value={project.year} />
            <MetadataItem label="SERVICES" values={project.services} />
            <MetadataItem label="AWARDS" values={project.awards} />
            {project.results && project.results.map((res, i) => (
              <MetadataItem key={i} label={res.label} value={res.value} />
            ))}
          </div>
          
          <div className="md:col-span-4 flex flex-col justify-between items-start md:items-end">
             {project.liveLink && (
               <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden font-medium text-sm uppercase tracking-tighter"
               >
                 <span className="relative z-10">Visit Live Site</span>
                 <motion.div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
               </a>
             )}

             {project.performance && (
               <div className="mt-12 text-left md:text-right">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2">CARBON FOOTPRINT</span>
                  <div className="flex gap-4 items-center md:justify-end">
                    <span className="text-xl font-bold">{project.performance.carbon}</span>
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-neutral-500 text-xs font-mono">{project.performance.loadTime} LOAD</span>
                  </div>
               </div>
             )}
          </div>
        </div>

        {/* Gallery */}
        <section className="space-y-12 md:space-y-24 mb-32 md:mb-64">
           {project.gallery?.map((img, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 100 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: EASING }}
               className="w-full overflow-hidden rounded-sm bg-neutral-900"
             >
                <img src={img} alt={`${project.title} detail ${i}`} className="w-full object-cover" />
             </motion.div>
           ))}
        </section>

        {/* Project Navigation */}
        <nav className="flex flex-col md:flex-row justify-between items-center border-t border-neutral-900 pt-24 gap-12">
           <ProjectNavLink 
             direction="PREVIOUS" 
             title={prevProject.title} 
             onClick={() => onNavigate(prevProject.id)} 
           />
           <div className="h-12 w-[1px] bg-neutral-800 hidden md:block" />
           <ProjectNavLink 
             direction="NEXT" 
             title={nextProject.title} 
             onClick={() => onNavigate(nextProject.id)} 
             align="right"
           />
        </nav>
      </div>
    </motion.div>
  );
};

interface MetadataItemProps {
  label: string;
  value?: string;
  values?: string[];
}

const MetadataItem: React.FC<MetadataItemProps> = ({ label, value, values }) => (
  <div className="flex flex-col gap-2">
    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">{label}</span>
    {value && <span className="text-sm md:text-base font-medium">{value}</span>}
    {values && values.map((v, i) => (
      <span key={i} className="text-sm md:text-base font-medium">{v}</span>
    ))}
  </div>
);

interface ProjectNavLinkProps {
  direction: string;
  title: string;
  onClick: () => void;
  align?: 'left' | 'right';
}

const ProjectNavLink: React.FC<ProjectNavLinkProps> = ({ direction, title, onClick, align = 'left' }) => (
  <button 
    onClick={onClick}
    className={`group flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
  >
    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-4 group-hover:text-white transition-colors">
      {direction} PROJECT
    </span>
    <span className="text-3xl md:text-6xl font-bold tracking-tighter group-hover:italic transition-all uppercase">
      {title}
    </span>
  </button>
);

export default ProjectDetail;
