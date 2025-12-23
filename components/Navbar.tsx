
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASING } from '../constants';
import { NavLink } from '../types';

interface NavbarProps {
  siteInfo: any;
  navigation: NavLink[];
}

const Navbar: React.FC<NavbarProps> = ({ siteInfo, navigation }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const lastName = siteInfo.name.split(' ').pop();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.6, ease: EASING }}
          className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference"
        >
          <a href="#" className="font-bold text-xl tracking-tighter uppercase">{lastName}.</a>
          
          <div className="flex gap-8 md:gap-12">
            {navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-mono text-xs uppercase tracking-widest overflow-hidden py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
