/**
 * useIconSelector.js
 *
 * function useIconSelector() - Erik Jareman - DRAFT
 *
 * this file contains the icon-logic used by the timeline
 */

import {
  InlagdIcon,
  DosIcon,
  HemIcon,
  VardIcon,
  SkickatIcon,
  Svar1Icon,
  Svar2Icon,
  NotFoundImage
} from '../../assets/timelineIcons/index'

const useIconSelector = () => {
  const getIcon = (eventName) => {
    switch (eventName) {
      case 'Inlagd':
        return InlagdIcon
      case 'Dos':
        return DosIcon
      case 'Hem':
        return HemIcon
      case 'Vård':
        return VardIcon
      case 'Skickat':
        return SkickatIcon
      case 'Svar1':
        return Svar1Icon
      case 'Svar2':
        return Svar2Icon
      default:
        return NotFoundImage
    }
  }
  return { getIcon }
}

export default useIconSelector
