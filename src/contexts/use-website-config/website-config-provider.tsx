'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

// constants
import { PATHS } from '@/constants/paths';
// sections
import { MissingConfigView } from '@/sections/error';
// types
import { IWebsiteConfig } from '@/types/data';

//
import { WebsiteConfigContext } from './website-config-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  value: IWebsiteConfig | null;
};

export function WebsiteConfigProvider({ children, value }: Props) {
  const pathname = usePathname();

  if (!value) {
    if (pathname === PATHS.studio || pathname.startsWith(`${PATHS.studio}/`)) {
      return children;
    }

    return <MissingConfigView />;
  }

  return (
    <WebsiteConfigContext.Provider value={value}>
      {children}
    </WebsiteConfigContext.Provider>
  );
}
