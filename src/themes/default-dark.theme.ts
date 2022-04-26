import {typographyTheme} from './typography.theme'
import {ColorTheme, Theme} from './'

const defaultDarkColorTheme: ColorTheme = {
  screen: {
    background: '#333333',
  },
  text: {
    default: '#ffffff',
    inverted: '#000000',
  },
}

export const defaultDarkSpaceId = 'default-dark'

export const defaultDarkTheme: Theme = {
  id: defaultDarkSpaceId,
  color: defaultDarkColorTheme,
  typography: typographyTheme,
}
