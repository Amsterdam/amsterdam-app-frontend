import React from 'react'
import {getBuildNumber, getVersion} from 'react-native-device-info'
import {Center} from '@/components/ui/layout'
import {Phrase} from '@/components/ui/text'

export const VersionInfo = () => (
  <Center>
    <Phrase variant="small">
      versie {getVersion()}.{getBuildNumber()}
    </Phrase>
  </Center>
)
