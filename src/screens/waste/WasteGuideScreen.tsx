import React from 'react'
import {ScrollView} from 'react-native'
import {Box, ScreenWrapper} from '../../components/ui'
import {WasteGuideByAddress} from './WasteGuideByAddress'

export const WasteGuideScreen = () => {
  return (
    <ScreenWrapper>
      <ScrollView>
        <Box>
          <WasteGuideByAddress />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}
