import {
  borderTokens,
  BorderTokens,
  ColorTokens,
  darkColorTokens,
  lightColorTokens,
  MediaTokens,
  mediaTokens,
  SizeTokens,
  sizeTokens,
  TextTokens,
  textTokens,
} from './tokens'

export type SharedTheme = {
  border: BorderTokens
  media: MediaTokens
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
  border: borderTokens,
  media: mediaTokens,
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
