import {version} from 'package.json'
import {getBuildNumber, getVersion} from 'react-native-device-info'
import {isLocalApp} from '@/processes/development'

export const BUILD_NUMBER = getBuildNumber()
export const VERSION_NUMBER = isLocalApp ? version : getVersion()
export const VERSION_NUMBER_WITH_BUILD = `${VERSION_NUMBER}.${BUILD_NUMBER}`
