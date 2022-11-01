import {getBuildNumber, getVersion} from 'react-native-device-info'
import {isDevApp} from '@/processes'

export const getVersionNumber = () =>
  [getVersion(), isDevApp && getBuildNumber()].filter(Boolean).join('.')
