import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'

type Props = NavigationProps<ParkingRouteName.intro>

export const ParkingIntroScreen = ({navigation: {navigate}}: Props) => {
  const openWebUrl = useOpenWebUrl()
  const {data: redirectUrls} = useGetRedirectUrlsQuery()

  return (
    <Screen testID="ParkingHomeScreen">
      <Box>
        <Column gutter="xl">
          <Column gutter="md">
            <Title
              level="h2"
              text="Voor vergunninghouders"
            />
            <Column gutter="lg">
              <Paragraph>
                Regel het parkeren voor uzelf en uw bezoekers met uw
                parkeervergunning. Log in om een parkeersessie te starten, te
                beheren en te betalen. Uw bezoek kan ook zelf betalen voor het
                parkeren.
              </Paragraph>
              <Button
                label="Inloggen vergunninghouder"
                onPress={() => navigate(ParkingRouteName.login)}
                testID="ParkingHomeLoginButton"
              />
            </Column>
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              text="Bent u op bezoek?"
            />
            <Column gutter="lg">
              <Paragraph>
                Bent u op bezoek bij een persoon met een bezoekersvergunning
                vraag de persoon om de meldcode en pincode. Zo kunt u inloggen
                en en zelf de parkeersessie starten en betalen.
              </Paragraph>
              <Button
                label="Inloggen bezoek"
                onPress={() => navigate(ParkingRouteName.login)}
                testID="ParkingHomeLoginVisitorButton"
                variant="secondary"
              />
            </Column>
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              text="Over parkeren"
            />
            <Column gutter="lg">
              <Paragraph>
                Voor informatie over parkeren voor bewoners, bedrijven, boetes
                en parkeertarieven, kijk op de website van de gemeente
                Amsterdam.
              </Paragraph>
              <Button
                label="Parkeren informatie"
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
