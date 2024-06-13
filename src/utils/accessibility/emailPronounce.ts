import {Platform} from 'react-native'

export const emailPronounce = (email: string): string =>
  Platform.OS === 'ios'
    ? email.replaceAll('.', ' punt ').replaceAll('-', ' min ')
    : email
