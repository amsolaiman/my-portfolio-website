'use client';

import { useEffect, useId, useRef } from 'react';
import Lenis from 'lenis';
import { createPortal } from 'react-dom';

// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
import Image from '@/components/image';
import RichTextRenderer from '@/components/rich-text-renderer';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// types
import { IProject } from '@/types/data';

// ----------------------------------------------------------------------

type Props = {
  data: IProject;
  open: boolean;
  onClose: () => void;
};

export default function ProjectModal({ data, open, onClose }: Props) {
  const upXl = useBreakpoint('up', 'xl');

  const titleId = useId();

  const containerRef = useRef<HTMLDivElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  //#region Dialog behavior
  useEffect(() => {
    if (!open) return;

    const trigger = document.activeElement as HTMLElement | null;
    const main = document.querySelector('main');

    main?.setAttribute('inert', '');
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      main?.removeAttribute('inert');
      trigger?.focus();
    };
  }, [open]);
  //#endregion

  //#region Smooth scroll
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
  //#endregion

  const aboutInfo = [
    { label: 'Client', value: data.client },
    {
      label: 'Year',
      value: data.isOngoing ? 'Ongoing' : data.endDate?.getFullYear(),
    },
    {
      label: 'Techs',
      value: data.techStack.map((tech) => tech.trim()).join(', '),
    },
  ].filter((item) => item.value);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="bg-neutral fixed inset-0 z-30 h-svh w-screen overflow-hidden xl:h-screen"
    >
      <div className="bg-neutral fixed inset-x-0 top-0 z-10 flex justify-end px-4 py-2">
        <button
          ref={closeButtonRef}
          type="button"
          data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
          className="cursor-pointer text-xs text-white hover:text-white/75 focus-visible:text-white/75"
          onClick={onClose}
        >
          Close <span aria-hidden>X</span>
        </button>
      </div>

      <div
        ref={containerRef}
        className="h-full overflow-y-scroll px-2 pt-16 pb-8 md:px-4 xl:px-8 xl:pt-32"
      >
        <div className="flex w-full flex-col">
          <h2
            id={titleId}
            className="font-sans text-6xl text-white xl:text-8xl/[0.9]"
          >
            {data.name}
          </h2>

          <p className="[&_span]:text-primary text-sm text-gray-400">
            <span aria-hidden>■</span> {data.type}
          </p>

          <div className="mt-20 mb-2 grid grid-cols-2 xl:mt-32">
            {data.previewUrl ? (
              <a
                data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                className="w-fit text-xs text-white hover:text-white/75 focus-visible:text-white/75"
                href={data.previewUrl.link}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                View {data.previewUrl.type}
                <span aria-hidden> ↗</span>
              </a>
            ) : (
              <div />
            )}

            <p className="text-end text-xs text-gray-400 xl:text-start">
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
            <h3 className="text-secondary mb-8 text-xs">/ About the project</h3>

            <div className="flex flex-col gap-12 xl:gap-20">
              <RichTextRenderer
                value={data.description}
                className="text-justify font-sans! text-3xl md:text-start xl:text-5xl"
              />

              <dl className="divide-y divide-gray-700 border-y border-gray-700">
                {aboutInfo.map(({ label, value }) => (
                  <div key={label} className="flex gap-4 py-6">
                    <dt className="text-primary min-w-20 text-xs xl:min-w-48">
                      {label}
                    </dt>
                    <dd className="text-xs text-white">{value}</dd>
                  </div>
                ))}
              </dl>

              {(data.previewUrl || data.designUrl) && (
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 xl:gap-10">
                  {data.previewUrl && (
                    <a
                      data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                      className="hover:border-secondary focus-visible:border-secondary cursor-pointer border-b-2 border-transparent text-base text-white hover:text-white/75"
                      href={data.previewUrl.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View {data.previewUrl.type}
                      <span aria-hidden> ↗</span>
                    </a>
                  )}

                  {data.designUrl && (
                    <a
                      data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                      className="hover:border-secondary focus-visible:border-secondary cursor-pointer border-b-2 border-transparent text-base text-white hover:text-white/75"
                      href={data.designUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View design
                      <span aria-hidden> ↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <h3 className="text-secondary mt-32 mb-2 text-xs">/ Gallery</h3>

          <ul role="list" className="space-y-4">
            {data.images.map((image, index) => (
              <li key={image._key}>
                <Image
                  src={image.src || FALLBACK_IMAGE_URL}
                  alt={image.alt || `${data.name} - Image ${index + 1}`}
                  width={1600}
                  height={900}
                  loading="lazy"
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
