import React from 'react'
import {View, StyleSheet} from 'react-native'
import {VersionInfo} from '@/components/features'
import {Alert, Box} from '@/components/ui'
import {Column, Gutter, Screen} from '@/components/ui/layout'
import {Address} from '@/modules/address/components'
import {ProjectManagerUserSection} from '@/modules/user/components'

export const UserScreen = () => (
  <Screen stickyHeader={<Alert />}>
    <View style={styles.view}>
      <Column>
        <Box>
          <Address />
        </Box>
        <ProjectManagerUserSection />
      </Column>
      <Gutter height="lg" />
      <Column>
        <Box insetHorizontal="md">
          <VersionInfo />
        </Box>
      </Column>
    </View>
  </Screen>
)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-between',
  },
})
