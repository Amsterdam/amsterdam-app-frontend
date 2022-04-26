import {TypographyTheme} from './typography.theme'

export type Theme = {
  id: string
  color: ColorTheme
  typography: TypographyTheme
}

export type ColorTheme = {
  screen: {
    background: string
  }
  text: {
    default: string
    inverted: string
  }
}
