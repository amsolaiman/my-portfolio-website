import Image from 'next/image';

// utils
import { cn } from '@/utils/tw-merge';
// _store
import { IProject } from '@/_store/projects';

// ----------------------------------------------------------------------

type Props = {
  project: IProject;
  index: number;
};

export default function ProjectItem({ project, index }: Props) {
  return (
    <div
      className={cn('flex flex-col gap-2', {
        'self-start': project.align === 'top',
        'self-center': project.align === 'center',
        'self-end': project.align === 'bottom',
      })}
    >
      <p className="text-xs">({String(index).padStart(2, '0')})</p>

      <div className="relative aspect-3/4 w-72">
        <Image
          src={project.posterImage}
          alt={project.name}
          fill
          priority
          draggable={false}
          className="object-cover object-center"
        />
      </div>

      <p className="text-base">{project.name}</p>
    </div>
  );
}
