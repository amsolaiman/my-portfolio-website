//
import { IContent } from './data';

// ----------------------------------------------------------------------

export type ToggleContextType = {
  openProject: boolean;
  openContact: boolean;
  handleToggleProject: () => void;
  handleToggleContact: () => void;
};

export type GlobalContentContextType = IContent | null;
