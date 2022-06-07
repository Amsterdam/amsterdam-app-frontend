import React from 'react'
import {ScrollView} from '../../../components/ui/layout'
import {Screen} from '../../../components/ui/layout/Screen'
import {ModuleSettings} from '../components'

export const SettingsScreen = () => {
  return (
    <Screen>
      <ScrollView>
        <ModuleSettings />
      </ScrollView>
    </Screen>
  )
}
