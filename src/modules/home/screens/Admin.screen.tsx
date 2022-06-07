import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EnvironmentSelector} from '../../../components/features/EnvironmentSelector'
import {Screen} from '../../../components/ui/layout/Screen'
import {isDevApp} from '../../../services/development'

export const AdminScreen = () => (
  <Screen>
    {!!isDevApp && (
      <KeyboardAwareScrollView>
        <EnvironmentSelector />
      </KeyboardAwareScrollView>
    )}
  </Screen>
)
