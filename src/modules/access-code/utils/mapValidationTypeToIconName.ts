import {AuthenticationType} from 'expo-local-authentication'
import {Platform} from 'react-native'

export const mapBiometricsAuthenticationTypeToIconName = (
  types?: AuthenticationType[],
) => {
  if (!types || types.length === 0) {
    return
  }

  if (
    [
      AuthenticationType.FINGERPRINT,
      AuthenticationType.FACIAL_RECOGNITION,
    ].every(type => types.includes(type))
  ) {
    if (Platform.OS === 'android') {
      return 'touchId' // Android always uses Touch ID icon
    }

    return 'biometrics'
  }

  if (types.includes(AuthenticationType.FINGERPRINT)) {
    return 'touchId'
  }

  if (types.includes(AuthenticationType.FACIAL_RECOGNITION)) {
    if (Platform.OS === 'android') {
      return 'touchId'
    }

    return 'faceId'
  }

  if (types.includes(AuthenticationType.IRIS)) {
    return 'biometrics' //fallback since iris is not covered by the icons
  }
}
