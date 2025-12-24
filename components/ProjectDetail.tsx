
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
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const nextProject = useMemo(() => {
    const currentIndex = allProjects.findIndex(p => p.id === project.id);
    return allProjects[(currentIndex + 1) % allProjects.length];
  }, [project.id, allProjects]);

  const [isExpanded, setIsExpanded] = React.useState(false);
  const MAX_CHARS = 180;
  const description = project.tagline || project.description;
  const isLong = description.length > MAX_CHARS;
  const displayDescription = (isLong && !isExpanded) ? `${description.slice(0, MAX_CHARS)}...` : description;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      {/* Premium Editorial Hero Section */}
      <section className="relative w-full pt-48 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-neutral-900 pb-24">
          <div className="md:col-span-12">
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: EASING }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center gap-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-500 whitespace-nowrap">
                  {project.category}
                </span>
                <div className="h-[1px] w-12 bg-neutral-800" />
                <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-500 whitespace-nowrap">
                  {project.year}
                </span>
              </div>

              <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] uppercase">
                {project.title.split(' ').map((word, i) => (
                  <span key={word} className={i % 2 !== 0 ? "text-neutral-500 italic block md:inline" : "text-white block md:inline"}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Metadata Grid */}
        {/* Editorial Metadata Grid */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASING }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 py-32 border-b border-neutral-900"
        >
          <div className="md:col-span-12 flex flex-col justify-between mb-24">
            <div className="max-w-5xl mb-12">
              <h2 className="text-4xl md:text-7xl font-medium tracking-tight leading-[1.1] text-white">
                {displayDescription}
              </h2>

              {isLong && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500 hover:text-white transition-colors flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                    {isExpanded ? '↑' : '↓'}
                  </div>
                  <span>{isExpanded ? 'READ LESS' : 'READ MORE'}</span>
                </button>
              )}
            </div>

            {/* Redesigned Launch Button */}
            <a
              href={project.externalLink || "#"}
              target={project.openInNewTab ? "_blank" : "_self"}
              className="group relative w-fit px-8 py-4 bg-white text-black overflow-hidden transition-transform duration-300 active:scale-95"
            >
              <div className="flex items-center gap-6 relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                  Launch Project
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </a>
          </div>

          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10">
            <MetadataItem label="ROLE" values={project.services || ["Design & Development"]} />
            <MetadataItem label="YEAR" value={project.year} />
            <MetadataItem label="CLIENT" values={["Internal /", "Confidential"]} />
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

      {/* Floating Close Button */}
      <motion.button
        onClick={onBack}
        initial={{ x: "-50%", y: 100, opacity: 0 }}
        animate={{
          x: "-50%",
          y: isVisible ? 0 : 150,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-4 px-6 py-3 bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl group active:scale-95 transition-transform"
      >
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-black transition-colors">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/70 group-hover:text-white transition-colors">
          Close
        </span>
      </motion.button>
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
