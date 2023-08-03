import {useContext} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/useOpenWebUrl'
import {DeviceContext} from '@/providers/device.provider'

export const ReferToWebsite = () => {
  const openWebUrl = useOpenWebUrl()
  const {isLandscape} = useContext(DeviceContext)

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
