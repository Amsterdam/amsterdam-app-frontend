import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenPhoneUrl} from '@/hooks/useOpenPhoneUrl'
import {useOpenWebUrl} from '@/hooks/useOpenWebUrl'
import {ReportProblemRouteName} from '@/modules/report-problem/routes'
import {City} from '@/modules/report-problem/types'
import {DeviceContext} from '@/providers'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ReportProblemRouteName.reportProblem
  >
}

export const ReportProblemScreen = ({navigation}: Props) => {
  const openPhoneUrl = useOpenPhoneUrl()
  const openWebUrl = useOpenWebUrl()
  const {isPortrait} = useContext(DeviceContext)
  const Track = isPortrait ? Column : Row

  return (
    <Screen>
      <Box>
        <Title
          testID="ReportProblemScreenTitle"
          text="Melding openbare ruimte en overlast"
        />
        <Gutter height="md" />
        <Track gutter="lg">
          <Column
            flex={2}
            gutter="md">
            <Paragraph>
              Ziet u op straat of in een park iets waarvan u wilt dat het
              gemaakt of opgeruimd wordt, dan kunt u dat bij de gemeente melden.
              U kunt ook een gevaarlijke verkeerssituatie of overlast van
              personen en horeca aan ons doorgeven.
            </Paragraph>
            <Paragraph>
              U kunt op{' '}
              <InlineLink
                onPress={() =>
                  openWebUrl('https://meldingen.amsterdam.nl/meldingenkaart')
                }
                testID="ReportProblemKnownProblemsMapLink">
                de meldingenkaart
              </InlineLink>{' '}
              zien welke meldingen al bekend zijn bij de gemeente. Staat uw
              melding er niet bij? Doe dan een nieuwe melding.
            </Paragraph>
          </Column>
          <Column
            flex={1}
            gutter="md">
            <Title
              level="h5"
              text="Voor welke plaats wilt u een melding doen?"
            />
            <Row
              gutter="md"
              wrap>
              <Button
                label="Amsterdam"
                onPress={() =>
                  navigation.navigate(
                    ReportProblemRouteName.reportProblemWebView,
                    {
                      city: City.Amsterdam,
                    },
                  )
                }
                testID="ReportProblemAmsterdamButton"
              />
              <Button
                label="Weesp"
                onPress={() =>
                  navigation.navigate(
                    ReportProblemRouteName.reportProblemWebView,
                    {
                      city: City.Weesp,
                    },
                  )
                }
                testID="ReportProblemWeespButton"
              />
            </Row>
            <Paragraph variant="small">
              Meldingen over afval en containers in Weesp doet u via{' '}
              <InlineLink
                onPress={() =>
                  openWebUrl(
                    'https://www.gad.nl/mijn-vraag-melding/iets-melden-of-aanvragen/',
                  )
                }
                testID="ReportProblemWeespWebsiteLink">
                de website van de GAD
              </InlineLink>{' '}
              of via telefoonnummer{' '}
              <InlineLink
                onPress={() => openPhoneUrl('+31356991888')}
                testID="ReportProblemWeespPhoneLink">
                035 699 1888
              </InlineLink>
              .
            </Paragraph>
          </Column>
        </Track>
      </Box>
    </Screen>
  )
}
