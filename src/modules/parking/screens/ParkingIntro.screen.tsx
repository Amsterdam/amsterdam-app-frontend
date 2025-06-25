import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {ParkingIntroFigure} from '@/modules/parking/components/ParkingIntroFigure'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'

type Props = NavigationProps<ParkingRouteName.intro>

export const ParkingIntroScreen = ({navigation: {navigate}}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls} = useGetRedirectUrlsQuery()

  return (
    <Screen testID="ParkingHomeScreen">
      <Row align="center">
        <ParkingIntroFigure />
      </Row>
      <Box>
        <Column gutter="xl">
          <Column gutter="md">
            <Title
              level="h2"
              text="Start parkeersessie"
            />
            <Column gutter="lg">
              <Paragraph variant="intro">
                Log in als vergunninghouder of bezoeker om de parkeersessie te
                starten en te betalen.
              </Paragraph>
              <Button
                label="Inloggen"
                onPress={() => navigate(ParkingRouteName.login)}
                testID="ParkingHomeLoginButton"
              />
            </Column>
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              text="Alles over parkeren"
            />
            <Column gutter="lg">
              <Paragraph variant="intro">
                In de app regelt u parkeersessies. Op de website staat meer
                informatie, zoals over vergunningen, zones, boetes en tarieven.
              </Paragraph>
              <Button
                iconName="external-link"
                iconSize="md"
                label="Lees meer over parkeren"
                onPress={() => {
                  redirectUrls && openWebUrl(redirectUrls?.parking)
                }}
                testID="ParkingHomeParkingInformationButton"
                variant="secondary"
              />
            </Column>
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
