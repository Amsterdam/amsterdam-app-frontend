export type SizeTokens = typeof sizeTokens
export type SpacingTokens = typeof sizeTokens.spacing

export const sizeTokens = {
  spacing: {
    no: 0,
    xs: 4,
    sm: 8,
    smd: 12,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 80,
  },
  iconContainer: {
    xl: 55,
  },
} as const
