import React from 'react'
import {useSelector} from 'react-redux'
import {WebView} from '../../components/ui'
import {useEnvironment} from '../../store'
import {selectAddress} from '../address/addressSlice'

export const ReportProblemScreen = () => {
  const {primary: address} = useSelector(selectAddress)

  const environment = useEnvironment()
  return (
    <WebView
      url={`${environment.signalsBaseUrl}/incident/beschrijf`}
      urlParams={{
        lat: address?.centroid[1] ?? 0,
        lng: address?.centroid[0] ?? 0,
      }}
    />
  )
}
