'use client';

import Image from 'next/image';
import { useState } from 'react';

// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// types
import { IProject } from '@/types/data';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';

//
import ProjectModal from './project-modal';

// ----------------------------------------------------------------------

type Props = {
  project: IProject;
  index: number;
};

export default function ProjectItem({ project, index }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const upMd = useBreakpoint('up', 'md');

  return (
    <>
      <div
        className={cn(
          'flex w-full flex-col md:w-72',
          upMd
            ? {
                'self-start': project.align === 'start',
                'self-center': project.align === 'center',
                'self-end': project.align === 'end',
              }
            : 'self-start'
        )}
      >
        <p className="mb-2 text-xs">({String(index).padStart(2, '0')})</p>

        <button
          onClick={() => setOpen(true)}
          className="relative aspect-3/4 w-full cursor-pointer"
        >
          <Image
            src={project.posterImage.src || FALLBACK_IMAGE_URL}
            alt={project.posterImage.alt || project.name}
            fill
            priority
            draggable={false}
            className="object-cover object-center"
          />
        </button>

        <p className="text-base xl:mt-2">{project.name}</p>
      </div>

      <ProjectModal data={project} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
