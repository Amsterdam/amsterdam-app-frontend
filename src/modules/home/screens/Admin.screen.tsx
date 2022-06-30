import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {EnvironmentSelector} from '@/components/features'
import {Screen} from '@/components/ui/layout'
import {isDevApp} from '@/processes'

export const AdminScreen = () => (
  <Screen>
    {!!isDevApp && (
      <KeyboardAwareScrollView>
        <EnvironmentSelector />
      </KeyboardAwareScrollView>
    )}
  </Screen>
)
