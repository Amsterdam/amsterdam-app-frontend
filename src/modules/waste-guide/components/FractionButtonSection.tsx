import {Button, PhoneHQButton} from '@/components/ui/buttons'
import {FauxButton} from '@/components/ui/buttons/FauxButton'
import {Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {useOpenWebUrl} from '@/hooks'

type Props = {
  buttonLabel: string
  buttonUrl: string
  sectionTitle: string
  withPhoneButton?: boolean
}

export const FractionButtonSection = ({
  buttonLabel,
  buttonUrl,
  sectionTitle,
  withPhoneButton = false,
}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Row
      gutter="xs"
      valign="start">
      <FauxButton>
        <Phrase emphasis="strong">{sectionTitle}: </Phrase>
      </FauxButton>
      <Row
        gutter="sm"
        wrap>
        <Button
          label={buttonLabel}
          onPress={() => openWebUrl(buttonUrl)}
        />
        {!!withPhoneButton && <PhoneHQButton variant="secondary" />}
      </Row>
    </Row>
  )
}
