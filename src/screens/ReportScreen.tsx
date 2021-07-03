import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParamList} from '../../App'
import {ScreenWrapper, WebView} from '../components/ui'

type Props = {
  route: RouteProp<RootStackParamList, 'Report'>
}

type UriProp = {uri: string}

export const ReportScreen = ({route}: Props) => {
  const {uri}: UriProp = route.params
  return (
    <ScreenWrapper>
      <WebView uri={uri} />
    </ScreenWrapper>
  )
}
