import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useOpenMailUrl} from '@/hooks/useOpenMailUrl'

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
