import React from 'react'
import {ClearSettings, DisplaySettings} from '../components/features/admin'
import {Box} from '../components/ui'
import {Column, ScrollView} from '../components/ui/layout'

export const AdminScreen = () => (
  <ScrollView>
    <Box>
      <Column gutter="md">
        <DisplaySettings />
        <ClearSettings />
      </Column>
    </Box>
  </ScrollView>
)
