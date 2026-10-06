'use client';

import React from 'react';

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
  return (
    <WebsiteConfigContext.Provider value={value}>
      {children}
    </WebsiteConfigContext.Provider>
  );
}
