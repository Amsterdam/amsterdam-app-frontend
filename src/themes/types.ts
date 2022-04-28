import {ColorTheme} from './color/types'
import {TypographyTheme} from './typography/types'

export type Theme = {
  id: string
  color: ColorTheme
  typography: TypographyTheme
}
