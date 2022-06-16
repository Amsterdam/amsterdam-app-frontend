import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {WebView} from '../../../components/ui'

export const ContactScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Neem contact op',
    })
  }, [navigation])

  return (
    <WebView
      sliceFromTop={{portrait: 50, landscape: 50}}
      url="https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx"
    />
  )
}
