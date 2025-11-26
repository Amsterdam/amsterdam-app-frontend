import {MarkerVariant} from '@/components/features/map/marker/markers'

/**
 *
 * @param selectedMarkerId The id of the currently selected marker.
 * @param favoriteMarkerIds An array of favorite marker id's or single marker id
 * @returns Function that accepts the markerId in order to determine which MarkerVariant to return.
 */
export const getMarkerVariant =
  (
    selectedMarkerId?: string | number,
    favoriteMarkerIds?: Array<string | number> | string | number,
  ) =>
  /**
   * Pass the id of the marker to check which variant to return.
   * @param markerId The string id of the marker to check against selected marker and other states.
   * @returns The correct MarkerVariant.
   */
  (markerId: string | number) => {
    if (markerId === selectedMarkerId) {
      return MarkerVariant.selectedPin
    }

    if (
      (Array.isArray(favoriteMarkerIds) &&
        favoriteMarkerIds?.includes(markerId)) ||
      favoriteMarkerIds === markerId
    ) {
      return MarkerVariant.favoritePin
    }

    return MarkerVariant.pin
  }
