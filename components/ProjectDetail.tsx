
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project, ContentBlock } from '../types';
import { EASING } from '../constants';

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onNavigate: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, allProjects, onBack, onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  const nextProject = useMemo(() => {
    const currentIndex = allProjects.findIndex(p => p.id === project.id);
    return allProjects[(currentIndex + 1) % allProjects.length];
  }, [project.id, allProjects]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0a] text-white"
    >
      {/* Immersive Hero Section */}
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASING }}
          className="absolute inset-0"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-24 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASING }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-400 mb-6 block">
              {project.category} &mdash; {project.year}
            </span>
            <h1 className="text-[14vw] md:text-[10vw] font-bold tracking-tighter leading-[0.8] uppercase mb-8">
              {project.title}
            </h1>
          </motion.div>
        </div>

        <motion.button 
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed top-10 left-6 md:left-12 z-[100] mix-blend-difference group flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-500"
        >
          <div className="relative overflow-hidden w-4 h-4">
             <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-full">←</span>
             <span className="absolute inset-0 flex items-center justify-center translate-x-full transition-transform duration-500 group-hover:translate-x-0">←</span>
          </div>
          CLOSE
        </motion.button>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Metadata Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 py-24 border-b border-neutral-900"
        >
          <div className="md:col-span-8">
             <h2 className="text-3xl md:text-5xl font-light leading-snug text-neutral-200">
               {project.tagline || project.description}
             </h2>
          </div>
          <div className="md:col-span-4 grid grid-cols-2 gap-8 h-fit">
            <MetadataItem label="ROLE" values={project.services || ["Design & Development"]} />
            <MetadataItem label="YEAR" value={project.year} />
            <MetadataItem label="CLIENT" value="Internal / Confidential" />
            <MetadataItem label="TOOLS" values={["Figma", "React", "GSAP"]} />
          </div>
        </motion.section>

        {/* Dynamic Content Blocks - The "Case Study" */}
        <section className="py-32 space-y-48">
           {project.contentBlocks?.map((block: ContentBlock, i: number) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, ease: EASING }}
               className="w-full"
             >
               {block.type === 'text' && (
                 <div className="max-w-4xl mx-auto">
                   {block.title && (
                     <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-6 block">
                       {block.title}
                     </span>
                   )}
                   {block.body && (
                     <p className="text-2xl md:text-4xl text-neutral-300 leading-relaxed font-light">
                       {block.body}
                     </p>
                   )}
                 </div>
               )}

               {block.type === 'image' && block.images && (
                 <div className="flex flex-col gap-8">
                    <div className="overflow-hidden rounded-sm bg-neutral-900">
                      <motion.img 
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 1.5, ease: EASING }}
                        src={block.images[0]} 
                        className="w-full h-auto object-cover max-h-[80vh]" 
                      />
                    </div>
                    {block.caption && (
                      <div className="max-w-4xl mx-auto w-full">
                        <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.2em]">{block.caption}</span>
                      </div>
                    )}
                 </div>
               )}

               {block.type === 'gallery' && block.images && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {block.images.map((img, idx) => (
                      <div key={idx} className="overflow-hidden rounded-sm bg-neutral-900">
                        <motion.img 
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 1.5, ease: EASING }}
                          src={img} 
                          className="w-full aspect-square md:aspect-[4/5] object-cover" 
                        />
                      </div>
                    ))}
                 </div>
               )}
             </motion.div>
           ))}
        </section>
      </div>

      {/* "Up Next" Portal - Behance Style */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group cursor-pointer border-t border-neutral-900 mt-32" onClick={() => onNavigate(nextProject.id)}>
        <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          <img 
            src={nextProject.image} 
            alt={nextProject.title} 
            className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASING }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-neutral-500 mb-8"
          >
            UP NEXT
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASING }}
            className="text-6xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none"
          >
            {nextProject.title}
          </motion.h2>
          <div className="mt-12 overflow-hidden h-12">
             <div className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                <span className="font-mono text-[10px] uppercase tracking-widest h-12 flex items-center">View Case Study</span>
                <span className="font-mono text-[10px] uppercase tracking-widest h-12 flex items-center text-white">View Case Study</span>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const MetadataItem = ({ label, value, values }: any) => (
  <div className="flex flex-col gap-2 group cursor-default">
    <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest group-hover:text-neutral-400 transition-colors">
      {label}
    </span>
    {value && <span className="text-sm md:text-base font-medium uppercase group-hover:text-white transition-colors">{value}</span>}
    {values?.map((v: string) => <span key={v} className="text-sm md:text-base font-medium uppercase group-hover:text-white transition-colors">{v}</span>)}
  </div>
);

export default ProjectDetail;
