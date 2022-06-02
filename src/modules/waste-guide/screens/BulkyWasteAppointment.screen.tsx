import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {WebView} from '../../../components/ui'
import {WasteGuideRouteName, WasteGuideStackParams} from '../routes'

type Props = {
  route: RouteProp<
    WasteGuideStackParams,
    WasteGuideRouteName.bulkyWasteAppointment
  >
}

export const BulkyWasteAppointmentScreen = ({route}: Props) => {
  return (
    <WebView
      sliceFromTop={{portrait: 162, landscape: 208}}
      url={route?.params?.appointmentUrl}
    />
  )
}
