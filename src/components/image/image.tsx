'use client';

import { useState } from 'react';
import NextImage, { type ImageProps } from 'next/image';

// utils
import { cn } from '@/utils/tw-merge';

// ----------------------------------------------------------------------

type Props = ImageProps & {
  /** Extra classes applied to the skeleton (e.g. to change the background color) */
  skeletonClassName?: string;
};

export default function Image({
  className,
  skeletonClassName,
  onLoad,
  onError,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <NextImage
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        setLoaded(true);
        onError?.(e);
      }}
      className={cn(
        !loaded && cn('animate-pulse! bg-white/10', skeletonClassName),
        'text-gray-700',
        className
      )}
    />
  );
}
