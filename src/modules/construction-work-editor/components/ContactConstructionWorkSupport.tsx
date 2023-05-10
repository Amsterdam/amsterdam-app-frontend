import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {useOpenMailUrl} from '@/hooks'

export const ContactConstructionWorkSupport = () => {
  const openMailUrl = useOpenMailUrl()

  return (
    <Box insetHorizontal="md">
      <Column gutter="sm">
        <Paragraph>Ontbreekt er een bouwproject?</Paragraph>
        <Button
          label="Neem contact op met de redactie"
          onPress={() => openMailUrl('redactieprojecten@amsterdam.nl')}
          variant="secondary"
        />
      </Column>
    </Box>
  )
}
