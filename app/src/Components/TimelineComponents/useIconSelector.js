/**
 * useIconSelector.js
 *
 * Returns the function getImg(eventName) used to select the correct icon based on event name.
 * The function getImg(eventName) returns an image.
 *
 * function useIconSelector() - Erik Jareman - FINAL
 */

import {
  InlagdIcon,
  DosIcon,
  AmbIcon,
  HemIcon,
  VardIcon,
  Svar1Icon,
  Svar2Icon,
  PipettIcon,
  NotFoundImage
} from '../../assets/timelineIcons/index'

const useIconSelector = () => {
  const getImg = (eventName) => {
    const img = new Image()
    switch (eventName) {
      case 'Inlagd':
        img.src = InlagdIcon
        return img
      case 'Ambulans':
        img.src = AmbIcon
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
        img.src = Svar1Icon
        return img
      case 'Svar1':
        img.src = Svar1Icon
        return img
      case 'Svar2':
        img.src = Svar2Icon
        return img
      case 'Pipett':
        img.src = PipettIcon
        return img
      default:
        img.src = NotFoundImage
        return img
    }
  }
  return { getImg }
}

export default useIconSelector
