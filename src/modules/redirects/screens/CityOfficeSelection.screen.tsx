import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {openWebUrl} from '@/utils'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    RedirectsRouteName.cityOfficeSelection
  >
}

const appointmentFormWeespUrl =
  'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx'

export const CityOfficeSelectionScreen = ({navigation}: Props) => {
  return (
    <Screen>
      <Box>
        <Column gutter="md">
          <Title text="Waar wilt u een afspraak maken?" />
          <Row gutter="md">
            <Column flex={1}>
              <Button
                accessibilityRole="link"
                label="Amsterdam"
                onPress={() =>
                  navigation.navigate(RedirectsRouteName.appointmentOverview)
                }
              />
            </Column>
            <Column flex={1}>
              <Button
                accessibilityRole="link"
                label="Weesp"
                onPress={() => openWebUrl(appointmentFormWeespUrl)}
                variant="secondary"
              />
            </Column>
          </Row>
        </Column>
      </Box>
    </Screen>
  )
}
