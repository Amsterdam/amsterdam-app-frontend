import {
  ColorTokens,
  darkColorTokens,
  lightColorTokens,
  SizeTokens,
  sizeTokens,
  TextTokens,
  textTokens,
} from './tokens'

export type SharedTheme = {
  size: SizeTokens
  text: TextTokens
}

export type Theme = {
  id: string
  color: ColorTokens
} & SharedTheme

export const lightThemeId = 'light'
export const darkThemeId = 'dark'

const sharedTokens: SharedTheme = {
  size: sizeTokens,
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
