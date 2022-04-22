import {ColorTheme, Theme} from './'

// Define our light theme colors
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
}
