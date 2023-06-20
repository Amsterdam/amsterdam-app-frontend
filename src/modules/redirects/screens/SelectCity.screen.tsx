import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box, HorizontalSafeArea} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {FigureWithFacadesBackground} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {useOpenWebUrl} from '@/hooks'
import {PeopleAtCityOffice} from '@/modules/redirects/assets/images'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {DeviceContext} from '@/providers'
import {useTheme} from '@/themes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    RedirectsRouteName.selectCity
  >
}

const appointmentFormWeespUrl =
  'https://formulieren.amsterdam.nl/TriplEforms/DirectRegelen/formulier/nl-NL/evAmsterdam/afspraakmakenweesp.aspx'

export const SelectCityScreen = ({navigation}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()

  return (
    <Screen
      scroll={false}
      withLeftInset={!isLandscape}
      withRightInset={!isLandscape}>
      <Column
        align="between"
        grow>
        <HorizontalSafeArea>
          <Box>
            <Column gutter="md">
              <Title text="Waar wilt u een afspraak maken?" />
              <Row gutter="md">
                <Column flex={1}>
                  <Button
                    accessibilityRole="button"
                    label="Amsterdam"
                    onPress={() =>
                      navigation.navigate(RedirectsRouteName.makeAppointment)
                    }
                    testID="RedirectsMakeAppointmentAmsterdamButton"
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
        <FigureWithFacadesBackground
          height={media.figureHeight.xl}
          Image={<PeopleAtCityOffice />}
          imageAspectRatio={media.illustrationAspectRatio.landscape}
          imageWidth={media.illustrationWidth.wide}
          withWeesp
        />
      </Column>
    </Screen>
  )
}
