import {Theme} from '../types'
import {typographyTheme} from '../typography/typography.theme'
import {ColorTheme} from './light.theme'

const darkColorTheme: ColorTheme = {
  screen: {
    background: '#333333',
  },
  text: {
    default: '#ffffff',
    inverted: '#000000',
  },
}

export const darkThemeId = 'dark'

export const darkTheme: Theme = {
  id: darkThemeId,
  color: darkColorTheme,
  typography: typographyTheme,
}
