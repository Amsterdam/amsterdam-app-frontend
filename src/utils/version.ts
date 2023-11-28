import {getBuildNumber, getVersion} from 'react-native-device-info'

export const FULL_VERSION_NUMBER = `${getVersion()}.${getBuildNumber()}`
