
import React from 'react';
import { motion } from 'framer-motion';
import { SiteContent, Experience, Education, Certificate } from '../types';
import { EASING } from '../constants';

interface AboutViewProps {
  content: SiteContent;
}

const AboutView: React.FC<AboutViewProps> = ({ content }) => {
  // Dynamic calculation of total years based on experience array
  const totalYears = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return content.experience.reduce((total, exp) => {
      // Split by common dash types: em-dash, en-dash, or hyphen
      const parts = exp.period.split(/[—–-]/).map(s => s.trim().toUpperCase());
      if (parts.length === 2) {
        const startYear = parseInt(parts[0]);
        const endYear = parts[1] === 'PRESENT' ? currentYear : parseInt(parts[1]);
        if (!isNaN(startYear) && !isNaN(endYear)) {
          return total + (endYear - startYear);
        }
      }
      return total;
    }, 0);
  }, [content.experience]);

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASING }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500 mb-8 block"
          >
            STORY
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASING }}
            className="text-5xl md:text-9xl font-bold tracking-tighter uppercase mb-12"
          >
            ABOUT.
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASING }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-7">
              <p className="text-2xl md:text-4xl text-neutral-300 font-light leading-snug mb-12">
                {content.about.intro}
              </p>
              
              {/* Prominent Experience Metric */}
              <div className="flex items-center gap-12 border-t border-neutral-900 pt-12">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-4 block">EXPERIENCE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-8xl font-bold tracking-tighter">{totalYears}+</span>
                    <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono">Years of Mastery</span>
                  </div>
                </div>
                <div className="hidden md:block h-16 w-[1px] bg-neutral-900" />
                <div className="hidden md:block">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-4 block">STATUS</span>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs uppercase tracking-widest text-neutral-300 font-mono">Available for projects</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col md:items-end justify-between py-2">
              <a 
                href={content.site_info.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-10 py-5 border border-neutral-800 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-fit"
              >
                <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">Download Resume PDF</span>
              </a>

              {/* Specialisations snippet similar to home page */}
              <div className="hidden md:block w-full max-w-xs mt-12 md:mt-0">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-6 block">SPECIALISATIONS</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {content.about.skills.slice(0, 4).map((skill, i) => (
                    <div key={skill} className="flex items-center gap-2 opacity-50 group hover:opacity-100 transition-opacity">
                      <span className="font-mono text-[8px] text-neutral-700">0{i+1}</span>
                      <span className="text-[10px] uppercase tracking-widest">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Experience Grid */}
        <section className="py-24 border-t border-neutral-900">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASING }}
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 sticky top-32"
                >
                  PROFESSIONAL PATH
                </motion.span>
              </div>
              <div className="md:col-span-9 flex flex-col gap-24">
                {content.experience.map((exp: Experience, idx: number) => (
                  <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, y: 40 }}
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
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASING }}
                  className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 sticky top-32"
                >
                  CAPABILITIES
                </motion.span>
              </div>
              <div className="md:col-span-9">
                <div className="flex flex-wrap gap-x-4 gap-y-6">
                  {content.about.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.05, ease: EASING }}
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
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASING }}
                className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-12 block"
              >
                EDUCATION
              </motion.span>
              <div className="flex flex-col gap-12">
                {content.about.education.map((edu: Education, idx: number) => (
                  <motion.div 
                    key={edu.id} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: EASING }}
                    className="group cursor-default"
                  >
                    <h5 className="text-2xl font-bold uppercase tracking-tight group-hover:text-white transition-colors">{edu.degree}</h5>
                    <p className="text-neutral-400 mt-2 uppercase text-sm">{edu.institution} &mdash; {edu.year}</p>
                  </motion.div>
                ))}
              </div>
           </div>
           <div className="md:col-span-6">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASING }}
                className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-12 block"
              >
                CERTIFICATES
              </motion.span>
              <div className="flex flex-col gap-8">
                {content.about.certificates.map((cert: Certificate, idx: number) => (
                  <motion.a 
                    key={cert.id} 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: EASING }}
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
                  </motion.a>
                ))}
              </div>
           </div>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutView;
