import {ColorTheme} from './light-color-theme'
import {TypographyTheme} from './typography-theme'

export type Theme = {
  id: string
  color: ColorTheme
  typography: TypographyTheme
}
