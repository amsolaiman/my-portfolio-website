import Lenis from 'lenis';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// types
import { IProject } from '@/types/data';
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';
// components
import RichTextRenderer from '@/components/rich-text-renderer';

// ----------------------------------------------------------------------

type Props = {
  data: IProject;
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({ data, open, onClose }: Props) {
  const upXl = useBreakpoint('up', 'xl');

  const containerRef = useRef<HTMLDivElement>(null);

  const aboutInfo = {
    client: data.client,
    year: data.isOngoing ? 'Ongoing' : data.date?.getFullYear(),
    techs: data.techStack.map((tech) => tech.trim()).join(', '),
  };

  useEffect(() => {
    if (!open || !upXl) return;

    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      eventsTarget: container,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    resizeObserver.observe(container.firstElementChild as HTMLElement);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, [open, upXl]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="bg-background fixed inset-0 z-30 h-svh w-screen overflow-hidden xl:h-screen">
      <div className="bg-background fixed inset-x-0 top-0 z-10 flex justify-end px-4 py-2">
        <button
          data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
          className="text-foreground hover:text-foreground/75 cursor-pointer text-xs"
          onClick={onClose}
        >
          Close X
        </button>
      </div>

      <div
        ref={containerRef}
        className="h-full overflow-y-scroll px-2 pt-16 pb-8 md:px-4 xl:px-8 xl:pt-32"
      >
        <div className="flex w-full flex-col">
          <div className="font-sans text-6xl xl:text-8xl/[0.9]">
            {data.name}
          </div>

          <div className="text-foreground/50 [&_span]:text-primary text-sm">
            <span>■</span> {data.type}
          </div>

          <div className="mt-20 mb-2 grid grid-cols-2 xl:mt-32">
            {data.previewUrl ? (
              <a
                data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                className="text-foreground hover:text-foreground/75 w-fit text-xs"
                href={data.previewUrl.link}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                View {data.previewUrl.type} ↗
              </a>
            ) : (
              <div />
            )}

            <p className="text-foreground/50 text-end text-xs xl:text-start">
              ↓ Scroll for more
            </p>
          </div>

          <Image
            src={data.bannerImage.src || FALLBACK_IMAGE_URL}
            alt={data.bannerImage.alt || data.name}
            width={1600}
            height={900}
            priority
            draggable={false}
            className="h-auto w-full object-contain"
          />

          <div className="mt-32 grid grid-cols-1 md:grid-cols-2">
            <p className="text-secondary mb-8 text-xs">/ About the project</p>

            <div className="flex flex-col gap-12 xl:gap-20">
              <RichTextRenderer
                value={data.description}
                className="text-justify font-sans! text-3xl md:text-start xl:text-5xl"
              />

              <ul className="border-foreground/20 divide-foreground/20 divide-y border-y">
                {Object.entries(aboutInfo).map(([key, info]) => (
                  <li key={key} className="flex gap-4 py-6">
                    <span className="text-primary min-w-20 text-xs xl:min-w-48">
                      {key}
                    </span>
                    <p className="text-xs">{info}</p>
                  </li>
                ))}
              </ul>

              {(data.previewUrl || data.designUrl) && (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 xl:gap-10">
                  {data.previewUrl && (
                    <a
                      data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                      className="text-foreground hover:text-foreground/75 hover:border-secondary cursor-pointer border-b-2 border-transparent text-base"
                      href={data.previewUrl.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View {data.previewUrl.type} ↗
                    </a>
                  )}

                  {data.designUrl && (
                    <a
                      data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                      className="text-foreground hover:text-foreground/75 hover:border-secondary cursor-pointer border-b-2 border-transparent text-base"
                      href={data.designUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View design ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="text-secondary mt-32 mb-2 text-xs">/ Gallery</p>

          <ul className="space-y-4">
            {data.images.map((image, index) => (
              <li key={image._key}>
                <Image
                  src={image.src || FALLBACK_IMAGE_URL}
                  alt={image.alt || `${data.name} - Image ${index + 1}`}
                  width={1600}
                  height={900}
                  priority
                  draggable={false}
                  className="h-auto w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}
