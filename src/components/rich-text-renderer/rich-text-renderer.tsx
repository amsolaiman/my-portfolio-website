import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from '@portabletext/react';

// utils
import { cn } from '@/utils/tw-merge';

// ----------------------------------------------------------------------

type Props = {
  value: PortableTextBlock[];
  className?: string;
};

export default function RichTextRenderer({ value, className }: Props) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <p className={cn('text-xs text-white', className)}>{children}</p>
      ),
    },
    marks: {
      em: ({ children }) => <span className="text-gray-400">{children}</span>,
    },
  };

  return <PortableText value={value} components={components} />;
}
