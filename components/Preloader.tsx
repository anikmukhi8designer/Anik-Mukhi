
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASING } from '../constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('visited_before');
    setText(hasVisited ? 'WELCOME BACK' : 'WELCOME');
    localStorage.setItem('visited_before', 'true');

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterVariants = {
    initial: { y: 100, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASING,
        delay: i * 0.05,
      }
    }),
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 1, ease: EASING } }}
        >
          <div className="flex overflow-hidden">
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-4xl md:text-7xl font-bold tracking-tighter mx-0.5 inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
