import {ImageURISource, PixelRatio} from 'react-native'

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

  const sortedSources = uriSources.sort(sortSourcesByWidthAscending)
  const minWidth = PixelRatio.getPixelSizeForLayoutSize(width)
  const firstSourceLargerThanMinWidth = sortedSources.find(
    ({width: sourceWidth = 0}: ImageURISource) => sourceWidth >= minWidth,
  )

  if (!firstSourceLargerThanMinWidth) {
    return sortedSources[sortedSources.length - 1]?.uri
  }

  return firstSourceLargerThanMinWidth.uri
}
