import {Theme} from '../types'
import {typographyTheme} from '../typography/typography.theme'

export type ColorTheme = typeof lightColorTheme

export const lightColorTheme = {
  screen: {
    background: '#ffffff',
  },
  text: {
    default: '#000000',
    inverted: '#ffffff',
  },
}

export const lightThemeId = 'light'

export const lightTheme: Theme = {
  id: lightThemeId,
  color: lightColorTheme,
  typography: typographyTheme,
}
