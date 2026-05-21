//
import { IContent } from './data';

// ----------------------------------------------------------------------

export type ToggleButtonsContextType = {
  openProject: boolean;
  openContact: boolean;
  setOpenProject: (v: boolean) => void;
  setOpenContact: (v: boolean) => void;
  handleToggleProject: () => void;
  handleToggleContact: () => void;
};

export type GlobalContentContextType = IContent | null;
