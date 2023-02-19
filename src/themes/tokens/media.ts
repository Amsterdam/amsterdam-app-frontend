export type MediaTokens = typeof mediaTokens
export type ImageAspectRatioTokens = typeof mediaTokens.aspectRatio

export const mediaTokens = {
  aspectRatio: {
    extraWide: 940 / 415, // These are the width and height of the project images on amsterdam.nl
    narrow: 5 / 4,
    square: 1,
    wide: 16 / 9,
  },
  figureHeight: {
    md: 192,
    lg: 256,
    xl: 320,
  },
  imageAspectRatio: {
    facades: 2048 / 256,
    illustrationLandscape: 512 / 256,
    illustrationPortrait: 256 / 512,
  },
  imageWidth: {
    illustrationNarrow: 128,
    illustrationWide: 320,
  },
}
