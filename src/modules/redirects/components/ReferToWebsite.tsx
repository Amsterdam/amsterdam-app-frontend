import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDeviceContext} from '@/hooks/useDeviceContext'

export const ReferToWebsite = () => {
  const openWebUrl = useOpenWebUrl()
  const {isLandscape} = useDeviceContext()

  return (
    <Column gutter="xs">
      <Title
        level="h4"
        text="Niet gevonden wat u zocht?"
      />
      <Column gutter="md">
        <Paragraph>
          Kijk dan op onze website waar al onze informatie staat.
        </Paragraph>
        <Column halign={isLandscape ? 'start' : undefined}>
          <Button
            accessibilityRole="link"
            label="Naar amsterdam.nl"
            onPress={() => openWebUrl('https://www.amsterdam.nl')}
          />
        </Column>
      </Column>
    </Column>
  )
}
