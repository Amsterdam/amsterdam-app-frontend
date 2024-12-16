import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Link} from '@/components/ui/text/Link'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {AboutRouteName} from '@/modules/about/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<AboutRouteName.accessibilityStatement>

export const AccessibilityStatementScreen = ({
  navigation: {navigate},
}: Props) => {
  const {isPortrait, isTablet} = useDeviceContext()
  const openUrl = useOpenUrl()

  return (
    <Screen testID="AboutAccessibilityStatementScreen">
      <Box>
        <Column gutter="lg">
          <Column gutter="md">
            <Title
              accessibilityLabel="Toegankelijkheidsverklaring"
              testID="AboutAccessibilityStatementTitle"
              text={`Toegankelijkheids${
                isPortrait && !isTablet ? '-\n' : ''
              }verklaring`}
            />
            <Paragraph
              testID="AboutAccessibilityStatementDateParagraph"
              variant="small">
              Deze toegankelijkheidsverklaring is getekend op 16 maart 2024.
            </Paragraph>
            <Link
              label="Toegankelijkheidsverklaring"
              onPress={() =>
                openUrl('https://toegankelijkheidsverklaring.nl/register/13502')
              }
              testID="AboutAccessibilityStatementExternalLink"
              variant="external"
            />
            <Paragraph
              testID="AboutAccessibilityStatementIntroParagraph"
              variant="intro">
              De Amsterdam App voldoet grotendeels aan de toegankelijkheidseisen
              van DigiToegankelijk.nl op niveau AA. Voldoen aan deze standaard
              maakt onze app onder andere gebruiksvriendelijker en beter
              toegankelijk voor verschillende doelgroepen.
            </Paragraph>
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              testID="AboutAccessibilityStatementReportTitle"
              text="Testresultaten"
            />
            <Link
              label="20-12-2023: Rapport WCAG 2.1 AA – Amsterdam App Android (PDF, 3.667 kB)"
              onPress={() =>
                openUrl(
                  'https://assets.amsterdam.nl/publish/pages/891623/volledig_toegankelijkheidsonderzoek_amsterdam_app_android.pdf',
                )
              }
              testID="AboutAccessibilityStatementReportAndroidLink"
              variant="external"
            />
            <Link
              label="20-12-2023: Rapport WCAG 2.1 AA – Amsterdam App iOS (PDF, 4.315 kB)"
              onPress={() =>
                openUrl(
                  'https://assets.amsterdam.nl/publish/pages/891623/volledig_toegankelijkheidsonderzoek_amsterdam_app_ios.pdf',
                )
              }
              testID="AboutAccessibilityStatementReportIosLink"
              variant="external"
            />
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              testID="AboutAccessibilityStatementImprovementTitle"
              text="Aanpak om de toegankelijkheid van onze app te bevorderen "
            />
            <Paragraph testID="AboutAccessibilityStatementImprovementParagraph">
              Wij hebben de volgende maatregelen genomen om naleving van de
              toegankelijkheidseisen te bevorderen:
            </Paragraph>
            <List
              items={[
                'Onderzoek: Onafhankelijke deskundigen toetsen regelmatig (onderdelen van) onze app op toegankelijkheid. Gevonden knelpunten lossen wij duurzaam op.',
                'Interne controle vóór publicatie: Onze redactie toetst vóór publicatie alle content op toegankelijkheid.',
                'Periodieke interne controle: Onze redactie voert periodiek tussentijdse controles uit op de content.',
                'Automatische controle: we gebruiken automatische controle en monitoring waar dit mogelijk is. ',
              ]}
              testID="AboutAccessibilityStatementImprovementList"
            />
          </Column>
          <Column gutter="md">
            <Title
              level="h2"
              testID="AboutAccessibilityStatementSomethingBrokenTitle"
              text="Probleem met de toegankelijkheid van deze app?"
            />
            <Paragraph testID="AboutAccessibilityStatementSomethingBrokenParagraph">
              Als u ondanks de maatregelen die wij al hebben genomen een
              probleem met de toegankelijkheid ervaart in onze app, laat het ons
              dan weten.
            </Paragraph>
            <Button
              label="Bekijk onze contactgegevens"
              onPress={() => navigate(ModuleSlug.contact)}
              testID="AboutAccessibilityStatementContactButton"
            />
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
