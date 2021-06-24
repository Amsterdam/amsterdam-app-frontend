import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {WebView} from 'react-native-webview'
import {RootStackParamList} from '../../App'
import Header from '../components/ui/Header'

type WebScreenRouteProp = RouteProp<RootStackParamList, 'Melding'>

type WebScreenProp = {
  route: WebScreenRouteProp
}

type UriProp = {uri: string}

const MeldingScreen = ({route}: WebScreenProp) => {
  const {uri}: UriProp = route.params
  return (
    <>
      <Header />
      <WebView uri={uri} />
    </>
  )
}

export default MeldingScreen
