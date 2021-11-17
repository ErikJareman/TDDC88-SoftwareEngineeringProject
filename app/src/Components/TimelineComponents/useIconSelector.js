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
  const getImg = (eventName) => {
    const img = new Image()
    switch (eventName) {
      case 'Inlagd':
        img.src = InlagdIcon
        return img
      case 'Dos':
        img.src = DosIcon
        return img
      case 'Hem':
        img.src = HemIcon
        return img
      case 'Vård':
        img.src = VardIcon
        return img
      case 'Skickat':
        img.src = SkickatIcon
        return img
      case 'Svar1':
        img.src = Svar1Icon
        return img
      case 'Svar2':
        img.src = Svar2Icon
        return img
      default:
        img.src = NotFoundImage
        return img
    }
  }
  return { getImg }
}

export default useIconSelector
