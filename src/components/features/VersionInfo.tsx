import React from 'react'
import VersionNumber from 'react-native-version-info'
import {Text} from '../ui'
import {Column} from '../ui/layout'

export const VersionInfo = () => (
  <Column halign="center">
    <Text small secondary>
      versie {VersionNumber.appVersion}
    </Text>
    <Text small secondary>
      build {VersionNumber.buildVersion}
    </Text>
  </Column>
)
