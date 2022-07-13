import {Center} from '_components/ui/layout'
import {Phrase} from '_components/ui/text'
import React from 'react'
import {getBuildNumber, getVersion} from 'react-native-device-info'

export const VersionInfo = () => (
  <Center>
    <Phrase variant="small">
      versie {getVersion()}.{getBuildNumber()}
    </Phrase>
  </Center>
)
