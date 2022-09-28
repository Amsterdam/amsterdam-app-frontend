/**
 * Returns a two coordinates defining a square area by offseting a coordinate with a number of degrees.
 */
export const coordinatesSquare = (lon: number, lat: number, offset: number) => [
  lon - offset,
  lat - offset,
  lon + offset,
  lat + offset,
]
