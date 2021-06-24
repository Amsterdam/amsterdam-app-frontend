import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParamList} from '../../App'
import WebView from '../components/WebView'
import ScreenWrapper from '../components/ui/ScreenWrapper'

type WebScreenRouteProp = RouteProp<RootStackParamList, 'Melding'>

type WebScreenProp = {
  route: WebScreenRouteProp
}

type UriProp = {uri: string}

const MeldingScreen = ({route}: WebScreenProp) => {
  const {uri}: UriProp = route.params
  return (
    <ScreenWrapper>
      <WebView uri={uri} />
    </ScreenWrapper>
  )
}

export default MeldingScreen
