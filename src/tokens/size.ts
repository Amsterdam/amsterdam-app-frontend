type WarningMainPhoto = {
  maxHeight: number
  maxWidth: number
}

export type Spacing = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export type Size = {
  spacing: Spacing
  warningMainPhoto: WarningMainPhoto
}

export const size: Size = {
  spacing: {xs: 4, sm: 8, md: 16, lg: 24, xl: 32},
  warningMainPhoto: {maxWidth: 1920, maxHeight: 1080},
}
