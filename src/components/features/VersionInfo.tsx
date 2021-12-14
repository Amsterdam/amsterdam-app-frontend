import React from 'react'
import VersionNumber from 'react-native-version-info'
import {Text} from '../ui'

export const VersionInfo = () => (
  <Text small>
    Versie {VersionNumber.appVersion}, build {VersionNumber.buildVersion}
  </Text>
)
