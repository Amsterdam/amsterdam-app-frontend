import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {getVersion} from 'react-native-device-info'
import {RootStackParams} from '@/app/navigation'
import {NavigationButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Phrase, Title} from '@/components/ui/text'
import {AboutRouteName} from '@/modules/about/routes'

type Props = {
  navigation: StackNavigationProp<RootStackParams, AboutRouteName.about>
}

export const AboutScreen = ({navigation}: Props) => {
  return (
    <Screen>
      <Box>
        <Column gutter="md">
          <>
            <Title text="Amsterdam App" />
            <Phrase>Versie {getVersion()}</Phrase>
          </>
          <Column gutter="sm">
            <NavigationButton
              label="Waarom deze app?"
              onPress={() => navigation.navigate(AboutRouteName.appSummary)}
            />
            <NavigationButton
              label="Waarom deze app?"
              onPress={() => navigation.navigate(AboutRouteName.aboutEnglish)}
            />
            <NavigationButton
              label="Waarom deze app?"
              onPress={() =>
                navigation.navigate(AboutRouteName.privacyStatement)
              }
            />
            <NavigationButton
              label="Waarom deze app?"
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
