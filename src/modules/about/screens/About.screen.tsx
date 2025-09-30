import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {CopyButton} from '@/components/ui/buttons/CopyButton'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Track} from '@/components/ui/layout/Track'
import {Figure} from '@/components/ui/media/Figure'
import {Title} from '@/components/ui/text/Title'
import TwoPersonsHighFiveImage from '@/modules/about/assets/images/two-persons-high-five.svg'
import {AboutRouteName} from '@/modules/about/routes'
import {ModuleSlug} from '@/modules/slugs'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'
import {VERSION_NUMBER_WITH_BUILD} from '@/utils/version'

type Props = NavigationProps<AboutRouteName.about>

export const AboutScreen = ({navigation}: Props) => (
  <Screen testID="AboutScreen">
    <Box grow>
      <Track
        align="between"
        alwaysDisplayAsRowForScreenReader
        grow={1}
        gutter="xl">
        <Column
          flex={1}
          gutter="md">
          <Title
            testID="AboutAmsterdamAppTitle"
            text="Amsterdam App"
          />
          <Column gutter="sm">
            <NavigationButton
              accessibilityRole="button"
              onPress={() => navigation.navigate(AboutRouteName.appSummary)}
              testID="AboutAboutTheAppDutchButton"
              title="Over deze app"
            />
            <NavigationButton
              accessibilityRole="button"
              onPress={() => navigation.navigate(AboutRouteName.aboutEnglish)}
              testID="AboutAboutTheAppEnglishButton"
              title="About this app"
            />
            <NavigationButton
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate(AboutRouteName.privacyStatement)
              }
              testID="AboutPrivacyStatementButton"
              title="Privacyverklaring"
            />
            <NavigationButton
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate(AboutRouteName.accessibilityStatement)
              }
              testID="AboutAccessibilityStatementButton"
              title="Toegankelijkheidsverklaring"
            />
            <NavigationButton
              accessibilityRole="button"
              onPress={() => navigation.navigate(ModuleSlug.onboarding)}
              testID="AboutOnboardingButton"
              title="Zo werkt de app"
            />
            <NavigationButton
              accessibilityRole="button"
              onPress={() => navigation.navigate(AboutRouteName.feedback)}
              testID="AboutFeedbackButton"
              title="Uw mening"
            />
          </Column>

          <Column>
            <CopyButton
              insetHorizontal="no"
              label={`Versie ${VERSION_NUMBER_WITH_BUILD}`}
              testID="AboutVersionNumberText"
              textToCopy={VERSION_NUMBER_WITH_BUILD}
              variant="secondary"
            />
            <CopyButton
              ellipsizeMode="tail"
              insetHorizontal="no"
              label={`Installatie-id ${SHA256EncryptedDeviceId}`}
              numberOfLines={1}
              testID="AboutInstallationIdText"
              textToCopy={SHA256EncryptedDeviceId}
              variant="secondary"
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
