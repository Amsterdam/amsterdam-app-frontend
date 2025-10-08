import {borderTokens, BorderTokens} from '@/themes/tokens/border'
import {ColorTokens, lightColorTokens} from '@/themes/tokens/color-light'
import {durationTokens, DurationTokens} from '@/themes/tokens/duration'
import {MediaTokens, mediaTokens} from '@/themes/tokens/media'
import {shadowTokens, ShadowTokens} from '@/themes/tokens/shadow'
import {SizeTokens, sizeTokens} from '@/themes/tokens/size'
import {TextTokens, textTokens} from '@/themes/tokens/text'
import {ZTokens, zTokens} from '@/themes/tokens/z'

export type Theme = {
  border: BorderTokens
  color: ColorTokens
  duration: DurationTokens
  id: string
  media: MediaTokens
  shadow: ShadowTokens
  size: SizeTokens
  text: TextTokens
  z: ZTokens
}

export const themeId = 'light'

export const lightTheme: Theme = {
  id: themeId,
  border: borderTokens,
  color: lightColorTokens,
  duration: durationTokens,
  media: mediaTokens,
  shadow: shadowTokens,
  size: sizeTokens,
  text: textTokens,
  z: zTokens,
}

export const themes = {
  light: lightTheme,
} satisfies Record<string, Theme>

export type Themes = keyof typeof themes
