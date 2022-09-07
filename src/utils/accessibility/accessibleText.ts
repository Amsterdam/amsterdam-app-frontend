import {injectCommas, replaceAbbreviations} from '@/utils'

export const accessibleText = (...fragments: (string | undefined)[]) =>
  replaceAbbreviations(injectCommas(...fragments))
