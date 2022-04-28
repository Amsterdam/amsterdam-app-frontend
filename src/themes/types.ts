import {ColorTheme} from './color/default-light.theme'
import {TypographyTheme} from './typography/types'

export type Theme = {
  id: string
  color: ColorTheme
  typography: TypographyTheme
}
