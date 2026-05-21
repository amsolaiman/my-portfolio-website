'use client';

import React, { useState } from 'react';

//
import { ToggleButtonsContext } from './toggle-buttons-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ToggleButtonsProvider({ children }: Props) {
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
    setOpenProject,
    setOpenContact,
    handleToggleProject,
    handleToggleContact,
  };

  return (
    <ToggleButtonsContext.Provider value={value}>
      {children}
    </ToggleButtonsContext.Provider>
  );
}
