import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {RootStackParams} from '@/app/navigation'
import {NavigationButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Figure} from '@/components/ui/media'
import {Phrase, Title} from '@/components/ui/text'
import {TwoPersonsHighFiveImage} from '@/modules/about/assets/images'
import {AboutRouteName} from '@/modules/about/routes'
import {getVersionNumber} from '@/modules/about/utils'
import {DeviceContext} from '@/providers'

type Props = {
  navigation: StackNavigationProp<RootStackParams, AboutRouteName.about>
}

const versionNumber = getVersionNumber()

export const AboutScreen = ({navigation}: Props) => {
  const {isPortrait} = useContext(DeviceContext)
  const Track = isPortrait ? Column : Row

  return (
    <Screen testID="AboutScreenAbout">
      <Box grow>
        <Track align="between" grow gutter="xl">
          <Column flex={1} gutter="md">
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
                onPress={() =>
                  navigation.navigate(AboutRouteName.privacyStatement)
                }
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
          <Column align="center" flex={1}>
            <Figure height={256}>
              <TwoPersonsHighFiveImage />
            </Figure>
          </Column>
        </Track>
      </Box>
    </Screen>
  )
}
