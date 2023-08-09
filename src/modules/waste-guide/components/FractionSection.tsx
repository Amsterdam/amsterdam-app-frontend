import {InlineLink} from '@/components/ui/text/InlineLink'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {FractionContent} from '@/modules/waste-guide/components/FractionContent'

type Props = {
  content?: string | null
  sectionTitle: string
  url?: string
}

export const FractionSection = ({content, sectionTitle, url}: Props) => {
  const openWebUrl = useOpenWebUrl()

  if (!content) {
    return
  }

  return (
    <Phrase>
      <Phrase emphasis="strong">{sectionTitle}: </Phrase>
      {/* Remove inlineLink once the API includes the url as a single property */}
      {url ? (
        <InlineLink onPress={() => openWebUrl(url)}>{content}</InlineLink>
      ) : (
        <FractionContent content={content} />
      )}
    </Phrase>
  )
}
