'use client';

import { createContext, useContext } from 'react';

// types
import { GlobalContentContextType } from '@/types/context';

// ----------------------------------------------------------------------

export const GlobalContentContext = createContext(
  {} as GlobalContentContextType
);

export const useGlobalContent = () => {
  const context = useContext(GlobalContentContext);

  if (!context)
    throw new Error(
      'useGlobalContent context must be use inside GlobalContentProvider'
    );

  return context;
};
