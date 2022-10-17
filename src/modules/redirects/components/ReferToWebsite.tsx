import React, {useContext} from 'react'
import {Button} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {DeviceContext} from '@/providers'
import {openWebUrl} from '@/utils'

export const ReferToWebsite = () => {
  const {isLandscape} = useContext(DeviceContext)

  return (
    <Column gutter="xs">
      <Title level="h4" text="Niet gevonden wat u zocht?" />
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
