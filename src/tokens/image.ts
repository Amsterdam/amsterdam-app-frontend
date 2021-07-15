type ImageTokens = {
  aspectRatio: {
    default: number
    wide: number
  }
}

export const image: ImageTokens = {
  aspectRatio: {
    default: 16 / 9,
    wide: 940 / 415, // These are the width and height of the project images on amsterdam.nl
  },
}
