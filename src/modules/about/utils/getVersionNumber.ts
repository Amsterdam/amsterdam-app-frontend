import {getBuildNumber, getVersion} from 'react-native-device-info'

export const getVersionNumber = () => [getVersion(), getBuildNumber()].join('.')
