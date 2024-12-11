import {AuthenticationType} from 'expo-local-authentication'
import {Platform} from 'react-native'

export const mapBiometricsAuthenticationTypeToLabel = (
  types?: AuthenticationType[],
) => {
  if (!types) {
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

    return 'face ID of touch ID'
  }

  if (types.includes(AuthenticationType.FINGERPRINT)) {
    if (Platform.OS === 'android') {
      return 'vingerafdruk'
    }

    return 'touch ID'
  }

  if (types.includes(AuthenticationType.FACIAL_RECOGNITION)) {
    if (Platform.OS === 'android') {
      return 'gezichtsherkenning'
    }

    return 'face ID'
  }

  if (types.includes(AuthenticationType.IRIS)) {
    return 'Iris'
  }
}
