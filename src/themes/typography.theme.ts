type TitleValues = {
  h1: number
  h2: number
  h3: number
  h4: number
  h5: number
  h6: number
}

export type TypographyTheme = {
  fontSize: TitleValues
  lineHeight: TitleValues
}

export const typographyTheme: TypographyTheme = {
  fontSize: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 22,
    h5: 18,
    h6: 16,
  },
  lineHeight: {
    h1: 1.1,
    h2: 1.2,
    h3: 1.3,
    h4: 1.4,
    h5: 1.4,
    h6: 1.4,
  },
}
