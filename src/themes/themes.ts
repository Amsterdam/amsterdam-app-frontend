import {
  borderTokens,
  BorderTokens,
  ColorTokens,
  lightColorTokens,
  MediaTokens,
  mediaTokens,
  SizeTokens,
  sizeTokens,
  TextTokens,
  textTokens,
} from '@/themes/tokens'

export type Theme = {
  border: BorderTokens
  color: ColorTokens
  id: string
  media: MediaTokens
  size: SizeTokens
  text: TextTokens
}

export const themeId = 'light'

export const lightTheme: Theme = {
  id: themeId,
  border: borderTokens,
  color: lightColorTokens,
  media: mediaTokens,
  size: sizeTokens,
  text: textTokens,
}
