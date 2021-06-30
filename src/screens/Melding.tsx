import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParamList} from '../../App'
import {ScreenWrapper, WebView} from '../components/ui'

type MeldingScreenProps = {
  route: RouteProp<RootStackParamList, 'Melding'>
}

type UriProp = {uri: string}

export const MeldingScreen = ({route}: MeldingScreenProps) => {
  const {uri}: UriProp = route.params
  return (
    <ScreenWrapper>
      <WebView uri={uri} />
    </ScreenWrapper>
  )
}
