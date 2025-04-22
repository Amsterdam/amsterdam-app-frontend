import {type ReactNode} from 'react'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {parseTextToComponentsForLinks} from '@/utils/parseTextToComponentsForLinks'

export const parseTextToComponentsWithInlineLinks = (
  text: string,
  openUrl: (url: string) => void,
  inverse: boolean,
): ReactNode[] =>
  parseTextToComponentsForLinks(text, part => (
    <InlineLink
      inverse={inverse}
      onPress={() => openUrl(part)}
      testID={`InlineLink${part}Link`}>
      {part}
    </InlineLink>
  ))
