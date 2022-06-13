import Sentry from '@sentry/react-native'
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
        }}>
        Sentry test: JS error
      </Button>
      <Button
        onPress={() => {
          Sentry.nativeCrash()
        }}>
        Sentry test: native error
      </Button>
    </Box>
  </ScrollView>
)
