import {View} from 'react-native'
import {Button, PhoneHQButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {useOpenWebUrl} from '@/hooks'
import {FractionContent} from '@/modules/waste-guide/components'

type Props = {
  buttonContent?: string
  buttonLink?: string
  content?: string | null
  inlineLink?: string
  label: string
}

export const FractionSection = ({
  buttonContent,
  buttonLink,
  content,
  label,
  inlineLink,
}: Props) => {
  const openWebUrl = useOpenWebUrl()

  if (!content) {
    return null
  }

  if (buttonLink) {
    return (
      <Row gutter="xs" valign="start">
        <View>
          <Phrase emphasis="strong">{label}: </Phrase>
        </View>
        <Row gutter="sm" wrap>
          <Button
            label={buttonContent}
            onPress={() => openWebUrl(buttonLink)}
          />
          <PhoneHQButton variant="secondary" />
        </Row>
      </Row>
    )
  }

  return (
    <Phrase>
      <Phrase emphasis="strong">{label}: </Phrase>
      {/* Remove inlineLink once the API includes the url as a single property */}
      {inlineLink ? (
        <InlineLink onPress={() => openWebUrl(inlineLink)}>
          {content}
        </InlineLink>
      ) : (
        <FractionContent content={content} />
      )}
    </Phrase>
  )
}
