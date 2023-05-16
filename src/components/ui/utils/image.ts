import {ImageURISource, PixelRatio} from 'react-native'
import {isDevApp} from '@/processes'

export const sortSourcesByWidthAscending = (
  {width: widthA = 0}: ImageURISource,
  {width: widthB = 0}: ImageURISource,
) => {
  if (widthA > widthB) {
    return 1
  }
  if (widthA < widthB) {
    return -1
  }
  return 0
}

/**
 * Get the URI for an image from an ImageURISource or an array of ImageURISources. If there are multiple sources, determine the most suited image size.
 * This is the narrowest image that is wider than the available width, which is the width param times the device pixel density.
 */
export const getUriForWidth = (
  uriSources: ImageURISource | ImageURISource[],
  width: number,
) => {
  if (!Array.isArray(uriSources)) {
    return uriSources.uri
  }

  // This prevents an issue that prevents images from being rendered when hot reloading
  if (isDevApp && !width) {
    width = 1000
  }

  if (!width) {
    return
  }

  const sortedSources = [...uriSources].sort(sortSourcesByWidthAscending)
  const minWidth = PixelRatio.getPixelSizeForLayoutSize(width)
  const firstSourceLargerThanMinWidth = sortedSources.find(
    ({width: sourceWidth = 0}: ImageURISource) => sourceWidth >= minWidth,
  )

  if (!firstSourceLargerThanMinWidth) {
    return sortedSources.pop()?.uri
  }

  return firstSourceLargerThanMinWidth.uri
}
