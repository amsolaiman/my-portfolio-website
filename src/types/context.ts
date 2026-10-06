//
import { IGlobalContent, IWebsiteConfig } from './data';

// ----------------------------------------------------------------------

export type WebsiteConfigContextType = IWebsiteConfig | null;

export type GlobalContentContextType = IGlobalContent | null;

export type ToggleButtonsContextType = {
  openProject: boolean;
  openContact: boolean;
  setOpenProject: (v: boolean) => void;
  setOpenContact: (v: boolean) => void;
  handleToggleProject: () => void;
  handleToggleContact: () => void;
};
