import {NavigationProps} from '@/app/navigation/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {Track} from '@/components/ui/layout/Track'
import {Figure} from '@/components/ui/media/Figure'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import TwoPersonsHighFiveImage from '@/modules/about/assets/images/two-persons-high-five.svg'
import {AboutRouteName} from '@/modules/about/routes'
import {ModuleSlug} from '@/modules/slugs'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

type Props = NavigationProps<AboutRouteName.about>

export const AboutScreen = ({navigation}: Props) => (
  <Screen testID="AboutScreen">
    <Box grow>
      <Track
        align="between"
        alwaysDisplayAsRowForScreenReader
        grow
        gutter="xl">
        <Column
          flex={1}
          gutter="md">
          <>
            <Title
              testID="AboutAmsterdamAppTitle"
              text="Amsterdam App"
            />
            <Phrase testID="AboutVersionNumberText">
              Versie {VERSION_NUMBER_WITH_BUILD}
            </Phrase>
          </>
          <Column gutter="sm">
            <NavigationButton
              accessibilityRole="button"
              label="Over deze app"
              onPress={() => navigation.navigate(AboutRouteName.appSummary)}
              testID="AboutAboutTheAppDutchButton"
            />
            <NavigationButton
              accessibilityRole="button"
              label="About this app"
              onPress={() => navigation.navigate(AboutRouteName.aboutEnglish)}
              testID="AboutAboutTheAppEnglishButton"
            />
            <NavigationButton
              accessibilityRole="button"
              label="Privacyverklaring"
              onPress={() =>
                navigation.navigate(AboutRouteName.privacyStatement)
              }
              testID="AboutPrivacyStatementButton"
            />
            <NavigationButton
              accessibilityRole="button"
              label="Toegankelijkheidsverklaring"
              onPress={() =>
                navigation.navigate(AboutRouteName.accessibilityStatement)
              }
              testID="AboutAccessibilityStatementButton"
            />
            <NavigationButton
              accessibilityRole="button"
              label="Zo werkt de app"
              onPress={() => navigation.navigate(ModuleSlug.onboarding)}
              testID="AboutOnboardingButton"
            />
            <NavigationButton
              accessibilityRole="button"
              label="Uw mening"
              onPress={() => navigation.navigate(AboutRouteName.feedback)}
              testID="AboutFeedbackButton"
            />
          </Column>
        </Column>
        <Column
          align="center"
          flex={1}>
          <Figure height={256}>
            <TwoPersonsHighFiveImage />
          </Figure>
        </Column>
      </Track>
    </Box>
  </Screen>
)
