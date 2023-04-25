/**
 * Returns a two coordinates defining a square area by offsetting a coordinate with a number of degrees.
 */
export const getSquareMapArea = (lat: number, lon: number, offset: number) => [
  lat - offset,
  lon - offset,
  lat + offset,
  lon + offset,
]
