type ImageTokens = {
  aspectRatio: {
    default: number
    vintage: number
    wide: number
  }
}

export const image: ImageTokens = {
  aspectRatio: {
    default: 16 / 9,
    vintage: 4 / 3,
    wide: 940 / 415, // These are the width and height of the project images on amsterdam.nl
  },
}
