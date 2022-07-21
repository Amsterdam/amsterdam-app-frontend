import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {WebView} from '@/components/ui'
import {Screen} from '@/components/ui/layout'

export const ContactFormScreen = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Neem contact op',
    })
  }, [navigation])

  return (
    <Screen scroll={false}>
      <WebView
        sliceFromTop={{portrait: 50, landscape: 50}}
        url="https://formulieren.amsterdam.nl/tripleforms/DirectRegelen/formulier/nl-NL/evAmsterdam/Klachtenformulier.aspx"
      />
    </Screen>
  )
}
