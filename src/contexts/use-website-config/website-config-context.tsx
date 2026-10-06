'use client';

import { createContext, useContext } from 'react';

// types
import { WebsiteConfigContextType } from '@/types/context';

// ----------------------------------------------------------------------

export const WebsiteConfigContext = createContext(
  {} as WebsiteConfigContextType
);

export const useWebsiteConfig = () => {
  const context = useContext(WebsiteConfigContext);

  if (!context)
    throw new Error(
      'useWebsiteConfig context must be used inside WebsiteConfigProvider'
    );

  return context;
};
