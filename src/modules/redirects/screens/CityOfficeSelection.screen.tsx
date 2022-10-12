import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Flex, Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {openWebUrl} from '@/utils'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    RedirectsRouteName.cityOfficeSelection
  >
}

export const CityOfficeSelectionScreen = ({navigation}: Props) => {
  return (
    <Box>
      <Column gutter="md">
        <Title text="Waar wilt u een afspraak maken?" />
        <Row gutter="md">
          <Flex>
            <Button
              label="Amsterdam"
              onPress={() =>
                navigation.navigate(RedirectsRouteName.appointmentOverview)
              }
            />
          </Flex>
          <Flex>
            <Button
              label="Weesp"
              onPress={() =>
                openWebUrl(
                  'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx',
                )
              }
              variant="secondary"
            />
          </Flex>
        </Row>
      </Column>
    </Box>
  )
}
