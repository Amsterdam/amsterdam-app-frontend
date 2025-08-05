import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {FractionContent} from '@/modules/waste-guide/components/FractionContent'

type Props = {
  content?: string | null
  sectionTitle: string
  url?: string
} & TestProps

export const FractionSection = ({
  content,
  sectionTitle,
  testID,
  url,
}: Props) => {
  if (!content) {
    return
  }

  return (
    <Row valign="start">
      <Phrase
        emphasis="strong"
        flexShrink={0}
        testID={`${testID}TitlePhrase`}>
        {`${sectionTitle}: `}
      </Phrase>
      {/* Remove inlineLink once the API includes the url as a single property */}
      {url ? (
        <ExternalLinkButton
          label={content}
          noPadding
          testID={`${testID}ExternalLinkButton`}
          url={url}
          variant="tertiary"
        />
      ) : (
        <FractionContent
          content={content}
          testID={`${testID}Content`}
        />
      )}
    </Row>
  )
}
