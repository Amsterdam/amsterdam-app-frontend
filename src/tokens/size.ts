export type Spacing = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export type Size = {
  spacing: Spacing
}

export const size: Size = {
  spacing: {xs: 4, sm: 8, md: 16, lg: 24, xl: 32},
}
