import { ToggleButtonsEnum, ToggleButtonHoverTargetType } from './types';

// ----------------------------------------------------------------------

export function getCursorSize(
  isToggleBtnHovered: boolean,
  isTextBtnHovered: boolean,
  isCardBtnHovered: boolean
): number {
  if (isToggleBtnHovered) {
    return 80;
  }

  if (isTextBtnHovered) {
    return 0;
  }

  if (isCardBtnHovered) {
    return 100;
  }

  return 40;
}

export function getCursorLabel(
  hoveredTarget: ToggleButtonHoverTargetType,
  openProject: boolean,
  openContact: boolean
): string | null {
  if (hoveredTarget === ToggleButtonsEnum.PROJECT) {
    return openProject ? '→' : '←';
  }

  if (hoveredTarget === ToggleButtonsEnum.CONTACT) {
    return openContact ? '→' : '←';
  }

  return null;
}
