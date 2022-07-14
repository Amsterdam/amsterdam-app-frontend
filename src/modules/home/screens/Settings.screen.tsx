import React from 'react'
import {Screen, ScrollView} from '@/components/ui/layout'
import {ModuleSettings} from '@/modules/home/components'

export const SettingsScreen = () => (
  <Screen>
    <ScrollView grow>
      <ModuleSettings />
    </ScrollView>
  </Screen>
)
