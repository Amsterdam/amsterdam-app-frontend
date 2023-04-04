import {HtmlContent, Phrase} from '@/components/ui/text'

type Props = {
  content: string | null
}

const containsHtml = (content: string) => content.includes('<')

export const FractionContent = ({content}: Props) => {
  if (!content) {
    return null
  }

  if (containsHtml(content)) {
    return <HtmlContent content={content} />
  }

  return <Phrase>{content}</Phrase>
}
