import {Theme} from '../types'
import {typographyTheme} from '../typography/typography.theme'

export type ColorTheme = typeof defaultLightColorTheme

export const defaultLightColorTheme = {
  screen: {
    background: '#ffffff',
  },
  text: {
    default: '#000000',
    inverted: '#ffffff',
  },
}

export const defaultLightThemeId = 'default-light'

export const defaultLightTheme: Theme = {
  id: defaultLightThemeId,
  color: defaultLightColorTheme,
  typography: typographyTheme,
}
