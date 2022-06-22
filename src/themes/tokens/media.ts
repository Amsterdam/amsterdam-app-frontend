export type MediaTokens = typeof mediaTokens
export type ImageAspectRatioTokens = typeof mediaTokens.aspectRatio

export const mediaTokens = {
  aspectRatio: {
    default: 16 / 9,
    hero: 378 / 167,
    square: 1,
    vintage: 4 / 3,
    wide: 940 / 415, // These are the width and height of the project images on amsterdam.nl
  },
}
