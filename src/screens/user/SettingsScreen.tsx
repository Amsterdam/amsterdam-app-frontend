import React from 'react'
import {
  ManageProjectSubscriptions,
  ToggleProjectNotifications,
} from '../../components/features/settings'
import {Gutter, ScrollView} from '../../components/ui/layout'
import {size} from '../../tokens'

export const SettingsScreen = () => (
  <ScrollView>
    <Gutter height={size.spacing.md} />
    <ToggleProjectNotifications />
    <ManageProjectSubscriptions />
  </ScrollView>
)
