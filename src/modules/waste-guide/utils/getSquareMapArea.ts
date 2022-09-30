/**
 * Returns a two coordinates defining a square area by offsetting a coordinate with a number of degrees.
 */
export const getSquareMapArea = (lon: number, lat: number, offset: number) => [
  lon - offset,
  lat - offset,
  lon + offset,
  lat + offset,
]
