'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import SplashScreen from './splash-screen';

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const overlay = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 1, ease: [0.75, 0, 0.25, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={overlay}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-100"
        >
          <SplashScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
