const BASE_WIDTH = 40
const FONT_WIDTH = 10

export const calculateClusterDimensions = (
  pointCount: number,
  padding: number = 0,
) =>
  Math.floor(
    BASE_WIDTH + (String(pointCount).length - 1) * FONT_WIDTH + padding,
  )
