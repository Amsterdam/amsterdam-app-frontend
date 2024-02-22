import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import PeopleAtCityOffice from '@/modules/redirects/assets/images/people-at-city-office.svg'
import {MAKE_APPOINTMENT_WEESP} from '@/modules/redirects/external-links'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {useTheme} from '@/themes/useTheme'

type Props = NavigationProps<RedirectsRouteName.selectCity>

export const SelectCityScreen = ({navigation}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {isLandscape} = useDeviceContext()
  const {media} = useTheme()

  return (
    <Screen
      testID="RedirectsSelectCityScreen"
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
                    onPress={() => openWebUrl(MAKE_APPOINTMENT_WEESP)}
                    testID="RedirectsMakeAppointmentWeespButton"
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
          testID="RedirectsSelectCityBackground"
          withWeesp
        />
      </Column>
    </Screen>
  )
}
