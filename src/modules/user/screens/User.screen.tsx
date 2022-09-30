import React from 'react'
import {StyleSheet, View} from 'react-native'
import {VersionInfo} from '@/components/features'
import {Box} from '@/components/ui/containers'
import {Alert} from '@/components/ui/feedback'
import {Screen} from '@/components/ui/layout'
import {Address} from '@/modules/address/components'

export const UserScreen = () => (
  <Screen stickyHeader={<Alert />}>
    <View style={styles.view}>
      <Box>
        <Address />
      </Box>
      <Box>
        <VersionInfo />
      </Box>
    </View>
  </Screen>
)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-between',
  },
})
