import {
  ColorTokens,
  darkColorTokens,
  lightColorTokens,
  TextTokens,
} from './tokens'
import {textTokens} from './tokens/text'

export type SharedTheme = {
  text: TextTokens
}

export type Theme = {
  id: string
  color: ColorTokens
} & SharedTheme

export const lightThemeId = 'light'
export const darkThemeId = 'dark'

const sharedTokens: SharedTheme = {
  text: textTokens,
}

export const lightTheme: Theme = {
  id: lightThemeId,
  color: lightColorTokens,
  ...sharedTokens,
}

export const darkTheme: Theme = {
  id: darkThemeId,
  color: darkColorTokens,
  ...sharedTokens,
}
