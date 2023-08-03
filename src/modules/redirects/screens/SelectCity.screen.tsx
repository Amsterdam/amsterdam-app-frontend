import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/useOpenWebUrl'
import {PeopleAtCityOffice} from '@/modules/redirects/assets/images'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {DeviceContext} from '@/providers/device.provider'
import {useEnvironment} from '@/store/slices/environment'
import {useTheme} from '@/themes/useTheme'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    RedirectsRouteName.selectCity
  >
}

export const SelectCityScreen = ({navigation}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {isLandscape} = useContext(DeviceContext)
  const {media} = useTheme()
  const {makeAppointmentWeespUrl} = useEnvironment()

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
                    onPress={() => openWebUrl(makeAppointmentWeespUrl)}
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
