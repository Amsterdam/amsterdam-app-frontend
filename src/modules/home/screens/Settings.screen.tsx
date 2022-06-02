import React from 'react'
import BuildConfig from 'react-native-build-config'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EnvironmentSelector} from '../../../components/features/EnvironmentSelector'
import {ScrollView} from '../../../components/ui/layout'
import {Screen} from '../../../components/ui/layout/Screen'
import {ModuleSettings} from '../components'

export const SettingsScreen = () => {
  console.log(BuildConfig, BuildConfig?.BUILD_VARIANT)

  const ScrollComponent =
    BuildConfig?.BUILD_VARIANT === 'dev' ? ScrollView : KeyboardAwareScrollView

  return (
    <Screen>
      <ScrollComponent>
        <ModuleSettings />
        <EnvironmentSelector />
      </ScrollComponent>
    </Screen>
  )
}
