import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParamList} from '../../App'
import WebView from '../components/WebView'

type WebScreenRouteProp = RouteProp<RootStackParamList, 'Melding'>

type WebScreenProp = {
  route: WebScreenRouteProp
}

type UriProp = {uri: string}

const MeldingScreen = ({route}: WebScreenProp) => {
  const {uri}: UriProp = route.params
  return <WebView uri={uri} />
}

export default MeldingScreen
