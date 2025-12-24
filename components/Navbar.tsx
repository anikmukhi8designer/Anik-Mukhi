
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASING } from '../constants';
import { NavLink } from '../types';

interface NavbarProps {
  siteInfo: any;
  navigation: NavLink[];
  onViewChange: (view: 'home' | 'work' | 'about') => void;
}

const Navbar: React.FC<NavbarProps> = ({ siteInfo, navigation, onViewChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down AND not at the very top (buffer of 10px)
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const lastName = siteInfo.name.split(' ').pop();

  const handleLinkClick = (e: React.MouseEvent, link: NavLink) => {
    if (link.type === 'view') {
      e.preventDefault();
      onViewChange(link.href as 'home' | 'work' | 'about');
    }
  };

  return (
    <motion.nav
      initial={{ x: "-50%", y: 100, opacity: 0 }}
      animate={{
        x: "-50%",
        y: isVisible ? 0 : 150,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed bottom-8 left-1/2 z-[100] w-[90%] md:w-auto md:min-w-[500px] px-8 py-4 flex justify-between items-center bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl"
    >
      <motion.button
        onClick={() => onViewChange('home')}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: EASING }}
        className="font-bold text-xl tracking-tighter uppercase text-white"
      >
        {lastName}.
      </motion.button>

      <div className="flex gap-8 md:gap-12">
        {navigation.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link)}
            className="group relative font-mono text-[10px] uppercase tracking-widest overflow-hidden h-6"
          >
            <div className="relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
              <span className="py-1 text-neutral-400 group-hover:text-white transition-colors">{link.label}</span>
              <span className="py-1 text-white">{link.label}</span>
            </div>
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
