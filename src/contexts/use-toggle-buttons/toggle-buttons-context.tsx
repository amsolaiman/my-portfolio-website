'use client';

import { createContext, useContext } from 'react';

// types
import { ToggleButtonsContextType } from '@/types/context';

// ----------------------------------------------------------------------

export const ToggleButtonsContext = createContext(
  {} as ToggleButtonsContextType
);

export const useToggleButtons = () => {
  const context = useContext(ToggleButtonsContext);

  if (!context)
    throw new Error(
      'useToggleButtons context must be use inside ToggleButtonsProvider'
    );

  return context;
};
