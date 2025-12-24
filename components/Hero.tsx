
import React from 'react';
import { motion } from 'framer-motion';
import { EASING } from '../constants';

interface HeroProps {
  siteInfo: any;
}

const Hero: React.FC<HeroProps> = ({ siteInfo }) => {
  const nameParts = siteInfo.name.split(' ');
  const line1 = nameParts[0];
  const line2 = nameParts.slice(1).join(' ');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { y: "100%" },
    show: { y: 0, transition: { duration: 1.2, ease: EASING } }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto w-full pt-20"
      >
        <div className="overflow-hidden mb-[-2vw]">
          <motion.h1 variants={item} className="text-[18vw] md:text-[14vw] font-bold leading-[0.85] tracking-tighter">
            {line1}
          </motion.h1>
        </div>
        <div className="overflow-hidden flex justify-end">
          <motion.h1 variants={item} className="text-[18vw] md:text-[14vw] font-bold leading-[0.85] tracking-tighter text-right">
            {line2}
          </motion.h1>
        </div>

        <div className="mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="md:col-span-4"
          >
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-500 mb-4">
              [ BASED IN {siteInfo.location} ]
            </p>
            <p className="text-lg md:text-xl max-w-sm text-neutral-300">
              {siteInfo.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: EASING }}
            className="hidden md:block md:col-span-4 md:col-start-9 h-[1px] bg-neutral-800 origin-left"
          />
        </div>
      </motion.div>


    </section>
  );
};

export default Hero;
