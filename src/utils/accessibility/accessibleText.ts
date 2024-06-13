import {abbreviationsPronounce} from '@/utils/accessibility/abbreviationsPronounce'

const injectCommas = (...fragments: (string | undefined | null)[]) =>
  fragments.filter(fragment => fragment).join(', ')

export const accessibleText = (...fragments: (string | undefined | null)[]) =>
  abbreviationsPronounce(injectCommas(...fragments))
