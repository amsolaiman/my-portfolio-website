'use client';

import Image from 'next/image';

// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// types
import { IProject } from '@/types/data';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';

// ----------------------------------------------------------------------

type Props = {
  project: IProject;
  index: number;
};

export default function ProjectItem({ project, index }: Props) {
  const upMd = useBreakpoint('up', 'md');

  return (
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

      <div className="relative aspect-3/4 w-full">
        <Image
          src={project.posterImage.src || FALLBACK_IMAGE_URL}
          alt={project.posterImage.alt || project.name}
          fill
          priority
          draggable={false}
          className="object-cover object-center"
        />
      </div>

      <p className="text-base xl:mt-2">{project.name}</p>
    </div>
  );
}
