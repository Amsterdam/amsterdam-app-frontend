import {borderTokens, BorderTokens} from '@/themes/tokens/border'
import {ColorTokens, lightColorTokens} from '@/themes/tokens/color-light'
import {MediaTokens, mediaTokens} from '@/themes/tokens/media'
import {SizeTokens, sizeTokens} from '@/themes/tokens/size'
import {TextTokens, textTokens} from '@/themes/tokens/text'

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
