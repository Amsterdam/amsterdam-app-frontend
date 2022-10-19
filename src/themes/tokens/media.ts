export type MediaTokens = typeof mediaTokens
export type ImageAspectRatioTokens = typeof mediaTokens.aspectRatio

export const mediaTokens = {
  aspectRatio: {
    default: 16 / 9,
    square: 1,
    vintage: 4 / 3,
    wide: 940 / 415, // These are the width and height of the project images on amsterdam.nl
  },
  figureHeight: {
    md: 192,
    lg: 256,
    xl: 320,
  },
  imageAspectRatio: {
    projectWarningFallback: 355 / 135,
    wasteGuideHome: 311 / 275,
  },
  imageWidth: {
    wasteGuideHome: 288,
  },
}
