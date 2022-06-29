import React from 'react'
import {getVersion, getBuildNumber} from 'react-native-device-info'
import {Text} from '../ui'

export const VersionInfo = () => (
  <Text small>
    Versie {getVersion()} (Build {getBuildNumber()})
  </Text>
)
