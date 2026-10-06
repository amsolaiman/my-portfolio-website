'use client';

import React from 'react';

// types
import { IGlobalContent } from '@/types/data';

//
import { GlobalContentContext } from './global-content-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  value: IGlobalContent | null;
};

export function GlobalContentProvider({ children, value }: Props) {
  return (
    <GlobalContentContext.Provider value={value}>
      {children}
    </GlobalContentContext.Provider>
  );
}
