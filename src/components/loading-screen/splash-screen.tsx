'use client';

import { motion } from 'motion/react';

// ----------------------------------------------------------------------

export default function SplashScreen() {
  const blink = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="bg-background flex h-full w-full items-center justify-center">
      <div className="bg-primary aspect-square h-16 xl:h-20" />

      <motion.div
        variants={blink}
        initial="initial"
        animate="animate"
        className="bg-secondary aspect-square h-16 xl:h-20"
      />
    </div>
  );
}
