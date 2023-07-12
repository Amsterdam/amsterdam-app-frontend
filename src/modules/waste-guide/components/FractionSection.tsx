import {Phrase} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenWebUrl} from '@/hooks'
import {FractionContent} from '@/modules/waste-guide/components/FractionContent'

type Props = {
  content?: string | null
  label: string
  link?: string
}

export const FractionSection = ({content, label, link}: Props) => {
  const openWebUrl = useOpenWebUrl()

  if (!content) {
    return
  }

  return (
    <Phrase>
      <Phrase emphasis="strong">{label}: </Phrase>
      {/* Remove inlineLink once the API includes the url as a single property */}
      {link ? (
        <InlineLink onPress={() => openWebUrl(link)}>{content}</InlineLink>
      ) : (
        <FractionContent content={content} />
      )}
    </Phrase>
  )
}
