/**
 * Returns a string representation of two coordinates, defining a square area, by offsetting a coordinate with an amount of degrees.
 */
export const getSquareMapArea = (lat: number, lon: number, offset: number) =>
  [lat - offset, lon - offset, lat + offset, lon + offset].join('/')
