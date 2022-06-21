export type ImageTokens = typeof imageTokens
export type ImageAspectRatioTokens = typeof imageTokens.aspectRatio

export const imageTokens = {
  aspectRatio: {
    default: 16 / 9,
    hero: 378 / 167,
    square: 1,
    vintage: 4 / 3,
    wide: 940 / 415, // These are the width and height of the project images on amsterdam.nl
  },
}
