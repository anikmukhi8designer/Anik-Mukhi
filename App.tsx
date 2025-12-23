
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { EASING } from './constants';

const App: React.FC = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    fetch("./content/content.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load content.json");
        return res.json();
      })
      .then(data => {
        setContent(data);
      })
      .catch(err => {
        console.error("Critical error loading site content:", err);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) return <Preloader onComplete={() => {}} />;

  const selectedProject = content.projects.find((p: any) => p.id === selectedProjectId);

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedProjectId(null);
  };

  return (
    <div className="relative">
      <CustomCursor />
      
      <Preloader onComplete={() => setLoading(false)} />

      <main className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <AnimatePresence mode="wait">
          {!selectedProjectId ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Navbar siteInfo={content.site_info} navigation={content.navigation} />
              
              <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
                <div 
                  className="h-full bg-white transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              
              <Hero siteInfo={content.site_info} />

              {/* Work Section */}
              <section id="work" className="px-6 md:px-12 py-32 md:py-64 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-24 md:mb-48">
                  <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">SELECTED WORKS</h2>
                  <div className="hidden md:block font-mono text-xs text-neutral-500 uppercase tracking-widest">
                    [ 2023 &mdash; 2025 ]
                  </div>
                </div>

                <div className="flex flex-col">
                  {content.projects.map((project: any, idx: number) => (
                    <ProjectCard key={project.id} project={project} index={idx} onClick={handleProjectClick} />
                  ))}
                </div>
              </section>

              {/* Redesigned About Section */}
              <section id="about" className="px-6 md:px-12 py-32 md:py-64 border-t border-neutral-900 relative overflow-hidden bg-[#0a0a0a]">
                {/* Background Decor */}
                <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
                  <span className="text-[30vw] font-bold leading-none tracking-tighter">02</span>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16">
                  {/* Side Label */}
                  <div className="md:col-span-2">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: EASING }}
                      className="flex md:flex-col gap-4 sticky top-32"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block origin-left">
                        {content.about.label}
                      </span>
                      <div className="w-12 md:w-[1px] h-[1px] md:h-12 bg-neutral-800" />
                    </motion.div>
                  </div>

                  {/* Main Copy */}
                  <div className="md:col-span-10 md:pl-12">
                    <motion.h3 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.2, ease: EASING }}
                      className="text-4xl md:text-7xl font-light leading-[1.1] tracking-tight mb-20 md:mb-32 max-w-5xl"
                    >
                      {/* Splitting for better editorial styling within the copy */}
                      I believe that digital experiences should be as <span className="italic font-serif text-neutral-400">tangible</span> as physical objects. My approach combines <span className="font-medium text-white">systematic engineering</span> with artistic intuition to create products that feel alive.
                    </motion.h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASING }}
                      >
                        <p className="text-neutral-400 text-xl leading-relaxed font-light italic border-l border-neutral-800 pl-8">
                          {content.about.sub_copy}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: EASING }}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-8 block">CORE SPECIALISATIONS</span>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                          {content.about.skills.map((tag: string, i: number) => (
                            <div key={tag} className="group flex items-center gap-3 py-2 border-b border-neutral-900 overflow-hidden">
                              <span className="font-mono text-[9px] text-neutral-700 group-hover:text-white transition-colors">0{i + 1}</span>
                              <span className="text-xs uppercase tracking-widest text-neutral-400 group-hover:translate-x-1 transition-transform duration-300">
                                {tag}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Experience Section */}
              <section id="experience" className="px-6 md:px-12 py-32 md:py-64 border-t border-neutral-900">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-24 md:mb-48">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8 block">EXPERIENCE</span>
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter">PROFESSIONAL PATH</h2>
                  </div>

                  <div className="flex flex-col">
                    {content.experience.map((exp: any, idx: number) => (
                      <motion.div 
                        key={exp.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASING, delay: idx * 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 py-12 border-b border-neutral-900 group hover:bg-neutral-900/20 transition-colors"
                      >
                        <div className="md:col-span-3">
                          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{exp.period}</span>
                        </div>
                        <div className="md:col-span-4">
                          <h4 className="text-2xl font-bold tracking-tight mb-2">{exp.company}</h4>
                          <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest">{exp.role}</p>
                        </div>
                        <div className="md:col-span-5 pt-4 md:pt-0">
                          <p className="text-neutral-300 text-lg leading-relaxed max-w-md">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              <Footer footer={content.footer} siteInfo={content.site_info} navigation={content.navigation} />
            </motion.div>
          ) : (
            selectedProject && (
              <ProjectDetail 
                key="detail" 
                project={selectedProject} 
                allProjects={content.projects}
                onBack={handleBack} 
                onNavigate={handleProjectClick}
              />
            )
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
