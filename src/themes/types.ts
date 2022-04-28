import {ColorTheme} from './color/light.theme'
import {TypographyTheme} from './typography/types'

export type Theme = {
  id: string
  color: ColorTheme
  typography: TypographyTheme
}
