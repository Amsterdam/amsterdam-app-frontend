import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EnvironmentSelector} from '../../../components/features/EnvironmentSelector'
import {ScrollView} from '../../../components/ui/layout'
import {Screen} from '../../../components/ui/layout/Screen'
import {isDevApp} from '../../../services/development'

export const AdminScreen = () => {
  const ScrollComponent = isDevApp ? KeyboardAwareScrollView : ScrollView

  return (
    <Screen>
      <ScrollComponent>
        <EnvironmentSelector />
      </ScrollComponent>
    </Screen>
  )
}
