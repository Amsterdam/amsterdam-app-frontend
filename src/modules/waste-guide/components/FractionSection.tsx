import {Phrase} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {FractionContent} from '@/modules/waste-guide/components'
import {openWebUrl} from '@/utils'

type Props = {
  containerMapUrl?: string
  content?: string | null
  label: string
}

export const FractionSection = ({content, label, containerMapUrl}: Props) => {
  if (!content) {
    return null
  }

  return (
    <Phrase>
      <Phrase emphasis="strong">{label}: </Phrase>
      {/* Remove once the API includes the url as a single property */}
      {containerMapUrl ? (
        <InlineLink onPress={() => openWebUrl(containerMapUrl)}>
          {content}
        </InlineLink>
      ) : (
        <FractionContent content={content} />
      )}
    </Phrase>
  )
}
