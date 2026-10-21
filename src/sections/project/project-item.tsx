'use client';

import { useState } from 'react';

// components
import Image from '@/components/image';
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';
// utils
import { cn } from '@/utils/tw-merge';
// types
import { IProject } from '@/types/data';

//
import ProjectModal from './project-modal';

// ----------------------------------------------------------------------

const ALIGN_CLASS: Record<IProject['align'], string> = {
  start: 'md:self-start',
  center: 'md:self-center',
  end: 'md:self-end',
};

// ----------------------------------------------------------------------

type Props = {
  project: IProject;
  index: number;
};

export default function ProjectItem({ project, index }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <li
      className={cn(
        'flex w-full flex-col self-start md:w-72',
        ALIGN_CLASS[project.align]
      )}
    >
      <p aria-hidden className="mb-2 text-xs text-white">
        ({String(index).padStart(2, '0')})
      </p>

      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`View ${project.name} details`}
        data-hover-cursor={CursorIdentfierEnum.CARD_BTN}
        onClick={() => setOpen(true)}
        className="group relative aspect-3/4 w-full cursor-pointer overflow-hidden after:pointer-events-none after:absolute after:inset-0 focus-visible:after:shadow-[inset_0_0_32px_0_white]"
      >
        <Image
          src={project.posterImage.src || FALLBACK_IMAGE_URL}
          alt=""
          fill
          sizes="(min-width: 768px) 288px, 100vw"
          loading="lazy"
          draggable={false}
          className="object-cover object-center transition-transform duration-300 ease-in group-hover:scale-105"
          skeletonClassName="bg-white/30"
        />
      </button>

      <h3 className="text-base text-white xl:mt-2">{project.name}</h3>

      <ProjectModal data={project} open={open} onClose={() => setOpen(false)} />
    </li>
  );
}
