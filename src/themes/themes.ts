import {borderTokens, BorderTokens} from '@/themes/tokens/border'
import {ColorTokens, lightColorTokens} from '@/themes/tokens/color-light'
import {durationTokens, DurationTokens} from '@/themes/tokens/duration'
import {MediaTokens, mediaTokens} from '@/themes/tokens/media'
import {SizeTokens, sizeTokens} from '@/themes/tokens/size'
import {TextTokens, textTokens} from '@/themes/tokens/text'
import {ZTokens, zTokens} from '@/themes/tokens/z'

export type Theme = {
  border: BorderTokens
  color: ColorTokens
  duration: DurationTokens
  id: string
  media: MediaTokens
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
  size: sizeTokens,
  text: textTokens,
  z: zTokens,
}
