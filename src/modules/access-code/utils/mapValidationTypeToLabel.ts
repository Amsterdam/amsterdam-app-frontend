import {AuthenticationType} from 'expo-local-authentication'
import {Platform} from 'react-native'

export const mapBiometricsAuthenticationTypeToLabel = (
  types?: AuthenticationType[],
) => {
  if (!types || types.length === 0) {
    return ''
  }

  if (
    [
      AuthenticationType.FINGERPRINT,
      AuthenticationType.FACIAL_RECOGNITION,
    ].every(type => types.includes(type))
  ) {
    if (Platform.OS === 'android') {
      return 'gezichtsherkenning of vingerafdruk'
    }

    return 'Face ID of Touch ID'
  }

  if (types.includes(AuthenticationType.FINGERPRINT)) {
    if (Platform.OS === 'android') {
      return 'vingerafdruk'
    }

    return 'Touch ID'
  }

  if (types.includes(AuthenticationType.FACIAL_RECOGNITION)) {
    if (Platform.OS === 'android') {
      return 'gezichtsherkenning'
    }

    return 'Face ID'
  }

  if (types.includes(AuthenticationType.IRIS)) {
    return 'Iris'
  }
}
