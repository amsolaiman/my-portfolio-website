'use client';

import { useState } from 'react';
import Image from 'next/image';

// components
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
      <p aria-hidden className="mb-2 text-xs">
        ({String(index).padStart(2, '0')})
      </p>

      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`View ${project.name} details`}
        data-hover-cursor={CursorIdentfierEnum.CARD_BTN}
        onClick={() => setOpen(true)}
        className="relative aspect-3/4 w-full cursor-pointer"
      >
        <Image
          src={project.posterImage.src || FALLBACK_IMAGE_URL}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 288px, 100vw"
          draggable={false}
          className="object-cover object-center"
        />
      </button>

      <h3 className="text-base xl:mt-2">{project.name}</h3>

      <ProjectModal data={project} open={open} onClose={() => setOpen(false)} />
    </li>
  );
}
