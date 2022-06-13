import {nativeCrash} from '@sentry/react-native'
import React from 'react'
import {Box, Button, Text} from '../../components/ui'
import {ScrollView} from '../../components/ui/layout'

export const OpenWasteContainerScreen = () => (
  <ScrollView>
    <Box>
      <Text>Hallo, ik ben een module! 🎉</Text>
      <Button
        onPress={() => {
          throw new Error('Sentry test 1')
        }}
        text="Sentry test: JS error"
      />
      <Button
        onPress={() => {
          nativeCrash()
        }}
        text="Sentry test: native error"
      />
    </Box>
  </ScrollView>
)
