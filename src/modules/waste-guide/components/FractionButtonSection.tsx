import {Button, PhoneHQButton} from '@/components/ui/buttons'
import {FauxButton} from '@/components/ui/buttons/FauxButton'
import {Row} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'
import {useOpenWebUrl} from '@/hooks'

type Props = {
  content: string
  label: string
  link: string
  withPhoneButton?: boolean
}

export const FractionButtonSection = ({
  content,
  label,
  link,
  withPhoneButton = false,
}: Props) => {
  const openWebUrl = useOpenWebUrl()

  return (
    <Row
      gutter="xs"
      valign="start">
      <FauxButton>
        <Phrase emphasis="strong">{label}: </Phrase>
      </FauxButton>
      <Row
        gutter="sm"
        wrap>
        <Button
          label={content}
          onPress={() => openWebUrl(link)}
        />
        {!!withPhoneButton && <PhoneHQButton variant="secondary" />}
      </Row>
    </Row>
  )
}
