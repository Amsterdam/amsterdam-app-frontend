import {ColorTheme, Theme, typographyTheme} from '../'

const defaultDarkColorTheme: ColorTheme = {
  screen: {
    background: '#333333',
  },
  text: {
    default: '#ffffff',
    inverted: '#000000',
  },
}

export const defaultDarkThemeId = 'default-dark'

export const defaultDarkTheme: Theme = {
  id: defaultDarkThemeId,
  color: defaultDarkColorTheme,
  typography: typographyTheme,
}
