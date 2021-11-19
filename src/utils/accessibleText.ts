import {injectCommas} from './injectCommas'
import {replaceAbbreviations} from './replaceAbbreviations'

export const accessibleText = (...fragments: (string | undefined)[]) =>
  replaceAbbreviations(injectCommas(...fragments))
