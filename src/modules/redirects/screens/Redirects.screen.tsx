import React, {FC, useContext} from 'react'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {Redirects} from '@/modules/redirects/components'
import {DeviceContext} from '@/providers'
import {openWebUrl} from '@/utils'

export const RedirectsScreen: FC = () => {
  const {isLandscape} = useContext(DeviceContext)

  return (
    <Screen>
      <Box>
        <Column gutter="lg">
          <Column gutter="xs">
            <Title text="Direct regelen" />
            <Paragraph>
              Niet alle informatie staat in de app. Graag verwijzen we u naar
              onze website zodat u zelf aan de slag kunt.
            </Paragraph>
          </Column>
          <Redirects />
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
        </Column>
      </Box>
    </Screen>
  )
}
