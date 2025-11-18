const BASE_WIDTH = 40

export const calculateClusterDimensions = (
  pointCount: number,
  padding: number = 0,
) => Math.floor(BASE_WIDTH * (1 + String(pointCount).length / 10) + padding)
