/* Importing react-native-get-random-values fixes the error "Native crypto module could not be used to get secure random number."
 * It seems to be required when using crypto-js with RN; see https://github.com/brix/crypto-js/pull/259#issuecomment-799973769
 */
import 'react-native-get-random-values'
// eslint-disable-next-line depend/ban-dependencies
import {SHA256} from 'crypto-js'
// eslint-disable-next-line no-restricted-imports
import {getUniqueIdSync} from 'react-native-device-info'

export const encryptWithSHA256 = (value: string) => SHA256(value).toString()

export const SHA256EncryptedDeviceId = encryptWithSHA256(getUniqueIdSync())
