import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {DeviceContext} from '@/providers'
import {openWebUrl} from '@/utils'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    RedirectsRouteName.selectCity
  >
}

const appointmentFormWeespUrl =
  'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx'

export const SelectCityScreen = ({navigation}: Props) => {
  const {isPortrait} = useContext(DeviceContext)

  return (
    <Screen
      scroll={false}
      withLeftInset={isPortrait}
      withRightInset={isPortrait}>
      <HorizontalSafeArea>
        <Box>
          <Column gutter="md">
            <Title text="Waar wilt u een afspraak maken?" />
            <Row gutter="md">
              <Column flex={1}>
                <Button
                  accessibilityRole="link"
                  label="Amsterdam"
                  onPress={() =>
                    navigation.navigate(RedirectsRouteName.makeAppointment)
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
      </HorizontalSafeArea>
    </Screen>
  )
}
