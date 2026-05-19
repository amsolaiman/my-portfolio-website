'use client';

import React from 'react';

// types
import { IContent } from '@/types/data';

//
import { GlobalContentContext } from './global-content-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  value: IContent;
};

export function GlobalContentProvider({ children, value }: Props) {
  return (
    <GlobalContentContext.Provider value={value}>
      {children}
    </GlobalContentContext.Provider>
  );
}
