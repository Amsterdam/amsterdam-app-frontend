import {Phrase} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {FractionContent} from '@/modules/waste-guide/components'
import {openWebUrl} from '@/utils'

type Props = {
  content?: string | null
  label: string
  link?: string
}

export const FractionSection = ({content, label, link}: Props) => {
  if (!content) {
    return null
  }

  return (
    <Phrase>
      <Phrase emphasis="strong">{label}: </Phrase>
      {/* Remove once the API includes the url as a single property */}
      {link ? (
        <InlineLink onPress={() => openWebUrl(link)}>{content}</InlineLink>
      ) : (
        <FractionContent content={content} />
      )}
    </Phrase>
  )
}
