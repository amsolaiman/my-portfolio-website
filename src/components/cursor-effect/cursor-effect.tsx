'use client';

import { motion, AnimatePresence } from 'motion/react';

// context
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// utils
import { cn } from '@/utils/tw-merge';

//
import { getCursorLabel, getCursorSize } from './utils';
import { useMouseHover, useMousePosition } from './hooks';
import { CursorIdentfierEnum, ToggleButtonsEnum } from './types';

// ----------------------------------------------------------------------

export default function CursorEffect() {
  const upXl = useBreakpoint('up', 'xl');

  const { openProject, openContact } = useToggleButtons();

  const { smoothX, smoothY } = useMousePosition();

  const isTextBtnHovered = useMouseHover(CursorIdentfierEnum.TEXT_BTN);
  const isCardBtnHovered = useMouseHover(CursorIdentfierEnum.CARD_BTN);
  const isProjectBtnHovered = useMouseHover(CursorIdentfierEnum.PROJECT_BTN);
  const isContactBtnHovered = useMouseHover(CursorIdentfierEnum.CONTACT_BTN);

  const toggleBtnHoveredTarget = isProjectBtnHovered
    ? ToggleButtonsEnum.PROJECT
    : isContactBtnHovered
      ? ToggleButtonsEnum.CONTACT
      : null;

  const cursorSize = getCursorSize(
    !!toggleBtnHoveredTarget,
    isTextBtnHovered,
    isCardBtnHovered
  );

  const label = !!toggleBtnHoveredTarget
    ? getCursorLabel(toggleBtnHoveredTarget, openProject, openContact)
    : isCardBtnHovered
      ? 'View'
      : null;

  if (!upXl) {
    return null;
  }

  return (
    <motion.div
      className={cn(
        'border-foreground pointer-events-none fixed z-50 flex items-center justify-center rounded-full border bg-transparent transition-colors duration-300',
        cursorSize === 0 && 'border-transparent',
        isCardBtnHovered && 'bg-foreground/75'
      )}
      style={{
        left: smoothX,
        top: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        willChange: 'transform',
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
    >
      <AnimatePresence mode="wait">
        {label && (
          <motion.p
            key={label}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              damping: 20,
              stiffness: 300,
            }}
            className={cn({
              'text-foreground text-xl': !!toggleBtnHoveredTarget,
              'text-background/75 text-xs': isCardBtnHovered,
            })}
          >
            {label}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
