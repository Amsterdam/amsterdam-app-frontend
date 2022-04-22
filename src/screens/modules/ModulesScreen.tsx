import React from 'react'
import {Modules} from '../../components/features/modules'
import {Box} from '../../components/ui'
import {ScrollView} from '../../components/ui/layout'

export const ModulesScreen = () => {
  return (
    <ScrollView>
      <Box>
        <Modules />
      </Box>
    </ScrollView>
  )
}
