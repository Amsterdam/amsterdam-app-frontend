import React, {FC} from 'react'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {Redirects, ReferToWebsite} from '@/modules/redirects/components'

export const RedirectsScreen: FC = () => (
  <Screen>
    <Box>
      <Column gutter="md">
        <Column gutter="xs">
          <Title text="Direct regelen" />
          <Paragraph>
            Niet alle informatie staat in de app. Graag verwijzen we u naar onze
            website zodat u zelf aan de slag kunt.
          </Paragraph>
        </Column>
        <Redirects />
        <ReferToWebsite />
      </Column>
    </Box>
  </Screen>
)
