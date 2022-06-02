import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EnvironmentSelector} from '../../../components/features/EnvironmentSelector'
import {ScrollView} from '../../../components/ui/layout'
import {Screen} from '../../../components/ui/layout/Screen'
import {isDevApp} from '../../../services/development'
import {ModuleSettings} from '../components'

export const SettingsScreen = () => {
  const ScrollComponent = isDevApp ? KeyboardAwareScrollView : ScrollView

  return (
    <Screen>
      <ScrollComponent>
        <ModuleSettings />
        <EnvironmentSelector />
      </ScrollComponent>
    </Screen>
  )
}
