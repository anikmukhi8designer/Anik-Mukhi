
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';
import AboutView from './components/AboutView';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { EASING } from './constants';
import { Project, SiteContent } from './types';
import { INITIAL_CONTENT } from './data';

import contentData from './content.json';

const App: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(contentData as SiteContent);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'work' | 'about'>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync content state when content.json is updated during development
  useEffect(() => {
    setContent(contentData as SiteContent);
  }, [contentData]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isPreloaderComplete) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen">
        <Preloader onComplete={() => {
          setIsPreloaderComplete(true);
        }} />
      </div>
    );
  }

  const featuredProjects = content.projects.filter((p: Project) => p.featured).slice(0, 4);
  const allProjects = content.projects;
  const selectedProject = content.projects.find((p: Project) => p.id === selectedProjectId);

  const handleProjectClick = (project: Project) => {
    if (project.externalLink) {
      window.open(project.externalLink, project.openInNewTab ? '_blank' : '_self');
    } else {
      setSelectedProjectId(project.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToView = (view: 'home' | 'work' | 'about') => {
    setSelectedProjectId(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative selection:bg-white selection:text-black">
      <CustomCursor />

      {!selectedProjectId && (
        <Navbar
          siteInfo={content.site_info}
          navigation={content.navigation}
          onViewChange={navigateToView}
        />
      )}

      <main className="opacity-100 transition-opacity duration-1000">
        <AnimatePresence mode="wait">
          {selectedProjectId ? (
            <ProjectDetail
              key="detail"
              project={selectedProject!}
              allProjects={allProjects}
              onBack={() => setSelectedProjectId(null)}
              onNavigate={(id) => {
                const p = allProjects.find((proj: Project) => proj.id === id);
                if (p) handleProjectClick(p);
              }}
            />
          ) : (
            <motion.div
              key={currentView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              <div className="fixed top-0 left-0 w-full h-[2px] z-[60] pointer-events-none">
                <motion.div
                  className="h-full bg-white"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>

              {currentView === 'home' && (
                <>
                  <Hero siteInfo={content.site_info} />

                  <section id="work" className="px-6 md:px-12 py-32 md:py-64 max-w-7xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: EASING }}
                      className="flex justify-between items-end mb-24"
                    >
                      <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">FEATURED</h2>
                      <button
                        onClick={() => navigateToView('work')}
                        className="font-mono text-xs text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"
                      >
                        VIEW ALL WORK [ {allProjects.length} ]
                      </button>
                    </motion.div>
                    <div className="flex flex-col">
                      {featuredProjects.map((project: Project, idx: number) => (
                        <ProjectCard key={project.id} project={project} index={idx} onClick={() => handleProjectClick(project)} />
                      ))}
                    </div>
                  </section>

                  {/* Quick About Section */}
                  <section id="about" className="px-6 md:px-12 py-32 md:py-64 border-t border-neutral-900 bg-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute top-10 left-10 opacity-[0.03] select-none pointer-events-none">
                      <span className="text-[30vw] font-bold leading-none tracking-tighter">02</span>
                    </div>
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-16">
                      <div className="md:col-span-2">
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: EASING }}
                          className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block sticky top-32"
                        >
                          {content.about.label}
                        </motion.span>
                      </div>
                      <div className="md:col-span-10 md:pl-12">
                        <motion.h3
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: EASING }}
                          className="text-4xl md:text-7xl font-light leading-[1.1] tracking-tight mb-20 max-w-5xl"
                          dangerouslySetInnerHTML={{ __html: content.about.main_copy }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                          <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: EASING }}
                            className="text-neutral-400 text-xl leading-relaxed font-light italic border-l border-neutral-800 pl-8"
                          >
                            {content.about.sub_copy}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: EASING }}
                          >

                            <button
                              onClick={() => navigateToView('about')}
                              className="mt-12 group flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest"
                            >
                              LEARN MORE <span className="w-8 h-[1px] bg-white group-hover:w-16 transition-all duration-500" />
                            </button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}

              {currentView === 'work' && (
                <section className="px-6 md:px-12 pt-48 pb-32 max-w-7xl mx-auto min-h-screen">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASING }}
                    className="mb-24"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4 block">PORTFOLIO INDEX</span>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase">WORK.</h1>
                  </motion.div>
                  <div className="flex flex-col">
                    {allProjects.map((project: Project, idx: number) => (
                      <ProjectCard key={project.id} project={project} index={idx} onClick={() => handleProjectClick(project)} />
                    ))}
                  </div>
                </section>
              )}

              {currentView === 'about' && (
                <AboutView content={content} />
              )}

              <Footer footer={content.footer} siteInfo={content.site_info} navigation={content.navigation} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
