import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'

type Props = {
  content: string | null
} & TestProps

const containsHtml = (content: string) => content.includes('<')

export const FractionContent = ({content, testID}: Props) => {
  if (!content) {
    return null
  }

  if (containsHtml(content)) {
    return (
      <HtmlContent
        content={content}
        testID={testID}
      />
    )
  }

  return <Phrase testID={testID}>{content}</Phrase>
}
