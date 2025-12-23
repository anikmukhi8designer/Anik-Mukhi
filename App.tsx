
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
    // Dynamically fetch the single source of truth
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

              {/* About Section */}
              <section id="about" className="px-6 md:px-12 py-32 md:py-64 border-t border-neutral-900 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8 block">{content.about.label}</span>
                    <h3 
                      className="text-3xl md:text-6xl font-light leading-[1.2] tracking-tight"
                      dangerouslySetInnerHTML={{ __html: content.about.main_copy }}
                    />
                  </div>
                  
                  <div className="md:col-span-4 flex flex-col justify-end">
                    <p className="text-neutral-500 text-lg leading-relaxed mb-8">
                      {content.about.sub_copy}
                    </p>
                    <div className="flex flex-wrap gap-2">
                       {content.about.skills.map((tag: string) => (
                         <span key={tag} className="px-3 py-1 border border-neutral-800 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                           {tag}
                         </span>
                       ))}
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
