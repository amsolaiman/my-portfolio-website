import { useEffect, useState } from 'react';

/**
 * Usage: add `data-hover-cursor="<identifier>"` to any element you want tracked.
 * All elements sharing the same identifier will trigger the hovered state.
 *
 * e.g. <button data-hover-cursor="toggle-btn">Click me</button>
 */

export default function useMouseHover(identifier: string) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const selector = `[data-hover-cursor="${identifier}"]`;

    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    const attachedElements = new Set<HTMLElement>();

    const attach = (el: HTMLElement) => {
      if (attachedElements.has(el)) return;

      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
      attachedElements.add(el);
    };

    const detach = (el: HTMLElement) => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
      attachedElements.delete(el);
    };

    document.querySelectorAll<HTMLElement>(selector).forEach(attach);

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(selector).forEach(attach);

      attachedElements.forEach((el) => {
        if (!document.contains(el)) {
          detach(el);
          setIsHovered(false);
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      attachedElements.forEach(detach);
    };
  }, [identifier]);

  return isHovered;
}
