import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {RootStackParamList} from '../../../app/navigation'
import {WebView} from '../../../components/ui'

type Props = {
  route: RouteProp<RootStackParamList, 'WasteGuideModule'>
}

export const BulkyWasteAppointmentScreen = ({route}: Props) => {
  return (
    <WebView
      sliceFromTop={{portrait: 162, landscape: 208}}
      url={route?.params?.appointmentUrl}
    />
  )
}
