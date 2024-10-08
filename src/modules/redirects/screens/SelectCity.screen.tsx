import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import PeopleAtCityOffice from '@/modules/redirects/assets/images/people-at-city-office.svg'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'

type Props = NavigationProps<RedirectsRouteName.selectCity>

export const SelectCityScreen = ({navigation}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {isLandscape} = useDeviceContext()
  const {data: redirectUrls, isLoading, isError} = useGetRedirectUrlsQuery()

  return (
    <Screen
      testID="RedirectsSelectCityScreen"
      withLeftInset={!isLandscape}
      withRightInset={!isLandscape}>
      <Column
        align="between"
        grow={1}>
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
                  {isLoading ? (
                    <PleaseWait testID="RedirectsMakeAppointmentWeespPleaseWait" />
                  ) : isError ? (
                    <SomethingWentWrong testID="RedirectsMakeAppointmentWeespSomethingWentWrong" />
                  ) : (
                    <Button
                      accessibilityRole="link"
                      label="Weesp"
                      onPress={() =>
                        redirectUrls?.makeAppointMentWeesp &&
                        openWebUrl(redirectUrls?.makeAppointMentWeesp)
                      }
                      testID="RedirectsMakeAppointmentWeespButton"
                    />
                  )}
                </Column>
              </Row>
            </Column>
          </Box>
        </HorizontalSafeArea>
        <FigureWithFacadesBackground
          testID="RedirectsSelectCityBackground"
          withWeesp>
          <PeopleAtCityOffice />
        </FigureWithFacadesBackground>
      </Column>
    </Screen>
  )
}
