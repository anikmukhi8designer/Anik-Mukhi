
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from '../types';
import { EASING } from '../constants';

interface FooterProps {
  footer: any;
  siteInfo: any;
  navigation: NavLink[];
}

const Footer: React.FC<FooterProps> = ({ footer, siteInfo, navigation }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="px-6 md:px-12 py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24">
          <div className="max-w-2xl">
            <motion.h2 
              whileHover={{ x: 10 }}
              transition={{ duration: 0.8, ease: EASING }}
              className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 cursor-default"
              dangerouslySetInnerHTML={{ __html: footer.cta.replace('NEW.', '<span class="text-neutral-600 italic">NEW.</span>') }}
            />
            <a 
              href={`mailto:${siteInfo.email}`} 
              className="group text-2xl md:text-4xl font-light hover:text-white text-neutral-400 transition-colors flex items-center gap-4"
            >
              {siteInfo.email}
              <span className="w-12 h-[1px] bg-neutral-700 group-hover:bg-white group-hover:w-24 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
             <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-4">SOCIALS</span>
                {footer.socials.map((social: any) => (
                  <a 
                    key={social.label} 
                    href={social.url} 
                    className="group relative overflow-hidden h-5 uppercase text-[10px] tracking-widest text-neutral-500"
                  >
                    <div className="relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      <span className="py-0.5">{social.label}</span>
                      <span className="py-0.5 text-white">{social.label}</span>
                    </div>
                  </a>
                ))}
             </div>
             <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-600 mb-4">SITEMAP</span>
                {navigation.map(nav => (
                  <a 
                    key={nav.label} 
                    href={nav.href} 
                    className="group relative overflow-hidden h-5 uppercase text-[10px] tracking-widest text-neutral-500"
                  >
                    <div className="relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                      <span className="py-0.5">{nav.label}</span>
                      <span className="py-0.5 text-white">{nav.label}</span>
                    </div>
                  </a>
                ))}
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-neutral-900">
          <p className="font-mono text-[10px] text-neutral-600 mb-4 md:mb-0 uppercase tracking-widest">
            &copy; {currentYear} {footer.copyright}
          </p>
          <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            DESIGNED WITH INTENTION IN {siteInfo.location}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
