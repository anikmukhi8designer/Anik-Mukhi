
import React, { useEffect } from 'react';
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="group mb-12 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK
        </button>

        <header className="mb-24 md:mb-48">
          <motion.h1 
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASING }}
            className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] mb-8 uppercase"
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-neutral-900 pt-12 mb-32">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <MetadataItem label="YEAR" value={project.year} />
            <MetadataItem label="SERVICES" values={project.services} />
            <MetadataItem label="AWARDS" values={project.awards} />
          </div>
          <div className="md:col-span-4 flex justify-end">
            {project.externalLink && (
              <a 
                href={project.externalLink} 
                target="_blank" 
                className="px-8 py-4 bg-white text-black rounded-full font-mono text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors"
              >
                Launch Site
              </a>
            )}
          </div>
        </div>

        {/* Dynamic Content Blocks */}
        <section className="space-y-32 mb-64">
           {project.contentBlocks?.map((block: ContentBlock, i: number) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1, ease: EASING }}
             >
               {block.type === 'text' && (
                 <div className="max-w-3xl">
                   {block.title && <h2 className="text-2xl md:text-4xl font-bold mb-6 uppercase">{block.title}</h2>}
                   {block.body && <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">{block.body}</p>}
                 </div>
               )}

               {block.type === 'image' && block.images && (
                 <div className="flex flex-col gap-4">
                    <img src={block.images[0]} className="w-full h-auto object-cover rounded-sm" />
                    {block.caption && <span className="font-mono text-[10px] text-neutral-600 uppercase">{block.caption}</span>}
                 </div>
               )}

               {block.type === 'gallery' && block.images && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {block.images.map((img, idx) => (
                      <img key={idx} src={img} className="w-full aspect-[4/5] object-cover rounded-sm" />
                    ))}
                 </div>
               )}
             </motion.div>
           ))}
        </section>
      </div>
    </motion.div>
  );
};

const MetadataItem = ({ label, value, values }: any) => (
  <div className="flex flex-col gap-2">
    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">{label}</span>
    {value && <span className="text-base font-medium uppercase">{value}</span>}
    {values?.map((v: string) => <span key={v} className="text-base font-medium uppercase">{v}</span>)}
  </div>
);

export default ProjectDetail;
