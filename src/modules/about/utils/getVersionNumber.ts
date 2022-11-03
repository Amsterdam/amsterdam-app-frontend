import {getBuildNumber, getVersion} from 'react-native-device-info'

export const getVersionNumber = (includeBuildNumber: boolean) =>
  [getVersion(), includeBuildNumber && getBuildNumber()]
    .filter(Boolean)
    .join('.')
