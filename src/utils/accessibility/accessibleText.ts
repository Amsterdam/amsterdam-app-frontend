import {injectCommas} from '@/utils/accessibility/injectCommas'
import {replaceAbbreviations} from '@/utils/accessibility/replaceAbbreviations'

export const accessibleText = (...fragments: (string | undefined | null)[]) =>
  replaceAbbreviations(injectCommas(...fragments))
