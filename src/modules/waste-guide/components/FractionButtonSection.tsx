import {Button} from '@/components/ui/buttons/Button'
import {FauxButton} from '@/components/ui/buttons/FauxButton'
import {PhoneHQButton} from '@/components/ui/buttons/PhoneHQButton'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'

type Props = {
  buttonLabel: string
  buttonUrl: string
  sectionTitle: string
  withPhoneButton?: boolean
} & TestProps

export const FractionButtonSection = ({
  buttonLabel,
  buttonUrl,
  sectionTitle,
  testID,
  withPhoneButton = false,
}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Row
      gutter="xs"
      valign="start">
      <FauxButton testID={`${testID}FauxButton`}>
        <Phrase
          emphasis="strong"
          testID={`${testID}Phrase`}>
          {sectionTitle}:{' '}
        </Phrase>
      </FauxButton>
      <Row
        gutter="sm"
        wrap>
        <Button
          label={buttonLabel}
          onPress={() => openWebUrl(buttonUrl)}
          testID={`${testID}Button`}
        />
        {!!withPhoneButton && (
          <PhoneHQButton
            testID={`${testID}PhoneButton`}
            variant="secondary"
          />
        )}
      </Row>
    </Row>
  )
}
