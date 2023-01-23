import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParams} from '@/app/navigation'
import {NavigationButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Phrase, Title} from '@/components/ui/text'
import {AboutRouteName} from '@/modules/about/routes'
import {getVersionNumber} from '@/modules/about/utils'

type Props = {
  navigation: StackNavigationProp<RootStackParams, AboutRouteName.about>
}

const versionNumber = getVersionNumber()

export const AboutScreen = ({navigation}: Props) => (
  <Screen testID="AboutScreenAbout">
    <Box>
      <Column gutter="md">
        <>
          <Title testID="AboutTitleAmsterdam" text="Amsterdam App" />
          <Phrase testID="AboutTextVersion">Versie {versionNumber}</Phrase>
        </>
        <Column gutter="sm">
          <NavigationButton
            label="Waarom deze app?"
            onPress={() => navigation.navigate(AboutRouteName.appSummary)}
            testID="AboutButtonAboutTheAppDutch"
          />
          <NavigationButton
            label="About this app"
            onPress={() => navigation.navigate(AboutRouteName.aboutEnglish)}
            testID="AboutButtonAboutTheAppEnglish"
          />
          <NavigationButton
            label="Privacyverklaring"
            onPress={() => navigation.navigate(AboutRouteName.privacyStatement)}
            testID="AboutButtonPrivacyStatement"
          />
          <NavigationButton
            label="Toegankelijkheidsverklaring"
            onPress={() =>
              navigation.navigate(AboutRouteName.accessibilityStatement)
            }
            testID="AboutButtonAccessibilityStatement"
          />
        </Column>
      </Column>
    </Box>
  </Screen>
)
