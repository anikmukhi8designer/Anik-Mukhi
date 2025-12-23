
import React from 'react';
import { motion } from 'framer-motion';
import { SiteContent, Experience, Education, Certificate } from '../types';
import { EASING } from '../constants';

interface AboutViewProps {
  content: SiteContent;
}

const AboutView: React.FC<AboutViewProps> = ({ content }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0a] pt-48 pb-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASING }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8 block"
          >
            STORY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASING }}
            className="text-5xl md:text-9xl font-bold tracking-tighter uppercase mb-12"
          >
            ABOUT.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASING }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-8">
              <p className="text-2xl md:text-4xl text-neutral-300 font-light leading-snug">
                {content.about.intro}
              </p>
            </div>
            <div className="md:col-span-4 flex md:justify-end items-end">
              <a 
                href={content.site_info.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-8 py-4 border border-neutral-800 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Download Resume PDF</span>
              </a>
            </div>
          </motion.div>
        </header>

        {/* Experience Grid */}
        <section className="py-24 border-t border-neutral-900">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 sticky top-32">PROFESSIONAL PATH</span>
              </div>
              <div className="md:col-span-9 flex flex-col gap-24">
                {content.experience.map((exp: Experience, idx: number) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: EASING }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 group cursor-default"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-neutral-600 uppercase mb-4 block group-hover:text-neutral-400 transition-colors">{exp.period}</span>
                      <h4 className="text-3xl font-bold uppercase tracking-tight group-hover:italic transition-all duration-500 group-hover:translate-x-2 ease-[cubic-bezier(0.16,1,0.3,1)]">{exp.company}</h4>
                      <p className="font-mono text-[10px] uppercase text-neutral-500 mt-2">{exp.role}</p>
                    </div>
                    <div>
                      <p className="text-neutral-400 text-lg leading-relaxed border-l border-neutral-900 pl-8 group-hover:border-neutral-600 transition-all duration-500">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Skills Section */}
        <section className="py-24 border-t border-neutral-900">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 sticky top-32">CAPABILITIES</span>
              </div>
              <div className="md:col-span-9">
                <div className="flex flex-wrap gap-x-4 gap-y-6">
                  {content.about.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.05, ease: EASING }}
                      className="group relative px-6 py-2 border border-neutral-900 rounded-full cursor-default overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                      <span className="relative z-10 font-mono text-[10px] uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors duration-500">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
           </div>
        </section>

        {/* Education & Certs */}
        <section className="py-24 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-24">
           <div className="md:col-span-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-12 block">EDUCATION</span>
              <div className="flex flex-col gap-12">
                {content.about.education.map((edu: Education) => (
                  <div key={edu.id} className="group cursor-default">
                    <h5 className="text-2xl font-bold uppercase tracking-tight group-hover:text-white transition-colors">{edu.degree}</h5>
                    <p className="text-neutral-400 mt-2 uppercase text-sm">{edu.institution} &mdash; {edu.year}</p>
                  </div>
                ))}
              </div>
           </div>
           <div className="md:col-span-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-12 block">CERTIFICATES</span>
              <div className="flex flex-col gap-8">
                {content.about.certificates.map((cert: Certificate) => (
                  <a 
                    key={cert.id} 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative flex justify-between items-end border-b border-neutral-900 pb-6 hover:border-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div className="group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <h6 className="text-lg font-medium uppercase group-hover:text-white transition-colors">{cert.title}</h6>
                      <p className="font-mono text-[10px] text-neutral-500 uppercase mt-1">{cert.issuer} &middot; {cert.year}</p>
                    </div>
                    <div className="flex items-center gap-2 overflow-hidden h-6">
                       <span className="text-[10px] font-mono text-neutral-600 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">VIEW PDF</span>
                       <span className="absolute right-0 translate-y-full group-hover:translate-y-0 text-[10px] font-mono text-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">OPEN FILE</span>
                    </div>
                  </a>
                ))}
              </div>
           </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutView;
