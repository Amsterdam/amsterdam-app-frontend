import {ColorTheme, Theme, typographyTheme} from '../'

const defaultLightColorTheme: ColorTheme = {
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
