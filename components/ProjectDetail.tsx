
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
  }, [project?.id]);

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
    if (!project || !allProjects) return null;
    const currentIndex = allProjects.findIndex(p => p.id === project.id);
    return allProjects[(currentIndex + 1) % allProjects.length];
  }, [project?.id, allProjects]);

  if (!project || !nextProject) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-white selection:text-black"
    >
      {/* Editorial Noise Texture */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[100]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Hero Header: Bold & Minimalist */}
      <section className="relative w-full pt-48 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 mb-20">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: EASING }}
          >
            <h1 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter leading-[0.85] uppercase">
              {project.title}
            </h1>
          </motion.div>
          {project.tagline && (
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: EASING }}
              className="text-lg md:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed"
            >
              {project.tagline}
            </motion.p>
          )}
        </div>

        {/* High-Fidelity Metadata Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 py-16 border-y border-neutral-900"
        >
          <MetadataField label="DATE" value={project.year} />
          <MetadataField label="LOCATION" value={project.location || "REMOTE / GLOBAL"} />
          <MetadataField label="SERVICES" values={project.services} />
          <div className="flex flex-col justify-end items-start md:items-end">
            {(project.externalLink || project.liveLink) && (
              <a
                href={project.externalLink || project.liveLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] font-medium transition-all hover:gap-4"
              >
                <span>Visit Project</span>
                <span className="w-6 h-[1px] bg-white group-hover:w-12 transition-all" />
              </a>
            )}
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-6 md:px-12">
        {/* "The Brief" - Unified Grid Rows */}
        {(project.overview || project.challenge || project.solution) && (
          <section className="py-32 md:py-48 space-y-32">
            {project.overview && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASING }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.5em] block">THE PROBLEM</span>
                </div>
                <div className="md:col-span-9">
                  <p className="text-xl md:text-3xl lg:text-4xl text-white leading-tight font-light max-w-4xl">
                    {project.overview}
                  </p>
                </div>
              </motion.div>
            )}

            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASING }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.5em] block">THE CHALLENGE</span>
                </div>
                <div className="md:col-span-9">
                  <p className="text-xl md:text-3xl lg:text-4xl text-white leading-tight font-light max-w-4xl">
                    {project.challenge}
                  </p>
                </div>
              </motion.div>
            )}

            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASING }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-[0.5em] block">THE SOLUTION</span>
                </div>
                <div className="md:col-span-9">
                  <p className="text-xl md:text-3xl lg:text-4xl text-white leading-tight font-light max-w-4xl">
                    {project.solution}
                  </p>
                </div>
              </motion.div>
            )}
          </section>
        )}

        {/* Immersive Visual Blocks - Unified Alignment */}
        <section className="space-y-48 pb-48">
          {project.contentBlocks?.map((block: ContentBlock, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASING }}
              className="w-full group"
            >
              {block.type === 'text' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-3">
                    {block.title && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-600 block font-medium">
                        {block.title}
                      </span>
                    )}
                  </div>
                  <div className="md:col-span-9">
                    {block.body && (
                      <p className="text-2xl md:text-4xl text-white leading-tight tracking-tight font-light max-w-4xl">
                        {block.body}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {block.type === 'image' && block.images && (
                <div className="space-y-8">
                  <div className="overflow-hidden rounded-sm bg-[#0d0d0d]">
                    <motion.img
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 1.5, ease: EASING }}
                      src={block.images[0]}
                      className="w-full h-auto object-cover max-h-[110vh] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                  {block.caption && (
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      <div className="md:col-span-3" />
                      <div className="md:col-span-9">
                        <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-[0.3em] font-medium leading-relaxed">{block.caption}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {block.type === 'gallery' && block.images && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {block.images.map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-sm bg-[#0d0d0d]">
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 1.5, ease: EASING }}
                        src={img}
                        className="w-full aspect-square md:aspect-[4/5] object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Testimonial Section - Grid Aligned */}
        {project.clientQuote && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASING }}
            className="py-64 border-t border-neutral-900"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-3">
                <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-[0.5em] block font-bold">CLIENT VOICE</span>
              </div>
              <div className="md:col-span-9">
                <blockquote className="text-3xl md:text-5xl lg:text-6xl font-black italic leading-[1.1] tracking-tighter text-white mb-12">
                  "{project.clientQuote.text}"
                </blockquote>
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] mb-1">{project.clientQuote.author}</span>
                  {project.clientQuote.role && (
                    <span className="text-neutral-600 font-mono text-[9px] uppercase tracking-[0.3em]">{project.clientQuote.role}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </main>

      {/* Immersive Navigation Footer */}
      <section
        className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden group cursor-pointer border-t border-neutral-900 mt-32"
        onClick={() => onNavigate(nextProject.id)}
      >
        <div className="absolute inset-0 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
          <img
            src={nextProject.image}
            alt={nextProject.title}
            className="w-full h-full object-cover opacity-20 filter blur-[2px] group-hover:blur-0 group-hover:opacity-40 transition-all duration-1000"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black via-transparent to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASING }}
            className="space-y-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.6em] text-neutral-500 block mb-4">CONTINUE TO</span>
            <h2 className="text-5xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.85] text-white">
              {nextProject.title}
            </h2>
            <div className="flex justify-center pt-8">
              <div className="relative px-8 py-4 rounded-full border border-white/20 overflow-hidden group/btn">
                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 font-mono text-[9px] uppercase tracking-[0.3em] font-medium group-hover/btn:text-black transition-colors">Experience Study</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Dynamic Close Button */}
      <motion.button
        onClick={onBack}
        initial={{ x: "-50%", y: 100, opacity: 0 }}
        animate={{
          x: "-50%",
          y: isVisible ? 0 : 150,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-12 left-1/2 z-[1000] flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl group hover:bg-white hover:text-black transition-all active:scale-95"
      >
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-black transition-colors">
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] font-bold">
          EXIT VIEW
        </span>
      </motion.button>
    </motion.div>
  );
};

/* High-Fidelity Metadata Component */
const MetadataField = ({ label, value, values }: { label: string; value?: string; values?: string[] }) => (
  <div className="flex flex-col gap-4">
    <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-[0.4em] font-bold">
      {label}
    </span>
    <div className="flex flex-col gap-1">
      {value && <span className="text-sm md:text-base font-bold uppercase tracking-tight text-neutral-100">{value}</span>}
      {values?.map((v: string) => (
        <span key={v} className="text-sm md:text-base font-bold uppercase tracking-tight text-neutral-100 leading-tight">
          {v}
        </span>
      ))}
    </div>
  </div>
);

export default ProjectDetail;
