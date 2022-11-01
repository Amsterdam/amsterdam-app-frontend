import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
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

export const AboutScreen = ({navigation}: Props) => {
  return (
    <Screen>
      <Box>
        <Column gutter="md">
          <>
            <Title text="Amsterdam App" />
            <Phrase>Versie {versionNumber}</Phrase>
          </>
          <Column gutter="sm">
            <NavigationButton
              label="Waarom deze app?"
              onPress={() => navigation.navigate(AboutRouteName.appSummary)}
            />
            <NavigationButton
              label="About this app"
              onPress={() => navigation.navigate(AboutRouteName.aboutEnglish)}
            />
            <NavigationButton
              label="Privacyverklaring"
              onPress={() =>
                navigation.navigate(AboutRouteName.privacyStatement)
              }
            />
            <NavigationButton
              label="Toegankelijkheidsverklaring"
              onPress={() =>
                navigation.navigate(AboutRouteName.accessibilityStatement)
              }
            />
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
