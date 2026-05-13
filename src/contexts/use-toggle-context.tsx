'use client';

import React, { createContext, useContext, useState } from 'react';

// types
import { ToggleContextType } from '@/types/context';

// ----------------------------------------------------------------------

export const ToggleContext = createContext({} as ToggleContextType);

export const useToggleContext = () => {
  const context = useContext(ToggleContext);

  if (!context)
    throw new Error(
      'useToggleContext context must be use inside ToggleProvider'
    );

  return context;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ToggleProvider({ children }: Props) {
  const [openProject, setOpenProject] = useState<boolean>(false);

  const [openContact, setOpenContact] = useState<boolean>(false);

  const handleToggleProject = () => {
    setOpenProject(!openProject);

    if (openContact) {
      setOpenContact(false);
    }
  };

  const handleToggleContact = () => {
    setOpenContact(!openContact);

    if (!openProject) {
      setOpenProject(true);
    }
  };

  const value = {
    openProject,
    openContact,
    handleToggleProject,
    handleToggleContact,
  };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
}
