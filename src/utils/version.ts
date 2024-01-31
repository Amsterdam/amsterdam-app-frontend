import {getBuildNumber, getVersion} from 'react-native-device-info'

export const BUILD_NUMBER = getBuildNumber()
export const VERSION_NUMBER = getVersion()
export const VERSION_NUMBER_WITH_BUILD = `${VERSION_NUMBER}.${BUILD_NUMBER}`
