export type Spacing = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  xxl: number
}

export type Size = {
  spacing: Spacing
}

export const size: Size = {
  spacing: {xs: 5, sm: 10, md: 15, lg: 30, xl: 45, xxl: 60},
}
