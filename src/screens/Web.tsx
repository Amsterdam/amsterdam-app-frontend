import React from 'react'
import {RouteProp} from '@react-navigation/native'
import WebView from '../components/WebView'
import {RootStackParamList} from '../../App'

type WebScreenRouteProp = RouteProp<RootStackParamList, 'Web'>
type WebScreenProp = {
  route: WebScreenRouteProp
}
type UriProp = {uri: string}

const WebScreen = ({route}: WebScreenProp) => {
  const {uri}: UriProp = route.params
  return <WebView uri={uri} />
}

export default WebScreen
